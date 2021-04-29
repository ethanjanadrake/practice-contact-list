import axios from '../../axios-contacts';
import React, { useState, useEffect } from 'react';

import Contact from '../../components/Contact/Contact';
import classes from './Contacts.module.css';

export default function Contacts(props) {
	const [
		name,
		setName
	] = useState('');

	const [
		email,
		setEmail
	] = useState('');

	const [
		contacts,
		setContacts
	] = useState([]);

	useEffect(() => {
		onContactChange();
	});

	const onContactChange = () => {
		axios.get('/contacts.json').then((res) => {
			const fetchedData = [];
			for (let key in res.data) {
				fetchedData.push({
					name  : res.data[key].name,
					email : res.data[key].email
				});
			}
			setContacts(fetchedData);
		});
	};

	const onSubmit = (event) => {
		event.preventDefault();
		axios
			.post('/contacts.json', {
				name,
				email
			})
			.then((response) => {
				onContactChange();
			});
	};

	const deleteContact = (email) => {
		axios.get('/contacts.json').then((res) => {
			for (let contact in res.data) {
				if (res.data[contact].email === email) {
					// WORKING HERE
					console.log();
				}
			}
		});
	};

	const contactList = contacts.map((contact) => {
		return (
			<Contact
				key={contact.email}
				email={contact.email}
				name={contact.name}
				deleteContact={() => deleteContact(contact.email)}
			/>
		);
	});

	return (
		<div>
			<div className={classes.ContactList}>
				<ul>{contactList}</ul>
			</div>
			<div className={classes.ContactForm}>
				<form onSubmit={onSubmit}>
					<label>Name</label>
					<input placeholder='Name' onChange={(event) => setName(event.target.value)} />
					<label>Email</label>
					<input placeholder='Email' onChange={(event) => setEmail(event.target.value)} />
					<button>Submit</button>
				</form>
			</div>
		</div>
	);
}
