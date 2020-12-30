import React from 'react'

class LeftBar extends React.Component {
  render() {
    return (
      <aside className="px-3 py-1 sm:w-4/12 w-full">
        <div className="sticky top-4 border-t border-b">
          <p className="py-3">Hey <span className="font-semibold">Jalu Wibowo</span>, it looks like Jakarta's weather is on Haze with temperature 27.30°C.<br/>Want to Add a New Todo? Or <a href="logot" className="link">Logout</a></p>
          <form className="flex-wrap flex justify-center border-t p-3 w-full">
            <input type="text" name="title" id="title" placeholder="Add New Title"
            className="input sm:w-full w-6/12 sm:h-auto h-12"/>
            <textarea name="description" id="description" placeholder="Add New Description"
            className="input sm:mt-3 mt-0 sm:w-full w-6/12 break-words sm:min-h-16 h-12"></textarea>
            <button className="sm:ml-0 ml-3 mt-3 btn-yellow">Clear</button>
            <button className="ml-3 mt-3 btn-blue">Submit</button>
          </form>
        </div>
      </aside>
    )
  }
}

export default LeftBar