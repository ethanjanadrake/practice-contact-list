import React, { useState, useEffect, useRef } from 'react';
import firebase from '../firebase/firebase';
import { useAuth } from '../providers/UserProvider';

import Contact from '../components/Contact';
import ContactForm from '../components/ContactForm';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function Contacts(props) {
	const ref = firebase.firestore().collection('contacts');
	const { currentUser, simulateLogin } = useAuth();

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
				console.log('effect ran');
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
			{(currentUser || simulateLogin) && (
				<Card>
					<div className='text-center pt-5'>Add Contact</div>
					<ContactForm formType='add' />
				</Card>
			)}
			<Card className='mt-5 pb-3'>
				{!(currentUser || simulateLogin) && (
					<p className='m-4 mb-0 text-muted'>Log in with Google or Simulate Login to edit Contact List</p>
				)}
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
