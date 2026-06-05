importScripts('https://cdn.jsdelivr.net/npm/onnxruntime-web@latest/dist/ort.min.js');

const MODEL_PATH = `yolov5_onnx_model/best.onnx`;
const LABELS_PATH = `yolov5_onnx_model/labels.json`;
const INPUT_MODEL_DIMENTIONS = 640;
const CLASS_THRESHOLD = 0.3;

let _labels = []
let _session = null

async function loadModelAndLabels() {
    try {
        _labels = await (await fetch(LABELS_PATH)).json()
        console.log('Labels loaded:', _labels);
        
        ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@latest/dist/';
        ort.env.wasm.numThreads = 1;
        
        console.log('Loading ONNX model from:', MODEL_PATH);
        _session = await ort.InferenceSession.create(MODEL_PATH);
        console.log('Model loaded. Input names:', _session.inputNames);
        console.log('Model loaded. Output names:', _session.outputNames);
        
        const dummyInput = new Float32Array(INPUT_MODEL_DIMENTIONS * INPUT_MODEL_DIMENTIONS * 3).fill(0);
        const inputName = _session.inputNames[0];
        const dummyTensor = new ort.Tensor('float32', dummyInput, [1, 3, INPUT_MODEL_DIMENTIONS, INPUT_MODEL_DIMENTIONS]);
        await _session.run({ [inputName]: dummyTensor });
        console.log('Warmup OK');
        
        postMessage({ type: 'model-loaded' });
    } catch (err) {
        console.error('❌ Error loading model:', err);
    }
}

/**
 * Pré-processa a imagem para o formato aceito pelo YOLO ONNX:
 * - Redimensiona para [INPUT_DIM, INPUT_DIM]
 * - Normaliza os valores para [0, 1]
 * - Converte para formato NCHW [1, 3, H, W] esperado pelo ONNX
 */
function letterboxParams(srcW, srcH) {
    const size = INPUT_MODEL_DIMENTIONS;
    const scale = Math.min(size / srcW, size / srcH);
    const newW = Math.round(srcW * scale);
    const newH = Math.round(srcH * scale);
    const padLeft = Math.floor((size - newW) / 2);
    const padTop  = Math.floor((size - newH) / 2);
    return { scale, newW, newH, padLeft, padTop };
}

function preprocessImage(input) {
    const size = INPUT_MODEL_DIMENTIONS;
    const { newW, newH, padLeft, padTop } = letterboxParams(input.width, input.height);

    const canvas = new OffscreenCanvas(size, size);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(114,114,114)';
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(input, padLeft, padTop, newW, newH);

    const imageData = ctx.getImageData(0, 0, size, size);
    const pixels = imageData.data;
    const inputArray = new Float32Array(3 * size * size);

    for (let c = 0; c < 3; c++) {
        for (let h = 0; h < size; h++) {
            for (let w = 0; w < size; w++) {
                inputArray[c * size * size + h * size + w] = pixels[(h * size + w) * 4 + c] / 255.0;
            }
        }
    }

    return inputArray;
}

async function runInference(inputArray) {
    // Criar tensor ONNX no formato [1, 3, H, W]
    const inputTensor = new ort.Tensor('float32', inputArray, [1, 3, INPUT_MODEL_DIMENTIONS, INPUT_MODEL_DIMENTIONS]);
    
    // Executar inferência
    const outputs = await _session.run({ images: inputTensor });
    
    // YOLOv5 ONNX geralmente retorna saídas com nomes específicos
    // Vamos extrair as saídas disponíveis
    const outputNames = Object.keys(outputs);
    console.log('Output names:', outputNames);
    
    // Assumir que a saída principal contém boxes, scores e classes
    // O formato pode variar dependendo da exportação
    const output = outputs[outputNames[0]];
    const outputData = output.data;
    console.log('Output shape:', output.dims);
    console.log('Output data length:', outputData.length);
    console.log('Sample output values:', Array.from(outputData.slice(0, 10)));
    
    return {
        data: outputData,
        shape: output.dims
    };
}

/**
 * Filtra e processa as predições do YOLOv5 ONNX:
 * - O formato de saída é geralmente [1, num_detections, 6] onde 6 = x, y, w, h, conf, class
 * - Aplica o limiar de confiança (CLASS_THRESHOLD)
 * - Filtra apenas a classe desejada ('duck')
 * - Converte coordenadas normalizadas para pixels reais
 * - Calcula o centro do bounding box
 */
function processBestPrediction({ data, shape }, srcW, srcH) {
    const numDetections = shape[1];
    const numClasses = shape[2] - 5;
    const { scale, padLeft, padTop } = letterboxParams(srcW, srcH);

    let best = null;
    let bestConf = CLASS_THRESHOLD;

    for (let i = 0; i < numDetections; i++) {
        const baseIndex = i * shape[2];
        const objConf = data[baseIndex + 4];

        let classIndex = 0;
        let maxClassScore = 0;
        for (let c = 0; c < numClasses; c++) {
            const s = data[baseIndex + 5 + c];
            if (s > maxClassScore) { maxClassScore = s; classIndex = c; }
        }

        const score = objConf * maxClassScore;
        if (score <= bestConf) continue;
        if (_labels[classIndex] !== 'duck') continue;

        const xModel = data[baseIndex];
        const yModel = data[baseIndex + 1];

        // Desfaz o letterboxing para obter coordenadas no canvas original
        const canvasX = (xModel - padLeft) / scale;
        const canvasY = (yModel - padTop) / scale;

        // Descarta detecções fora dos limites do canvas
        if (canvasX < 0 || canvasX > srcW || canvasY < 0 || canvasY > srcH) continue;

        bestConf = score;
        best = { x: canvasX, y: canvasY, score: (score * 100).toFixed(2) };
    }

    console.log(`Best detection: score=${bestConf.toFixed(3)}, hit=${best !== null}`);
    return best;
}

loadModelAndLabels()

self.onmessage = async ({ data }) => {
    if (data.type !== 'predict') return
    if (!_session) return

    const inputArray = preprocessImage(data.image)
    const { width, height } = data.image

    const inferenceResults = await runInference(inputArray)

    const prediction = processBestPrediction(inferenceResults, width, height);
    if (prediction) postMessage({ type: 'prediction', ...prediction });
};

console.log('🧠 YOLOv5 ONNX Web Worker initialized');
