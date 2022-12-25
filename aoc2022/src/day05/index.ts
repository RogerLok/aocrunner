import run from "aocrunner";

const parseInput = (rawInput: string): string[][] => {
  const result: string[][] = [];
  rawInput.split("\n").forEach((line: string): void => {
    result.push(
      line.split(" ").filter((ele: string, index: number) => index % 2 !== 0),
    );
  });
  return result;
};
type Stack = {
  [key: string]: Array<string>;
};
const stack: Stack = {
  "1": ["F", "C", "J", "P", "H", "T", "W"],
  "2": ["G", "R", "V", "F", "Z", "J", "B", "H"],
  "3": ["H", "P", "T", "R"],
  "4": ["Z", "S", "N", "P", "H", "T"],
  "5": ["N", "V", "F", "Z", "H", "J", "C", "D"],
  "6": ["P", "M", "G", "F", "W", "D", "Z"],
  "7": ["M", "V", "Z", "W", "S", "J", "D", "P"],
  "8": ["N", "D", "S"],
  "9": ["D", "Z", "S", "F", "M"],
};

const part1 = (rawInput: string) => {
//   const input: string[][] = parseInput(rawInput);
  let result: string = "";
//   //input;

//   for (let i = 0; i < input.length; i++) {
//     for (let j = 0; j < Number(input[i][0]); j++) {
//       stack[input[i][2]].push(stack[input[i][1]].pop());
//     }
//   }
//   for (let i = 1; i < 9 + 1; i++) {
//     result += stack[i].filter(
//       (ele, index: number, array) => index === array.length - 1,
//     );
//   }
  return result;
};

const part2 = (rawInput: string) => {
    const input: string[][] = parseInput(rawInput);
    let result: string = "";
    //input;

    for (let i = 0; i < input.length; i++) {
		const quantityToMove : number = input[i][0];
        stack[input[i][2]].push(...stack[input[i][1]].slice(-quantityToMove));
		stack[input[i][1]].splice(-quantityToMove);
    }

    for (let i = 1; i < 9 + 1; i++) {
      result += stack[i].filter(
        (ele, index: number, array) => index === array.length - 1,
      );
    }
    return result;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
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
