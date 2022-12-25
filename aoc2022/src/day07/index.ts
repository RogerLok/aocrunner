import run from "aocrunner";

const parseInput = (rawInput: string) : string[] => rawInput.split('\n');

type NestedArray = NestedArray[];

const mainFunction = (rawInput: string) => {
	const input : string[] = parseInput(rawInput);
	const result : number[] = [];




	for(let i = 0; i< input.length; i++){
		if(input[i][0] === 'ls'){
			
			result.push()
		}
	}



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
      {
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 95437,
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
  onlyTests: true,
});
