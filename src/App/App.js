import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import VerifyUser from './Pages/verifyUser.page';

class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path='/verify/:token' component={VerifyUser} />{' '}
					<Route path='/'>
						<p className='text-center'> hellow world </p>{' '}
					</Route>{' '}
				</Switch>{' '}
			</Router>
		);
	}
}

export default App;
