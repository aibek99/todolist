import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { writable } from 'svelte/store';
import { auth } from '../lib/firebase/firebase';

export const authStore = writable({
	user: null,
	loading: true,
	data: {},
	signedIn: false
});

export const authHandlers = {
	signup: async (email, pass) => {
		await createUserWithEmailAndPassword(auth, email, pass);
		authStore.update((store) => {
			return { ...store, signedIn: true };
		});
	},
	login: async (email, pass) => {
		await signInWithEmailAndPassword(auth, email, pass);
		authStore.update((store) => {
			return { ...store, signedIn: true };
		});
	},
	logout: async () => {
		await signOut(auth);
		authStore.update((store) => {
			return { ...store, signedIn: false };
		});
	}
};
