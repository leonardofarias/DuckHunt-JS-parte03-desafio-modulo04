/******/ (() => { // webpackBootstrap
/*!************************************!*\
  !*** ./machine-learning/worker.js ***!
  \************************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
importScripts('https://cdn.jsdelivr.net/npm/onnxruntime-web@latest/dist/ort.min.js');
var MODEL_PATH = "yolov5_onnx_model/best.onnx";
var LABELS_PATH = "yolov5_onnx_model/labels.json";
var INPUT_MODEL_DIMENTIONS = 640;
var CLASS_THRESHOLD = 0.3;
var _labels = [];
var _session = null;
function loadModelAndLabels() {
  return _loadModelAndLabels.apply(this, arguments);
}
/**
 * Pré-processa a imagem para o formato aceito pelo YOLO ONNX:
 * - Redimensiona para [INPUT_DIM, INPUT_DIM]
 * - Normaliza os valores para [0, 1]
 * - Converte para formato NCHW [1, 3, H, W] esperado pelo ONNX
 */
function _loadModelAndLabels() {
  _loadModelAndLabels = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var dummyInput, inputName, dummyTensor, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _context2.n = 1;
          return fetch(LABELS_PATH);
        case 1:
          _context2.n = 2;
          return _context2.v.json();
        case 2:
          _labels = _context2.v;
          console.log('Labels loaded:', _labels);
          ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@latest/dist/';
          ort.env.wasm.numThreads = 1;
          console.log('Loading ONNX model from:', MODEL_PATH);
          _context2.n = 3;
          return ort.InferenceSession.create(MODEL_PATH);
        case 3:
          _session = _context2.v;
          console.log('Model loaded. Input names:', _session.inputNames);
          console.log('Model loaded. Output names:', _session.outputNames);
          dummyInput = new Float32Array(INPUT_MODEL_DIMENTIONS * INPUT_MODEL_DIMENTIONS * 3).fill(0);
          inputName = _session.inputNames[0];
          dummyTensor = new ort.Tensor('float32', dummyInput, [1, 3, INPUT_MODEL_DIMENTIONS, INPUT_MODEL_DIMENTIONS]);
          _context2.n = 4;
          return _session.run(_defineProperty({}, inputName, dummyTensor));
        case 4:
          console.log('Warmup OK');
          postMessage({
            type: 'model-loaded'
          });
          _context2.n = 6;
          break;
        case 5:
          _context2.p = 5;
          _t = _context2.v;
          console.error('❌ Error loading model:', _t);
        case 6:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 5]]);
  }));
  return _loadModelAndLabels.apply(this, arguments);
}
function letterboxParams(srcW, srcH) {
  var size = INPUT_MODEL_DIMENTIONS;
  var scale = Math.min(size / srcW, size / srcH);
  var newW = Math.round(srcW * scale);
  var newH = Math.round(srcH * scale);
  var padLeft = Math.floor((size - newW) / 2);
  var padTop = Math.floor((size - newH) / 2);
  return {
    scale: scale,
    newW: newW,
    newH: newH,
    padLeft: padLeft,
    padTop: padTop
  };
}
function preprocessImage(input) {
  var size = INPUT_MODEL_DIMENTIONS;
  var _letterboxParams = letterboxParams(input.width, input.height),
    newW = _letterboxParams.newW,
    newH = _letterboxParams.newH,
    padLeft = _letterboxParams.padLeft,
    padTop = _letterboxParams.padTop;
  var canvas = new OffscreenCanvas(size, size);
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgb(114,114,114)';
  ctx.fillRect(0, 0, size, size);
  ctx.drawImage(input, padLeft, padTop, newW, newH);
  var imageData = ctx.getImageData(0, 0, size, size);
  var pixels = imageData.data;
  var inputArray = new Float32Array(3 * size * size);
  for (var c = 0; c < 3; c++) {
    for (var h = 0; h < size; h++) {
      for (var w = 0; w < size; w++) {
        inputArray[c * size * size + h * size + w] = pixels[(h * size + w) * 4 + c] / 255.0;
      }
    }
  }
  return inputArray;
}
function runInference(_x) {
  return _runInference.apply(this, arguments);
}
/**
 * Filtra e processa as predições do YOLOv5 ONNX:
 * - O formato de saída é geralmente [1, num_detections, 6] onde 6 = x, y, w, h, conf, class
 * - Aplica o limiar de confiança (CLASS_THRESHOLD)
 * - Filtra apenas a classe desejada ('duck')
 * - Converte coordenadas normalizadas para pixels reais
 * - Calcula o centro do bounding box
 */
