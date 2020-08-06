import React from "react";
import firebase from "../../firebase";
import { Segment, Comment } from "semantic-ui-react";
import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm";

class Messages extends React.Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    channel: this.props.currentChannel,
    user: this.props.currentUser
  };

  render() {
    const { messagesRef, channel, user } = this.state;
    return (
      <React.Fragment>
        <MessageHeader />

        <Segment>
          <Comment.Group className="messages">{/* Messages */}</Comment.Group>
        </Segment>

        <MessageForm currentUser={user} currentChannel={channel} messagesRef={messagesRef} />
      </React.Fragment>
    );
  }
}

export default Messages;
