from flask import Blueprint
from core.utils import import_all_submodules
import importlib

apiRouter = Blueprint('api', __name__, url_prefix='/api/v1.0')

def load_routes(app):
  # import module dynamically
  import_all_submodules(__file__, __name__)
  
  app.register_blueprint(apiRouter)