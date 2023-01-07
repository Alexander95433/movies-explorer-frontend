import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRouter = ({component: Component, ...props}) => {
  console.log(props.logiedId, 'ffffffffff')
  return <Route>{() => (props.logiedId ? <Component {...props} /> : <Redirect to="/signin" />)}</Route>;
  
}

export default ProtectedRouter; 