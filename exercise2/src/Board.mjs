export class Board {
  width;
  height;
  blocksOnGround;
  fallingBlock;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.blocksOnGround = [];
  }

  toString() {
    let result = "";
    for (let i = 0; i < this.height * this.width; i++) {
      if (this._shouldRenderNewline(i)) result += "\n";
      const [row, col] = this._getCoords(i);

      const block = this._blockInCoord(row, col);
      if (block) {
        result += block.color;
        continue;
      }

      result += ".";
    };
    return result + "\n";
  }

  _blockInCoord(row, col) {
    const blocks = [...this.blocksOnGround, this.fallingBlock];
    for (const block of blocks) {
      if (block && block.x === col && block.y === row) {
        return block;
      }
    }
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
    // center block
    this.fallingBlock.x = Math.floor(this.width / 2);
  }

  tick() {
    if (
      this._blockInCoord(this.fallingBlock.y + 1, this.fallingBlock.x) ||
      this._hitsGround()
    ) {
      this.blocksOnGround.push(this.fallingBlock);
      this.fallingBlock = null;
      return;
    }

    this.fallingBlock.y++;
  }

  _hitsGround() {
    return this.fallingBlock.y === this.height - 1;
  }

  hasFalling() {
    return !!this.fallingBlock;
  }
}
