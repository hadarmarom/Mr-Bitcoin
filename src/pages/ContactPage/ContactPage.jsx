
import { Component } from 'react'
import { ContactList } from '../../cmps/ContactList/ContactList'
import './ContactPage.scss'

export class ContactPage extends Component {

    render() {
        return (
            <div>
                <h1>Contacts</h1>
                <ContactList onSelectContact={this.props.onSelectContact} contacts={this.props.contacts} />
            </div>
        )
    }
}
