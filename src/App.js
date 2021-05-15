import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserProvider from './providers/UserProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

import Contacts from './containers/Contacts';

function App() {
	return (
		<Router>
			<UserProvider>
				<Navbar />
				<Contacts />
				<Switch>
					<Route path='/home' exact />
				</Switch>
			</UserProvider>
		</Router>
	);
}

export default App;
