import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';

class App extends Component {
  state = {
    contacts: [],
    screen: 'create'
  }
  
  componentWillMount() {
    ContactsAPI.getAll().then(contacts => {
      this.setState({ contacts: contacts })
    })
  }
  
  removeContact = (contact) => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => c.id !== contact.id)
    }));
    ContactsAPI.remove(contact)
  }
  render() {
    return (
      <div className="App">
        {this.state.screen === 'list' &&(
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
          />
        )}
        {this.state.screen === 'create' && (
          <CreateContact/>
        )}
        
      </div>
    );
  }
}

export default App;
