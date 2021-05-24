import { useState } from 'react';
import firebase from '../firebase/firebase';
import { useAuth } from '../providers/UserProvider';

import ContactForm from '../components/ContactForm';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default function Contact(props) {
	const ref = firebase.firestore().collection('contacts');
	const { currentUser, simulateLogin } = useAuth();

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

	const [
		error,
		setError
	] = useState({ nameFirst: '', nameLast: '', email: '' });

	const startEdit = () => {
		setEdit(true);
	};

	const cancelEdit = () => {
		setEdit(false);
		setNameFirst(props.nameFirst);
		setNameLast(props.nameLast);
		setEmail(props.email);
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
							{(currentUser || simulateLogin) && (
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
					<div>
						<div className='text-center pt-5'>Editing Contact</div>
						<ContactForm
							formType='edit'
							cancelEdit={cancelEdit}
							defaultNameFirst={props.nameFirst}
							defaultNameLast={props.nameLast}
							defaultEmail={props.email}
							id={props.id}
						/>
					</div>
				)}
			</Card>
		</Container>
	);
}
