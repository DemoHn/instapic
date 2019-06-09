# InstaPic

## Index

## Overview

__InstaPic__ is a simple instagram-like demo application that users could post his/her feelings with images and checkout other people's posts.

Features on Backend:
	•	[ X ] Implement backend on Flask
	•	[ X ] Users can register by username
	•	[ X ] Users can submit post that includes an image and short text description
	•	[ X ] Users can view all posts sorted by time
	•	[ X ] Users can view posts from a specific user
	•	[ X ] Validation and error handling
	•	[ X ] Tests
  •	[ X ] Use __sqlite__ as database driver
	•	[ X ] Performance optimization
	•	[ X ] Pagination

Features on Frontend:
	•	[ X ] Implement frontend on React
	•	[ X ] Allow user to register by username
	•	[ X ] Users can submit post that includes an image and short text description
	•	[ X ] Users can view all posts sorted by time
	•	[ X ] Users can view posts from a specific user
	•	[ X ] Validation and error handling
	•	[   ] Tests  <-- since no time to write frontend tests
	•	[ X ] Performance optimization
	•	[ X ] Integrate with <del>Redux</del> and React Router
  • [ X ] Use storybook to manage all single components
  • [ X ] Use typescript for static type checking

There's both Web & Mobile version for frontend thus it's accessible for both mobile & desktop browsers.

## Development

First, ensure `node >= 10`, `Python >= 3.7`, `yarn` and `virtualenv` is installed.

Clone the repo into your local file system
```
git clone https://github.com/DemoHn/instapic
cd instapic
```

Then create a virtual python environment for backend:
```
$ virtualenv venv
$ 
```