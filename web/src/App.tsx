import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// routes
import Home from './routes/home'
import NewUser from './routes/newUser'
import UserPost from './routes/userPost'

const App: React.FC = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/new-user" component={NewUser} />
      <Route path="/users/:userword" component={UserPost} />
    </Router>
  )
}

export default App
