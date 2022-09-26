import React, { Component } from "react";
import { nanoid } from "nanoid";

//COMPONENTS
import Section from "./components/Section";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    if (contacts?.length) {
      this.setState({
        contacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }

  addContact = (contact) => {
    if (this.isDublicate(contact)) {
      return alert(`${contact.name} - is already in contacts`);
    }
    this.setState((prev) => {
      const newContact = {
        id: nanoid(),
        ...contact,
      };
      return {
        contacts: [...prev.contacts, newContact],
      };
    });
  };

  removeContact = (id) => {
    this.setState((prev) => {
      const newContact = prev.contacts.filter((item) => item.id !== id);
      return {
        contacts: newContact,
      };
    });
  };

  onChangeFilter = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  isDublicate({ name, number }) {
    const { contacts } = this.state;
    const result = contacts.find(
      (item) => item.name === name && item.number === number
    );
    return result;
  }
  getFiltredContacts() {
    const { contacts, filter } = this.state;

    if (!filter) {
      return contacts;
    }
    const normalisedFilter = filter.toLocaleLowerCase();
    const filtredContacts = contacts.filter(({ name }) => {
      const normalisedName = name.toLocaleLowerCase();
      const result = normalisedName.includes(normalisedFilter);
      return result;
    });
    return filtredContacts;
  }

  render() {
    const { addContact, onChangeFilter, removeContact } = this;
    const { filter } = this.state;
    const contacts = this.getFiltredContacts();
    const length = this.state.contacts.length;

    return (
      <Section title={"Task - 2 Contact book"}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h1>Contacts</h1>
        <Filter onChangeFilter={onChangeFilter} filter={filter} />
        {length > 0 ? (
          <ContactList items={contacts} removeContact={removeContact} />
        ) : (
          <p>Contact list is empty.</p>
        )}
      </Section>
    );
  }
}
