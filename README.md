# DuckHunt-JS-parte03-desafio-modulo04

Projeto base para o desafio do Módulo 04 de Web Machine Learning.

Este projeto parte do Duck Hunt em JavaScript e evolui a implementação para usar um modelo de visão computacional no navegador, com TensorFlow.js e YOLO, para identificar objetos na tela e fazer o jogo agir automaticamente.

## Desafio do Módulo 04

O desafio consiste em adaptar um modelo existente para um novo contexto de detecção de objetos.

Objetivos principais:

- Pegar um modelo YOLO já existente
- Adicionar ou adaptar classes para detectar novos objetos
- Aplicar a ideia em outro contexto, como um jogo no navegador
- Fazer o jogo agir sozinho com base nas predições do modelo
- Estudar o artigo do Hugo sobre extensão do YOLO para identificar novos objetos, como prateleiras vazias

## Implementação realizada

Neste projeto, a IA usa o Duck Hunt como ambiente de teste e funciona da seguinte forma:

- Captura frames do jogo a cada 200ms via `renderer.extract.canvas(game.stage)`
- Envia o frame como `ImageBitmap` para um Web Worker
- Pré-processa a imagem com **letterboxing** (igual ao YOLOv5 training): escala mantendo aspecto + padding cinza (114,114,114) até 640×640, normalização NCHW
- Executa inferência com **ONNX Runtime Web** (backend WASM via CDN)
- Seleciona apenas a detecção de maior confiança (`class=duck`, score = obj_conf × class_conf ≥ 0.3)
- Desfaz o letterboxing para recuperar coordenadas no espaço do stage (800×600)
- Move a mira e dispara automaticamente

## Modelo treinado

- **Arquitetura**: YOLOv5n (nano)
- **Dataset**: 399 imagens capturadas pelo coletor automático do próprio jogo
- **Treinamento**: 100 épocas, imagens 640×640
- **Resultado**: mAP50 = **0.786**
- **Formato de exportação**: ONNX com `--simplify` via `export.py`
- **Arquivo**: `machine-learning/yolov5_onnx_model/best.onnx`

## Fluxo de treino

1. Capturar imagens com `?dataset` (modo coleta automática)
2. Organizar dataset em `dataset/images/train|val` e `dataset/labels/train|val`
3. Treinar com YOLOv5: `python train.py --weights yolov5n.pt --data duck.yaml --epochs 100 --imgsz 640`
4. Exportar: `python export.py --weights runs/train/.../best.pt --include onnx --simplify`
5. Copiar `best.onnx` e `labels.json` para `machine-learning/yolov5_onnx_model/`

## Sistema de coordenadas (decisão técnica importante)

O jogo usa dois espaços de coordenadas distintos:

| Espaço | Dimensão | Uso |
|---|---|---|
| **Stage local** | 800 × 600 | Posição dos patos (`duck.position`) |
| **CSS pixels** | `window.innerWidth × window.innerHeight` | Eventos de clique (`handleClick`) |

A extração de frames usa `renderer.extract.canvas(game.stage)` que retorna um canvas em **coordenadas do stage local (~800×600)** — o mesmo espaço em que o modelo foi treinado. Por isso `data.x/y` retornados pelo worker são usados diretamente como `stageX/Y`, e apenas na hora do clique são multiplicados pela escala da janela:

```javascript
game.handleClick({
    global: {
        x: stageX * game.stage.scale.x,  // converte para CSS pixels
        y: stageY * game.stage.scale.y,
    }
});
```

Isso garante que a IA funciona corretamente em qualquer resolução de tela.

## Coleta automática de dataset

O projeto possui um modo simples de coleta de dataset para gerar imagens e labels no formato YOLO usando a posição real dos patos no jogo.

Para ativar o coletor, execute o projeto normalmente:

```bash
npm start
```

Depois abra a aplicação com o parâmetro `dataset`:

```text
http://localhost:8080/?dataset
```

Ao abrir nesse modo, aparecerá uma barra no canto superior esquerdo com dois botões:

- `Capturar frame`: baixa uma imagem `.png` do frame atual e um arquivo `.txt` com as labels YOLO
- `Iniciar auto captura`: captura automaticamente um frame a cada 250ms até ser interrompido

Nesse modo, a IA continua calculando predições, mas o clique automático é desativado para evitar que o jogo termine rápido durante a coleta.

Além disso, o jogo entra em um modo especial para dataset:

- aumenta a quantidade de ondas
- aumenta a quantidade de balas
- aumenta o tempo da fase
- reduz a velocidade dos patos
- evita que a onda termine apenas por tempo ou falta de munição

Cada arquivo `.txt` é gerado no formato YOLO:

```text
class_id x_center y_center width height
```

Neste projeto, a classe `duck` usa o `class_id` igual a `0`.

Exemplo:

```text
0 0.512340 0.423100 0.087500 0.063200
```

Depois de baixar os arquivos, organize-os em uma estrutura como:

```text
dataset/
  images/
    train/
    val/
  labels/
    train/
    val/
```

## Estrutura importante

- `machine-learning/worker.js`: roda a lógica de IA em um Web Worker
- `machine-learning/main.js`: conecta o worker com o jogo
- `machine-learning/datasetCollector.js`: ativa o coletor automático de frames e labels quando a URL contém `?dataset`
- `machine-learning/yolov5_onnx_model`: pasta com o modelo ONNX treinado (`best.onnx`) e `labels.json`

## Como executar

Instale as dependências:

```bash
npm install
```

Inicie o servidor local:

```bash
npm start
```

A aplicação ficará disponível em:

```text
http://localhost:8080/
```

## Referências

- https://blog.tensorflow.org/2022/05/real-time-sku-detection-in-browser.html
- https://medium.com/data-science/training-a-custom-yolov7-in-pytorch-and-running-it-directly-in-the-browser-with-tensorflow-js-96a5ecd7a530
- https://docs.ultralytics.com/integrations/tfjs/
- https://github.com/ultralytics/yolov5
- https://github.com/MattSurabian/DuckHunt-JS
