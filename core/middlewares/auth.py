from functools import wraps
from flask import request, g
from core.models import db
from core.models.user_session import UserSession
from core.errors import AuthException
import re

def auth(f):
  @wraps(f)
  def decorated_auth_func(*args, **kwargs):
    auth_header = request.headers.get('authorization')
    if auth_header == None:
      raise AuthException('Authorization header does not exist')
    res = re.findall(r'Bearer (\w+)$', auth_header)
    if len(res) == 0:
      raise AuthException('malformed auth header: maybe missing "Bearer"')
    
    token = res[0]
    tk = db.session.query(UserSession).filter_by(token=token).first()
    if tk == None:
      raise AuthException('token not found')
    else:
      g.user_id = tk.user_id
    return f(*args, **kwargs)    
  return decorated_auth_func