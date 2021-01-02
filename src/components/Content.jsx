import React from 'react'
import Todos from './Todos'
import LeftBar from './LeftBar'
import API from '../api/index'
import moment from 'moment'
import { toast } from 'react-toastify';

class Content extends React.Component {
  state = {
    todos: [],
    form: {
      id: 0,
      title: '',
      description: '',
      due_date: moment().format('YYYY-MM-DD'),
      status: false
    },
    isupdate: false
  }

  fetchdata = (access_token) => {
    API.FETCHDATA(access_token).then(res => {
      this.setState({
        todos: res
      })
    })
  }

  CLEAR = () => {
    document.querySelector("#search").value = ''
    document.querySelector("#title").value = ''
    document.querySelector("#description").value = ''
    if (this.state.form.status) {
      document.querySelector("#status").value = 'false'
    }
    document.querySelector("#due_date").value = moment().format('YYYY-MM-DD')
    this.setState({
      form: {
        id: 0,
        title: '',
        description: '',
        due_date: moment().format('YYYY-MM-DD'),
        status: false
      },
      isupdate: false
    })
  }

  formChange = (e) => {
    const newForm = {...this.state.form}
    newForm[e.target.name] = e.target.value
    this.setState({
      form: newForm
    })
  }

  submitTodo = (e) => {
    const access_token = localStorage.getItem("access_token")
    const title = this.state.form.title
    const description = this.state.form.description
    const due_date = this.state.form.due_date
    const status = this.state.form.status
    const id = this.state.form.id
    if (!this.state.isupdate) {
      API.ADDDATA({
        access_token,
        title,
        description,
        due_date
      }).then((res) => {
        toast.success(
          <p className="font-semibold text-white text-center"><i className="fas fa-check-circle mr-2"></i>Success Add Todo</p>
        );
        this.CLEAR()
        this.fetchdata(access_token)
      }).catch(err => {
        toast.error(
          <p className="font-semibold text-white text-center"><i className="fas fa-exclamation-triangle mr-2"></i>{err.response.data.errors.join(', ')}</p>
        )
      })
    } else {
      API.PUTDATA({
        id,
        status,
        access_token,
        title,
        description,
        due_date
      }).then((res) => {
        toast.success(
          <p className="font-semibold text-white text-center"><i className="fas fa-check-circle mr-2"></i>Success Edit Todo</p>
        );
        this.CLEAR()
        this.fetchdata(access_token)
      }).catch(err => {
        toast.error(
          <p className="font-semibold text-white text-center"><i className="fas fa-exclamation-triangle mr-2"></i>{err.response.data.errors.join(', ')}</p>
        )
      })
    }
  }

  editTodo = (id) => {
    const access_token = localStorage.getItem("access_token")
    API.FETCHBYID({
      access_token,
      id
    }).then((res) => {
      this.setState({
        form: {
          id: res.id,
          title: res.title,
          description: res.description,
          due_date: moment(res.due_date).format('YYYY-MM-DD'),
          status: res.status
        },
        isupdate: true
      }, () => {
        document.querySelector("#title").value = res.title
        document.querySelector("#description").value = res.description
        document.querySelector("#status").value = res.status ? "true" : "false"
        document.querySelector("#due_date").value = moment(res.due_date).format('YYYY-MM-DD')
      })
    })
  }

  patchTodo = (props) => {
    const access_token = localStorage.getItem("access_token")
    const newStatus = props.status ? false : true
    const id = props.id
    API.PATCHDATA({
      access_token,
      id,
      status: newStatus
    }).then((res) => {
      toast.success(
        <p className="font-semibold text-white text-center"><i className="fas fa-check-circle mr-2"></i>Success Edit Todo Status</p>
      );
      this.setState({
        isupdate: true
      })
      this.setState({
        isupdate: false
      })
      this.CLEAR()
      this.fetchdata(access_token)
    }).catch(err => {
      toast.error(
        <p className="font-semibold text-white text-center"><i className="fas fa-exclamation-triangle mr-2"></i>{err.response.data.errors}</p>
      )
    })
  }

  removetodo = (id) => {
    const access_token = localStorage.getItem("access_token")
    API.DELETEDATA({
      id,
      access_token
    }).then(res => {
      toast.success(
        <p className="font-semibold text-white text-center"><i className="fas fa-check-circle mr-2"></i>Success Delete Todo</p>
      );
      this.CLEAR()
      this.fetchdata(access_token)
    }).catch(err => {
      toast.error(
        <p className="font-semibold text-white text-center"><i className="fas fa-exclamation-triangle mr-2"></i>{err.response.data.errors}</p>
      )
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
        <LeftBar clear={this.CLEAR} formChange={this.formChange} submitTodo={this.submitTodo} form={this.state.form} isupdate={this.state.isupdate}/>
        <Todos todos={this.state.todos} removetodo={this.removetodo} editTodo={this.editTodo} patchTodo={this.patchTodo} isupdate={this.state.isupdate}/>
      </div>
    )
  }
}

export default Content