export class Board {
  width;
  height;
  block;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    if (this.block) {
      return ".X.\n...\n...\n";
    }
    return "...\n...\n...\n";
  }

  /** @param {Block} block */
  drop(block) {
    this.block = block;
  }
}
