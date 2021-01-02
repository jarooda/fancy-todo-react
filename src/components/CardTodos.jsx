import React from 'react'
import moment from 'moment'

const Card = (props) => {  
  return (
      <div
      onDoubleClick={() => props.patchTodo({id:props.todo.id, status:props.todo.status})}
      className={`sm:w-5/12 lg:w-3/12 w-full mx-2 min-h-60 overflow-y-auto text-center px-4 flex flex-wrap justify-center mt-4 rounded-lg self-start ${props.todo.status ? "bg-gray-200" : "hover:-translate-y-2 hover:border-blue-300 border-2 transform shadow bg-wave bg-cover bg-top bg-no-repeat"}`}
      >
        <h3 className={`w-full text-center text-xl font-semibold pt-4 break-words ${props.todo.status ? "dark:text-gray-900" : ""}`}>
          {props.todo.title}
        </h3>
        <p className={`w-full text-center break-words border rounded-lg px-2 shadow-sm font-serif ${props.todo.status ? "dark:text-gray-900 dark:border-gray-900" : ""}`}>{props.todo.description}</p>
        <p className={`w-full text-right break-words text-xs pr-1 mt-2 ${props.todo.status ? "dark:text-gray-900" : ""}
        ${moment(props.todo.due_date).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && !props.todo.status ? "text-red-700" : ""}
        `}>
          Due Date:<br/>
          <span className="font-bold">
            {props.todo.status ? "Already Done" : moment(props.todo.due_date).format('MMMM Do YYYY')}
            <br/>
            {
              moment(props.todo.due_date).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && !props.todo.status
              ?
              <span className="text-red-700 dark:text-red-400"> (EXPIRED)</span>
              :
              moment(props.todo.due_date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') && !props.todo.status
              ?
              <span className="text-blue-700 dark:text-yellow-400 te"> (TODAY)</span>
              :
              ""
            }
          </span>
        </p>
        <div className="w-9/12 flex justify-between my-2">
          <button onClick={() => props.editTodo(props.todo.id)}>
            <i className={`fas fa-edit text-2xl icon ${props.todo.status ? "" : "dark:text-gray-200 dark:hover:text-white"}`}></i>
          </button>
          <button onClick={() => props.removetodo(props.todo.id)}>
            <i className={`fas fa-trash-alt text-2xl icon ${props.todo.status ? "" : "dark:text-gray-200 dark:hover:text-white"}`}></i>
          </button>
        </div>
      </div>
    )

}

export default Card