import React from 'react';
import SideBar from './components/SideBar.jsx';
import graphQLFetch from './graphql/graphQLFetch.js';

export default function Chatting(props) {
  const { user, contactList } = props;
  return (
    <div className="dogal-space-container">
      <SideBar />
      <ChatBox user={user} contactList={contactList} />
    </div>
  );
}

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.loadMessage = this.loadMessage.bind(this);
    this.handleSelectedChatter = this.handleSelectedChatter.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.state = {
      chatters: [],
      selectedChatter: undefined,
      selectedChatting: [],
    };
  }

  async componentDidMount() {
    const { contactList, user } = this.props;
    if (contactList === undefined || contactList.length === 0) {
      return;
    }
    const chatters = contactList.map((contact) => {
      const imgUrl = `./imgs/dog_imgs/${contact.pet_breed.toLowerCase().split(' ').join('-')}.png`;
      return {
        contactId: contact.contact_id,
        id: contact.pet_id,
        name: contact.pet_name,
        imgUrl,
      };
    });
    const selectedChatter = chatters[0];
    const selectedChatting = await this.loadMessage(user.pet_id, selectedChatter.id);
    this.setState({
      chatters,
      selectedChatter,
      selectedChatting,
    });
  }

  async loadMessage(usera, userb) {
    const getMessagesQuery = `mutation getAllMessages($usera: Int!, $userb: Int!){
      getAllMessages(usera: $usera, userb: $userb) {
        _id message_id contact_id sender_id receiver_id content sent_at
      }
    }`;
    const res = await graphQLFetch(getMessagesQuery, { usera, userb });
    if (res) {
      if (res.getAllMessages) {
        return res.getAllMessages;
      }
      console.error('[Failed]Failed to Load Messages.');
    }
    return [];
  }

  async handleSelectedChatter(chatter) {
    const { user } = this.props;
    const messages = await this.loadMessage(user.pet_id, chatter.id);
    this.setState({ selectedChatter: chatter, selectedChatting: messages });
  }

  async handleSendMessage(e) {
    e.preventDefault();
    const form = document.forms.sendMessageForm;
    const content = form.newMessage.value;

    const addMessageQuery = `mutation addMessages($message: MessageAddInputs!){
      addMessages(message: $message) {
        _id message_id contact_id sender_id receiver_id content sent_at
      }
    }`;
    const { selectedChatter } = this.state;
    const { user } = this.props;
    const newMessage = {
      contact_id: selectedChatter.contactId,
      sender_id: user.pet_id,
      receiver_id: selectedChatter.id,
      content,
    };
    const res = await graphQLFetch(addMessageQuery, { message: newMessage });
    if (res) {
      if (res.addMessages) {
        const { selectedChatting } = this.state;
        this.setState({ selectedChatting: [...selectedChatting, res.addMessages] });
      } else {
        alert('[Failed]Failed to Send new Message.');
      }
    } else {
      alert('[Error]Error Sending new Message.');
    }

    form.newMessage.value = '';
  }

  render() {
    const { chatters, selectedChatter, selectedChatting } = this.state;
    const { user } = this.props;
    return (
      <div className="chat-container">
        <div className="inbox-container">
          <div className="inbox-header">Inbox</div>
          <div className="inbox-list">
            {chatters
              && chatters.map((chatter) => (
                <InboxListItem
                  key={chatter.id}
                  chatter={chatter}
                  handleClick={this.handleSelectedChatter}
                />
              ))}
          </div>
        </div>
        { selectedChatter
          && (
          <div className="chatbox-container">
            <div className="chatbox-header-container">
              <img src={selectedChatter.imgUrl} width="32" height="32" alt={selectedChatter.name} />
              <span className="chatbox-header-name">{selectedChatter.name}</span>
            </div>
            <div className="chatbox-content-container">
              {selectedChatting
                && selectedChatting.map((message) => (
                  <div key={message.message_id} className={user.pet_id === message.sender_id ? 'message-right' : 'message-left'}>
                    <div className="message-bubble">{message.content}</div>
                  </div>
                ))}
            </div>
            <div className="chatbox-input-container">
              <form className="send-message-form" name="sendMessageForm" onSubmit={this.handleSendMessage}>
                <input className="new-message-input" type="text" name="newMessage" />
                <button className="send-message-button" type="submit">Send</button>
              </form>
            </div>
          </div>
          )}
      </div>
    );
  }
}

function InboxListItem(props) {
  const { chatter, handleClick } = props;
  return (
    <div className="inbox-list-item-container" onClick={() => handleClick(chatter)}>
      <img src={chatter.imgUrl} width="24" height="24" alt={chatter.name} />
      <div className="chat-brief-info">
        <div className="name">{chatter.name}</div>
      </div>
    </div>
  );
}
