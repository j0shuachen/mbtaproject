import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import { Display, NorthStation, SouthStation } from './display';

const App = () => (
  <HashRouter>
    <div className="container">

      <div className='header'>
        <div className='headerleft'>
          <Link className='link' to='/'>home</Link>
        </div>
        <div className='headertitle'>MBTA DASHBOARD</div>
        <div className='headerright'>
          <Link className='link' to='/northstation'>north station</Link>
          <Link className='link' to='/southstation'>south station</Link>
        </div>
      </div>

      <Switch>
        <Route path="/northstation" component={ NorthStation }/>
        <Route path="/southstation" component={ SouthStation }/>
        <Route path="/" component={ Display }/>
      </Switch>

      <div className='footer'>
        <a className='linkedinlink' target='_blank' href= 'https://www.linkedin.com/in/joshuaschen/'><img className='linkedinlogo' src='http://res.cloudinary.com/dxeyfggji/image/upload/v1513733354/Logo-Black-21px-R.png'/> </a>
      </div>
   </div>
 </HashRouter>

);


export default App;
