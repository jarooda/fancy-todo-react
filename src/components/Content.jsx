import React from 'react'
import Todos from './Todos'
import LeftBar from './LeftBar'
import API from '../api/index'
import moment from 'moment'

class Content extends React.Component {
  state = {
    todos: [],
    form: {
      title: '',
      description: '',
      due_date: moment().format('YYYY-MM-DD')
    }
  }

  fetchdata = (access_token) => {
    API.FETCHDATA(access_token).then(res => {
      this.setState({
        todos: res
      })
    })
  }

  CLEAR = () => {
    document.querySelector("#title").value = ''
    document.querySelector("#description").value = ''
    document.querySelector("#due_date").value = moment().format('YYYY-MM-DD')
  }

  formChange = (e) => {
    console.log(this.state.form);
    const newForm = {...this.state.form}
    newForm[e.target.name] = e.target.value
    this.setState({
      form: newForm
    }, () => {
      console.log(this.state.form);
    })
  }

  addTodo = (e) => {
    const access_token = localStorage.getItem("access_token")
    const title = this.state.form.title
    const description = this.state.form.description
    const due_date = this.state.form.due_date
    API.ADDDATA({
      access_token,
      title,
      description,
      due_date
    }).then((res) => {
      document.querySelector("#title").value = ''
      document.querySelector("#description").value = ''
      document.querySelector("#due_date").value = moment().format('YYYY-MM-DD')
      this.setState({
        form: {
          title: '',
          description: '',
          due_date: moment().format('YYYY-MM-DD')
        }
      })
      this.fetchdata(access_token)
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
        <LeftBar clear={this.CLEAR} formChange={this.formChange} addTodo={this.addTodo} due_date={this.state.form.due_date}/>
        <Todos todos={this.state.todos} removetodo={this.removetodo}/>
      </div>
    )
  }
}

export default Content