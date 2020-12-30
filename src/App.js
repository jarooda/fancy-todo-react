import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
import Content from './components/Content'
import { Fragment } from 'react'

function App() {
  return (
    <Fragment>
      <Header />
      <Login />
      <Register />
      <Content />
      <Footer />
    </Fragment>
  );
}

export default App;
