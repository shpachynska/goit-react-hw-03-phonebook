import React from "react";
import styles from "./ContactList.module.css";

function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul className={styles.Contact__list}>
      {contacts.map((contact) => (
        <li className={styles.ContactList__item} key={contact.id}>
          <span>{contact.name}:&nbsp;</span>
          <span>{contact.number}</span>
          <button
            id={contact.id}
            type="button"
            onClick={() => onDeleteContact(contact.id)}
            className={styles.button}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
