import React from 'react'
import moment from 'moment'

const Card = (props) => {  
  return (
      <div className=" sm:w-5/12 w-full mx-2 sm:h-80 h-96 overflow-y-auto text-center px-4 flex flex-wrap justify-center mt-4 rounded-lg hover:-translate-y-2 hover:border-blue-300 border-2 transform shadow bg-wave bg-top bg-no-repeat">
        <h3 className="w-full text-center text-2xl font-semibold pt-4 font-dancing break-words">{props.todo.title}</h3>
        <p className="w-full text-left break-words border font-serif">{props.todo.description}</p>
        <p className="w-full text-right break-words text-sm pr-1">Due Date: <span className="font-bold">{moment(props.todo.due_date).format('MMMM Do YYYY')}</span></p>
        <div className="w-9/12 flex justify-between">
          <i className="fas fa-edit text-2xl icon"></i>
          <button onClick={() => props.removetodo(props.todo.id)}><i className="fas fa-trash-alt text-2xl icon"></i></button>
        </div>
      </div>
    )

}

export default Card