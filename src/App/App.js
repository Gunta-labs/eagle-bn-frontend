import '@babel/polyfill';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import VerifyUser from './Pages/VerifyUser.page';
import { Requests } from './Pages/RequestList.page';
import Login from './Pages/login.page.js';
import { token } from '../helper/helper';
import Dashboard from '../App/Pages/dashboard';
import ResetPassword from './Pages/reset.password.page';
import RequestResetPassword from './Pages/request.reset.password.page';
import GetAllAccomodations from '../App/Pages/accomodations';
import singleAccomodations from './Pages/singleAccomodation';
import { SignUp } from './Pages/signup.page';
import CreateAccommodation from '../App/Pages/create.accommodation.page';
import { checkSupplierOrtAdmin } from '../helper/checkRole';
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
						render={props => (token ? <Requests /> : <Redirect to='/login' />)}
					/>
					<Route path='/users/verify/:token' component={VerifyUser} />
					<Route exact path='/password/reset' component={RequestResetPassword} />
					<Route
						exact
						path='/accommodation/create'
						render={props =>
							token ? (
								checkSupplierOrtAdmin() ? (
									<CreateAccommodation />
								) : (
									<Redirect to='/dashboard' />
								)
							) : (
								<Redirect to='/login' />
							)
						}
					/>
					<Route exact path='/users/reset-password/:token' component={ResetPassword} />
					<Route exact path='/' component={LandingPage} />
					<Route
						exact
						path='/login'
						render={props =>
							!token ? <Login location={props.location} /> : <Redirect to='/dashboard' />
						}
					/>
					<Route path='/signup' exact component={SignUp} />
					<Route
						exact
						path='/request/create'
						render={props => (token ? <TripRequest /> : <Redirect to='/login' />)}
					/>
					<Route exact path='/accomodations' component={GetAllAccomodations} />
					<Route exact path='/accomodations/:id' component={singleAccomodations} />
					<Route
						exact
						path='/dashboard'
						render={props => (token ? <Dashboard /> : <Redirect to='/login' />)}
					/>
					<Route exact path='/'>
						<p className='text-center'> hello world </p>
					</Route>
					<Route path='*' component={NotFound} />
					<Route exact path='/accomodations' component={GetAllAccomodations} />
					<Route exact path='/accomodations/:id' component={singleAccomodations} />
					/>
				</Switch>
			</Router>
		);
	}
}

export default App;
