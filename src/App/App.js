import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import VerifyUser from './Pages/VerifyUser.page';
import Header from './Components/Header';
import Footer from './Components/Footer';

class App extends React.Component {
	render() {
		return (
			<Router>
				<Header />
				<Switch>
					<Route path='/users/verify/:token' component={VerifyUser} />
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
