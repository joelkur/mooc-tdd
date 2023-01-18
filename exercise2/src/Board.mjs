export class Board {
  width;
  height;
  shapesOnGround;
  fallingShape;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.shapesOnGround = [];
  }

  toString() {
    let result = "";
    for (let i = 0; i < this.height * this.width; i++) {
      if (this._shouldRenderNewline(i)) result += "\n";
      const [row, col] = this._getCoords(i);

      const block = this._blockInCoord(row, col);
      if (block) {
        result += block;
        continue;
      }

      result += ".";
    }
    return result + "\n";
  }

  _blockInCoord(
    row,
    col,
    blocksToCheck = [...this.shapesOnGround, this.fallingShape]
  ) {
    const blocks = blocksToCheck;
    for (const block of blocks) {
      if (!block) continue;
      if (block.getCoord) {
        return block.getCoord(row, col);
      }
      if (block && block.x === col && block.y === row) {
        return block.color;
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
    if (this.fallingShape) throw new Error("already falling");

    this.fallingShape = block;
    // center block
    this.fallingShape.x = Math.floor(this.width / 2);
    if (this.fallingShape.width) {
      this.fallingShape.x -= Math.ceil(this.fallingShape.width / 2);
    }
  }

  tick() {
    if (!this.fallingShape) return;
    if (
      this._blockInCoord(
        this.fallingShape.y + 1,
        this.fallingShape.x,
        this.shapesOnGround
      ) ||
      this._hitsGround()
    ) {
      this.shapesOnGround.push(this.fallingShape);
      this.fallingShape = null;
      return;
    }

    this.fallingShape.y++;
  }

  _hitsGround() {
    let y = this.fallingShape.y;
    if (this.fallingShape.height) y += this.fallingShape.height;
    return y === this.height - 1;
  }

  hasFalling() {
    return !!this.fallingShape;
  }
}
