<!-- src/routes/about/+page.svelte -->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Page</title>
</head>

<body>
    <div class="content">
        <h1>About this project!</h1>
        <p>Welcome to Assignment project, a website designed to help you keep track of your assignments! This project is a simple CMS that mimics the features of a CRUD system, enabling users to create, read, update</p>

        <p>Each item in CMS is accessible through a unique URL path, providing a straightforward way to navigate through your data. Whether you want to view your classes or assignments, update your class or assignment, Assignment website features several pages to help you manage your schedule. The homepage provides a quick overview of your schedule, while the about page offers more information about this project and how>

        <p>I used the latest technologies to implement this project, including SvelteKit with TypeScript, ESLint, and Prettier for the frontend, and ***** for the backend. This ensures that website is not only user->

        <p>In conclusion, Assignment tool is designed to make it easy for you to manage your assignments. With simple CMS, you can keep track of your assignments, update your schedule, and manage your todos with eas>
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
</html>
