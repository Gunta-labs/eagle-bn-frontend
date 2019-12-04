import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import VerifyUser from './Pages/VerifyUser.page';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ResetPassword from './Pages/reset.password.page';
import RequestResetPassword from './Pages/request.reset.password.page';

class App extends React.Component {
	render() {
		return (
			<Router>
				<Header />
				<Switch>
					<Route path='/users/verify/:token' component={VerifyUser} />
					<Route exact path='/password/reset' component={RequestResetPassword} />
					<Route exact path='/users/reset-password/:token' component={ResetPassword} />
					<Route path='/'>
						<p className='text-center'> hellow world </p>
					</Route>
				</Switch>
				<Footer />
			</Router>
		);
	}
}

export default App;
