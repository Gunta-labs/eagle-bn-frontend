import '@babel/polyfill';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import VerifyUser from './Pages/VerifyUser.page';
import Request from './Pages/RequestList.page';
import Login from './Pages/login.page.js';
import { token } from '../helper/helper';
import Dashboard from '../App/Pages/dashboard';
import Footer from './Components/Footer';
import ResetPassword from './Pages/reset.password.page';
import RequestResetPassword from './Pages/request.reset.password.page';
import { SignUp } from './Pages/signup.page';
import TripRequest from './Pages/trip.request.page';
import NotFound from './Pages/not.found.page';
import LandingPage from './Pages/landing.page';

export class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path='/users/verify/:token' component={VerifyUser} />{' '}
					<Route
						exact
						path='/requests'
						render={props => (token ? <Request /> : <Redirect to='/login' />)}
					/>
					<Route path='/users/verify/:token' component={VerifyUser} />
					<Route exact path='/password/reset' component={RequestResetPassword} />
					<Route exact path='/users/reset-password/:token' component={ResetPassword} />
					<Route exact path='/' component={LandingPage} />
					<Route
						exact
						path='/login'
						render={props => (!token ? <Login /> : <Redirect to='/dashboard' />)}
					/>
					<Route path='/signup' exact component={SignUp} />
					<Route exact path='/dashboard' component={Dashboard} />
					<Route
						exact
						path='/request/create'
						render={props => (token ? <TripRequest /> : <Redirect to='/login' />)}
					/>
					<Route path='*' component={NotFound} />
				</Switch>
				<Footer />
			</Router>
		);
	}
}

export default App;
