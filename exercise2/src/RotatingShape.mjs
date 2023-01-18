export class RotatingShape {
  /** @param {string} shape */
  constructor(shape) {
    this.shape = shape.split("\n").map((row) => row.trim());
  }

  get width() {
    return this.shape[0].length;
  }

  toString() {
    return this.shape.join("\n") + "\n";
  }

  /** @param {number} index */
  _columnToArray(index) {
    return this.shape.map((row) => row.charAt(index));
  }

  rotateRight() {
    return (
      this.shape
        .map((_, i) => this._columnToArray(i).reverse().join(""))
        .join("\n") + "\n"
    );
  }

  rotateLeft() {
    return (
      [...this.shape]
        .reverse()
        .map((_, i) => this._columnToArray(i).join(""))
        .reverse()
        .join("\n") + "\n"
    );
  }
}
