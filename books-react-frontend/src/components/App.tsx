import { Route, Routes } from 'react-router-dom';

import './App.css';
import MyBooks from './MyBooks/MyBooks';
import SignUp from './SignUp/SignUp';

/**
 * The main component of the app
 */
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/books' element={<MyBooks />} />
      </Routes>
    </>
  );
}

export default App;
