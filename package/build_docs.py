#!/usr/bin/env python2
# -*- coding: utf-8 -*- #
#
# Builds the GitHub Wiki documentation into a static HTML site.
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
#    REMOVES the root Documentation folder
#    Copies the generate content into the root Documentation folder
#
from __future__ import unicode_literals, absolute_import
import os
import sys
import shutil
import subprocess
from tempfile import mkstemp

# mkdocs used only in the command line, imported just to ensure it's installed
try:
    import mkdocs
except ImportError:
    print("You need to have mkdocs installed !")
    sys.exit(1)


# Path data
GITHUB_USER = "carlosperate"
WIKI_NAME = "ardublockly.wiki"
GITHUB_WIKI_REPO = "github.com/%s/%s.git" % (GITHUB_USER, WIKI_NAME)

MKDOCS_FOLDER = "ardublocklydocs"
THIS_FILE_DIR = os.path.dirname(os.path.realpath(__file__))
MKDOCS_DIR = os.path.join(THIS_FILE_DIR, MKDOCS_FOLDER)

DEFAULT_INDEX = 'Home'


def pull_wiki_repo():
    """
    Pulls latest changes from the wiki repo.
    :return: Boolean indicating if the operation was successful.
    """
    # Set working directory to the wiki repository
    wiki_folder = os.path.join(MKDOCS_DIR, WIKI_NAME)
    if os.path.isdir(wiki_folder):
        os.chdir(wiki_folder)
    else:
        print("ERROR: Wiki repo directory is not correct: %s" % wiki_folder)
        return False

    # Ensure the submodule is initialised, progress is printed to stderr so just
    # call subprocess with all data sent to console and error check later
    subprocess.call(["git", "submodule", "update", "--init", "--recursive"])

    # Ensure the subfolder selected is the correct repository
    pipe = subprocess.PIPE
    git_process = subprocess.Popen(
        ["git", "config", "--get", "remote.origin.url"],
        stdout=pipe, stderr=pipe)
    std_op, std_err_op = git_process.communicate()

    if std_err_op:
        print("ERROR: Could not get the remote information from the wiki "
              "repository !\n%s" + std_err_op)
        return False

    if not GITHUB_WIKI_REPO in std_op:
        print(("ERROR: Wiki repository:\n\t%s\n" % GITHUB_WIKI_REPO) +
              "not found in directory %s url:\n\t%s\n" % (wiki_folder, std_op))
        return False

    # Git Fetch prints progress in stderr, so cannot check for erros that way
    print("\nPull from Wiki repository...")
    subprocess.call(["git", "pull", "origin", "master"])
    print("")

    return True


def edit_mkdocs_config():
    """
    Edits the mkdocs.yml MkDocs configuration file to include all markdown
    files as part of the documentation.
    These files are created by default with the '.md' extension and it is 
    assumed no other file extensions are to be linked.
    :return: Boolean indicating the success of the operation.
    """
    path_list = []
    for file in os.listdir(os.path.join(MKDOCS_DIR, WIKI_NAME)):
        if file.endswith(".md"):
            path_list.append("- ['%s', '%s']" %
                             (file, file[:-3].replace("-", " ")))
    if not path_list:
        print(("ERROR: No markdown files found in %s ! " % MKDOCS_DIR) +
              "Check if repository has been set up correctly.")
        return False

    pages_str = "pages:\n" + "\n".join(path_list) + "\n"

    # Replace the pages data, strategically located at the end of the file
    mkdocs_yml = os.path.join(MKDOCS_DIR, "mkdocs.yml")
    if not os.path.exists(mkdocs_yml):
        print("ERROR: The MkDocs config file %s does not exist !" % mkdocs_yml)
        return False

    # Copy config file until the pages line, strategically located at the end
    temp_file_handler, temp_abs_path = mkstemp()
    with open(temp_abs_path, 'w') as temp_file:
        with open(mkdocs_yml) as original_file:
            for line in original_file:
                if not "pages:" in line:
                    temp_file.write(line)
                else:
                    print("Replacing 'pages' property found in mkdocs.yml ...")
                    break
            else:
                print("Did not find the 'pages' property in mkdocs.yml.\n" +
                      "Attaching the property at the end of the file.")
            temp_file.write(pages_str)
            print(pages_str)

    # Remove original file and move the new temp to replace it
    os.close(temp_file_handler)
    try:
        os.remove(mkdocs_yml)
    except IOError:
        print("ERROR: Could not delete original config file %s !" % mkdocs_yml)
        return False
    try:
        shutil.move(temp_abs_path, mkdocs_yml)
    except shutil.Error:
        print("ERROR: Could move new config file to %s !" % mkdocs_yml)
        return False

    return True


