import { Block } from "./Block.mjs";
import { Tetromino } from "./Tetromino.mjs";

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
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if (!block) continue;
      if (block instanceof Tetromino) {
        const b = block.getCoord(row, col, i);
        if (b) {
          return b;
        }
      }
      if (block instanceof Block && block.x === col && block.y === row) {
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

  /** @param { import("./Block.mjs").Block | import("./Tetromino.mjs").Tetromino } block*/
  drop(block) {
    if (this.fallingShape) throw new Error("already falling");

    this.fallingShape = block;
    // center block
    this.fallingShape.x = Math.floor(this.width / 2);
    if (this.fallingShape.width) {
      this.fallingShape.x -= Math.ceil(this.fallingShape.width / 2);
    }
  }

  _land() {
    this.shapesOnGround.push(this.fallingShape);
    this.fallingShape = null;
  }

  _willHitOtherShape() {
    const newY = this.fallingShape.y + 1;
    for (
      let x = this.fallingShape.x;
      x <= this.fallingShape.x + this.fallingShape.width;
      x++
    ) {
      for (let y = newY; y <= newY + this.fallingShape.height; y++) {
        if (this._blockInCoord(y, x, this.shapesOnGround)) return true;
      }
    }
    return false;
  }

  tick() {
    if (!this.fallingShape) return;
    if (this._hitsGround() || this._willHitOtherShape()) return this._land();
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

  moveLeft() {
    this.fallingShape.x--;
  }

  moveRight() {
    this.fallingShape.x++
  }

  moveDown() {
    this.tick();
  }
}
