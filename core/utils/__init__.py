import importlib
import os
import re

# usage:
# import_all_submodules(__file__, __name__)
def import_all_submodules(file, package):
  # get current folder
  current_folder = os.path.dirname(os.path.realpath(file))
  files = os.listdir(current_folder)
  
  # find all valid submodules
  submodules = []
  for file in files:    
    matchObj = re.match(r'(.+)\.py$', file)
    if matchObj and matchObj.group(1) != '__init__':      
      submodules.append('.' + matchObj.group(1))
  
  # import them!
  for submodule in submodules:
    importlib.import_module(submodule, package)