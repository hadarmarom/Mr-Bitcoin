import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import { AppHeader } from './cmps/AppHeader';
import { BitcoinApp } from './pages/BitcoinApp/BitcoinApp';
import { ContactDetails } from './pages/ContactDetails';
import { ContactEdit } from './pages/ContactEdit';
import { HomePage } from './pages/HomePage';
import { SignUp } from './pages/SignUp/SignUp';
import { StatisticPage } from './pages/StatisticPage';

const _App = (props) => {
  const loggedinUser = props.user
  return (
    <Router>
      <div className="App">
        {loggedinUser && <AppHeader />}
        <Switch >
          <Route component={ContactEdit} path='/contact/edit/:id?' />
          <Route component={ContactEdit} path='/contact/edit' />
          <Route component={ContactDetails} path='/contact/:id' />
          <Route component={StatisticPage} path='/statistic' />
          <Route component={BitcoinApp} path='/contact' />
          <Route component={HomePage} path='/profile' />
          <Route component={SignUp} path='/' />
        </Switch>
      </div>
    </Router >
  );
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
  }
}

export const App = connect(mapStateToProps)(_App)