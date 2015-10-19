/// <reference path='../../typings/react/react.d.ts'/>
/// <reference path='../../typings/redux/redux.d.ts'/>
/// <reference path='../../typings/react-redux/react-redux.d.ts'/>
/// <reference path='../../typings/material-ui/material-ui.d.ts'/>

// NOTE: Currently material-ui must be built (npm -i from node_modules) from the trunk
// to get React 0.14 support.

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import Paper = require('material-ui/lib/paper');

import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';

// It would be nice to specify an AppProps interface for this component, but it 
// does not play nicely with the {() => <App/>} usage in main (which is no longer needed).
class App extends React.Component<any, any> {
  render() {
    const { todos, dispatch } = this.props;
    const actions = bindActionCreators(TodoActions, dispatch);

    return (
      <Paper zDepth={1} style={{margin:50, padding:20}}>
        <Header />
        <MainSection
          todos={todos}
          actions={actions}/>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

export default connect(mapStateToProps)(App);
