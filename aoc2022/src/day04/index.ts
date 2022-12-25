import run from "aocrunner";

const example: string = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

type numberPair = {
  start: number;
  end: number;
};

const parseInput = (rawInput: string): numberPair[] => {
  const lines: string[] = rawInput.split("\n");
  const result: numberPair[] = [];

  lines.forEach((item: string) => {
    item.split(",").forEach((pair: string) => {
      const resultPair: numberPair = { start: -1, end: -1 };
      pair.split("-").forEach((num: string) => {
        if (resultPair.start == -1) resultPair.start = Number(num);
        else resultPair.end = Number(num);
      });
      result.push(resultPair);
    });
  });

  //   format: [{start:4, end: 8, start: 44, end: 10...}]

  return result;
};

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  var result: number = 0;
  for (let i = 0; i < input.length; i += 2) {
    const pair1: numberPair = input[i];
    const pair2: numberPair = input[i + 1];

    if (pair1.start === pair2.start) {
      result++;
      continue;
    }
    if (pair1.start > pair2.start) {
      if (pair1.end <= pair2.end) result++;
    } else {
      if (pair1.end >= pair2.end) result++;
    }
  }
  return result;
};
// const test1 = part1(example);
// console.log(test1);

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  var result: number = 0;
  for (let i = 0; i < input.length; i += 2) {
    const pair1: numberPair = input[i];
    const pair2: numberPair = input[i + 1];

    if (pair1.start === pair2.start) {
      result++;
      continue;
    }
    if (pair1.start > pair2.start) {
      if (pair1.start <= pair2.end) result++;
    } else {
      if (pair2.start <= pair1.end) result++;
    }
  }
  return result;
};

run({
  part1: {
    tests: [
      {
        input: example,
        expected: 2,
      },
//       {
//         input: `10-67,34-67
// 49-56,49-89
// 27-96,27-28
// 30-47,29-47
// 75-75,16-74
// 50-70,47-63
// 9-89,10-88
// 1-69,16-68
// 9-76,52-76
// 4-96,98-98`,
//         expected: 4,
//       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
