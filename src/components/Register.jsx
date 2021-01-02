import React from 'react'
import axios from '../config/axios'
import {
  Link,
  Redirect
} from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { toast } from 'react-toastify';

class Register extends React.Component {
  state = {
    register: {
      email: '',
      password: ''
    },
    isRegister: false
  }

  formchange = (e) => {
    const newRegister = {...this.state.register}
    newRegister[e.target.name] = e.target.value
    this.setState({
      register: newRegister
    })
  }

  REGISTER = (e) => {
    e.preventDefault()
    axios({
      method: 'post',
      url: '/register',
      data: this.state.register
    }).then(({ data }) => {
      toast.success(
      <p className="font-semibold text-white text-center"><i className="fas fa-exclamation-triangle mr-2"></i>Success Registering Email {data.email}</p>
      );
      document.querySelector('#register-email').value = ''
      document.querySelector('#register-password').value = ''
      this.setState({
        register: {
          email: '',
          password: ''
        },
        isRegister: true
      })
    }).catch(err => {
      toast.error(
        <p className="font-semibold text-white text-center"><i className="fas fa-exclamation-triangle mr-2"></i>{err.response.data.errors}</p>
      );
    })
  }

  responseGoogle = (response) => {
    const google_token = response.tokenId
    axios({
      method: 'post',
      url: '/googleLogin',
      data: {
        google_token
      }
    }).then(({ data }) => {
      toast.success(
        <p className="font-semibold text-white text-center"><i className="fas fa-check-circle mr-2"></i>Login Success</p>
      );
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('name', data.name)
      document.querySelector('#register-email').value = ''
      document.querySelector('#register-password').value = ''
      this.setState({
        register: {
          email: '',
          password: ''
        }
      })
    }).catch(err => {
      toast.error(
        <p className="font-semibold text-white text-center"><i className="fas fa-exclamation-triangle mr-2"></i>{err.response.data.errors}</p>
      );
    })
  }

  render() {
    if (localStorage.getItem("access_token") && localStorage.getItem("name")) {
      return <Redirect to={{ pathname: "/" }} />
    } else if (this.state.isRegister) {
      return <Redirect to={{ pathname: "/login" }} />
    }
    return (
      <div className="sm:min-h-55 min-h-65 flex justify-center items-center p-5">
        <div className="sm:w-5/12 w-full mx-4 flex justify-center flex-wrap border shadow-lg p-4 rounded-xl">
          <h1 className="w-full text-center text-3xl font-bold pb-3">Register</h1>
          <form onSubmit={this.REGISTER} className="flex-wrap flex justify-center border-b border-t p-3 w-9/12 sm:w-6/12">
            <input type="email" name="email" id="register-email" placeholder="Your Email"
            className="input" onChange={this.formchange}/>
            <input type="password" name="password" id="register-password" placeholder="Your Password"
            className="mt-3 input" onChange={this.formchange}/>
            <button className="mt-3 btn-blue">Register</button>
          </form>
          <p className="w-full text-center pt-2">Already have an account? <Link to="/login" className="link">Login First</Link></p>
          <p className="w-full text-center pt-2">Or Login with Google</p>
          <GoogleLogin
            clientId="287616302176-70fek13isk1o70pqt5c5mkolcf5ft19f.apps.googleusercontent.com"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (<i onClick={renderProps.onClick} disabled={renderProps.disabled} className="fab fa-google mt-2 py-3 btn-blue"></i>)}
          />
        </div>
      </div>
    )
  }
}

export default Register