import React from 'react'
import {
  Redirect
} from "react-router-dom"
import API from '../api/index'
import { GoogleLogout } from 'react-google-login';
import { toast } from 'react-toastify';

class LeftBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: true,
      weather: {
        location: '',
        weather: '',
        temp: ''
      },
      dark: true
    }
  }

  LOGOUT = () => {
    toast.success(
      <p className="font-semibold text-white text-center"><i className="fas fa-check-circle mr-2"></i>Success Logout</p>
    );
    localStorage.removeItem("access_token")
    localStorage.removeItem("name")
    this.setState({
      isLogin: false
    })
  }

  GETLOCATION = () => {
    const longitude = localStorage.getItem("longitude")
    const latitude = localStorage.getItem("latitude")
    const access_token = localStorage.getItem("access_token")
    API.GETWEATHER({
      access_token,
      latitude,
      longitude
    }).then(res => {
      const location = res.name
      const weather = res.weather[0].main
      const temp = (parseFloat(res.main.temp) - parseFloat(273.15)).toFixed(2)
      this.setState({
        weather: {
          location,
          weather,
          temp
        }
      })
    })
  }

  changeTheme = () => {
    if (localStorage.getItem("theme") === 'dark') {
      localStorage.setItem("theme", "day")
      document.querySelector('html').classList.remove('dark')
      this.setState({
        dark: false
      })
    } else {
      localStorage.setItem("theme", "dark")
      document.querySelector('html').classList.add('dark')
      this.setState({
        dark: true
      })
    }
  }

  componentDidMount() {
    this.GETLOCATION()
    if (localStorage.getItem("theme") === 'dark') {
      document.querySelector('html').classList.add('dark')
    } else {
      document.querySelector('html').classList.remove('dark')
    }
  }

  render() {
    if (!localStorage.getItem("access_token") && !localStorage.getItem("name")) {
      return <Redirect to={{ pathname: "/login" }} />
    }
    return (
      <aside className="px-3 py-1 sm:w-4/12 w-full dark:text-white">
        <div className="sticky top-4 border-t border-b">
          <div className="text-center mt-3">
          <GoogleLogout
            clientId="287616302176-70fek13isk1o70pqt5c5mkolcf5ft19f.apps.googleusercontent.com"
            buttonText="Logout"
            render={renderProps => (<button onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn-red ml-1">Logout</button>)}
            onLogoutSuccess={this.LOGOUT}
          />
          </div>
          <p className="py-3">Hey <span className="font-semibold">{localStorage.getItem("name")}</span>, it looks like {this.state.weather.location}'s weather is on {this.state.weather.weather} with temperature {this.state.weather.temp}°C.<br/>Want to Add a New Todo? Remember you can double click todo to update its status.</p>
          <div className="flex-wrap flex justify-center border-t p-3 w-full">
            <h1 className="text-center font-semibold">{this.props.isupdate ? "Edit Todo" : "Add New Todo"}</h1>
            <input onChange={this.props.formChange} type="text" name="title" id="title" placeholder="Add New Title"
            className="input sm:mt-3 mt-0 w-full sm:h-auto h-12"/>
            <textarea onChange={this.props.formChange} name="description" id="description" placeholder="Add New Description"
            className="input sm:mt-3 mt-0 w-full break-words sm:min-h-16 h-12"></textarea>
            <input onChange={this.props.formChange} type="date" name="due_date" id="due_date" placeholder="Add New Date" value={this.props.form.due_date}
            className="input sm:mt-3 mt-0 w-full sm:h-auto h-12"/>
            {this.props.isupdate ?
            <select className="input sm:mt-3 mt-0 w-full sm:h-auto h-12 bg-white" name="status" id="status" onChange={this.props.formChange}>
              <option value="false">Not Done</option>
              <option value="true">Done</option>
            </select>
            : ''} 
    <button onClick={() => this.props.clear()} className="sm:ml-0 ml-3 mt-3 btn-yellow">{this.props.isupdate ? "Cancel" : "Clear"}</button>
            <button onClick={() => this.props.submitTodo()} className="ml-3 mt-3 btn-blue">{this.props.isupdate ? "Save" : "Submit"}</button>
          </div>
          <div className="text-center mb-3">
            <button onClick={this.changeTheme} className={`px-3 py-2 rounded-full border bg-gray-900 text-gray-100 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-gray-100 dark:hover:border-gray-100`}>
              {
                this.state.dark
                ?
                <i className="fas fa-sun"></i>
                :
                <i className="fas fa-moon"></i>
              }
            </button>
          </div>
        </div>
      </aside>
    )
  }
}

export default LeftBar