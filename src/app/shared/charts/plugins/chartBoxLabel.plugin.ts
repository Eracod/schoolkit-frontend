import { formatNumber } from '@angular/common';
import { Chart } from 'chart.js';

interface BorderRadiusOptions {
  topLeft?: number;
  topRight?: number;
  bottomRight?: number;
  bottomLeft?: number;
}

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.topLeft = 0] Top left
 * @param {Number} [radius.topRight = 0] Top right
 * @param {Number} [radius.bottomRight = 0] Bottom right
 * @param {Number} [radius.bottomLeft = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number | BorderRadiusOptions = 5,
  fill = false,
  stroke = true
) {
  if (typeof radius === 'number') {
    radius = {
      topLeft: radius,
      topRight: radius,
      bottomLeft: radius,
      bottomRight: radius,
    };
  } else {
    radius = {
      ...{ topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 },
      ...radius,
    };
  }
  const topLeftRadius = radius.topLeft ?? 0;
  const topRightRadius = radius.topRight ?? 0;
  const bottomRightRadius = radius.bottomRight ?? 0;
  const bottomLeftRadius = radius.bottomLeft ?? 0;

  ctx.beginPath();
  ctx.moveTo(x + topLeftRadius, y);
  ctx.lineTo(x + width - topRightRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + topRightRadius);
  ctx.lineTo(x + width, y + height - bottomRightRadius);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - (radius.bottomRight ?? 0),
    y + height
  );
  ctx.lineTo(x + bottomLeftRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - bottomLeftRadius);
  ctx.lineTo(x, y + topLeftRadius);
  ctx.quadraticCurveTo(x, y, x + topLeftRadius, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}

const ChartBoxLabelPlugin = {
  id: 'chartBoxLabelPlugin',
  beforeDatasetsDraw: (chart: Chart, args: any, plugins: any): void => {
    const { ctx, data } = chart;
    const labels: string[] = (data.datasets[0] as any).labels ?? [];

    labels.forEach((label, index) => {
      const value = formatNumber(
        Number(chart.data.datasets[0].data[index]),
        'en-US'
      );
      const text = `${label}: ${value}`;
      const canvasWidth = chart.width - 20;
      const textMetrics = ctx.measureText(text);
      const width = Math.min(canvasWidth, textMetrics.width + 20);
      const height = 20;
      const xPos = 10;
      const yPos = chart.getDatasetMeta(0).data[index].y - 30;

      ctx.strokeStyle = '#E1E4EA';
      roundRect(ctx, xPos, yPos, width, height);
      ctx.font = '12px Axiforma';
      ctx.fillStyle = '#99A0AE';
      ctx.fillText(text, xPos + 10, yPos + 15, width);
    });
  },
};

export default ChartBoxLabelPlugin;
