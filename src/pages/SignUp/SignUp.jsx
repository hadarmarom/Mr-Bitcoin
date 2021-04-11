
import { Component } from 'react'
import { connect } from 'react-redux'
import { userService } from '../../services/userService'
import { loadUser } from '../../store/actions/userActions'
import './SignUp.scss'

class _SignUp extends Component {

    state = {
        username: '',
        loggedinUser: null,
    }

    componentDidMount() {
        if (this.props.user) this.props.history.push('/contact')
        this.setState({ loggedinUser: this.props.user })
    }


    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState({ [field]: value })
    }

    render() {
        const { username, loggedinUser } = this.state
        return (
            <section>
                <form className="contact-filter" onSubmit={(ev) => {
                    ev.preventDefault()
                    this.props.loadUser(username)
                    this.props.history.push('/contact')
                }}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Username" value={username} onChange={this.handleChange} />
                    <button>Sign-Up</button>
                </form>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
    }
}

const mapDispatchToProps = {
    loadUser
}

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(_SignUp)