import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('');

const part1 = (rawInput: string) => {
	return part1function(rawInput, 4);
}
const part1function = (rawInput: string, num: number) => {
  const input : string[] = parseInput(rawInput);
  const cacheOrder : string[] = input.slice(0,num);
  const cache = new Set<string>(cacheOrder);
  //cacheOrder
  //cache

  for(let i = num; i < input.length; i ++){
	if(cache.size === num) return i;
	const toDeleteNext : string = cacheOrder[0]; 
	let isInCache : boolean = true;

	//check if toDeleteNext is in cache
	for(let i = 1; i < num; i++){
		isInCache = isInCache && cacheOrder[i] !== toDeleteNext;
	}

	//if(cacheOrder[1] !== toDeleteNext && cacheOrder[2] !== toDeleteNext && cacheOrder[3] !== toDeleteNext){
	if(isInCache){
		cache.delete(cacheOrder.shift() ?? '');
	}
	else cacheOrder.shift();

	cacheOrder.push(input[i]);
	cache.add(input[i]);
  }

  return -1;
};

const part2 = (rawInput: string) => {
  const input : string[] = parseInput(rawInput);
  return part1function(rawInput,14);
};

run({
  part1: {
    tests: [
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 5,
      },
      {
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 6,
      },
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 10,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 19,
      },
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 23,
      },
      {
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 23,
      },
      {
        input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw:`,
        expected: 26,
      },
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 29,
      },

    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
