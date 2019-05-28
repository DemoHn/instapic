from core.models import db
from core.models.post import Post
from core.models.post_image import PostImage
from core.models.image import Image
from core.errors import (
  ValidationException,
  SQLExecutionException
)

from flask import current_app as app

def create_post(user_id, image_ids, description):
  # validate if upload image ids are valid and 
  # uploaded by this user
  validate_image_items(image_ids)
  validate_image_ids(user_id, image_ids)
  
  post_id = None
  try:
    # all data is valid, so let's add data!
    # add post
    new_post = Post(user_id=user_id, description=description)
    post_id = new_post.id
    db.session.add(new_post)
    db.session.commit()
    # add data on `post_image` table
    post_image_data = []
    for image_id in image_ids:
      post_image_data.append(PostImage(image_id=image_id, post_id=new_post.id))

    db.session.bulk_save_objects(post_image_data)
    db.session.commit()
  except:
    raise SQLExecutionException('create post')
  
  return get_post_response(post_id)

def get_all_posts(limit, cursor):
  pass

def get_user_posts(user_id, limit, cursor):
  pass

# private functions
# validations
def validate_image_ids(user_id, image_ids):
  valid_image_ids = db.session.query(Image).filter(
    Image.id.in_(image_ids),
    Image.user_id == user_id
  ).all()

  # get valid image ID tuple
  v_tuple = set()
  for v_id in valid_image_ids:
    v_tuple.add(v_id.id)

  diff_list = list(set(image_ids).difference(v_tuple))
  if len(diff_list) > 0:
    diff_value_str = ', '.join([str(x) for x in diff_list])
    raise ValidationException('invalid image_ids: %s', diff_value_str)
  else:
    pass

def validate_image_items(image_ids):
  max_images = app.config['IMAGE_MAX_ITEMS']
  min_images = app.config['IMAGE_MIN_ITEMS']

  if len(image_ids) > max_images:
    raise ValidationException('image items exceeds max limit: %d', max_images, ['image-greater-max', max_images])
  if len(image_ids) < min_images:
    raise ValidationException("image items lower than min limit: %d", min_images, ['image-lower-min', min_images])
  pass

# transform username to a valid userword by replacing
# some special characters: e.g. (space), /, &, %, etc.
# to '_' universally
def transform_username(user):
  pass

# validate if a userword is valid or not
# the format of userword:
# <username>-<user_id>
# e.g. Hong_Kong_Journallist-120
def validate_userword(userword):
  pass

# get single post response by post_id
# notice: this involves SQL calls, so it's not suitable
# to be used on listing APIs like `get_all_posts`
def get_post_response(post_id):
  pass