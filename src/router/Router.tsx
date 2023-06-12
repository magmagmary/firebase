import { Routes, Route } from 'react-router-dom'
import Login from '../pages/login/Login';
import Movies from '../pages/Movies/Movies';
import NewMovie from '../pages/Movies/NewMovie';

const Router = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Movies />} />
      <Route path='/new' element={<NewMovie />} />
      <Route path='/edit' element={<NewMovie />} />
    </Routes>
  )
}

export default Router