import run from "aocrunner";

const parseInput = (rawInput: string): string[][] => {
  const result: string[][] = [];
  rawInput.split("\n").forEach((ele: string) => {
    result.push(ele.split(""));
  });

  return result;
};

const mainFunction = (rawInput: string) => {
  const input = parseInput(rawInput);
  let result: number = 0;

  const checkRowOrCol = (
    treeHeight: number,
    position: number,
    rowOrColNum: number,
    type: string,
  ): boolean => {
    let firstHalfVisible: boolean = true;
    let secondHalfVisible: boolean = true;
    let firstHalf: boolean = true;

    for (let i = 0; i < input.length; i++) {
      let x: number = 0;
      let y: number = 0;
      let yPosition: number = 0;
      let xPosition: number = 0;

      if (type == "row") {
        x = rowOrColNum;
        y = i;
        yPosition = position;
        xPosition = rowOrColNum;
      }
      if (type == "col") {
        x = i;
        y = rowOrColNum;
        yPosition = rowOrColNum;
        xPosition = position;
      }

      if (x == xPosition && y == yPosition) {
        firstHalf = !firstHalf;
        continue;
      }
      //firstHalf
      if (firstHalf) {
        if (Number(input[x][y]) >= treeHeight) firstHalfVisible = false;
      } else {
        if (Number(input[x][y]) >= treeHeight) secondHalfVisible = false;
      }
    }

    if (firstHalfVisible || secondHalfVisible) return true;

    return false;
  };

  for (let row = 1; row < input.length - 1; row++) {
    for (let col = 1; col < input[0].length - 1; col++) {
      // console.log(input[row][col]);
      if (
        checkRowOrCol(Number(input[row][col]), col, row, "row") ||
        checkRowOrCol(Number(input[row][col]), row, col, "col")
      )
        result++;
    }
  }

  const numberOfsides: number = (input.length - 2) * 4 + 4;
  //   console.log(numberOfsides)
  result += numberOfsides;

  return result;
};

const part1 = (rawInput: string) => {
  return mainFunction(rawInput);
};

const part2 = (rawInput: string) => {
  //const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `30373
25512
65332
33549
35390`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
