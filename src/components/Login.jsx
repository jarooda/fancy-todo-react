import React from 'react'
import axios from '../config/axios'
import {
  Link,
  Redirect
} from "react-router-dom";

class Login extends React.Component {
  state = {
    login: {
      email: '',
      password: ''
    },
    islogin: false
  }

  formchange = (e) => {
    const newLogin = {...this.state.login}
    newLogin[e.target.name] = e.target.value
    this.setState({
      login: newLogin
    })
  }

  LOGIN = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: '/login',
      data: this.state.login
    }).then(({ data }) => {
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('name', data.name)
      document.querySelector('#login-email').value = ''
      document.querySelector('#login-password').value = ''
      this.setState({
        login: {
          email: '',
          password: ''
        },
        islogin: true
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    if (localStorage.getItem("access_token") && localStorage.getItem("name")) {
      return <Redirect to={{ pathname: "/" }} />
    }
    if (this.state.islogin) {
      return <Redirect to={{ pathname: "/" }} />
    }
    return (
      <div className="sm:min-h-55 min-h-65 flex justify-center items-center p-5">
        <div className="sm:w-5/12 w-full mx-4 flex justify-center flex-wrap border shadow-lg p-4 rounded-xl">
          <h1 className="w-full text-center text-3xl font-bold pb-3">Login</h1>
          <form onSubmit={this.LOGIN} className="flex-wrap flex justify-center border-b border-t p-3 w-9/12 sm:w-6/12">
            <input type="email" name="email" id="login-email" placeholder="Your Email"
            className="input" onChange={this.formchange}/>
            <input type="password" name="password" id="login-password" placeholder="Your Password"
            className="mt-3 input" onChange={this.formchange}/>
            <button className="mt-3 btn-blue">Login</button>
          </form>
          <p className="w-full text-center pt-2">Don't have an account? <Link to="/register" className="link">Register First</Link></p>
          <p className="w-full text-center pt-2">Or Login with Google</p>
          <i className="fab fa-google mt-2 py-3 btn-blue"></i>
        </div>
      </div>
    )
  }
}

export default Login