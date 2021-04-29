import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';

function Navbar() {
	return (
		<div className={classes.Navbar}>
			<Link to='/'>
				<i className='fas fa-dragon' />
			</Link>
		</div>
	);
}

export default Navbar;
