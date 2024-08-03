import {withRouter} from 'react-router-dom'

import Cookie from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookie.remove('jwt_token')
    Cookie.remove('username')
    const {history} = props
    history.replace('/login')
  }
  const username = Cookie.get('username')

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <p className="website-txt">{`Welcome ${username} Todo's Website `}</p>

        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
        <button
          type="button"
          className="logout-mobile-btn"
          onClick={onClickLogout}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
            alt="logout icon"
            className="logout-icon"
          />
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
