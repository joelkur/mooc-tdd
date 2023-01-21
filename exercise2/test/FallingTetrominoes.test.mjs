import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

/**
 * @param {number} times
 * @param {Function} cb
 */
function repeatedAction(times, cb) {
  for (let i = 0; i < times; i++) {
    cb();
  }
}

const fallToBottom = (board) => repeatedAction(10, () => board.tick());
const moveToLeftBorder = (board) => repeatedAction(10, () => board.moveLeft());
const moveToRightBorder = (board) =>
  repeatedAction(10, () => board.moveRight());
const moveDownToBottom = (board) => repeatedAction(10, () => board.moveDown());

describe("Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("start from the top middle", () => {
    board.drop(Tetromino.T_SHAPE);

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TTT....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("stop when they hit the bottom", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  it("stop when they land on another block", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    );
  });

  it("can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("can be moved down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be moved left beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToLeftBorder(board);

    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be moved right beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToRightBorder(board);

    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be moved down beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    moveDownToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  it("cannot be moved left through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToLeftBorder(board);
    moveDownToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    repeatedAction(3, () => board.moveDown());
    moveToLeftBorder(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ...T......
       .TTTT.....
       TTT.......`
    );
  });

  it("cannot be moved right through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToRightBorder(board);
    moveDownToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    repeatedAction(3, () => board.moveDown());
    moveToRightBorder(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ......T...
       .....TTTT.
       .......TTT`
    );
  });

  it("cannot be moved down through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    repeatedAction(2, () => board.moveLeft());
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....T.....
       ..TTTT....
       .TTT......`
    );
  });

  it("can be rotated left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });
});
