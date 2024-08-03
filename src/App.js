import {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import TodoContext from './context/TodoContext'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import TodoPage from './components/TodoPage'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  state = {isSignUp: false}

  onToggleSignUp = () => {
    this.setState(prevState => ({isSignUp: !prevState.isSignUp}))
  }

  render() {
    const {isSignUp} = this.state
    return (
      <>
        <TodoContext.Provider
          value={{isSignUp, onToggleSignUp: this.onToggleSignUp}}
        >
          <BrowserRouter>
            <Switch>
              <Route exact path="/register" component={RegisterForm} />
              <Route exact path="/login" component={LoginForm} />
              <ProtectedRoute exact path="/" component={TodoPage} />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </TodoContext.Provider>
      </>
    )
  }
}

export default App
