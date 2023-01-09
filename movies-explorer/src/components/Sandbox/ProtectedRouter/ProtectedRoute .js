import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRouter = ({component: Component, ...props}) => {
  return <Route>{() => (props.logiedId ? <Component {...props} /> : <Redirect to="/signin" />)}</Route>;
  
}

export default ProtectedRouter; 