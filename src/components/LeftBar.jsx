import React from 'react'
import {
  Redirect
} from "react-router-dom"
import API from '../api/index'

class LeftBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: true,
      weather: {
        location: '',
        weather: '',
        temp: ''
      }
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
          <div className="flex-wrap flex justify-center border-t p-3 w-full">
            <h1 className="text-center font-semibold">Add New Todo</h1>
            <input onChange={this.props.formChange} type="text" name="title" id="title" placeholder="Add New Title"
            className="input sm:mt-3 mt-0 w-full sm:h-auto h-12"/>
            <textarea onChange={this.props.formChange} name="description" id="description" placeholder="Add New Description"
            className="input sm:mt-3 mt-0 w-full break-words sm:min-h-16 h-12"></textarea>
            <input onChange={this.props.formChange} type="date" name="due_date" id="due_date" placeholder="Add New Date" value={this.props.due_date}
            className="input sm:mt-3 mt-0 w-full sm:h-auto h-12"/>
            <button onClick={() => this.props.clear()} className="sm:ml-0 ml-3 mt-3 btn-yellow">Clear</button>
            <button onClick={() => this.props.addTodo()} className="ml-3 mt-3 btn-blue">Submit</button>
          </div>
        </div>
      </aside>
    )
  }
}

export default LeftBar