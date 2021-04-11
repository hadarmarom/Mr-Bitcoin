
import { Component } from 'react'
import { Link } from 'react-router-dom';
import { TransferFund } from '../../cmps/TransferFund/TransferFund';
import contactService from '../../services/contactService'
import { connect } from 'react-redux'
import { setCurrContact } from '../../store/actions/contactActions'


import './ContactDetails.scss'

class _ContactDetails extends Component {

    state = {
        contact: null
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        await this.props.setCurrContact(id)
        console.log('this.props.contact :', this.props.contact )
        this.setState({ contact: this.props.contact },()=>console.log('this.state:', this.state))
    }
    componentDidUpdate(){
        console.log('updated!');
    }

    deleteContact = async (id) => {
        await contactService.deleteContact(id)
        this.props.history.push('/contact')
    }

    render() {
        const { contact } = this.state
        if (!contact) return <h1>Div loading</h1>
        return (
            <div className="contact-details">
                <img src={`https://robohash.org/${contact._id}`} />
                <h2>{contact.name}</h2>
                <h4>{contact.phone}</h4>
                <h4>{contact.email}</h4>
                <h4>{contact.coins} coins</h4>
                <button onClick={() => this.deleteContact(contact._id)}>Delete Contact</button>
                <Link className="link" to="/contact">Back</Link>
                <Link className="link" to={"/contact/edit/" + contact._id}>Edit</Link>
                <TransferFund contact={contact} />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        contact: state.contactReducer.currContact,
    }
}

const mapDispatchToProps = {
    setCurrContact
}

export const ContactDetails = connect(mapStateToProps, mapDispatchToProps)(_ContactDetails)