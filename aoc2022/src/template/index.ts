import run from "aocrunner";

const parseInput = (rawInput: string) : string[] => rawInput.split('\n');


const mainFunction = (rawInput: string) => {
	const input = parseInput(rawInput);
	return
}

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
  onlyTests: false,
});
