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

	const nameFirstRef = useRef(null);
	const nameLastRef = useRef(null);
	const emailRef = useRef(null);

	const [
		contactInput,
		setContactInput
	] = useState({ nameFirst: '', nameLast: '', email: '' });

	const [
		error,
		setError
	] = useState({ nameFirst: '', nameLast: '', email: '' });

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
		console.log('effect ran');
		const getContacts = async () => {
			await ref.onSnapshot((querySnapshot) => {
				const items = [];
				querySnapshot.forEach((doc) => {
					const item = doc.data();
					item.id = doc.id;
					items.push(item);
				});
				setContacts(items);
			});
		};

		getContacts();
	}, []);

	const sortContacts = (itemListToSort) => {
		console.log('sorting');
		const itemList = [];

		for (const item in itemListToSort) {
			itemList.push({ ...itemListToSort[item] });
		}

		if (itemList.length === 0) {
			return itemList;
		}
		if (!sortAscend) {
			if (typeof itemList[0][sortMethod] === 'string') {
				return itemList.sort((a, b) => (a[sortMethod].toLowerCase() < b[sortMethod].toLowerCase() ? 1 : -1));
			}
			else {
				return itemList.sort((a, b) => (a[sortMethod] < b[sortMethod] ? 1 : -1));
			}
		}
		else {
			if (typeof itemList[0][sortMethod] === 'string') {
				return itemList.sort((a, b) => (a[sortMethod].toLowerCase() > b[sortMethod].toLowerCase() ? 1 : -1));
			}
			else {
				return itemList.sort((a, b) => (a[sortMethod] > b[sortMethod] ? 1 : -1));
			}
		}
	};

	const validateNotEmpty = (property) => {
		if (contactInput[property].length > 0) {
			return '';
		}
		else {
			return 'Missing Input';
		}
	};

	const validateAdd = () => {
		const updatedError = {};

		updatedError.nameFirst = validateNotEmpty('nameFirst');
		updatedError.nameLast = validateNotEmpty('nameLast');

		if (validator.isEmail(contactInput.email)) {
			updatedError.email = '';
		}
		else {
			updatedError.email = 'Invalid Email Address';
		}

		setError({ nameFirst: updatedError.nameFirst, nameLast: updatedError.nameLast, email: updatedError.email });
		console.log(error);

		if (error.nameFirst === '' && error.nameLast === '' && error.email === '') {
			return true;
		}

		return false;
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if (validateAdd()) {
			ref
				.doc()
				.set({
					nameFirst : contactInput.nameFirst,
					nameLast  : contactInput.nameLast,
					email     : contactInput.email,
					timestamp : new Date().getTime()
				})
				.catch((err) => {
					console.error(err);
				});
			setContactInput({ nameFirst: '', nameLast: '', email: '' });
			nameFirstRef.current.value = '';
			nameLastRef.current.value = '';
			emailRef.current.value = '';
		}
	};

	const contactList = sortContacts(contacts).map((contact) => {
		return (
			<Contact
				key={contact.id}
				id={contact.id}
				email={contact.email}
				nameFirst={contact.nameFirst}
				nameLast={contact.nameLast}
				timestamp={contact.timestamp}
			/>
		);
	});

	return (
		<Container>
			{currentUser && (
				<Card className='container'>
					<Form onSubmit={onSubmit} className='p-3'>
						<div className='row p-3'>
							<Form.Group className='col'>
								<div className='d-flex justify-content-between'>
									<Form.Label>First Name</Form.Label>
									<p className='text-danger'>{error.nameFirst}</p>
								</div>
								<Form.Control
									className={`${error.nameFirst === '' ? '' : 'is-invalid'}`}
									ref={nameFirstRef}
									type='text'
									placeholder='First Name'
									onChange={(event) =>
										setContactInput({ ...contactInput, nameFirst: event.target.value })}
								/>
							</Form.Group>
							<Form.Group className='col'>
								<div className='d-flex justify-content-between'>
									<Form.Label>Last Name</Form.Label>
									<p className='text-danger'>{error.nameLast}</p>
								</div>
								<Form.Control
									className={`${error.nameLast === '' ? '' : 'is-invalid'}`}
									ref={nameLastRef}
									type='text'
									placeholder='First Name'
									onChange={(event) =>
										setContactInput({ ...contactInput, nameLast: event.target.value })}
								/>
							</Form.Group>
						</div>
						<div className='row p-3 pt-0'>
							<Form.Group className='pt-0'>
								<div className='d-flex justify-content-between'>
									<Form.Label>Email</Form.Label>
									<p className='text-danger'>{error.email}</p>
								</div>
								<Form.Control
									className={`${error.email === '' ? '' : 'is-invalid'}`}
									ref={emailRef}
									type='email'
									placeholder='Email'
									onChange={(event) =>
										setContactInput({ ...contactInput, email: event.target.value })}
								/>
							</Form.Group>
						</div>
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
									setSortMethod('nameFirst');
								}}
							>
								First Name
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => {
									setSortMethod('nameLast');
								}}
							>
								Last Name
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
