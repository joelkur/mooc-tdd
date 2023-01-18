import { RotatingShape } from './RotatingShape.mjs';

export class Tetromino {
  static get T_SHAPE() {
    return new Tetromino({
      initialShape: `.T.
      TTT
      ...`,
      orientationsCount: 4,
    });
  }

  static get I_SHAPE() {
    return new Tetromino({
      initialShape: `.....
      .....
      IIII.
      .....
      .....`,
      orientationsCount: 2,
    });
  }

  constructor({initialShape, prerendered = [], orientationsCount = 4, currentOrientation = 0}) {
    this.orientations = orientationsCount;
    this.prerendered = prerendered;
    this.currentOrientation = currentOrientation;

    if (!this.prerendered.length) {
      let tempShape = new RotatingShape(initialShape);
      for (let i = 0; i < orientationsCount; i++) {
        this.prerendered.push(tempShape);
        tempShape = tempShape.rotateRight();
      }
    }
  }

  toString() {
    console.log(this.currentOrientation);
    return this.prerendered[this.currentOrientation].toString();
  }

  rotateRight() {
    let newOrientation = this.currentOrientation + 1;
    if (newOrientation >= this.orientations) {
      newOrientation = 0;
    }
    return new Tetromino({
      prerendered: this.prerendered,
      currentOrientation: newOrientation,
      orientationsCount: this.orientations
    });
  }

  rotateLeft() {
    let newOrientation = this.currentOrientation - 1;
    if (newOrientation < 0) {
      newOrientation = this.orientations - 1;
    }
    return new Tetromino({
      prerendered: this.prerendered,
      currentOrientation: newOrientation,
      orientationsCount: this.orientations
    });
  }
}
