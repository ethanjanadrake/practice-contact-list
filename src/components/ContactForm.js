import { useRef, useState } from 'react';
import firebase from '../firebase/firebase';
import validator from 'validator';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function ContactForm(props) {
	const ref = firebase.firestore().collection('contacts');

	const nameFirstRef = useRef(null);
	const nameLastRef = useRef(null);
	const emailRef = useRef(null);

	const [
		contactInput,
		setContactInput
	] = useState({ nameFirst: props.defaultNameFirst, nameLast: props.defaultNameLast, email: props.defaultEmail });

	const [
		touched,
		setTouched
	] = useState(false);

	const [
		error,
		setError
	] = useState({ nameFirst: null, nameLast: null, email: null });

	const validateNotEmpty = (property) => {
		if (contactInput[property] && contactInput[property].length > 0) {
			return true;
		}
		return false;
	};

	const validateAdd = () => {
		const updatedError = {};

		let valid = true;

		if (!validateNotEmpty('nameFirst')) {
			updatedError.nameFirst = 'Missing Input';
			valid = false;
		}
		else {
			updatedError.nameFirst = '';
		}

		if (!validateNotEmpty('nameLast')) {
			updatedError.nameLast = 'Missing Input';
			valid = false;
		}
		else {
			updatedError.nameLast = '';
		}

		if (contactInput.email && validator.isEmail(contactInput.email)) {
			updatedError.email = '';
		}
		else {
			updatedError.email = 'Invalid Email Address';
			valid = false;
		}

		setError({ nameFirst: updatedError.nameFirst, nameLast: updatedError.nameLast, email: updatedError.email });
		return valid;
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		if (validateAdd()) {
			console.log('validated');
			if (props.formType === 'edit') {
				await ref
					.doc(props.id)
					.set({
						nameFirst : contactInput.nameFirst,
						nameLast  : contactInput.nameLast,
						email     : contactInput.email
					})
					.catch((err) => console.error(err));
				props.cancelEdit();
			}
			else {
				await ref
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
		}
		setTouched(true);
		return;
	};

	return (
		<Form onSubmit={onSubmit} className='p-3 container'>
			<div className='row p-3'>
				<Form.Group className='col'>
					<div className='d-flex justify-content-between'>
						<Form.Label>First Name</Form.Label>
						<div className='text-danger'>{touched ? error.nameFirst : ''}</div>
					</div>
					<Form.Control
						className={`${error.nameFirst !== '' && touched ? 'is-invalid' : ''}`}
						ref={nameFirstRef}
						type='text'
						placeholder='First Name'
						value={contactInput.nameFirst}
						onChange={(event) => setContactInput({ ...contactInput, nameFirst: event.target.value })}
					/>
				</Form.Group>
				<Form.Group className='col'>
					<div className='d-flex justify-content-between'>
						<Form.Label>Last Name</Form.Label>
						<div className='text-danger'>{touched ? error.nameLast : ''}</div>
					</div>
					<Form.Control
						className={`${error.nameLast !== '' && touched ? 'is-invalid' : ''}`}
						ref={nameLastRef}
						type='text'
						placeholder='Last Name'
						value={contactInput.nameLast}
						onChange={(event) => setContactInput({ ...contactInput, nameLast: event.target.value })}
					/>
				</Form.Group>
			</div>
			<div className='row p-3 pt-0'>
				<Form.Group className='pt-0'>
					<div className='d-flex justify-content-between'>
						<Form.Label>Email</Form.Label>
						<div className='text-danger'>{touched ? error.email : ''}</div>
					</div>
					<Form.Control
						className={`${error.email !== '' && touched ? 'is-invalid' : ''}`}
						ref={emailRef}
						type='email'
						placeholder='Email'
						value={contactInput.email}
						onChange={(event) => setContactInput({ ...contactInput, email: event.target.value })}
					/>
				</Form.Group>
			</div>
			<div className='d-flex p-3 justify-content-end'>
				{props.formType === 'add' && (
					<Button type='submit' className='btn-success'>
						<i className='fas fa-user-plus' />
					</Button>
				)}
				{props.formType === 'edit' && (
					<ButtonGroup>
						<Button className='btn-secondary' onClick={props.cancelEdit}>
							<i className='fas fa-window-close' />
						</Button>
						<Button type='submit' className='btn-success'>
							<i className='fas fa-user-check' />
						</Button>
					</ButtonGroup>
				)}
			</div>
		</Form>
	);
}
