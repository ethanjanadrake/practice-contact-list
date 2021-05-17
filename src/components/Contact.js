import { useState } from 'react';
import firebase from '../firebase/firebase';
import { useAuth } from '../providers/UserProvider';

import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Contact(props) {
	const ref = firebase.firestore().collection('contacts');
	const { currentUser } = useAuth();

	const [
		edit,
		setEdit
	] = useState(false);

	const [
		nameFirst,
		setNameFirst
	] = useState(props.nameFirst);

	const [
		nameLast,
		setNameLast
	] = useState(props.nameLast);

	const [
		email,
		setEmail
	] = useState(props.email);

	const startEdit = () => {
		setEdit(true);
	};

	const updateContact = (event) => {
		event.preventDefault();

		ref.doc(props.id).set({ nameFirst, nameLast, email }).catch((err) => console.error(err));
		setEdit(false);
	};

	const deleteContact = (id) => {
		ref.doc(id).delete().catch((err) => console.error(err));
	};

	return (
		<Container className='mt-3'>
			<Card className='p-2'>
				{!edit && (
					<div className='d-flex align-items-center justify-content-between'>
						<div>
							<div>
								{props.nameFirst} {props.nameLast}
							</div>
							<div>{props.email}</div>
						</div>
						<div className='ml-3'>
							{currentUser && (
								<ButtonGroup>
									<Button onClick={startEdit}>
										<i className='fas fa-user-edit' />
									</Button>
									<Button onClick={() => deleteContact(props.id)} className='btn-danger'>
										<i className='fas fa-user-slash' />
									</Button>
								</ButtonGroup>
							)}
						</div>
					</div>
				)}
				{edit && (
					<Form onSubmit={updateContact} className='p-3 container'>
						<Row>
							<Form.Group className='p-3 col'>
								<Form.Label>First Name</Form.Label>
								<Form.Control
									type='text'
									placeholder='Name'
									value={nameFirst}
									onChange={(event) => setNameFirst(event.target.value)}
								/>
							</Form.Group>
							<Form.Group className='p-3 col'>
								<Form.Label>Last Name</Form.Label>
								<Form.Control
									type='text'
									placeholder='Name'
									value={nameLast}
									onChange={(event) => setNameLast(event.target.value)}
								/>
							</Form.Group>
						</Row>
						<Row>
							<Form.Group className='p-3 pt-0'>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type='email'
									placeholder='Email'
									value={email}
									onChange={(event) => setEmail(event.target.value)}
								/>
							</Form.Group>
						</Row>
						<div className='d-flex p-3 justify-content-end'>
							<ButtonGroup>
								<Button
									className='btn-secondary'
									onClick={() => {
										setEdit(false);
										setNameFirst(props.nameFirst);
										setNameLast(props.nameLast);
										setEmail(props.email);
									}}
								>
									<i className='fas fa-window-close' />
								</Button>
								<Button type='submit' className='btn-success'>
									<i className='fas fa-user-check' />
								</Button>
							</ButtonGroup>
						</div>
					</Form>
				)}
			</Card>
		</Container>
	);
}
