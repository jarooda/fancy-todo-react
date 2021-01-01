import Card from './CardTodos'
import React from 'react'

class Todos extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <div className="sm:w-8/12 justify-center w-full flex flex-wrap border-2 rounded-xl p-3 shadow-lg">
        {
          this.props.todos.map(e => {
            return <Card todo={e} key={e.id} removetodo={this.props.removetodo} />
          })
        }
      </div>
    )
  }
}

export default Todos