import run from "aocrunner";
import array from "lodash/array.js";

type Location = {
  x: number;
  y: number;
} | null;

const parseInput = (rawInput: string): string[][] => {
  const result: string[][] = [];
  rawInput.split("\n").forEach((ele: string) => {
    result.push(ele.split(""));
  });

  return result;
};

const part1 = (rawInput: string) => {
  const input: string[][] = parseInput(rawInput);
  return part1Function(input,"S");
};

const part1Function = (input: string[][], type: string) => {
  //console.log(input);

  type LocationAndDistance = {
    location: Location;
    distance: number;
  } | null;

  const visitedLocations = new Set<string>();
  const possibleLocations: LocationAndDistance[] = [];

  const xStart: number = array.findIndex(
    input,
    function (innerArray: string[]) {
      return innerArray.includes("S");
    },
  );
  const yStart: number = input[xStart].indexOf("S");

  let distance: number = 0;
  let start: Location = { x: xStart ?? 0, y: yStart ?? 0 };

  let currentLocation: Location = start;
  let currentValue: string = input[currentLocation.x][currentLocation.y];

  visitedLocations.add(JSON.stringify(start));
  //console.log(currentValue);

  const validLocation = (
    currentValue: string,
    currentLocation: Location,
    currentDistance: number,
    direction: Location,
  ): null | LocationAndDistance => {
    let newLocation: Location = null;

    //default character code is 1 less than 'a'
    let valueCode: number = 96;
	if(currentValue === "S" && type === 'a') valueCode++;
    if (currentValue !== "S") valueCode = currentValue.charCodeAt(0);

    //if currentLocation is not null
    if (currentLocation && direction) {
      newLocation = {
        x: currentLocation.x + direction.x,
        y: currentLocation.y + direction.y,
      };
    }
    //has it been visted before?
    if (visitedLocations.has(JSON.stringify(newLocation))) return null;

    //is it within the boundaries?
    const yBoundary: number = input[0].length;
    const xBoundary: number = input.length;
    if (newLocation && (newLocation.x < 0 || newLocation.x >= xBoundary))
      return null;
    if (newLocation && (newLocation.y < 0 || newLocation.y >= yBoundary))
      return null;

    //if the value is greater, then not more than 1
    //if they find a E but you're not at z
    if (newLocation) {
      if (valueCode + 1 < input[newLocation.x][newLocation.y].charCodeAt(0))
        return null;
      if (currentValue !== "z" && input[newLocation.x][newLocation.y] === "E")
        return null;
    }

    //console.log(JSON.stringify(newLocation));
    return { location: newLocation, distance: currentDistance + 1 };
  };

  let test: number = 0;

  while (currentValue !== "E" && distance < 1000 && test < 10000) {
    //console.log("location", currentLocation, " distance: ", distance);
    //up
    const up: LocationAndDistance = validLocation(
      currentValue,
      currentLocation,
      distance,
      {
        x: -1,
        y: 0,
      },
    );
    //down
    const down: LocationAndDistance = validLocation(
      currentValue,
      currentLocation,
      distance,
      {
        x: 1,
        y: 0,
      },
    );
    //left
    const left: LocationAndDistance = validLocation(
      currentValue,
      currentLocation,
      distance,
      {
        x: 0,
        y: -1,
      },
    );
    //right
    const right: LocationAndDistance = validLocation(
      currentValue,
      currentLocation,
      distance,
      {
        x: 0,
        y: 1,
      },
    );
    //add to possibleLocations
    if (up) {
      possibleLocations.push(up);
      visitedLocations.add(JSON.stringify(up.location));
    }
    if (down) {
      possibleLocations.push(down);
      visitedLocations.add(JSON.stringify(down.location));
    }
    if (left) {
      possibleLocations.push(left);
      visitedLocations.add(JSON.stringify(left.location));
    }
    if (right) {
      possibleLocations.push(right);
      visitedLocations.add(JSON.stringify(right.location));
    }

    // console.log(
    //   "test",
    //   test,
    //   "current location",
    //   currentLocation,
    //   "currentValue",
    //   currentValue,
    //   "set",
    //   possibleLocations,
    // );
    // console.log("visited", visitedLocations);

    //add currentLocation to visited
    visitedLocations.add(JSON.stringify(currentLocation));
    //check next location
    if (possibleLocations.length === 0) return -1;
    else {
      currentLocation = possibleLocations[0]!.location;
      distance = possibleLocations[0]!.distance;
      possibleLocations.shift()!;

      currentLocation
        ? (currentValue = input[currentLocation.x][currentLocation.y])
        : (currentValue = "E");
    }
    test++;
  }

  return distance;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  //take out 'S'
  const xStart: number = array.findIndex(
    input,
    function (innerArray: string[]) {
      return innerArray.includes("S");
    },
  );
  const yStart: number = input[xStart].indexOf("S");
  input[xStart][yStart] = "a";
  console.log(input);


  const result: number[] = [];
  let filteredResult: number[] = [];
  const listOfa: Location[] = [];

  input.forEach((line, lineIndex) =>
    line.forEach((ele, eleIndex) => {
      if (ele === "a") {
		listOfa.push({ x: lineIndex, y: eleIndex })
	};
    }),
  );

  console.log(listOfa)
  for (let i = 0; i < listOfa.length; i++) {
    let newInput = input.map(arr => {return arr.slice();});
    const newInputX: number = listOfa[i]!.x;
    const newInputY: number = listOfa[i]!.y;

    newInput[newInputX][newInputY] = "S",

	
    result.push(part1Function(newInput,'a'));
	filteredResult = result.filter(number=> number > 0)
	filteredResult.sort();
	
	
  }
console.log(filteredResult)
  return filteredResult[0];
};

run({
  part1: {
    tests: [
      {
        input: `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`,
        expected: 31,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`,
        expected: 29,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
