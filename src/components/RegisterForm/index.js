import {Component} from 'react'
import Cookie from 'js-cookie'
import {Link} from 'react-router-dom'
import RegisterAndLoginHeader from '../RegisterAndLoginHeader'

import './index.css'

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    history.replace('/login')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, email, password} = this.state
    Cookie.set('username', username)
    const userDetails = {username, email, password}
    console.log(userDetails)
    const url = 'https://todobackendapi-hi8m.onrender.com/user-details/register'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess()
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password, showPassword} = this.state
    const show = showPassword ? 'text' : 'password'
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD*
        </label>
        <input
          type={show}
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME*
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderEmailField = () => {
    const {email} = this.state
    return (
      <>
        <label className="input-label" htmlFor="email">
          EMAIL*
        </label>
        <input
          type="text"
          id="email"
          className="username-input-field"
          value={email}
          onChange={this.onChangeEmail}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <>
        <RegisterAndLoginHeader />
        <div className="login-form-container">
          <form className="form-container" onSubmit={this.submitForm}>
            <h1 className="form-heading-text">Sign up</h1>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderEmailField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <div className="show-password-container">
              <input
                className="checkbox-input"
                type="checkbox"
                id="showPassword"
                onChange={this.onShowPassword}
              />
              <label className="show-password-text" htmlFor="showPassword">
                Show Password
              </label>
            </div>
            <button type="submit" className="login-button">
              Create Account
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            <Link to="/login" className="sign-in">
              Sign in
            </Link>
          </form>
        </div>
      </>
    )
  }
}

export default RegisterForm
