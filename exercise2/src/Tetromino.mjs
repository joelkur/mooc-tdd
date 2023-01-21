import { RotatingShape } from "./RotatingShape.mjs";

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

  constructor({
    initialShape,
    prerendered = [],
    orientationsCount = 4,
    currentOrientation = 0,
    x = 0,
    y = 0,
  }) {
    this.orientations = orientationsCount;
    this.prerendered = prerendered;
    this.currentOrientation = currentOrientation;
    this.x = x;
    this.y = y;

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
      orientationsCount: this.orientations,
      x: this.x,
      y: this.y,
    });
  }

  rotateRight() {
    return this._rotate(1);
  }

  rotateLeft() {
    return this._rotate(-1);
  }

  _getNormalizedCoords(y, x) {
    return [y - this.y, x - this.x];
  }

  _isWithinBounds(y, x) {
    const [ny, nx] = this._getNormalizedCoords(y, x);
    return (ny >= 0 || ny <= this.height) && (nx >= 0 || nx <= this.width);
  }

  getCoord(y, x) {
    const rows = this.shape;
    if (!this._isWithinBounds(y, x)) return;

    const [ny, nx] = this._getNormalizedCoords(y, x);
    const row = rows[ny];
    if (!row) return;
    const c = row.charAt(nx);
    if (c === ".") return;
    return c;
  }

  get shape() {
    return this.prerendered[this.currentOrientation].shape;
  }

  get width() {
    return this.prerendered[this.currentOrientation].width;
  }

  get height() {
    const rows = [...this.shape];
    const isEmptyRow = () =>
      !Array.from(rows[rows.length - 1]).find((c) => c !== ".");
    while (isEmptyRow()) {
      rows.pop();
    }
    return rows.length - 1;
  }
}
