import run from "aocrunner";

type riddleResult = {
  startingItems: string[][];
  operations: string[];
  tests: number[];
  throwTo: number[][];
};
const parseInput = (rawInput: string): riddleResult => {
  const lines = rawInput.split("\n");
  const startingItems: string[][] = [];
  const operations: string[] = [];
  const tests: number[] = [];
  const throwTo: number[][] = [];
  let result: riddleResult;

  for (let i = 0; i < lines.length; i++) {
    if ((i - 1) % 7 === 0) {
      lines[i] = lines[i].replace("  Starting items: ", "");
      startingItems.push(lines[i].split(", "));
    }
    if ((i - 2) % 7 === 0) {
      operations.push(lines[i].replace("  Operation: new =", ""));
    }
    if ((i - 3) % 7 === 0) {
      tests.push(
        Number((lines[i] = lines[i].replace("  Test: divisible by ", ""))),
      );
    }
    if ((i - 4) % 7 === 0) {
      throwTo.push([Number(lines[i][lines[i].length - 1])]);
    }
    if ((i - 5) % 7 === 0) {
      throwTo[throwTo.length - 1].push(Number(lines[i][lines[i].length - 1]));
    }
  }

  //   console.log(startingItems);
  //   console.log(operations);
  //   console.log(tests);
  //   console.log(throwTo);
  result = {
    startingItems: startingItems,
    operations: operations,
    tests: tests,
    throwTo: throwTo,
  };
  console.log(result);

  return result;
};

const mainFunction = (rawInput: string) => {
  const input = parseInput(rawInput);

  for(let monkey = 0; monkey < input.startingItems.length; monkey++){
	const currentMonkey = input.startingItems[monkey];
	for(let item = 0; item < currentMonkey.length; item++){
		let old = currentMonkey[item];
		console.log(input.operations[monkey])
		//let new = eval(input.operations[monkey]);
	}
  }
  return;
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
  onlyTests: true,
});
