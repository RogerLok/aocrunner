import run from "aocrunner";

const parseInput = (rawInput: string): string[] => rawInput.split("\n");

const moveTail = (
  headPosition: number[],
  tailPosition: number[],
  myGrid?: string[][],
): number[] => {
  let result = [0, 0];
  //console.log("head:", headPosition, "tail:", tailPosition);

  const xDifference = headPosition[0] - tailPosition[0];
  const yDifference = headPosition[1] - tailPosition[1];

  if (
    (Math.abs(xDifference) === 1 && yDifference === 0) ||
    (Math.abs(yDifference) === 1 && xDifference === 0) ||
    (Math.abs(xDifference) === 1 && Math.abs(yDifference) === 1) ||
    (xDifference === 0 && yDifference === 0)
  )
    return tailPosition;

  //   if (headPosition[0] - tailPosition[0] >= 2 && headPosition[1] - tailPosition[1] >=1) {tailPosition[0] += 1; tailPosition[1] += 1; return tailPosition;}//downright
  //   if (headPosition[1] - tailPosition[1] >= 2 && headPosition[0] - tailPosition[0] >=1) {tailPosition[0] += 1; tailPosition[1] += 1; return tailPosition;}//downright
  //   if (headPosition[0] - tailPosition[0] >= 2 && headPosition[1] - tailPosition[1] <= -1) {tailPosition[0] += 1; tailPosition[1] += -1; return tailPosition;}//downleft
  //   if (headPosition[1] - tailPosition[1] <= -2 && headPosition[0] - tailPosition[0] >= 1) {tailPosition[0] += 1; tailPosition[1] += -1; return tailPosition;}//downleft
  //   if (headPosition[0] - tailPosition[0] <= -2 && headPosition[1] - tailPosition[1] <= -1) {tailPosition[0] += -1; tailPosition[1] += -1; return tailPosition;}//upleft
  //   if (headPosition[1] - tailPosition[1] <= -2 && headPosition[0] - tailPosition[0] <= -1) {tailPosition[0] += -1; tailPosition[1] += -1; return tailPosition;}//upleft
  //   if (headPosition[0] - tailPosition[0] <= -2 && headPosition[1] - tailPosition[1] >=1) {tailPosition[0] += -1; tailPosition[1] += 1; return tailPosition;}//upright
  //   if (headPosition[1] - tailPosition[1] >= 2 && headPosition[0] - tailPosition[0] <= -1) {tailPosition[0] += -1; tailPosition[1] += 1;return tailPosition;}//upright
  
  if(Math.abs(xDifference) === 2 && Math.abs(yDifference) === 2) { 
	tailPosition[0] += xDifference/2;
	tailPosition[1] += yDifference/2;
	return tailPosition;
  }

  if (Math.abs(xDifference) == 2) {
    tailPosition[0] += xDifference/2;
    tailPosition[1] += yDifference;
  }
  if (Math.abs(yDifference) == 2) {
    tailPosition[1] += yDifference/2;
    tailPosition[0] += xDifference;
  }

  result = tailPosition;
  return result;
};

//testing moveTail
// console.log(moveTail([2,2],[0,0]), 'expecting [1,1]')
// console.log(moveTail([1, 1], [0, 0]), "expecting [0,0]");
// console.log(moveTail([1, 0], [0, 0]), "expecting [0,0]");
// console.log(moveTail([0, 1], [0, 0]), "expecting [0,0]");
// console.log(moveTail([0, 2], [0, 1]), "expecting [0,1]");
// console.log(moveTail([2, 0], [0, 0]), "expecting [1,0]");
// console.log(moveTail([1, 2], [0, 0]), "expecting [1,1]");
// console.log(moveTail([2, 1], [0, 0]), "expecting [1,1]");

const mainFunction = (rawInput: string, num: number) => {
  const input = parseInput(rawInput);
  const rope: number[][] = [...Array(num)].map((e) => Array(2).fill(0));
  //console.log(rope)
  const headPosition = rope[0];
  let headDirection = [0, 0];
  const tailVisits = new Set<string>();
  //console.log(rope)
  for (let i = 0; i < input.length; i++) {
    if (input[i][0] === "L") headDirection = [0, -1];
    if (input[i][0] === "R") headDirection = [0, 1];
    if (input[i][0] === "U") headDirection = [-1, 0];
    if (input[i][0] === "D") headDirection = [1, 0];

    const amount = Number(input[i].split(" ")[1]);
    // console.log(amount);
    for (let j = 0; j < amount; j++) {
      headPosition[0] += headDirection[0];
      headPosition[1] += headDirection[1];
      for (let k = 1; k < rope.length; k++) {
        const value = "."; // by default
        const size = 30;
        let myGrid = [...Array(size)].map((e) => Array(size).fill(value));
        myGrid[size / 2][size / 2] = "s";
        let newTail = moveTail(rope[k - 1], rope[k], headDirection, myGrid);
        // for (let l = 0; l < rope.length; l++) {
        //   myGrid[rope[l][0] + size / 2][rope[l][1] + size / 2] = l.toString();
        // }

        // console.log(headPosition, newTail);
        // console.table(myGrid);
      }
      tailVisits.add(JSON.stringify(rope[rope.length - 1]));
    }
  }
  console.log(tailVisits);

  let value = ".";
  let size = 20;
  let myGrid = [...Array(size)].map((e) => Array(size).fill(value));
  myGrid[size / 2][size / 2] = "s";
//   for (let key of tailVisits) {
//     const parsedKey = JSON.parse(key);
//     //console.log(parsedKey);
//     myGrid[parsedKey[0] + size / 2][parsedKey[1] + size / 2] = "O";
//   }
  console.table(myGrid);
  return tailVisits.size;
};

const part1 = (rawInput: string) => {
  return mainFunction(rawInput, 2);
};

const part2 = (rawInput: string) => {
  return mainFunction(rawInput, 10);
};

run({
  part1: {
    tests: [
// 	{
// 		input: `R 4
// U 4
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2`,
// 		expected: 13,
// 	},
    ],
    solution: part1,
  },
  part2: {
    tests: [
		{
		input: `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`,
		expected: 36,
		},
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
