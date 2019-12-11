import '@babel/polyfill';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import VerifyUser from './Pages/VerifyUser.page';
import Request from './Pages/RequestList.page';
import Login from './Pages/login.page.js';
import checkToken from '../helper/helper';
import Dashboard from '../App/Pages/dashboard';
import Footer from './Components/Footer';
import ResetPassword from './Pages/reset.password.page';
import RequestResetPassword from './Pages/request.reset.password.page';
import { SignUp } from './Pages/signup.page';

const isAuth = checkToken();
export class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path='/users/verify/:token' component={VerifyUser} />{' '}
					<Route exact path='/requests' component={isAuth ? Request : Login} />
					<Route path='/'>
						<p className='text-center'> hellow world </p>{' '}
					</Route>{' '}
					<Route path='/users/verify/:token' component={VerifyUser} />
					<Route exact path='/password/reset' component={RequestResetPassword} />
					<Route exact path='/users/reset-password/:token' component={ResetPassword} />
					<Route exact path='/'>
						<p className='text-center'> hellow world </p>
					</Route>
					<Route
						exact
						path='/login'
						render={props => (!isAuth ? <Login /> : <Redirect to='/dashboard' />)}
					/>
					<Route path='/signup' exact component={SignUp} />
					<Route exact path='/dashboard' component={Dashboard} />
				</Switch>
				<Footer />
			</Router>
		);
	}
}

export default App;
