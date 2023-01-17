export class Board {
  width;
  height;
  block;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let result = "";
    for (let i = 0; i < this.height * this.width; i++) {
      if (i > 0 && i % this.width === 0) result += "\n";
      if (this.block && i === 1) result += "X";
      else result += ".";
    };
    return result + "\n";
  }

  /** @param {Block} block */
  drop(block) {
    this.block = block;
  }

  tick() {}
}
