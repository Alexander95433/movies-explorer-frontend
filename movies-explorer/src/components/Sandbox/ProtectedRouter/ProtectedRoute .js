import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Preloader from '../../Movies/Preloader/Preloader';

const ProtectedRouter = ({component: Component, ...props}) => {

  return <Route>{() => (
    props.loading ? <div className='protected-router__preloader-wrapper'><Preloader/> </div> : props.loggedIn ? <Component {...props} /> : <Redirect to="/" />)}</Route>;
}

export default ProtectedRouter; 