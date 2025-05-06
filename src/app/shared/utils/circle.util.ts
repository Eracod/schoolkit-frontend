export class CircleUtils {
  public static polarToCartesian(
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  public static describeArc(
    x: number,
    y: number,
    radius: number,
    spread: number,
    startAngle: number,
    endAngle: number
  ) {
    var innerStart = this.polarToCartesian(x, y, radius, endAngle);
    var innerEnd = this.polarToCartesian(x, y, radius, startAngle);
    var outerStart = this.polarToCartesian(x, y, radius + spread, endAngle);
    var outerEnd = this.polarToCartesian(x, y, radius + spread, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    var d = [
      'M',
      outerStart.x,
      outerStart.y,
      'A',
      radius + spread,
      radius + spread,
      0,
      largeArcFlag,
      0,
      outerEnd.x,
      outerEnd.y,
      'L',
      innerEnd.x,
      innerEnd.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      1,
      innerStart.x,
      innerStart.y,
      'L',
      outerStart.x,
      outerStart.y,
      'Z',
    ].join(' ');

    return d;
  }
}
