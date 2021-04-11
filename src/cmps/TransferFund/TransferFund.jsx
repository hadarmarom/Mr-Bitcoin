
import { Component } from 'react'
import { connect } from 'react-redux'
import contactService from '../../services/contactService'
import { transferCoins } from '../../store/actions/userActions'
import { saveContact, getContactById } from '../../store/actions/contactActions'

import './TransferFund.scss'

class _TransferFund extends Component {

    state = {
        contact: this.props.contact,
        amount: 0
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState({ [field]: value })
    }
    render() {
        const { contact, amount } = this.state
        if (!contact) return <h1>loadiv</h1>
        return (
            <div>
                <div>Transfer coins to {contact.name} </div>
                <form onSubmit={(ev) => {
                    ev.preventDefault()
                    return this.props.sendCoins(amount)
                }}>
                    <label htmlFor="amount">Amount</label>
                    <input type="number" id="amount" name="amount" value={amount} onChange={this.handleChange} />
                    <button>Transfer</button>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        // user: state.userReducer.user,
    }
}

const mapDispatchToProps = {
    transferCoins,
    saveContact,
    getContactById
}

export const TransferFund = connect(mapStateToProps, mapDispatchToProps)(_TransferFund)
