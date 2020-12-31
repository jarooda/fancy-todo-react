import React from 'react'
import Todos from './Todos'
import LeftBar from './LeftBar'
import API from '../api/index'

class Content extends React.Component {
  state = {
    todos: []
  }

  fetchdata = (access_token) => {
    API.FETCHDATA(access_token).then(res => {
      this.setState({
        todos: res
      })
    })
  }

  removetodo = (id) => {
    const access_token = localStorage.getItem("access_token")
    API.DELETEDATA({
      id,
      access_token
    }).then(res => {
      this.fetchdata(access_token)
    })
  }

  componentDidMount() {
    const access_token = localStorage.getItem("access_token")
    if (access_token) {
      this.fetchdata(access_token)
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        localStorage.setItem("latitude", position.coords.latitude)
        localStorage.setItem("longitude", position.coords.longitude)
      })
    } else {
      console.log("Geolocation is not supported by this browser.")
    }
  }

  render() {
    return (
      <div className="flex sm:flex-nowrap flex-wrap container mx-auto m-3 sm:p-0 p-3 sm:pt-5 sm:min-h-55 min-h-65 pb-3">
        <LeftBar />
        <Todos todos={this.state.todos} removetodo={this.removetodo}/>
      </div>
    )
  }
}

export default Content