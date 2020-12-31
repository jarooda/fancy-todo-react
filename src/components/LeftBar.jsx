import React from 'react'
import {
  Redirect
} from "react-router-dom"
import API from '../api/index'

class LeftBar extends React.Component {
  state = {
    isLogin: true,
    weather: {
      location: 'Jakarta',
      weather: 'Sunny',
      temp: '33'
    }
  }

  LOGOUT = () => {
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

  componentDidMount() {
    this.GETLOCATION()
  }

  render() {
    if (!localStorage.getItem("access_token") && !localStorage.getItem("name")) {
      return <Redirect to={{ pathname: "/login" }} />
    }
    return (
      <aside className="px-3 py-1 sm:w-4/12 w-full">
        <div className="sticky top-4 border-t border-b">
    <p className="py-3">Hey <span className="font-semibold">{localStorage.getItem("name")}</span>, it looks like {this.state.weather.location}'s weather is on {this.state.weather.weather} with temperature {this.state.weather.temp}°C.<br/>Want to Add a New Todo? Or <button onClick={this.LOGOUT} className="link">Logout</button>?</p>
          <form className="flex-wrap flex justify-center border-t p-3 w-full">
            <input type="text" name="title" id="title" placeholder="Add New Title"
            className="input sm:w-full w-6/12 sm:h-auto h-12"/>
            <textarea name="description" id="description" placeholder="Add New Description"
            className="input sm:mt-3 mt-0 sm:w-full w-6/12 break-words sm:min-h-16 h-12"></textarea>
            <button className="sm:ml-0 ml-3 mt-3 btn-yellow">Clear</button>
            <button className="ml-3 mt-3 btn-blue">Submit</button>
          </form>
        </div>
      </aside>
    )
  }
}

export default LeftBar