def create_index():
    """
    Creates an HTML index page to redirect to an MkDocs generated page.
    :return: Boolean indicating the success of the operation.
    """
    html_code = \
        "<!DOCTYPE HTML>\n " \
        "<html>\n" \
        "\t<head>\n" \
        "\t\t<meta charset=\"UTF-8\">\n" \
        "\t\t<meta http-equiv=\"refresh\" content=\"1;url=%s/index.html\">\n" \
        % DEFAULT_INDEX + \
        "\t\t<script type=\"text/javascript\">\n" \
        "\t\t\twindow.location.href = \"%s/index.html\"\n" % DEFAULT_INDEX +\
        "\t\t</script>\n" \
        "\t</head>\n" \
        "\t<body>\n" \
        "\t\tIf you are not redirected automatically to the " \
        "%s page, follow this <a href=\"%s/index.html\">link</a>\n"\
        % (DEFAULT_INDEX, DEFAULT_INDEX) + \
        "\t</body>\n" \
        "</html>\n"

    print("Creating the index.html file...\n")
    generated_site_dir = os.path.join(MKDOCS_DIR, "site")
    if not os.path.exists(generated_site_dir):
        try:
            os.makedirs(generated_site_dir)
        except IOError:
            print("ERROR: Could not create site folder in %s !\n" %
                  generated_site_dir)
            return False
    try:
        index_file = open(os.path.join(generated_site_dir, "index.html"), "w")
        index_file.write(html_code)
        index_file.close()
        return True
    except IOError:
        print("ERROR: Could not create index.html file in %s !\n" %
              generated_site_dir)
        return False


def build_mkdocs():
    """
    Invokes MkDocs to build the static documentation and moves the folder
    into the project root folder.
    :return: Boolean indicating the success of the operation.
    """
    # Setting the working directory
    if os.path.isdir(MKDOCS_DIR):
        os.chdir(MKDOCS_DIR)
    else:
        print("ERROR: MkDocs directory is not correct: %s" % MKDOCS_DIR)
        return False

    # Building the MkDocs project
    pipe = subprocess.PIPE
    mkdocs_process = subprocess.Popen(
        ["mkdocs", "build"], stdout=pipe, stderr=pipe)
    std_op, std_err_op = mkdocs_process.communicate()

    if std_err_op:
        print("ERROR: Could not build MkDocs !\n%s" %
              std_err_op)
        return False
    else:
        print(std_op)

    # Remove root Documentation folder and copy the new site files into it
    generated_site_dir = os.path.join(MKDOCS_DIR, "site")
    root_documentation_dir = os.path.join(
            os.path.dirname(THIS_FILE_DIR), "documentation")
    print("Copy folder %s into %s ...\n" %
          (generated_site_dir, root_documentation_dir))

    if os.path.exists(root_documentation_dir):
        try:
            shutil.rmtree(root_documentation_dir)
        except shutil.Error:
            print("ERROR: Could not remove root documentation folder !")
            return False
    try:
        shutil.move(generated_site_dir, root_documentation_dir)
    except shutil.Error:
        print("ERROR: Could move new documentation files from " +
              "%s to %s !" % (generated_site_dir, root_documentation_dir))
        return False

    return True


def build_docs():
    """ Builds the documentation HTML pages from the Wiki repository. """
    success = pull_wiki_repo()
    if success is False:
        sys.exit(1)

    success = edit_mkdocs_config()
    if success is False:
        sys.exit(1)

    # Create index.html before the MkDocs site is created in case the project
    # already contains an index file.
    success = create_index()
    if success is False:
        sys.exit(1)

    success = build_mkdocs()
    if success is False:
        sys.exit(1)
    print("Build process finished!")


if __name__ == "__main__":
    build_docs()
