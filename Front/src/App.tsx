import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes } from 'react-router-dom';
import {
  Input,
  Ripple,
  initTWE,
} from "tw-elements";

import './App.css';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import Dashboard from './Components/Pages/Dashboard';
import Server from './Components/Utils/Server';

function App() {

  initTWE({ Input, Ripple });
  return (
    <>
      <Server />
      <Routes >
        <Route errorElement={<Server />}>
          <Route path={"/"} element={<Login />} />
          <Route path={"register"} element={<Register />} />
          <Route path={"dashboard"} element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
