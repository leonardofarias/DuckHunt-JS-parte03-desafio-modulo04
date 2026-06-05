import { buildLayout } from "./layout";
import { setupDatasetCollector } from "./datasetCollector";

export default async function main(game) {
    const container = buildLayout(game.app);
    setupDatasetCollector(game);
    const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });

    game.stage.aim.visible = false;

    worker.onmessage = ({ data }) => {
        const { type, x, y } = data;

        if (type === 'prediction') {
            container.updateHUD(data);
            game.stage.aim.visible = true;

            // data.x/y em coordenadas do stage local (800x600) — igual ao espaço de treino
            const stageX = data.x;
            const stageY = data.y;
            game.stage.aim.setPosition(stageX, stageY);

            // handleClick espera CSS pixels — multiplica pelas escalas do stage
            game.handleClick({
                global: { x: stageX * game.stage.scale.x, y: stageY * game.stage.scale.y },
            });

        }

    };

    setInterval(async () => {
        try {
            const canvas = game.app.renderer.extract.canvas(game.stage);
            if (!canvas || canvas.width <= 0 || canvas.height <= 0) return;
            const bitmap = await createImageBitmap(canvas);
            worker.postMessage({ type: 'predict', image: bitmap }, [bitmap]);
        } catch (_) {}
    }, 200); // every 200ms

    return container;
}
