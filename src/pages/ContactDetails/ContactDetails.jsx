
import { Component } from 'react'
import { Link } from 'react-router-dom';
import { TransferFund } from '../../cmps/TransferFund/TransferFund';
import contactService from '../../services/contactService'
import { connect } from 'react-redux'
import { setCurrContact } from '../../store/actions/contactActions'
import { transferCoins } from '../../store/actions/userActions'
import { saveContact } from '../../store/actions/contactActions'
import './ContactDetails.scss'
import backIcon from '../../assets/icons/back.png'
import coinsIcon from '../../assets/icons/coins.png'
import editIcon from '../../assets/icons/edit.png'
import deleteIcon from '../../assets/icons/delete.png'

class _ContactDetails extends Component {

    state = {
        contact: this.props.contact
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        await this.props.setCurrContact(id)
        this.setState({ contact: this.props.contact }, () => console.log('this.state:', this.state))
    }
    componentDidUpdate() {
        console.log('updated!');
    }

    deleteContact = async (id) => {
        await contactService.deleteContact(id)
        this.props.history.push('/contact')
    }
    sendCoins = async (amount) => {
        this.props.transferCoins(amount, this.state.contact._id)
        let contact = { ... this.state.contact, coins: this.state.contact.coins + amount }
        const { updatedContact } = await this.props.saveContact(contact)
        this.setState({ contact: updatedContact })
    }

    render() {
        const { contact } = this.state
        if (!contact) return <h1>Div loading</h1>
        return (
            <div className="contact-details-container">
                <img src={`https://robohash.org/${contact._id}`} alt="" />
                <h2>{contact.name}</h2>
                <h4>{contact.phone}</h4>
                <h4>{contact.email}</h4>
                <h4>{contact.coins} <img src={coinsIcon} alt="Coins" /></h4>
                <TransferFund sendCoins={this.sendCoins} contact={contact} />
                <Link className="link" to="/contact"><img src={backIcon} alt="Back" /></Link>
                <Link className="link" to={"/contact/edit/" + contact._id}><img src={editIcon} alt="Edit" /></Link>
                <p onClick={() => this.deleteContact(contact._id)}><img src={deleteIcon} alt="Delete contact" /></p>
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
    setCurrContact,
    transferCoins,
    saveContact,
}

export const ContactDetails = connect(mapStateToProps, mapDispatchToProps)(_ContactDetails)