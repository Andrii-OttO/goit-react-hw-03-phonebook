import React, { Component } from 'react';
import './App.css';
import style from './components/style.module.css';
import ContactForm from './components/input';
import Filter from './components/filter';
import ContactList from './components/contactList';

class App extends Component {
    state = {
        contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        filter: '',
    };
    // adds new contacts //
    submitHandler = data => {
        const { id, name, number } = data;
        const todo = {
            id,
            name,
            number,
        };

        //  alert //
        const sameContact = this.state.contacts.find(
            contact => contact.name.toLowerCase() === name.toLowerCase(),
        );
        if (sameContact) {
            //  this.deleteContact()
            alert(`${name}is already in contacts`);
        } else {
            this.setState(({ contacts }) => ({
                contacts: [...contacts, todo],
            }));
        }
    };
    // render contacts from localStorage//
    componentDidMount() {
        const contacts = localStorage.getItem('contacts');
        const parsedContacts = JSON.parse(contacts);
        if (parsedContacts) {
            this.setState({ contacts: parsedContacts });
        }
    }
    // write in to the localStorage
    componentDidUpdate(prevProps, prevState) {
        if (this.state.contacts !== prevState.contacts) {
            localStorage.setItem(
                'contacts',
                JSON.stringify(this.state.contacts),
            );
        }
    }
    // finde contacts(by filter)
    changeFilter = event => {
        this.setState({ filter: event.currentTarget.value });
    };

    FilterContacts = () => {
        const { filter, contacts } = this.state;
        const filtered = filter.toLowerCase();
        return contacts.filter(element =>
            element.name.toLowerCase().includes(filtered),
        );
    };

    // deleteContact = elem => {
    //     this.setState(() => {
    //         const { contacts } = this.state;
    //         const filteredItems = contacts.filter(e => e.id !== elem);
    //         return { contacts: filteredItems };
    //     });
    // };
    deleteContact = id => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(el => el.id !== id),
        }));
    };

    render() {
        const { filter } = this.state;
        const filteredElem = this.FilterContacts();
        return (
            <div className={style.container}>
                <div className={style.input}>
                    <h1 className={style.Phonebook}>Phonebook</h1>
                    <ContactForm onSubmit={this.submitHandler} />
                </div>
                <h2 className={style.contacts}>Contacts</h2>
                <Filter value={filter} onCange={this.changeFilter} />
                <ContactList
                    contacts={filteredElem}
                    deleteContact={this.deleteContact}
                />
            </div>
        );
    }
}

export default App;
