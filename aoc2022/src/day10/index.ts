import run from "aocrunner";
import { forEachChild } from "typescript";
import { resourceLimits } from "worker_threads";

const parseInput = (rawInput: string): string[][] => {
  const lines = rawInput.split("\n");
  const result: string[][] = [];
  lines.forEach((line) => result.push(line.split(" ")));
  return result;
};

const mainFunction = (rawInput: string) => {
  const input = parseInput(rawInput);
  let result = 0;
  const cycle: number[] = [1];
  for (let i = 0; i < input.length; i++) {
    if (input[i][0] === "noop") cycle.push(cycle[cycle.length - 1]);
    else {
      cycle.push(cycle[cycle.length - 1]);
      cycle.push(cycle[cycle.length - 1] + Number(input[i][1]));
    }
  }
  //console.table(cycle);
  return cycle;
};

const secondaryFunction = (cycle: number[]) => {
	let display = '';
	const sprite = [];
	let position = 0;

	for(let i = 0; i< cycle.length; i++){
	position = i % 40;

	//sprite
	sprite[0] = cycle[i]-1;
	sprite[1] = cycle[i];
	sprite[2] = cycle[i]+1;
	//start

	//during
	if(sprite[0] === position || sprite[1] === position || sprite[2] === position){
		display += '#';
	}
	else display += '.'
	if (position ==39) display += '\n';
	//current

	//end
	}
		console.log(display);
	return
}

const part1 = (rawInput: string) => {
  const cycle = mainFunction(rawInput);
  const resultKey = [20, 60, 100, 140, 180, 220];
  let result = 0;
  for (let key of resultKey) {
    result += cycle[key - 1] * key;
  }
  return result;
};

const part2 = (rawInput: string) => {
  //const input = parseInput(rawInput);
  const cycle = mainFunction(rawInput);
  return secondaryFunction(cycle);
};

let example = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

run({
  part1: {
    tests: [
      {
        input: example,
        expected: 13140,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: example,
        expected: "",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
