import React from "react";
import { Grid } from "semantic-ui-react";
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import { connect } from "react-redux";
import "./App.css";

const App = ({ currentChannel, currentUser }) => (
  <Grid columns="equal" className="app" style={{ background: "#eee" }}>
    <ColorPanel />
    {/* Passing the current user from state as a prop to the SidePanel */}
    <SidePanel key={currentUser && currentUser.uid} currentUser={currentUser} />

    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages
        key={currentChannel && currentChannel.id}
        currentChannel={currentChannel}
        currentUser={currentUser}
      />
    </Grid.Column>

    <Grid.Column width={4}>
      <MetaPanel />
    </Grid.Column>
  </Grid>
);

// mapStateToProps is initialized on the main App component so that all the state from redux will be controlled
// by App, so it shares the state to its child components through props

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
});

export default connect(mapStateToProps)(App);
