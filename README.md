# Mars Rover

A squad of robotic rovers are to be landed by NASA on a plateau on Mars.

This plateau, which is curiously rectangular, must be navigated by the rovers so that their on-board cameras can get a complete view of the surrounding terrain to send back to Earth.

A rover’s position and location is represented by a combination of x and y co-ordinates and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom left corner and facing North.

In order to control a rover , NASA sends a simple string of letters. The possible letters are ‘L’, ‘R’ and ‘M’. ‘L’ and ‘R’ makes the rover spin 90 degrees left or right respectively, without moving from its current spot. ‘M’ means move forward one grid point, and maintain the same heading.

## How does it work?

The system will ask the user for important input: the first line will be the upper-right coordinates of the plateau, and subsequent lines will contain information about the rovers. Each rover will have two lines of input: the first indicating its initial position, and the second containing instructions for exploring the plateau. For example:

```
5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMRRMMRMRRM
```

The output for each rover will be its final position:

```
Final position found for Rover[1] => 1 3 N
Final position found for Rover[2] => 2 3 S
```

## Helper

If you don't have the instructions in the correct format, you can use the tool [Convert Line Breaks](https://www.gillmeister-software.com/online-tools/text/remove-line-breaks.aspx) to fix it:

1. In the **Text to edit** box, type or paste the instructions you want to convert. For example:

```
5 5
1 2 N
LMLMLMLMM
3 3 E
MRRMMRMRRM
```

2. In the **Custom text** box under **Replace line breaks with**, type **\n**
3. Check only the **Trim lines** option.
4. Click **Remove/Replace line breaks** to convert the instructions into the formatted string.

## Installation

Make sure you have Node.js 20.x and npm installed on your system.

```
npm install
```

## Build

```
npm run build
```

## Usage

```
npm run start
```

## Test

```
npm run test
```
