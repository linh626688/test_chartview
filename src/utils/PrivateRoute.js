import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {ACCESS_TOKEN} from "../constants/constants";

export const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(props) => (
      localStorage.getItem(ACCESS_TOKEN)
        ? <Component {...props} />
        : <Redirect to='/login'/>
    )}/>
);
