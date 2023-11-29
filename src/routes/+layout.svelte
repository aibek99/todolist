<script>
	import { onMount } from 'svelte';
	import { auth, db } from '../lib/firebase/firebase';
	import { getDoc, doc, setDoc } from 'firebase/firestore';
	import { authStore, authHandlers } from '../store/store';

	let loggedIn = false;

	const nonAuthRoutes = ['/', '/authenticate', '/about', 'product'];

	authStore.subscribe(async (store) => {
		loggedIn = store.signedIn;
	});

	onMount(() => {
		console.log('Mounting');
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			const currentPath = window.location.pathname;

			if (!user && !nonAuthRoutes.includes(currentPath)) {
				window.location.href = '/';
				return;
			}

			if (!user) {
				return;
			}

			let dataToSetToStore;

			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);
			if (!docSnap.exists()) {
				const userRef = doc(db, 'user', user.uid);
				dataToSetToStore = {
					email: user.email,
					assignments: []
				};
				await setDoc(userRef, dataToSetToStore, { merge: true });
			} else {
				const userData = docSnap.data();
				dataToSetToStore = userData;
			}
			authStore.update((curr) => {
				return {
					...curr,
					user,
					data: dataToSetToStore,
					loading: false,
					signedIn: true
				};
			});

			if (loggedIn && currentPath === '/authenticate') {
				window.location.href = '/assignment';
				return;
			}
		});
	});
</script>

<div class="mainContainer">
	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			{#if loggedIn}
				<li><a href="/assignment">Assignment</a></li>
				<li><a href="/classes">Classes</a></li>
				<li><a href="/about">About</a></li>
				<li>
					<a href="/" on:click={authHandlers.logout}>
						<i class="fa-solid fa-right-from-bracket" /> Logout
					</a>
				</li>
			{:else}
				<li><a href="/about">About</a></li>
				<li><a href="/authenticate">Login</a></li>
			{/if}
		</ul>
	</nav>
	<slot />
</div>

<style>
	.mainContainer {
		min-height: 100vh;
		background: linear-gradient(to right, #000428, #000046);
		color: white;
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 20px;
	}

	nav {
		margin-bottom: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	ul {
		list-style: none;
		display: flex;
		position: relative;
		gap: 25px;
	}

	li {
		font-size: 2rem;
	}

	a {
		text-decoration: none;
		color: white;
		transition: 0.3s ease;
	}

	a:hover {
		color: cyan;
	}
</style>
