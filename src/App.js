import "./App.css";
import React, { Component } from "react";
import shortid from "shortid";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import Form from "./components/Form/Form";
//================================================
import Modal from "./components/Modal/Modal";
import IconButton from "./components/IconButton/IconButton";
import { ReactComponent as AddIcon } from "./components/IconButton/add.svg";
import Container from "./components/Container/Container";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
    showModal: false,
  };

  //====================== retrieve from local storage ========================
  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  //===================================================================

  //====================== add to local storage ========================
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
  //===================================================================

  addContact = (data) => {
    const contact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };
    if (this.state.contacts.find((contact) => contact.name === data.name)) {
      alert(`${data.name} is already in contacts`);
      return;
    } else {
      this.setState((prevState) => ({
        contacts: [contact, ...prevState.contacts],
      }));
    }
    this.toggleModal();
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  //============ modal window ============================
  toggleModal = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };
  //======================================================

  render() {
    const { filter, showModal } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <Container>
        <IconButton onClick={this.toggleModal}>
          <AddIcon width="40" height="40" fill="#fff" />
        </IconButton>
        {/* modalmodalmodalmodalmodalmodalmodalmodalmodal */}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <div className="form-section">
              <b className="title">Phonebook</b>
              <div className="form">
                <Form onSubmit={this.addContact} />
              </div>
            </div>
            {/* <h1>My modal window</h1>
            <p>
              Lorem ipsum dolor sit amet, usu habeo erroribus cu, no ferri
              melius per. Nec graeci reprehendunt et, sit natum aliquam atomorum
              no. Enim assum instructior ut mel, et sit utroque dolores, meis
              meliore at duo. Dicam audiam legendos ne vim, nec id dignissim
              liberavisse, ne per tation atomorum volutpat.
            </p>
            <button type="button" onClick={this.toggleModal}>
              Close
            </button> */}
          </Modal>
        )}
        {/* modalmodalmodalmodalmodalmodalmodalmodalmodal */}
        {/* <div className="form-section">
          <b className="title">Phonebook</b>
          <div className="form">
            <Form onSubmit={this.addContact} />
          </div>
        </div> */}
        <div className="contacts-section">
          <b className="title">Contacts</b>
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </div>
      </Container>
    );
  }
}
export default App;
