import React from 'react'

class Card extends React.Component {
  render() {
    return (
      <div className="w-full sm:h-80 h-96 overflow-y-auto text-center px-4 flex flex-wrap justify-center mt-4 rounded-lg hover:-translate-y-2 hover:border-blue-300 border-2 transform shadow bg-wave bg-top bg-no-repeat">
        <h3 className="w-full text-center sm:text-6xl text-3xl font-semibold pt-4 font-dancing break-words">LOOONG TITLE</h3>
        <p className="w-full text-left break-words">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ab dignissimos sint molestias quos. Esse odio eaque cumque corrupti, laborum quasi error placeat sit ipsam pariatur dolores repellendus quaerat natus!</p>
        <p className="w-full text-right text-sm pr-1 font-bold">Due Date: 4 January 2021</p>
        <div className="w-5/12 flex justify-around">
          <i className="fas fa-edit text-2xl link"></i>
          <i className="fas fa-trash-alt text-2xl link"></i>
        </div>
      </div>
    )
  }
}

export default Card