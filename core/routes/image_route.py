from . import api, swag_from
import os
from flask import jsonify, request, send_file
from core.services.image_service import (
  upload_image,
  get_image_path
)

from core.errors import ValidationException
from flask import current_app as app

@api.route('/images', methods=['POST'])
@swag_from('specs/upload_image.yml', validation=False)
def upload_image_ctrl():
  # since the default validation does not work properly (no idea)
  # I have to manually write a validator
  if 'image' not in request.files:
    raise ValidationException('`image` field is empty!')

  user_id = 1 # TODO: use auth
  f = request.files['image']
  img_data = upload_image(user_id, f)

  return jsonify(url=img_data['url'], id=img_data['id'])

@app.route('/images/<image_name>', methods=['GET'])
def get_image(image_name):
  img = os.path.join(os.getcwd(), get_image_path(image_name))
  return send_file(img)