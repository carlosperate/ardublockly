#!/usr/bin/env python2
# -*- coding: utf-8 -*- #
#
# Creates a zip file of the self executable Ardublockly application.
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
# IMPORTANT: This script is designed to be located one directory level under the
#            project root folder.
#
# This script file will create a copy of the project folder in its parent folder
# So if project folder is located in ~/projects/ardublockly it will create a
# copy in ~/projects/ardublockly_<timestamp>_<tag>.
# It will then delete unnecessary files for a working version of the self
# executable application and zip the contents of the folder.
#
import os
import sys
import time
import shutil
import struct
import zipfile


script_tag = "[Ardublockly pack] "
script_tab = "                   "

# The project_root_dir depends on this file location, assumed to be two levels
# below project root, so it cannot be moved without updating this variable
project_root_dir = \
    os.path.dirname(                                       # going up 1 level
        os.path.dirname(                                   # going up 1 level
            os.path.dirname(os.path.realpath(__file__))))  # folder dir of this

# This script copies the ardublockly folder with a different name on the same 
# directory level to easily filter what to included in the packed version
copy_dir_name = "ardublockly_packed"
copied_project_dir = os.path.join(os.path.dirname(project_root_dir),
                                  copy_dir_name)


def set_tag(tag):
    """
    Sets the packaged zip file and copied folder tag to the input argument. So,
    the copied folder will be names "ardublockly_<tag>" and the zip file
    "ardublockly_<tag>.zip.
    :tag: String to indicate the tag to use.
    """
    print(script_tag + "Setting the Ardublockly package tag to '%s'" % tag)
    global copy_dir_name
    global copied_project_dir
    copy_dir_name = "ardublockly_%s" % tag
    copied_project_dir = os.path.join(os.path.dirname(project_root_dir),
                                      copy_dir_name)


def copy_ardublockly_folder():
    """
    Copies all the contents of the project root directory into a new folder on
    the same level.
    The copy operation ignores a list of directories.
    :return: Boolean indicating the success state of the operation.
    """
    ignore_pat = (".git*", ".svn", ".travis*", ".appveyor*", "circle.yml",
                  ".ruby-version", "TestTemp_*", "package")
    if not os.path.exists(copied_project_dir):
        print(script_tab + "Copying contents of %s\n" % project_root_dir +
              script_tab + "into                %s" % copied_project_dir)
        shutil.copytree(project_root_dir,
                        copied_project_dir,
                        symlinks=False,
                        ignore=shutil.ignore_patterns(*ignore_pat))
    else:
        print(script_tab + "ERROR: %s directory already exists!" %
              copied_project_dir)
        return False
    return True


def remove_directory(dir_to_remove):
    """ Removes the a given directory. """
    if os.path.exists(dir_to_remove):
        print(script_tab + "Removing directory %s" % dir_to_remove)
        shutil.rmtree(dir_to_remove)
    else:
        print(script_tab + "Directory %s was not found." % dir_to_remove)


def zip_ardublockly_copy(name_append):
    """
    Zips the contents of the copied project folder into a subdirectory of
    the original project folder.
    """
    zip_file_dir = os.path.join(project_root_dir, "upload")
    zip_file_location = os.path.join(
        zip_file_dir, "ardublockly_%s.zip" % name_append)

    # First ensure the upload folder exists
    if not os.path.exists(zip_file_dir):
        os.makedirs(zip_file_dir)

    os.chdir(os.path.dirname(project_root_dir))
    print(script_tab + "Working directory changed to %s" % os.getcwd())
    print(script_tab + "Zipping the contents of %s\n" % copied_project_dir +
          script_tab + "into                    %s\n" % zip_file_location)

    zip_file = zipfile.ZipFile(zip_file_location, "w", zipfile.ZIP_DEFLATED)
    for dir_name, sub_dirs, files in os.walk(copy_dir_name):
        zip_file.write(dir_name)
        for filename in files:
            zip_file.write(os.path.join(dir_name, filename))
    zip_file.close()


