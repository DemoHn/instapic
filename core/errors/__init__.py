# base
class BaseException(Exception):
  def __init__(self, message):
    self.status_code = 500
    self.error_code = 0
    
    super().__init__(message)    

# general
class NotImplementedException(BaseException):
  def __init__(self, message):
    self.status_code = 500
    self.error_code = 10000
    super().__init__(message + ' not implemented')

class ValidationException(BaseException):
  def __init__(self, message):
    self.status_code = 400
    self.error_code = 10001
    super().__init__(message)