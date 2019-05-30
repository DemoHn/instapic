from . import api, swag_from
from flask import jsonify, request,g 
from core.services.post_service import (
  create_post,
  get_posts,
  validate_userword
)
from core.middlewares import auth
import jsonschema

@api.route('/posts', methods=['POST'])
@auth
@swag_from('specs/upload_post.yml', validation=True)
def submit_new_post():
  user_id = g.user_id
  content = request.json
  post = create_post(user_id, content['image_ids'], content['description'])
  return jsonify(post)

@api.route('/posts', methods=['GET'])
@swag_from('specs/list_posts.yml')
def list_all_posts():
  # since flasgger could not validate query parameters,
  # we have to manually validate it
  limit = request.args.get('limit', type=int)  
  cursor = request.args.get('cursor', type=int)

  posts = get_posts(limit, cursor)  
  return jsonify(posts)

# userword = <username>-<user_id>
# e.g. Hong-Kong-Journalist-120
@api.route('/posts/<userword>', methods=['GET'])
@swag_from('specs/list_user_posts.yml')
def list_user_posts(userword):
  limit = request.args.get('limit', type=int)
  cursor = request.args.get('cursor', type=int)

  # validate to get user_id
  uploader_id = validate_userword(userword)
  posts = get_posts(limit, cursor, uploader_id)
  return jsonify(posts)