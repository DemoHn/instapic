from . import api, swag_from
from flask import jsonify, request
from core.services.image_service import upload_image
from core.errors import ValidationException

@api.route('/images', methods=['POST'])
@swag_from('specs/upload_image.yml', validation=False)
def upload_image_ctrl():
  # since the default validation does not work properly (no idea)
  # I have to manually write a validator
  if 'image' not in request.files:
    raise ValidationException('`image` field is empty!')

  user_id = 1 # TODO: use auth
  file = request.files['image']
  image_url = upload_image(user_id, file)

  return jsonify(url=image_url)  