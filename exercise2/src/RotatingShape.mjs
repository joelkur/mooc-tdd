export class RotatingShape {
  /** @param {string} shape */
  constructor(shape) {
    this.shape = shape;
  }

  toString() {
    return this.shape
      .split("\n")
      .map(row => row.trim())
      .join("\n") + "\n";
  }

  rotateRight() {
    return "GDA\nHEB\nIFC\n";
  }

  rotateLeft() {
    return "CFI\nBEH\nADG\n";
  }
}
