def load_static_routes(app):
  @app.route('/')
  @app.route('/new_user')
  @app.route('/new_post')
  @app.route('/users/<userword>')
  def load_static_file():
    return app.send_static_file('index.html')

  @app.route('/favicon.ico')
  def load_favicon():
    return app.send_static_file('favicon.ico')

  @app.route('/manifest.json')
  def load_manifest():
    return app.send_static_file('manifest.json')