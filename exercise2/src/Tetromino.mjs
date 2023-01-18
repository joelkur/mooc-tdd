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

  static get O_SHAPE() {
    return new Tetromino({
      initialShape: `.OO
      .OO
      ...`, 
      orientationsCount: 1,
    });
  }

  x;
  y;

  constructor({initialShape, prerendered = [], orientationsCount = 4, currentOrientation = 0}) {
    this.orientations = orientationsCount;
    this.prerendered = prerendered;
    this.currentOrientation = currentOrientation;
    this.x = 0;
    this.y = 0;

    if (!this.prerendered.length) {
      let tempShape = new RotatingShape(initialShape);
      for (let i = 0; i < orientationsCount; i++) {
        this.prerendered.push(tempShape);
        tempShape = tempShape.rotateRight();
      }
    }
  }

  toString() {
    return this.prerendered[this.currentOrientation].toString();
  }

  /** @param {number} modifier */
  _rotate(modifier) {
    let newOrientation = this.currentOrientation + modifier;
    if (newOrientation < 0) {
      newOrientation = this.orientations - 1;
    } else if (newOrientation >= this.orientations) {
      newOrientation = 0;
    }
    return new Tetromino({
      prerendered: this.prerendered,
      currentOrientation: newOrientation,
      orientationsCount: this.orientations
    });
  }

  rotateRight() {
    return this._rotate(1);
  }

  rotateLeft() {
    return this._rotate(-1);
  }

  getCoord(y, x) {
    const rows = this.prerendered[this.currentOrientation].shape;

    const ny = y - this.y;
    const nx = x - this.x;
    if (ny < 0 || ny >= rows.length) return;
    if (!rows.length || nx < 0 || nx >= rows[0].length) return;

    const row = rows[ny];
    if (!row) return;
    const c = row.charAt(nx);
    if (c === '.') return;
    return c;
  }

  get width() {
    return this.prerendered[this.currentOrientation].width;
  }
}
