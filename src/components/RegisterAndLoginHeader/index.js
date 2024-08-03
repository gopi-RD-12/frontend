import {Link, withRouter} from 'react-router-dom'
import TodoContext from '../../context/TodoContext'

import './index.css'

const RegisterAndLoginHeader = props => (
  <TodoContext.Consumer>
    {value => {
      const {onToggleSignUp, isSignUp} = value
      const textButton = isSignUp ? 'Sign in' : 'Sign up'
      let route = null
      if (isSignUp === false) {
        route = '/register'
      } else {
        route = '/login'
      }
      const onToggleButton = () => {
        onToggleSignUp()
      }

      return (
        <nav className="nav-account-header">
          <div className="nav-account-content">
            <p className="website-text">Todo website</p>
            <Link to={route}>
              <button
                type="button"
                className="logout-desktop-button"
                onClick={onToggleButton}
              >
                {textButton}
              </button>
            </Link>
          </div>
        </nav>
      )
    }}
  </TodoContext.Consumer>
)

export default withRouter(RegisterAndLoginHeader)
