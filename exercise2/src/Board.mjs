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
      if (this._shouldRenderNewline(i)) result += "\n";
      if (this.block && i === 1) result += "X";
      else result += ".";
    };
    return result + "\n";
  }

  _shouldRenderNewline(iterator) {
    return iterator > 0 && iterator % this.width === 0;
  }
  /** @param {Block} block */
  drop(block) {
    this.block = block;
  }

  tick() {}
}
