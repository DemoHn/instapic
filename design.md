Design doc

Models:

1. user
- id
- name
- password
- created_at
- updated_at

2. user_session

- id
- user_id
- token
- created_at
- updated_at

3. post

- id
- description
- created_at
- updated_at

4. image

- id
- detail_url
- thumbnil_url

5. post_image
- id
- post_id
- image_id

How to run: `FLASK_APP=core FLASK_ENV=dev flask run`