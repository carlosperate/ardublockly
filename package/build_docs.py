#!/usr/bin/env python2
# -*- coding: utf-8 -*- #
#
# Builds the GitHub Wiki documentation into static HTML. 
#
# Copyright (c) 2015 carlosperate https://github.com/carlosperate/
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# This script does the following to build the documentation:
#    Pulls the latest changes from the GitHub Wiki repository
#    Edits the MkDocs configuration file to include all the markdown files
#    Creates an index.html file to have root redirected to a specific page
#    Builds the static site using MkDocs
#
from __future__ import unicode_literals, absolute_import
import os
import sys
import fileinput
import subprocess
from shutil import move
from tempfile import mkstemp

# mkdocs used only in the command line, imported just to ensure it's installed
try:
    import mkdocs
except ImportError:
    print("You need to have mkdocs installed!")
    sys.exit(1)


# Path data
GITHUB_USER = "carlosperate"
WIKI_NAME = "ardublockly.wiki"
GITHUB_WIKI_REPO_SHORT = "github.com/%s/%s.git" % (GITHUB_USER, WIKI_NAME)
GITHUB_WIKI_REPO = "https://www." + GITHUB_WIKI_REPO_SHORT

MKDOCS_FOLDER = "ardublocklydocs"
THIS_FILE_DIR = os.path.dirname(os.path.realpath(__file__))
MKDOCS_DIR = os.path.join(THIS_FILE_DIR, MKDOCS_FOLDER)

DEFAULT_INDEX = 'Home'


def pull_wiki_repo():
    """ Pulls latest changes from wiki repo. """
    # Set working directory to the wiki repository
    wiki_folder = os.path.join(MKDOCS_DIR, WIKI_NAME)
    os.chdir(wiki_folder)

    # Ensure the subfolder selected in the correct repo
    PIPE = subprocess.PIPE
    git_process = subprocess.Popen(["git", "config", "--get", "remote.origin.url"],
                                    stdout=PIPE, stderr=PIPE)
    std_op, std_err_op = git_process.communicate()
    if not GITHUB_WIKI_REPO_SHORT in std_op:
        print("Wiki repository:\n\t%s\nnot found in url:\n\t%s" %
              (GITHUB_WIKI_REPO_SHORT, std_op))
    else:
        subprocess.call(["git", "submodule", "update"])
        subprocess.call(["git", "pull", "origin", "master"])


def edit_mkdocs_config():
    """
    Edits the mkdocs.yml MkDocs configuration file to include all markdown
    files as part of the documentation.
    These files are created by default with the '.md' extension and it is 
    assumed no other file extensions are to be linked.
    """
    path_list = []
    for file in os.listdir(os.path.join(MKDOCS_DIR, WIKI_NAME)):
        if file.endswith(".md"):
            path_list.append("- ['%s', '%s']" % (file, file[:-3].replace("-", " ")))
    pages_str = "pages:\n" + "\n".join(path_list) + "\n"
    print pages_str

    # Replace the pages data, strategically located at the end of the file
    mkdocs_yml = os.path.join(MKDOCS_DIR, "mkdocs.yml")
    temp_file_handler, temp_abs_path = mkstemp()
    with open(temp_abs_path, 'w') as temp_file:
        with open(mkdocs_yml) as original_file:
            for line in original_file:
                if not "pages:" in line:
                    temp_file.write(line)
                else:
                    break
            temp_file.write(pages_str)

    # Remove original file and move the new temp to replace it
    os.close(temp_file_handler)
    os.remove(mkdocs_yml)
    move(temp_abs_path, mkdocs_yml)


def create_index():
    """ Creates an HTML index page to redirect to an MkDocs generated page. """
    html_code = \
        "<!DOCTYPE HTML>\n" +\
        "<html>\n" +\
        "\t<head>\n" +\
        "\t\t<meta charset=\"UTF-8\">\n" +\
        "\t\t<meta http-equiv=\"refresh\" content=\"1;url=%s/index.html\">\n"\
            % DEFAULT_INDEX  +\
        "\t\t<script type=\"text/javascript\">\n" +\
        "\t\t\twindow.location.href = \"%s/index.html\"\n" % DEFAULT_INDEX +\
        "\t\t</script>\n" +\
        "\t</head>\n" +\
        "\t<body>\n" +\
        "\t\tIf you are not redirected automatically to the " +\
        "%s page, follow this <a href=\"%s/index.html\">link</a>\n"\
            % (DEFAULT_INDEX, DEFAULT_INDEX) +\
        "\t</body>\n" +\
        "</html>\n"

    generated_site_dir = os.path.join(MKDOCS_DIR, "site", "index.html")
    index_file = open(generated_site_dir, "w")
    index_file.write(html_code)
    index_file.close()


def build_mkdocs():
    """ Invokes MkDocs to build the static documentation. """
    os.chdir(MKDOCS_DIR)
    subprocess.call(["mkdocs", "build"])


def build_docs():
    """ Builds the documentation HTML pages from the wiki repository. """
    pull_wiki_repo()
    edit_mkdocs_config()
    # Create index.html before the MkDocs site is created in case the project
    # already contains an index file.
    create_index()
    build_mkdocs()


if __name__ == "__main__":
    build_docs()
