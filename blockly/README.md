# Blockly fork

This is a fork of Google's Blockly visual programming editor:
https://github.com/google/blockly

It adds the following features:

* Arduino code generation
* Static Typing
* Code warnings

This fork frequently pulls updates from upstream to maintain it up to date.

## Git configuration

This fork is configured as a Git Subtree, this is done to be able to pull all the newest features from upstream and still work on the Ardublockly additions.


### Pulling from upstream
Adding the blockly repository as a remote and fetching latest:
```
git remote add -f blockly https://github.com/google/blockly.git
```

Pulling from blockly master, from the project root directory:
```
git fetch blockly master
git subtree pull --prefix blockly blockly master
```

The pull all the changes into a single commit the flag `---squashed` can be added to the `subtree pull` command.

Then resolve any conflicts and push to origin.

## Blockly

Google's Blockly is a web-based, visual programming editor.  Users can drag
blocks together to build programs.  All code is free and open source.

**The project page is https://developers.google.com/blockly/**

![](https://developers.google.com/blockly/sample.png)
