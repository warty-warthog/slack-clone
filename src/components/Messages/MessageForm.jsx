import React from "react";
import firebase from "../../firebase";
import { Segment, Button, Input } from "semantic-ui-react";

class MessageForm extends React.Component {
  state = {
    message: "",
    loading: false,
    errors: [],
    user: this.props.currentUser,
    channel: this.props.currentChannel,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  message;

  createMessage = () => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL,
      },
      content: this.state.message,
    };

    return message;
  };

  sendMessage = () => {
    const { messagesRef } = this.props;
    const { message, channel } = this.state;
    if (message) {
      this.setState({ loading: true });
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: "", errors: [] });
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err),
          });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: "Add a message" }),
      });
    }
  };
  render() {
    const { errors, message, loading } = this.state;

    return (
      <Segment className="message__form">
        <Input
          onChange={this.handleChange}
          fluid
          value={message}
          name="message"
          style={{ marginBottom: "0.2em" }}
          label={<Button icon={"add"} />}
          labelPosition="left"
          placeholder="Write your message"
          className={
            errors.some((error) => error.message.includes("message"))
              ? "error"
              : ""
          }
        />

        <Button.Group icon widths="2">
          <Button
            disabled={loading}
            onClick={this.sendMessage}
            color="orange"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
          />

          <Button
            color="teal"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
        </Button.Group>
      </Segment>
    );
  }
}

export default MessageForm;
