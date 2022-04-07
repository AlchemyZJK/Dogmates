import React from 'react';
import SideBar from './components/SideBar.jsx';

export default function Chatting(props) {
  const { user } = props;
  return (
    <div className="dogal-space-container">
      <SideBar />
      <ChatBox user={user} />
    </div>
  );
}

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectedChatter = this.handleSelectedChatter.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.state = {
      chatters: [
        {
          id: 2, name: 'Lucky', imgUrl: './imgs/dog_imgs/border-collie.png', latestMessage: 'Welcome to my ...',
        },
        {
          id: 3, name: 'Percy', imgUrl: './imgs/dog_imgs/golden-retriever.png', latestMessage: 'Hey, let\'s ...',
        },
      ],
      selectedChatter: {
        id: 2, name: 'Lucky', imgUrl: './imgs/dog_imgs/border-collie.png', latestMessage: 'Welcome to my ...',
      },
      selectedChatting: [
        {
          id: 1, senderId: 1, receiverId: 2, content: 'Hello, Lucky.', time: new Date(2022, 4, 7, 12, 30, 45),
        },
        {
          id: 2, senderId: 2, receiverId: 1, content: 'Hi.', time: new Date(2022, 4, 7, 12, 33, 45),
        },
      ],
    };
  }

  handleSelectedChatter(chatter) {
    this.setState({ selectedChatter: chatter });
  }

  handleSendMessage(e) {
    e.preventDefault();
    const form = document.forms.sendMessageForm;
    const newMessage = form.newMessage.value;
    console.log(newMessage);
  }

  render() {
    const { chatters, selectedChatter, selectedChatting } = this.state;
    const { user } = this.props;
    return (
      <div className="chat-container">
        <div className="inbox-container">
          <div className="inbox-header">Inbox</div>
          <div className="inbox-list">
            {
              chatters.map((chatter) => (
                <InboxListItem
                  key={chatter.id}
                  chatter={chatter}
                  handleClick={this.handleSelectedChatter}
                />
              ))
            }
          </div>
        </div>
        <div className="chatbox-container">
          <div className="chatbox-header-container">
            <img src={selectedChatter.imgUrl} width="32" height="32" alt={selectedChatter.name} />
            <span className="chatbox-header-name">{selectedChatter.name}</span>
          </div>
          <div className="chatbox-content-container">
            {
              selectedChatting.map((message) => (
                <div key={message.id} className={user.id === message.senderId ? 'message-right' : 'message-left'}>
                  <div className="message-bubble">{message.content}</div>
                </div>
              ))
            }
          </div>
          <div className="chatbox-input-container">
            <form className="send-message-form" name="sendMessageForm" onSubmit={this.handleSendMessage}>
              <input className="new-message-input" type="text" name="newMessage" />
              <button className="send-message-button" type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function InboxListItem(props) {
  const { chatter, handleClick } = props;
  return (
    <div className="inbox-list-item-container" onClick={() => handleClick(chatter)}>
      <img src={chatter.imgUrl} width="48" height="48" alt={chatter.name} />
      <div className="chat-brief-info">
        <div className="name">{chatter.name}</div>
        <div className="latest-message">{chatter.latestMessage}</div>
      </div>
    </div>
  );
}
