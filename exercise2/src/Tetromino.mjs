import { RotatingShape } from './RotatingShape.mjs';

export class Tetromino {
  static get T_SHAPE() {
    return new Tetromino(
      `.T.
      TTT
      ...`
    );
  }

  static get I_SHAPE() {
    return new Tetromino(
      `.....
      .....
      IIII.
      .....
      .....`
    );
  }

  constructor(shape) {
    this.shape = typeof shape === "string"
      ? new RotatingShape(shape)
      : shape;
  }

  toString() {
    return this.shape.toString();
  }

  rotateRight() {
    return new Tetromino(this.shape.rotateRight());
  }

  rotateLeft() {
    return new Tetromino(this.shape.rotateLeft());
  }
}
