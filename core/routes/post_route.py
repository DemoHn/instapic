from . import api, swag_from
from flask import jsonify, request

@api.route('/posts', methods=['POST'])
@swag_from('specs/upload_post.yml', validation=True)
def submit_new_post():
  content = request.json
  pass

@api.route('/posts', methods=['GET'])
@swag_from('specs/list_posts.yml', validation=True)
def list_all_posts():
  pass

# userword = <username>-<user_id>
# e.g. Hong-Kong-Journalist-120
@api.route('/posts/<userword>', methods=['GET'])
@swag_from('specs/list_user_posts.yml', validation=True)
def list_user_posts():
  pass