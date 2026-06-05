import sys
import os

# Add root directory to path to allow importing api.py
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from api import app
