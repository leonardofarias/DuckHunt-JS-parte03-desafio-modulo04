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

## Proposta deste projeto

Neste projeto, a ideia é usar o Duck Hunt como ambiente de teste para criar uma IA que:

- Captura a tela do jogo
- Envia a imagem para um Web Worker
- Pré-processa a imagem com TensorFlow.js
- Executa inferência com um modelo YOLO
- Filtra as predições válidas
- Calcula o centro do objeto detectado
- Envia as coordenadas para a thread principal
- Move a mira e dispara automaticamente

## Fluxo esperado

1. Capturar imagens ou frames do jogo
2. Escolher a classe que será detectada, como `duck`
3. Anotar as imagens com bounding boxes
4. Treinar ou ajustar um modelo YOLO para a nova classe
5. Converter/exportar o modelo para TensorFlow.js
6. Substituir o modelo em `machine-learning/yolov5n_web_model`
7. Atualizar o filtro de classe no `worker.js`
8. Validar se o jogo consegue mirar e clicar sozinho

## Estrutura importante

- `machine-learning/worker.js`: roda a lógica de IA em um Web Worker
- `machine-learning/main.js`: conecta o worker com o jogo
- `machine-learning/yolov5n_web_model`: pasta do modelo usado pelo TensorFlow.js

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