def pack_ardublockly(tag):
    # Set the copied folder name to the stamp
    set_tag(tag)

    print(script_tag + "Copying the project root folder:")
    success = copy_ardublockly_folder()
    if not success:
        raise SystemExit(script_tab + "Exiting due to project root copy error.")

    print(script_tag + "Removing unnecessary Blockly files:")
    remove_directory(os.path.join(copied_project_dir, "blockly", "demos"))
    remove_directory(os.path.join(copied_project_dir, "blockly", "appengine"))
    remove_directory(os.path.join(copied_project_dir, "blockly", "tests"))

    print(script_tag + "Removing an already zipped Ardublockly version:")
    remove_directory(os.path.join(copied_project_dir, "upload"))

    print(script_tag + "Removing CEF temporary files:")
    remove_directory(os.path.join(copied_project_dir, "webcache"))

    print(script_tag + "Creating zip file of the new Ardublockly folder:")
    zip_ardublockly_copy(tag)


def tag_from_ci_env_vars(ci_name, pull_request_var, branch_var, commit_var):
    """
    Checks if the CI environmental variables to check for a pull request,
    commit id and band commit branch are present.
    :return: String with the CI build information, or None if the CI
             environmental variables could not be found.
    """
    pull_request = os.environ.get(pull_request_var)
    branch = os.environ.get(branch_var)
    commit = os.environ.get(commit_var)

    if pull_request and pull_request != "false":
        try:
            int(pull_request)
            print(script_tab + "Pull request valid '%s' variable found: %s" %
                  (ci_name, pull_request))
            return "pull_%s" % pull_request
        except ValueError:
            print(script_tab + "The pull request environmental variable " +
                  "'%s' value '%s' from %s is not a valid number." %
                  (pull_request_var, pull_request, ci_name))

    if branch and commit:
        print(script_tab + "Branch and commit valid '%s' variables found: %s %s"
              % (ci_name, branch, commit))
        # We only return first 10 digits from the commit ID (normal length 40)
        commit = "%s" % commit
        return "%s_%s" % (branch, commit[:10])

    print(script_tab + "The environmental variables for %s " % ci_name +
          "were deemed invalid:\n" +
          script_tab + "\t%s: %s\n" % (pull_request_var, pull_request) +
          script_tab + "\t%s: %s\n" % (branch_var, branch) +
          script_tab + "\t%s: %s" % (commit_var, commit))
    return None


def get_tag():
    """
    The tag will always contain the timestamp and architecture version.
    If provided as a command line argument it will add an additional string,
    if not it will check for environmental variables set in build servers to
    create an identification tag.
    :return: String with the final tag.
    """
    # All tags begging with architecture type (based on the Python version) and
    # the current time stamp
    arch_time_stamp = "%sbit_%s" % ((struct.calcsize('P') * 8),
                                    time.strftime("%Y-%m-%d_%H.%M.%S"))

    # Check if a command line argument has been given
    if len(sys.argv) > 1:
        # Take the first argument and use it as a tag appendage
        print(script_tab + "Command line argument '%s' found and will be used "
                           "for package tag." % sys.argv[1])
        return "%s_%s" % (arch_time_stamp, sys.argv[1])
    else:
        print(script_tab + "No command line argument found")

    # Check for Travis-CI environmental variables to create tag appendage
    print(script_tab + "Checking Travis-CI environment variables for tag:")
    travis_tag = tag_from_ci_env_vars(ci_name="Travis-CI",
                                      pull_request_var="TRAVIS_PULL_REQUEST",
                                      branch_var="TRAVIS_BRANCH",
                                      commit_var="TRAVIS_COMMIT")
    if travis_tag:
        return "%s_%s" % (arch_time_stamp, travis_tag)

    # Check for AppVeyor environmental variables to create tag appendage
    print(script_tab + "Checking AppVeyor environment variables for tag:")
    appveyor_tag = tag_from_ci_env_vars(
        ci_name="AppVeyor",
        pull_request_var="APPVEYOR_PULL_REQUEST_NUMBER",
        branch_var="APPVEYOR_REPO_BRANCH",
        commit_var="APPVEYOR_REPO_COMMIT")
    if appveyor_tag:
        return "%s_%s" % (arch_time_stamp, appveyor_tag)

    return arch_time_stamp


def main():
    print(script_tag + "Pack Ardublockly script started.")
    print(script_tag + "Checking for tag to attach to zip file:")
    tag = get_tag()
    pack_ardublockly(tag)


if __name__ == "__main__":
    main()
