
import { Component } from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { bitcoinService } from '../../services/bitcoinService';
import './Chart.scss'

export class Chart extends Component {

    state = {
        marketPrices: null,
        transactions: null,
    }

    async componentDidMount() {
        const prices = await bitcoinService.getMarketPrice()
        const transactions = await bitcoinService.getConfirmedTransactions()
        this.setState({ marketPrices: prices.map(p => p.y), transactions: transactions.map(t => t.y) })
    }

    render() {
        const { marketPrices, transactions } = this.state
        if (!marketPrices && !transactions) return <h1>div loading</h1>
        return (
            <div>
                <Sparklines data={marketPrices}>
                    <SparklinesLine color="blue" />
                </Sparklines>
                <Sparklines data={transactions}>
                    <SparklinesLine color="blue" />
                </Sparklines>
            </div>
        )
    }
}
