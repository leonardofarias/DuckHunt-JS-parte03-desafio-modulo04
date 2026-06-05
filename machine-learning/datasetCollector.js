const DATASET_CLASS_ID = 0;
const DATASET_CLASS_NAME = 'duck';
const CAPTURE_INTERVAL_MS = 250;

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function downloadText(content, filename) {
    downloadBlob(new Blob([content], { type: 'text/plain' }), filename);
}

function getDuckBoxes(game) {
    const rendererWidth = game.app.renderer.width;
    const rendererHeight = game.app.renderer.height;

    return game.stage.ducks
        .filter(duck => duck.visible && duck.alive)
        .map(duck => {
            const bounds = duck.getBounds();
            const xCenter = (bounds.x + bounds.width / 2) / rendererWidth;
            const yCenter = (bounds.y + bounds.height / 2) / rendererHeight;
            const width = bounds.width / rendererWidth;
            const height = bounds.height / rendererHeight;

            return [
                DATASET_CLASS_ID,
                xCenter.toFixed(6),
                yCenter.toFixed(6),
                width.toFixed(6),
                height.toFixed(6),
            ].join(' ');
        });
}

function captureDatasetFrame(game) {
    const labels = getDuckBoxes(game);
    if (!labels.length) return;

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `duckhunt-${timestamp}`;
    const canvas = game.app.renderer.extract.canvas(game.stage);

    canvas.toBlob(blob => {
        if (!blob) return;

        downloadBlob(blob, `${filename}.png`);
        downloadText(labels.join('\n'), `${filename}.txt`);
    }, 'image/png');
}

function createDatasetButton(label, onClick) {
    const button = document.createElement('button');
    button.textContent = label;
    button.style.marginRight = '8px';
    button.style.padding = '8px 12px';
    button.style.fontFamily = 'monospace';
    button.style.cursor = 'pointer';
    button.addEventListener('click', onClick);
    return button;
}

export function setupDatasetCollector(game) {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('dataset')) return false;

    let intervalId = null;

    const toolbar = document.createElement('div');
    toolbar.style.position = 'fixed';
    toolbar.style.left = '16px';
    toolbar.style.top = '16px';
    toolbar.style.zIndex = '9999';
    toolbar.style.padding = '12px';
    toolbar.style.background = 'rgba(0, 0, 0, 0.75)';
    toolbar.style.color = '#fff';
    toolbar.style.fontFamily = 'monospace';
    toolbar.style.borderRadius = '8px';

    const title = document.createElement('div');
    title.textContent = `Dataset collector: ${DATASET_CLASS_NAME}`;
    title.style.marginBottom = '8px';

    const captureButton = createDatasetButton('Capturar frame', () => {
        captureDatasetFrame(game);
    });

    const autoButton = createDatasetButton('Iniciar auto captura', () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            autoButton.textContent = 'Iniciar auto captura';
            return;
        }

        captureDatasetFrame(game);
        intervalId = setInterval(() => captureDatasetFrame(game), CAPTURE_INTERVAL_MS);
        autoButton.textContent = 'Parar auto captura';
    });

    toolbar.appendChild(title);
    toolbar.appendChild(captureButton);
    toolbar.appendChild(autoButton);
    document.body.appendChild(toolbar);

    return true;
}
