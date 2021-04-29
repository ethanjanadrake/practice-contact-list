import React from 'react';

import classes from './Contact.module.css';

export default function Contact(props) {
	return (
		<div className={classes.Contact}>
			{props.name} {props.email}
			<button onClick={props.deleteContact}>X</button>
		</div>
	);
}
