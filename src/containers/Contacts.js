import React, { useState, useEffect, useRef } from 'react';
import firebase from '../firebase/firebase';
import { useAuth } from '../providers/UserProvider';
import validator from 'validator';

import Contact from '../components/Contact';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function Contacts(props) {
	const ref = firebase.firestore().collection('contacts');
	const { currentUser } = useAuth();

	const nameRef = useRef(null);
	const emailRef = useRef(null);

	const [
		name,
		setName
	] = useState('');

	const [
		email,
		setEmail
	] = useState('');

	const [
		nameError,
		setNameError
	] = useState('');

	const [
		emailError,
		setEmailError
	] = useState('');

	const [
		contacts,
		setContacts
	] = useState([]);

	const [
		sortMethod,
		setSortMethod
	] = useState('timestamp');

	const [
		sortAscend,
		setSortAscend
	] = useState(true);

	useEffect(() => {
		const getContacts = () => {
			ref.onSnapshot((querySnapshot) => {
				const items = [];
				querySnapshot.forEach((doc) => {
					const item = doc.data();
					item.id = doc.id;
					items.push(item);
				});
				setContacts(items);
			});
		};

		console.log('effect ran');

		getContacts();
	}, []);

	const sortContacts = () => {
		if (!sortAscend) {
			return contacts.sort((a, b) => (a[sortMethod] < b[sortMethod] ? 1 : -1));
		}
		return contacts.sort((a, b) => (a[sortMethod] > b[sortMethod] ? 1 : -1));
	};

	const validName = () => {
		if (name.length > 0) {
			setNameError('');
			return true;
		}
		setNameError('Please type a name here');
		return false;
	};

	const validEmail = () => {
		if (validator.isEmail(email)) {
			setEmailError('');
			return true;
		}
		setEmailError('Invalid Email Address');
		return false;
	};

	const validateAdd = () => {
		const valName = validName();
		const valEmail = validEmail();
		if (valName && valEmail) {
			return true;
		}
		return false;
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if (validateAdd()) {
			ref.doc().set({ name, email, timestamp: new Date().getTime() }).catch((err) => {
				console.error(err);
			});
			setName('');
			setEmail('');
			nameRef.current.value = '';
			emailRef.current.value = '';
		}
	};

	const contactList = sortContacts().map((contact) => {
		return (
			<Contact
				key={contact.id}
				id={contact.id}
				email={contact.email}
				name={contact.name}
				timestamp={contact.timestamp}
			/>
		);
	});

	return (
		<Container>
			{currentUser && (
				<Card>
					<Form onSubmit={onSubmit} className='p-3'>
						<Form.Group className='p-3'>
							<div className='d-flex justify-content-between'>
								<Form.Label>Name</Form.Label>
								<p className='text-danger'>{nameError}</p>
							</div>
							<Form.Control
								className={`${nameError === '' ? '' : 'is-invalid'}`}
								ref={nameRef}
								type='text'
								placeholder='Name'
								onChange={(event) => setName(event.target.value)}
							/>
						</Form.Group>
						<Form.Group className='p-3 pt-0'>
							<div className='d-flex justify-content-between'>
								<Form.Label>Email</Form.Label>
								<p className='text-danger'>{emailError}</p>
							</div>
							<Form.Control
								className={`${emailError === '' ? '' : 'is-invalid'}`}
								ref={emailRef}
								type='email'
								placeholder='Email'
								onChange={(event) => setEmail(event.target.value)}
							/>
						</Form.Group>
						<div className='d-flex p-3 justify-content-end'>
							<Button type='submit' className='btn-success'>
								<i className='fas fa-user-plus' />
							</Button>
						</div>
					</Form>
				</Card>
			)}
			<Card className='mt-5 pb-3'>
				{!currentUser && <p className='m-4 mb-0 text-muted'>Log in with Google to edit Contact List</p>}
				<div className='m-4 mb-0 d-flex justify-content-end'>
					<Dropdown as={ButtonGroup}>
						<Button
							className='btn-secondary btn-sm'
							onClick={() => {
								setSortAscend(!sortAscend);
							}}
						>
							{sortAscend && <i className='fas fa-sort-up' />}
							{!sortAscend && <i className='fas fa-sort-down' />}
						</Button>
						<Dropdown.Toggle split variant='info'>
							Sort <span className='text-capitalize'>{sortMethod} </span>
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item
								onClick={() => {
									setSortMethod('timestamp');
								}}
							>
								Timestamp
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => {
									setSortMethod('name');
								}}
							>
								Name
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => {
									setSortMethod('email');
								}}
							>
								Email
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
				<div className='p-2'>{contactList}</div>
			</Card>
		</Container>
	);
}
