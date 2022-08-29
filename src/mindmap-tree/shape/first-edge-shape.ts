import Raphael, { RaphaelPaper, RaphaelSet, RaphaelAxisAlignedBoundingBox } from 'raphael';
import { Direction } from '../types';

interface FirstEdgeShapeOptions {
  paper: RaphaelPaper;
  sourceBBox: RaphaelAxisAlignedBoundingBox;
  targetBBox: RaphaelAxisAlignedBoundingBox;
  direction: Direction;
}

export class FirstEdgeShape {
  private readonly shapeSet: RaphaelSet;
  public constructor(options: FirstEdgeShapeOptions) {
    this.shapeSet = this.draw(options);
  }

  private draw({
    paper,
    sourceBBox,
    targetBBox,
    direction
  }: FirstEdgeShapeOptions): RaphaelSet {
    const x1 = sourceBBox.cx;
    const y1 = sourceBBox.cy;
    const x2 = targetBBox.cx - direction * targetBBox.width / 2;
    const y2 = targetBBox.cy;
    const k1 = 0.8;
    const k2 = 0.2;
    const pathPoints = {
      x1,
      y1,
      x2: x2,
      y2: y2,
      x3: x2 - k1 * (x2 - x1),
      y3: y2 - k2 * (y2 - y1),
    };

    const edgePath = paper.path(Raphael.fullfill("M{x1},{y1}Q{x3},{y3},{x2},{y2}", pathPoints));
    edgePath.attr({
      'stroke': '#999',
      'stroke-width': 2
    });
    edgePath.toBack();

    return paper.set().push(edgePath);
  }
  
  public remove(): void {
    this.shapeSet.remove();
  }
}

export function createFirstEdgeShape(options: FirstEdgeShapeOptions): FirstEdgeShape {
  return new FirstEdgeShape(options);
}