<script>
    import {onMount} from 'svelte'
    import {auth, db} from '../lib/firebase/firebase'
	import { getDoc, doc, setDoc } from 'firebase/firestore';
    import { authStore } from '../store/store';

    const nonAuthRoutes = ['/', '/authenticate', '/about', 'product']

    onMount(() => {
        console.log("Mounting");
        const unsubscribe = auth.onAuthStateChanged(async user => {
            const currentPath = window.location.pathname;

            if (!user && !nonAuthRoutes.includes(currentPath)) {
                window.location.href = "/";
                return;
            }

            if (user && currentPath === "/authenticate") {
                window.location.href = "/dashboard";
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
                    email:  user.email,
                    todos: [],
                }
                await setDoc(userRef, dataToSetToStore, { merge: true })
            } else {
                const userData = docSnap.data()
                dataToSetToStore = userData;
            }
            authStore.update(curr => {
                return {
                    ...curr,
                    user,
                    data: dataToSetToStore,
                    loading: false,
                };
            })
        })
    })
</script>

<div class="mainContainer">
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/authenticate">login</a></li>
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
        margin-bottom: 20px; 
    }

    ul {
        list-style: none;
        display: flex;
        gap: 20px;
    }

    li {
        font-size: 1.2rem;
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

