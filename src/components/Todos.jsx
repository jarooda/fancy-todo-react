import Card from './CardTodos'

const Todos = (props) => {
    return (
      <div className="sm:w-8/12 justify-center w-full flex flex-wrap border-2 rounded-xl p-3 shadow-lg">
        {
          props.todos.map(e => {
            return <Card todo={e} key={e.id} removetodo={props.removetodo} />
          })
        }
      </div>
    )
}

export default Todos