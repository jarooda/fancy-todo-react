import Card from './CardTodos'
import React from 'react'

class Todos extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      todos: null
    }
  }

  searching = (e) => {
    const text = e.target.value.toLowerCase()
    let filteredTodo = this.props.todos.filter(e => {
      return e.description.toLowerCase().includes(text) || e.title.toLowerCase().includes(text)
    })
    if (text === '') {
      filteredTodo = this.props.todos
    }
    this.setState({
      todos: filteredTodo
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isupdate && !this.props.isupdate) {
      this.setState({
        todos: null
      })
    }
    if (prevProps.todos.length !== this.props.todos.length) {
      this.setState({
        todos: null
      })
    }
  }

  render() {
    return (
      <div className="sm:w-8/12 justify-center w-full flex flex-wrap border-2 rounded-xl p-3 shadow-lg dark:text-white">
        <div className="w-full flex justify-center flex-wrap h-20 pt-3">
          <input type="text" name="search" id="search" onChange={this.searching} className="input lg:w-8/12 w-full h-10" placeholder="Search Todo"/>
          {
            this.state.todos
            ?
            <p className="w-full text-center">Found {this.state.todos.length} Todos</p>
            :
            <p className="w-full text-center">Found {this.props.todos.length} Todos</p>
          }
        </div>
        {
          this.props.todos.length === 0
          ?
          <p className=" self-start">Nothing todo here...</p>
          :
          !this.state.todos
          ?
          this.props.todos.map(e => {
            return <Card todo={e} key={e.id} removetodo={this.props.removetodo}  editTodo={this.props.editTodo} patchTodo={this.props.patchTodo}/>
          })
          :
          this.state.todos.length === 0
          ?
          <p className=" self-start">Nothing todo here...</p>
          :
          this.state.todos.map(e => {
            return <Card todo={e} key={e.id} removetodo={this.props.removetodo}  editTodo={this.props.editTodo} patchTodo={this.props.patchTodo}/>
          })
        }
      </div>
    )
  }
    
}

export default Todos