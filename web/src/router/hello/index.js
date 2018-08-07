import React, { Component } from 'react';
import {Route,IndexRoute} from 'react-router';

import Hello from '../../components/hello/hello.js'
import World from '../../components/hello/world.js'

export default (
    <Route path='/hello' component={Hello}>
      <IndexRoute component={World} />
      <Route path='world' component={World} name=""></Route>
    </Route>
)
