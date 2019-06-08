import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// routes
import Home from './routes/home'
import NewUser from './routes/newUser'
import NewPost from './routes/newPost'
import UserPost from './routes/userPost'

const App: React.FC = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/new_user" component={NewUser} />
      <Route exact path="/new_post" component={NewPost} />
      <Route path="/users/:userword" component={UserPost} />
    </Router>
  )
}

export default App
