from core.models import db
from core.models.image import Image
from core.errors import (
  NotImplementedException, 
  ValidationException,
)
from flask import current_app as app
import time
import hashlib
import random
import os

ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/bmp',
  'image/png',
  'image/tiff'
]
# For simplicity, we only stores raw images on local server's data/ folder
# although we recommended you to use some third-pary provider (e.g. S3) to host
# images.
def upload_image(user_id, file):
  # get config
  use_local_provider = app.config['USE_LOCAL_IMAGE_PROVIDER']
  data_dir = app.config['LOCAL_IMAGE_DATADIR']
  image_url_prefix = app.config['IMAGE_URL_PREFIX']

  # simple image validation by checking its mime type
  # here we choose to trust the program
  mime_type = file.content_type
  if mime_type not in ALLOWED_IMAGE_TYPES:
    raise ValidationException('upload file invalid type: %s' % mime_type)    
  
  if not use_local_provider:
    # TODO: implement for 3rd-party providers like S3
    raise NotImplementedException('image service')

  new_filename = store_file(file, data_dir)
  image_url = image_url_prefix + new_filename
  img = store_image_db(user_id, image_url)
  return {
    'id': img.id,
    'url': image_url
  }

# private functions
def store_file(file, data_dir):
  orig_filename, ext = os.path.splitext(file.filename)
  new_filename = '%s%s' % (generate_random_hash(orig_filename), ext)
  store_path = os.path.join(data_dir, new_filename)
  file.save(store_path)
  return new_filename

def store_image_db(user_id, image_url):
  new_image = Image(user_id=user_id, thumbnail_url=image_url, detail_url=image_url)
  db.session.add(new_image)
  db.session.commit()

  return new_image

def generate_random_hash(filename):  
  millis = int(round(time.time() * 1000))
  raw_str = '%s:%d:%d' % (filename, millis, random.randint(1, 1e4))
  return hashlib.md5(raw_str.encode()).hexdigest()