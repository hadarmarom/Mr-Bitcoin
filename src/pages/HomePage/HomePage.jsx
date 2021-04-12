import { connect } from 'react-redux'
import { Component } from 'react'
import { bitcoinService } from '../../services/bitcoinService.js'
import './HomePage.scss'
import { Link } from 'react-router-dom'
import { loadUser } from '../../store/actions/userActions'


class _HomePage extends Component {

    state = {
        user: null,
        rate: null,
    }

    async componentDidMount() {
        if (!this.props.user) return
        this.setState({ user: this.props.user }, async () => {
            this.setState({ rate: await bitcoinService.getRate(this.state.user.coins) })
        })
    }

    render() {
        const { user, rate } = this.state
        if (!user) return <Link to="/login">Please login</Link>
        if (!rate) return <h1>Loading</h1>
        return (
            <div>
                <h1>Profile</h1>
                <h4>Name: {user.name}</h4>
                <h4>Coins: {user.coins}</h4>
                <h4>Rate: {rate}</h4>
                <button onClick={async () => {
                    await this.props.loadUser(null)
                    console.log('user:', user)
                    this.props.history.push('/')
                }}>Logout</button>
            </div>
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

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)