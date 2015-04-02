from __future__ import unicode_literals, absolute_import
import os
import unittest
import ParentDirToSysPath
from BlocklyServerCompiler.SketchCreator import SketchCreator
from BlocklyServerCompiler.ServerCompilerSettings import ServerCompilerSettings


class SketchCreatorTestCase(unittest.TestCase):
    """
    Tests for SketchCreator class
    """
    
    #
    # File creation
    #
    def test_create_directory(self):
        """ Tests to see if an Arduino Sketch is created in a new location """
        test_sketch_name = 'TestTemp_Sketch'
        ServerCompilerSettings().sketch_dir = os.getcwd()
        ServerCompilerSettings().sketch_name = test_sketch_name
        test_path = os.path.join(os.getcwd(), 
                                 test_sketch_name,
                                 test_sketch_name + '.ino')
        # It should be save to create and delete in test folder
        if os.path.exists(test_path):
            os.remove(test_path)
        print('\ntest_createDirectory() message:')
        print("Check location: " + test_path)
        
        instance_1 = SketchCreator()
        created_sketch_path = instance_1.create_sketch()
        self.assertEqual(test_path, created_sketch_path)
    
    #
    # File creation with code
    #
    def test_create_sketch_with_code(self):
        sketch_code_write = 'This is a test'
        instance_1 = SketchCreator()
        sketch_location = instance_1.create_sketch(sketch_code_write)
        print('\ntest_create_sketch_with_code() message:')
        print("Check location: " + sketch_location)
        
        arduino_sketch = open(sketch_location, 'r')
        sketch_code_read = arduino_sketch.read()
        arduino_sketch.close()
        self.assertEqual(sketch_code_write, sketch_code_read)


if __name__ == '__main__':
    unittest.main()
