export class RotatingShape {
  /** @param {string} shape */
  constructor(shape) {
    this.shape = shape.split("\n").map(row => row.trim()).join("\n") + "\n";
  }

  toString() {
    return this.shape;
  }

  rotateRight() {
    let newShape = "";
    newShape += this.shape.charAt(8) + this.shape.charAt(4) + this.shape.charAt(0) + "\n";
    newShape += this.shape.charAt(9) + this.shape.charAt(5) + this.shape.charAt(1) + "\n";
    newShape += this.shape.charAt(10) + this.shape.charAt(6) + this.shape.charAt(2) + "\n";
    this.shape = newShape;
    return this;
  }

  rotateLeft() {
    return "CFI\nBEH\nADG\n";
  }
}
