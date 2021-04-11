
import React, { Component } from 'react'
import contactService from '../../services/contactService'

import './ContactEdit.scss'

export class ContactEdit extends Component {

    inputRef = React.createRef()

    state = {
        contact: null,
        errMsg: ''
    }
    async componentDidMount() {
        const { id } = this.props.match.params
        try {
            const contact = id ? await contactService.getContactById(id) : contactService.getEmptyContact()
            this.setState({ contact }, () => {
                this.inputRef.current.focus()
                this.inputRef.current.select()
            })
        } catch (err) {
            this.setState({ errMsg: 'Contact Not Found' })
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({ contact: { ...prevState.contact, [field]: value } }))
    }
    onSaveContact = async (ev) => {
        ev.preventDefault()
        console.log(this.state.contact);
        await contactService.saveContact({ ...this.state.contact })
        this.props.history.push('/contact')
    }
    render() {
        if (!this.state.contact) return <div>{this.state.errMsg || 'Loading'}</div>
        const { name, email, phone } = this.state.contact
        return (
            <form className='contact-edit' onSubmit={this.onSaveContact}>
                <label htmlFor="name">Name</label>
                <input ref={this.inputRef} required type="text" id="name" value={name} onChange={this.handleChange} name="name" />

                <label htmlFor="email">email</label>
                <input required type="text" id="email" value={email} onChange={this.handleChange} name="email" />

                <label htmlFor="phone">Phone</label>
                <input required type="text" id="phone" value={phone} onChange={this.handleChange} name="phone" />

                <p>{this.state.errMsg}</p>
                <button>Save Contact</button>
            </form>
        )
    }
}
