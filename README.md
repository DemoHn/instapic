# InstaPic

## Demo

[Demo #1](https://instapic.mingchuan.me/) [My own VPS Server]

## Overview

__InstaPic__ is a simple instagram-like demo application that users could post his/her feelings with images and checkout other people's posts.

Features on Backend:
- [ X ] Implement backend on Flask

- [ X ] Users can register by username

- [ X ] Users can submit post that includes an image and short text description

- [ X ] Users can view all posts sorted by time

- [ X ] Users can view posts from a specific user

- [ X ] Validation and error handling

- [ X ] Tests

- [ X ] Use __sqlite__ as database driver

- [ X ] Pagination

Features on Frontend:
- [ X ] Implement frontend on React

- [ X ] Allow user to register by username

- [ X ] Users can submit post that includes an image and short text description

- [ X ] Users can view all posts sorted by time

- [ X ] Users can view posts from a specific user

- [ X ] Validation and error handling

- [ X ] Performance optimization

- [ X ] Integrate with <del>Redux</del> and React Router

- [ X ] Use storybook to manage all single components

- [ X ] Use typescript for static type checking

There's both Web & Mobile version for frontend thus it's accessible for both mobile & desktop browsers.

## Development

First, ensure `node >= 10`, `Python >= 3.7`, `yarn` and `virtualenv` is installed.

Clone the repo into your local file system
```
git clone https://github.com/DemoHn/instapic
cd instapic
```

#### BACKEND

Then create a virtual python environment for backend:
```
$ virtualenv venv
$ source venv/bin/activate

# here we enter the virtual env
(venv) cd core
(venv) pip install -r requirements.txt
```

#### FRONTEND

To build static files
```
$ cd instapic/web
$ yarn && yarn build && yarn clean:dist && yarn move:dist
```

To development
```
$ cd instapic/web
$ yarn && yarn start
```

#### PREVIEW
Run the backend server:

```
(venv) FLASK_APP=core FLASK_ENV=development flask run
```

and open `localhost:5000` on browser to check!