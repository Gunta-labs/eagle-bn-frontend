import '@babel/polyfill';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import VerifyUser from './Pages/VerifyUser.page';
import { Requests } from './Pages/RequestList.page';
import Login from './Pages/login.page.js';
import checkToken, { token } from '../helper/helper';
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
import BookAccommodation from '../App/Pages/book.accommodation.page';
import ManagerApproval from './Pages/manager.approval.page';
import { toast } from 'react-toastify';
import UserRole from './Pages/user.role';
import UpdateAccs from './Pages/update.accomodation';

toast.configure();
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
						path='/accommodations/:id/book'
						render={props =>
							token ? <BookAccommodation match={props.match} /> : <Redirect to='/login' />
						}
					/>
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
						render={props => (!token ? <Login /> : <Redirect to='/dashboard' />)}
					/>
					<Route path='/signup' exact component={SignUp} />
					<Route
						exact
						path='/request/create'
						render={props => (token ? <TripRequest /> : <Redirect to='/login' />)}
					/>
					<Route exact path='/accommodations' component={GetAllAccomodations} />
					<Route exact path='/accommodations/:id' component={singleAccomodations} />
					<Route
						exact
						path='/dashboard'
						render={props => (token ? <Dashboard /> : <Redirect to='/login' />)}
					/>
					<Route
						exact
						path='/manager'
						render={props =>
							token && checkToken().role === 'manager' ? (
								<ManagerApproval />
							) : (
								<Redirect to='/login' />
							)
						}
					/>
					<Route exact path='/accomodations' component={GetAllAccomodations} />
					<Route exact path='/accomodations/:id' component={singleAccomodations} />
					<Route exact path='/admin' component={UserRole} />
					<Route exact path='/accommodations/:id' component={singleAccomodations} />
					<Route exact path='/accommodations/:id/edit' component={UpdateAccs} />
					<Route path='*' component={NotFound} />
				</Switch>
			</Router>
		);
	}
}

export default App;
