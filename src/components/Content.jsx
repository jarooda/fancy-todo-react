import React from 'react'
import Todos from './Todos'
import LeftBar from './LeftBar'

class Content extends React.Component {
  render() {
    return (
      <div className="flex sm:flex-nowrap flex-wrap container mx-auto m-3 sm:p-0 p-3 sm:pt-5 sm:min-h-55 min-h-65 pb-3">
        <LeftBar />
        <Todos />
      </div>
    )
  }
}

export default Content