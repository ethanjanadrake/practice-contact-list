import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Contacts from './containers/Contacts/Contacts';

function App() {
	return (
		<div className='App'>
			<Router>
				<Navbar />
				<Contacts />
				<Switch>
					<Route path='/' exact />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
