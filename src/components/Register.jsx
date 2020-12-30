import React from 'react'

class Register extends React.Component {
  render() {
    return (
      <div className="sm:min-h-55 min-h-65 flex justify-center items-center p-5">
        <div className="sm:w-5/12 w-full mx-4 flex justify-center flex-wrap border shadow-lg p-4 rounded-xl">
          <h1 className="w-full text-center text-3xl font-bold pb-3">Register</h1>
          <form className="flex-wrap flex justify-center border-b border-t p-3 w-9/12 sm:w-6/12">
            <input type="email" name="email" id="register-email" placeholder="Your Email"
            className="input"/>
            <input type="password" name="password" id="register-password" placeholder="Your Password"
            className="mt-3 input"/>
            <button className="mt-3 btn-blue">Register</button>
          </form>
          <p className="w-full text-center pt-2">Don't have an account? <span className="link">Register First</span></p>
          <p className="w-full text-center pt-2">Or Login with Google</p>
          <i className="fab fa-google mt-2 py-3 btn-blue"></i>
        </div>
      </div>
    )
  }
}

export default Register