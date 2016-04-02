# Blockly fork

This is a fork of Google's Blockly visual programming editor: https://github.com/google/blockly

It adds the following features:

* Arduino code generation
* Arduino specific blocks
* Multiple Arduino boards support
* Static typing
* Code warnings
* Arduino pin tracking
* Arduino generator unit test (incomplete)
* Procedures core class modified to include the Arduino setup() and loop() functions
* Temporarily removed procedure's mutator responsible to add arguments
* Blocks HSV hue colour value slightly higher for more vibrant colours
* Minor visual changes to the zoom icons positioning
* Build file updated to include all these changes

The following features are planned to be pushed upstream (list will be updated as PR get accepted):

* Replaces window.prompt uses to a local version that can easily be replaced by an asynchronous HTML version

All other changes and fixes have been submitted to the original Blockly repository for inclusion into the upstream master branch.

This fork gets frequent upstream pulls to maintain it up to date.


## Git configuration

This fork is configured as a Git Subtree, this is done to be able to pull all the newest features from upstream and still work on the Ardublockly additions.


### Pulling from upstream

Adding the Blockly repository as a remote and fetching latest:

```
git remote add -f blockly https://github.com/google/blockly.git
```

Pulling from Blockly master, from the project root directory:

```
git fetch blockly master
git subtree pull --prefix blockly blockly master
```

To pull all the changes into a single commit the flag `---squashed` can be added to the `subtree pull` command.

Then resolve any conflicts and push to origin.


## Blockly

Google's Blockly is a web-based, visual programming editor.  Users can drag
blocks together to build programs.  All code is free and open source.

**The project page is https://developers.google.com/blockly/**

![](https://developers.google.com/blockly/sample.png)
