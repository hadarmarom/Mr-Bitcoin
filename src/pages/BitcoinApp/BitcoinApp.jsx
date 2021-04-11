
import { Component } from 'react'
import { Link } from 'react-router-dom'
import { ContactFilter } from '../../cmps/ContactFilter'
import { ContactPage } from '../ContactPage'
import { connect } from 'react-redux'
import { loadContacts, setCurrContact } from '../../store/actions/contactActions'
import './BitcoinApp.scss'

class _BitcoinApp extends Component {

    state = {
        contacts: null,
        filterBy: null,
    }

    async componentDidMount() {
        await this.props.loadContacts(this.state.filterBy)
        this.setState({ contacts: this.props.contacts })
    }

    onSelectContact = (contactId) => {
        this.props.setCurrContact(contactId)
    }

    onChangeFilter = (filterBy) => {
        this.setState({ filterBy }, async () => {
            await this.props.loadContacts(this.state.filterBy)
            this.setState({ contacts: this.props.contacts })
        })
    }

    render() {
        const { contacts } = this.state
        if (!contacts) return <h1>div loading</h1>
        return (
            <div>
                <Link className="link" to="/contact/edit/">Add Contact</Link>
                <ContactFilter onChangeFilter={this.onChangeFilter} />
                <ContactPage contacts={contacts} onSelectContact={this.onSelectContact} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        contacts: state.contactReducer.contacts,
    }
}

const mapDispatchToProps = {
    loadContacts,
    setCurrContact
}

export const BitcoinApp = connect(mapStateToProps, mapDispatchToProps)(_BitcoinApp)