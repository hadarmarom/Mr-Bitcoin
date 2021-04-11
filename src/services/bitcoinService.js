import axios from "axios"
import { storageService } from "./storageService"

export const bitcoinService = {
    getRate,
    getMarketPrice,
    getConfirmedTransactions,
}

const RATE_KEY = 'bitcoin-rate';
const MARKET_PRICE_KEY = 'market-price';
const TRANSACTIONS_KEY = 'transactions';

async function getRate(coins) {
    const localRate = storageService.load(RATE_KEY);
    if (!localRate) {
        console.log('rate api...');
        const coinsApi = `https://blockchain.info/tobtc?currency=USD&value=${coins}`
        const rate = await axios.get(coinsApi)
        storageService.store(RATE_KEY, rate)
        return Promise.resolve(rate.data)
    } else {
        console.log('rate local...');
        return Promise.resolve(localRate.data)
    }
}

async function getMarketPrice() {
    const localMarketPrice = storageService.load(MARKET_PRICE_KEY);
    if (!localMarketPrice) {
        console.log('marketPrice api...');
        const marketApi = `https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`
        const marketPrice = await axios.get(marketApi)
        storageService.store(MARKET_PRICE_KEY, marketPrice)
        return Promise.resolve(marketPrice.data.values)
    } else {
        console.log('marketPrice local...');
        return Promise.resolve(localMarketPrice.data.values)
    }
}

async function getConfirmedTransactions() {
    const localTransactions = storageService.load(TRANSACTIONS_KEY);
    if (!localTransactions) {
        console.log('transactions api...');
        const tradeVolume = `https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true`
        const transactions = await axios.get(tradeVolume)
        storageService.store(TRANSACTIONS_KEY, transactions)
        console.log('transactions.data:', transactions.data)
        return Promise.resolve(transactions.data.values)
    } else {
        console.log('transactions local...');
        return Promise.resolve(localTransactions.data.values)
    }
}