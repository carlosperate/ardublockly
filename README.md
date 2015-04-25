# Ardublockly Github Page

This is the GitHub project page for the Ardublockly project.

The contents of the branch are hosted on the http://carlosperate.github.io/ardublockly address, and allow to demostrante an online partial demo of Ardublockly.

The index page is created from pelican project (a static site generator), designed to be hosted in http://www.embeddedlog.com, so it pulls all of its resources from that domain and only the `index.html` page is required here.

This demos is not capable to load software into an Arduino even if the ArdublocklyServer is running locally, it merely allows you to try the visual programming language. The two versions of the demo can be found in the following links:

* http://carlosperate.github.io/ardublockly/ardublockly/index.html
* http://carlosperate.github.io/ardublockly/ardublockly/classic/index.html


## To update Ardublockly

For the project maintainers, the way to synchronise this branch is to simply merge the latest `master` into gh-pages, preferably squashing all the commits.

So from master:

```
git checkout gh-pages
git merge --squash master
git commit
```
