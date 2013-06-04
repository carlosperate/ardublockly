/**
 * @fileoverview Convert a lang.html file into lang.xlf.
 * @author ellen.spertus@gmail.com (Ellen Spertus)
 *
 * To use, temporarily rename convert.js -> maze.js.
 * - Load each <LANG>.html in Chrome.
 * - Cut-and-paste the generated text into <LANG>.json
 * Note; This must be run in Chrome, not Firefox, because FF inserts newlines
 * into document.write.
 *
 * To update the <LANG>.html files, replace "template.js" with "<LANG>.js".
 */

var Convert = {};

Convert.json = {
  "Maze.moveForward": "move forward",
  "Maze.turnLeft": "turn left",
  "Maze.turnRight": "turn right",
  "Maze.doCode": "do",
  "Maze.elseCode": "else",
  "Maze.pathAhead": "if path ahead",
  "Maze.pathLeft": "if path to the left",
  "Maze.pathRight": "if path to the right",
  "Maze.repeatUntil": "repeat until ",
  "Maze.moveForwardTooltip": "Moves Pegman forward one space.",
  "Maze.turnTooltip": "Turns Pegman left or right by 90 degrees.",
  "Maze.ifTooltip": "If there is a path in the specified direction, then do some actions.",
  "Maze.ifelseTooltip": "If there is a path in the specified direction, then do the first block of actions. Otherwise, do the second block of actions.",
  "Maze.whileTooltip": "Repeat the enclosed actions until finish point is reached.",
  "Maze.codeTooltip": "See generated JavaScript code.",
  "Maze.linkTooltip": "Save and link to blocks.",
  "Maze.randomizeMarkerTooltip": "Randomize start and finish markers.",
  "Maze.instructions1": "A program is a sequence of blocks.  Stack a couple of 'move forward' blocks together to help me reach the goal.",
  "Maze.instructions2": "What is the sequence of steps to follow this path?",
  "Maze.instructions3": "Computers have limited memory.  Reach the end of this path using only two blocks.  Use 'repeat' to run a block more than once.",
  "Maze.instructions4": "Reach the goal using only five blocks.",
  "Maze.instructions5": "Pegman will have to turn left when he cannot go straight.",
  "Maze.instructions6": "An 'if' block will do something only if the condition is true.  Try turning left if there is a path to the left.",
  "Maze.instructions7": "This maze looks more complicated than the previous one, but it is not.",
  "Maze.instructions8": "You can use more than one 'if' block.",
  "Maze.instructions9": "If-else blocks will do one thing or the other.",
  "Maze.instructions10": "Can you solve this complicated maze?  Try following the left-hand wall.  Advanced programmers only!",
  "Maze.level": "Level",
  "Maze.capacity0": "You have <x id='START_SPAN'/>0<x id='END_SPAN'/> blocks left.",
  "Maze.capacity1": "You have <x id='START_SPAN'/>1<x id='END_SPAN'/> block left.",
  "Maze.capacity2": "You have <x id='START_SPAN'/>%1<x id='END_SPAN'/> blocks left.",
  "Maze.runProgram": "Run Program",
  "Maze.resetProgram": "Reset",
  "Maze.nextLevel": "Congratulations! Are you ready to proceed to level %1?",
  "Maze.finalLevel": "Congratulations! You have solved the final level.",
  "Maze.title": "Maze",
  "Maze.fullTitle": "Blockly Maze",
  "Maze.oneTopBlock": "On this level, you need to stack together all of the blocks in the white workspace."
};

Convert.output = [];

Convert.output_pair = function(short_key, value) {
  key = 'Maze.' + short_key;
  // Replace newlines with spaces.
  value = value.replace(/\n/g, ' ');
  if (!Convert.json[key]) {
     window.alert('Not found: ' + key);
  } else {
    Convert.output.push('\t"' + key + '" : "' + value + '"');
    // Mark the value as null to remember that this key has been matched.
    Convert.json[short_key] = null;
  }
};

Convert.init = function() {
  // Generate output pairs.
  for (var msg in MSG) {
    // To generalize beyond Maze, change to check for array.
    if (msg == 'hints') {
      for (var i = 1; i < MSG[msg].length; i++) {
        Convert.output_pair('instructions' + i, MSG[msg][i]);
      }
    } else {
      Convert.output_pair(msg, MSG[msg]);
    }
  }

  // Write output.
  document.write('{<br>');
  document.write(Convert.output.join(",<br>"));
  document.write('<br>}<br>');

  // Verify that all definitions were provided.
  for (var key in Convert.json) {
    if (Convert.json[key] != null) {
      window.alert('No definition provided for: ' + key);
    }
  }
};

window.addEventListener('load', Convert.init);
