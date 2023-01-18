import { RotatingShape } from './RotatingShape.mjs';

export class Tetromino {
  static get T_SHAPE() {
    return new RotatingShape(
      `.T.
      TTT
      ...`
    );
  }
}
