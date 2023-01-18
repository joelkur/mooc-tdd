export class RotatingShape {
  /** @param {string} shape */
  constructor(shape) {
    this.shape = shape.split("\n").map(row => row.trim());
  }

  get width() {
    return this.shape[0].length;
  }

  toString() {
    return this.shape.join("\n") + "\n";
  }

  /** @param {number} index */
  _columnToArray(index) {
    return this.shape.map(row => row.charAt(index));
  }

  rotateRight() {
    let newShape = "";
    for (let i = 0; i < this.width; i++) {
      newShape += this._columnToArray(i).reverse().join("") + "\n";
    }
    return newShape;
  }

  rotateLeft() {
    let newShape = "";
    for (let i = this.width - 1; i >= 0; i--) {
      newShape += this._columnToArray(i).join("") + "\n";
    }
    return newShape;
  }
}
