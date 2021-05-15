import React, { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '../firebase/firebase';
export const UserContext = createContext();

export function useAuth() {
	return useContext(UserContext);
}

const UserProvider = (props) => {
	const [
		currentUser,
		setCurrentUser
	] = useState(null);

	function logout() {
		return auth.signOut();
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		logout
	};

	return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
};

export default UserProvider;