function _runInference() {
  _runInference = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(inputArray) {
    var inputTensor, outputs, outputNames, output, outputData;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          // Criar tensor ONNX no formato [1, 3, H, W]
          inputTensor = new ort.Tensor('float32', inputArray, [1, 3, INPUT_MODEL_DIMENTIONS, INPUT_MODEL_DIMENTIONS]); // Executar inferência
          _context3.n = 1;
          return _session.run({
            images: inputTensor
          });
        case 1:
          outputs = _context3.v;
          // YOLOv5 ONNX geralmente retorna saídas com nomes específicos
          // Vamos extrair as saídas disponíveis
          outputNames = Object.keys(outputs);
          console.log('Output names:', outputNames);

          // Assumir que a saída principal contém boxes, scores e classes
          // O formato pode variar dependendo da exportação
          output = outputs[outputNames[0]];
          outputData = output.data;
          console.log('Output shape:', output.dims);
          console.log('Output data length:', outputData.length);
          console.log('Sample output values:', Array.from(outputData.slice(0, 10)));
          return _context3.a(2, {
            data: outputData,
            shape: output.dims
          });
      }
    }, _callee3);
  }));
  return _runInference.apply(this, arguments);
}
function processBestPrediction(_ref, srcW, srcH) {
  var data = _ref.data,
    shape = _ref.shape;
  var numDetections = shape[1];
  var numClasses = shape[2] - 5;
  var _letterboxParams2 = letterboxParams(srcW, srcH),
    scale = _letterboxParams2.scale,
    padLeft = _letterboxParams2.padLeft,
    padTop = _letterboxParams2.padTop;
  var best = null;
  var bestConf = CLASS_THRESHOLD;
  for (var i = 0; i < numDetections; i++) {
    var baseIndex = i * shape[2];
    var objConf = data[baseIndex + 4];
    var classIndex = 0;
    var maxClassScore = 0;
    for (var c = 0; c < numClasses; c++) {
      var s = data[baseIndex + 5 + c];
      if (s > maxClassScore) {
        maxClassScore = s;
        classIndex = c;
      }
    }
    var score = objConf * maxClassScore;
    if (score <= bestConf) continue;
    if (_labels[classIndex] !== 'duck') continue;
    var xModel = data[baseIndex];
    var yModel = data[baseIndex + 1];

    // Desfaz o letterboxing para obter coordenadas no canvas original
    var canvasX = (xModel - padLeft) / scale;
    var canvasY = (yModel - padTop) / scale;

    // Descarta detecções fora dos limites do canvas
    if (canvasX < 0 || canvasX > srcW || canvasY < 0 || canvasY > srcH) continue;
    bestConf = score;
    best = {
      x: canvasX,
      y: canvasY,
      score: (score * 100).toFixed(2)
    };
  }
  console.log("Best detection: score=".concat(bestConf.toFixed(3), ", hit=").concat(best !== null));
  return best;
}
loadModelAndLabels();
self.onmessage = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref2) {
    var data, inputArray, _data$image, width, height, inferenceResults, prediction;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          data = _ref2.data;
          if (!(data.type !== 'predict')) {
            _context.n = 1;
            break;
          }
          return _context.a(2);
        case 1:
          if (_session) {
            _context.n = 2;
            break;
          }
          return _context.a(2);
        case 2:
          inputArray = preprocessImage(data.image);
          _data$image = data.image, width = _data$image.width, height = _data$image.height;
          _context.n = 3;
          return runInference(inputArray);
        case 3:
          inferenceResults = _context.v;
          prediction = processBestPrediction(inferenceResults, width, height);
          if (prediction) postMessage(_objectSpread({
            type: 'prediction'
          }, prediction));
        case 4:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
}();
console.log('🧠 YOLOv5 ONNX Web Worker initialized');
/******/ })()
;
//# sourceMappingURL=machine-learning_worker_js.js.map