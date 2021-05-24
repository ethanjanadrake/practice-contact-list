// import {} from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase/firebase';
import { signInWithGoogle } from '../firebase/firebase';
import { useAuth } from '../providers/UserProvider';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import BootstrapNavbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function Navbar() {
	const { currentUser, logout, simulateLogin, toggleSimLog } = useAuth();

	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Container className='my-3'>
			<BootstrapNavbar className='d-flex justify-content-between'>
				<Nav.Item className='d-flex align-items-center'>
					<Link to='/home'>
						<Button className='btn-dark'>
							<i className='fas fa-dragon' />
						</Button>
					</Link>
					<h1 className='d-inline-block mx-3 my-0'>Contact List</h1>
				</Nav.Item>
				<Nav.Item className='d-flex align-items-center'>
					<h5 className='d-inline-block mx-3 my-0'>{currentUser && currentUser.email}</h5>
					<ButtonGroup>
						{!currentUser && (
							<Button
								onClick={toggleSimLog}
								className={`${simulateLogin ? 'btn-secondary' : 'btn-primary'}`}
							>
								{`${simulateLogin ? 'Simulate Logout' : 'Simulate Login'}`}
							</Button>
						)}
						<Button onClick={signInWithGoogle}>
							<i className='fab fa-google' /> <i className='fas fa-sign-in-alt' />
						</Button>
						{currentUser && (
							<Button onClick={handleLogout} className='btn-secondary'>
								<i className='fas fa-sign-out-alt' />
							</Button>
						)}
					</ButtonGroup>
				</Nav.Item>
			</BootstrapNavbar>
		</Container>
	);
}

export default Navbar;
