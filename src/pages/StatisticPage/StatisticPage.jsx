
import { Component } from 'react'
import { Chart } from '../../cmps/Chart'

import './StatisticPage.scss'

export class StatisticPage extends Component {

    render() {
        return (
            <div>
                <h1>StatisticPage</h1>
                <Chart />
            </div>
        )
    }
}