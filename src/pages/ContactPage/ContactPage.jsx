
import { Component } from 'react'
import { ContactList } from '../../cmps/ContactList/ContactList'
import './ContactPage.scss'
import contactIcon from '../../assets/icons/contact.png'

export class ContactPage extends Component {

    render() {
        return (
            <div className="contact-page-container">
                <h1>Contacts</h1>
                <h1><img src={contactIcon} alt="Add Contact" /></h1>
                <ContactList onSelectContact={this.props.onSelectContact} contacts={this.props.contacts} />
            </div>
        )
    }
}
