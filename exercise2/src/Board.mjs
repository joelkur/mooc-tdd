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
      const [row, col] = this._getCoords(i);

      if (this.block && this.block.x === col && this.block.y === row) {
        result += this.block.color;
        continue;
      }

      result += ".";
    };
    return result + "\n";
  }

  _shouldRenderNewline(iterator) {
    return iterator > 0 && iterator % this.width === 0;
  }

  _getCoords(iterator) {
    const row = Math.floor(iterator / this.width);
    const col = iterator % this.width;
    return [row, col];
  }

  /** @param {Block} block */
  drop(block) {
    if (this.block) throw new Error("already falling");

    this.block = block;
    this.block.x = Math.floor(this.width / 2);
  }

  tick() {
    this.block.y++;
  }
}
