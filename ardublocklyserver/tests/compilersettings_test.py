from __future__ import unicode_literals, absolute_import
import os
import unittest
import mock
try:
    from ArdublocklyServer.ServerCompilerSettings import ServerCompilerSettings
except ImportError:
    import sys
    file_dir = os.path.dirname(os.path.realpath(__file__))
    package_dir = os.path.dirname(os.path.dirname(file_dir))
    sys.path.insert(0, package_dir)
    from ArdublocklyServer.ServerCompilerSettings import ServerCompilerSettings


class ServerCompilerSettingsTestCase(unittest.TestCase):
    """
    Tests for ServerCompilerSettings
    """
    
    #
    # Testing the class singlentoness
    #
    def test_singleton(self):
        # Testing if singleton is working
        instance_1 = ServerCompilerSettings()
        instance_2 = ServerCompilerSettings()
        self.assertEqual(id(instance_1), id(instance_2))

    def test_destructor(self):
        ServerCompilerSettings()
        instance_1 = ServerCompilerSettings()
        instance_1._drop()
        self.assertIsNone(
            instance_1._ServerCompilerSettings__singleton_instance)

    #
    # Testing the compiler_dir getter and setter
    #
    def test_read_compiler_dir(self):
        self.assertEqual(ServerCompilerSettings().compiler_dir, ServerCompilerSettings().__compiler_dir__)

    @mock.patch('ArdublocklyServer.ServerCompilerSettings.os.path.exists')
    def test_write_compiler_dir_invalid(self, mock_os_path_exists):
        """
        Tests path doesn't get save if:
             A file that does not exists
             Just a folder
             A non executable file
        """
        # TODO: a file that 'exists but does not execute' is not done
        # Random file
        mock_os_path_exists.return_value = False
        original_dir = ServerCompilerSettings().compiler_dir
        new_dir = os.path.join(os.getcwd(), 'random.exe')
        ServerCompilerSettings().compiler_dir = new_dir
        self.assertNotEqual(new_dir, ServerCompilerSettings().compiler_dir)
        self.assertEqual(original_dir, ServerCompilerSettings().compiler_dir)

        # Just a folder
        mock_os_path_exists.return_value = True
        new_dir = os.getcwd()
        ServerCompilerSettings().compiler_dir = new_dir
        self.assertNotEqual(new_dir, ServerCompilerSettings().compiler_dir)
        self.assertEqual(original_dir, ServerCompilerSettings().compiler_dir)

        # Non .exe file
        mock_os_path_exists.return_value = True
        new_dir = os.path.join(os.getcwd(), 'arduino.txt')
        ServerCompilerSettings().compiler_dir = new_dir
        self.assertNotEqual(new_dir, ServerCompilerSettings().compiler_dir)
        self.assertEqual(original_dir, ServerCompilerSettings().compiler_dir)

    @mock.patch('ArdublocklyServer.ServerCompilerSettings.os.path.exists')
    def test_write_compiler_dir_valid(self, mock_os_path_exists):
        mock_os_path_exists.return_value = True
        new_dir = os.path.join(os.getcwd(), 'arduino.exe')
        ServerCompilerSettings().compiler_dir = new_dir
        self.assertEqual(new_dir, ServerCompilerSettings().compiler_dir)

    #
    # Testing the settings file
    #
    def test_settings_file_creation(self):
        """ Need to find a way to test this one """
        ServerCompilerSettings().save_settings()
        self.assertEqual(0,0)

    def test_settings_file_read(self):
        ServerCompilerSettings()
        ServerCompilerSettings().set_default_settings()
        ServerCompilerSettings().read_settings_file()
        ServerCompilerSettings().save_settings()


if __name__ == '__main__':
    unittest.main()
