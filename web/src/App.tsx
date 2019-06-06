import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './routes/home'
import NewUser from './routes/newUser'
const App: React.FC = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/new-user" component={NewUser} />
    </Router>
  )
}

export default App
