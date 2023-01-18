export class RotatingShape {
  /** @param {string} shape */
  constructor(shape) {
    this.shape = shape.split("\n").map((row) => row.trim());
  }

  get width() {
    return this.shape[0].length;
  }

  toString() {
    return this._buildShapeString(this.shape);
  }

  _buildShapeString(shape) {
    return shape.join("\n") + "\n";
  }

  /** @param {number} index */
  _columnToArray(index) {
    return this.shape.map((row) => row.charAt(index));
  }

  rotateRight() {
    return this._buildShapeString(
      this.shape
        .map((_, i) => this._columnToArray(i).reverse().join(""))
    );
  }

  rotateLeft() {
    return this._buildShapeString(
      [...this.shape]
        .reverse()
        .map((_, i) => this._columnToArray(i).join(""))
        .reverse()
    );
  }
}
