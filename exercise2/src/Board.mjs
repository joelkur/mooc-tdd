export class Board {
  width;
  height;
  fallingBlock;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let result = "";
    for (let i = 0; i < this.height * this.width; i++) {
      if (this._shouldRenderNewline(i)) result += "\n";
      const [row, col] = this._getCoords(i);

      if (this.fallingBlock && this.fallingBlock.x === col && this.fallingBlock.y === row) {
        result += this.fallingBlock.color;
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
    if (this.fallingBlock) throw new Error("already falling");

    this.fallingBlock = block;
    this.fallingBlock.x = Math.floor(this.width / 2);
  }

  tick() {
    if (this.fallingBlock.y === this.height - 1) {
      this.fallingBlock = null;
      return;
    }

    this.fallingBlock.y++;
  }

  hasFalling() {
    return !!this.fallingBlock;
  }
}
