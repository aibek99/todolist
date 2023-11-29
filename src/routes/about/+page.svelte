<!-- src/routes/about/+page.svelte -->

<body>
	<div class="content">
		<h1>About this project!</h1>
		<p>
			Welcome to Assignment project, a website designed to help you keep track of your assignments!
			This project is a simple CMS that mimics the features of a CRUD system, enabling users to
			create, read, update and delete.
		</p>

		<p>
			I used the latest technologies to implement this project, including SvelteKit with Javascript,
			ESLint, and Prettier for the frontend, and firebase for the backend.
		</p>
		<p>
			In conclusion, Assignment tool is designed to make it easy for you to manage your assignments.
			With simple CMS, you can keep track of your assignments, update your schedule, and manage your
			assignments with ease
		</p>
	</div>
</body>

<style>
	body {
		min-height: 100vh;
		background: linear-gradient(to right, #000428, #000046);
		color: white;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.content {
		padding: 20px;
		margin: 10%;
	}

	h1 {
		font-size: 2.5rem;
		text-align: center;
		margin-bottom: 20px;
		text-transform: uppercase;
	}

	p {
		font-size: 1.2rem;
		line-height: 1.5;
		margin-bottom: 20px;
	}
</style>
