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

	const [
		simulateLogin,
		setSimulateLogin
	] = useState(false);

	const logout = () => {
		return auth.signOut();
	};

	const toggleSimLog = () => {
		setSimulateLogin(!simulateLogin);
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		simulateLogin,
		toggleSimLog,
		logout
	};

	return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
};

export default UserProvider;
