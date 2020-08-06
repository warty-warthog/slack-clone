import React from 'react';
import { Grid } from 'semantic-ui-react';
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';
import { connect } from 'react-redux';
import './App.css';

const App = (props) => (
  <Grid columns="equal" className="app" style={{ background: "#eee" }}>

    <ColorPanel />
    {/* Passing the current user from state as a prop to the SidePanel */}
    <SidePanel currentUser={props.currentUser} />

    <Grid.Column style={{ marginLeft: 320 }}>
    <Messages />
    </Grid.Column>
    
    <Grid.Column width={4}>
    <MetaPanel />
    </Grid.Column>

  </Grid>
);

// mapStateToProps is initialized on the main App component so that all the state from redux will be controlled 
// by App, so it shares the state to its child components through props

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(App);
