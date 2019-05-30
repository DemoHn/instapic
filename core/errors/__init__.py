# base
class BaseException(Exception):
  def __init__(self, message):
    self.status_code = 500
    self.error_code = 0
    self.message = message
    super().__init__(message)

  def to_dict(self):
    return {
      'code': self.error_code,
      'message': self.message
    }   

# general
class NotImplementedException(BaseException):
  def __init__(self, message):
    super().__init__(message + ' not implemented')
    self.status_code = 500
    self.error_code = 10000

class ValidationException(BaseException):
  def __init__(self, message, data=[]):
    super().__init__(message)
    self.status_code = 400
    self.error_code = 10001
    self.data = data

  def to_dict(self):
    return {      
      'code': self.error_code,
      'message': self.message,
      'data': self.data
    }

# auth
class AuthException(BaseException):
  def __init__(self, message):
    super().__init__(message)
    self.status_code = 401
    self.error_code = 10200

# sql
class SQLExecutionException(BaseException):
  def __init__(self, tag):
    super().__init__('sql execution error: %s', tag)
    self.status_code = 500
    self.error_code = 20000
