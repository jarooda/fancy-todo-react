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

  componentDidMount() {
    const access_token = localStorage.getItem("access_token")
    if (access_token) {
      this.fetchdata(access_token)
    }
  }

  render() {
    return (
      <div className="flex sm:flex-nowrap flex-wrap container mx-auto m-3 sm:p-0 p-3 sm:pt-5 sm:min-h-55 min-h-65 pb-3">
        <LeftBar />
        <Todos todos={this.state.todos}/>
      </div>
    )
  }
}

export default Content