import React from 'react'
import Card from './CardTodos'

class Todos extends React.Component {
  render() {
    return (
      <div className="sm:w-8/12 w-full flex flex-wrap border-2 rounded-xl p-3 shadow-lg">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    )
  }
}

export default Todos