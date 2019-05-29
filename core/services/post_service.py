from core.models import db
from core.models.post import Post
from core.models.user import User
from core.models.post_image import PostImage
from core.models.image import Image
from core.errors import (
  ValidationException,
  SQLExecutionException
)

from flask import current_app as app
from sqlalchemy import desc
import re
import time

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
    db.session.add(new_post)
    db.session.commit()

    # get new post id
    post_id = new_post.id
    # add data on `post_image` table
    post_image_data = []
    for image_id in image_ids:
      post_image_data.append(PostImage(image_id=image_id, post_id=new_post.id))

    db.session.bulk_save_objects(post_image_data)
    db.session.commit()
  except:
    raise SQLExecutionException('create post')  
  post = post_scope_query().filter(Post.id == post_id).first()
  return transto_post_response(post)

def get_posts(limit, cursor, user_id=None):
  max_limit = app.config['MAX_FETCH_LIMIT']
  has_more = False
  subquery = post_scope_query()
  if cursor:
    subquery = subquery.filter(Post.id < cursor)
  if user_id:
    subquery = subquery.filter(Post.user_id == user_id)

  ac_limit = (limit or max_limit) + 1
  m_posts = subquery.order_by(desc(Post.created_at)).limit(ac_limit).all()  
  
  if len(m_posts) == ac_limit:
    has_more = True
    # remove last item
    m_posts = m_posts[:-1]
    
  return {
    'cursor': m_posts[-1].id,
    'has_more': has_more,
    'posts': list(map(transto_post_response, m_posts))
  }

# private functions
# validations
def validate_image_ids(user_id, image_ids):
  valid_image_ids = db.session.query(Image).filter(
    Image.user_id == user_id,
    Image.id.in_(image_ids)
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
    raise ValidationException('image items exceeds max limit: %d' % max_images, ['image-greater-max', max_images])
  if len(image_ids) < min_images:
    raise ValidationException("image items lower than min limit: %d" % min_images, ['image-lower-min', min_images])
  pass

# validate if a userword is valid or not
# the format of userword:
# <username>-<user_id>
# e.g. Hong_Kong_Journallist-120
def validate_userword(userword):
  results = re.findall(r'^(.+)-([0-9]+)$', userword)
  if len(results) == 0:
    raise ValidationException('invalid userword: %s', userword, ['invalid-userword', userword])
  else:
    t_username, user_id = results[0]
    user_id = int(user_id)
    user = db.session.query(User).filter_by(id=user_id).first()
    if user is None:
      raise ValidationException('user id: %d not found' % user_id, ['user-notfound', user_id])
    if t_username != transform_username(user.name):
      raise ValidationException('invalid userword: %d' % t_username)
  
  return user_id

# transform username to a valid userword by replacing
# some special characters: e.g. (space), /, &, %, etc.
# to '_' universally
def transform_username(username):
  return re.sub(r'[$&+,/:;=\\?@ \'<>#%"]', '_', username)

# get single post response by post object
def transto_post_response(post):
  image_urls = []
  for image_m in post.images:
    image_urls.append(image_m.image.thumbnail_url)

  create_ts = round(time.mktime(post.created_at.timetuple()) * 1000)
  return {
    'id': post.id,
    'user': {
      'id': post.user.id,
      'name': post.user.name,
      'userword': '%s-%d' % (transform_username(post.user.name), post.user.id)
    },
    'image_urls': image_urls,
    'description': post.description,
    'created_at': create_ts
  }

def post_scope_query():
  return (db.session.query(Post)
    .join(Post.images)  
    .join(PostImage.image)  
    .join(Post.user))