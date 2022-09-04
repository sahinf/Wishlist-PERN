# About

This project was for CSCE 310 Databases course. 
The goals of the assignment were to implement a non-nosql database project of our choosing. We decided on a wishlist application to allow with 4 user and 4 admin features (as required by the guidelines).

When I had started on this project, I had no idea what a fullstack application meant. Our only required objective was to implement something that met our 8 feature sets that relied on non-nosql database queries. I used the opportunity to become familiar with the following tools.

## PERN

| Acronym | What | Why |
|---------|------|-----|
|P (PostgreSQL) | An opensource database with a strong reputation for flexibility, reliability, and support for technical standards (such as database schema) | I was introduced to PostgreSQL in CSCE 315 and my upcomming internship may task me with projects using PostgreSQL |
|E (Express) | Framework (based on node.js) that provides a simple API for building webapps | I used Express to implement our APIs. I use it with `CORS` to jumpstart the application *and* handle all middleware (API routes). It makes it so that when you end up at the URL `https://www.<hostname>/<route>`, then express will look for my defined `backend/routes/<route>.js` to handle that specific request (POST, GET, DELETE, PUT) |
|R (React) | A "framework" (more like patch-job of npm libraries) for handling UI (frontend)  | I chose to use a frontend framework because for learning purposes. I chose React due to its popularity and recommendations by webdevs. The frontend of this project has React components for each page (pages defined through React NavLink), and makes use of React Hooks to pass state from parent components to child components and vice versa in order to make API calls using the data passed up from child to parent.  |
|N (Node) | A run-time environment for building server-side event driven i/o applications using Javascript | Nodes allows us to use Express and I, again, chose it due to popularity |

# Use locally

(Won't work)

The backend relies on my PostgreSQL flavored AWS Relation Database (RDS) server. I have closed the instance as the project is finished and I would continue being charged if left open. 

Even if a new RDS server is created and the correct hostname/password for the server are used in `backend/db/index.js` (such as through updating the `.env` file), the database would need to be populated with at least the same schema that we used in order for queries to succeed.

# Backend explanation

The server launches off of express in `backend/app.js`. It mounts all the routes as defined in `backend/routes/index.js`. I follow this structure because it is recommended by the [node-postgres docs](https://node-postgres.com/guides/project-structure). Each `<route>` is defined in `backend/routes/<route>.js` and then mounted in the index. Each route makes use of `backend/db/index.js` to make queries. This module creates a `Pool` imported from npm's `pg` library using the credentials to connect to a PostgreSQL server. 

## Example
[backend/routes/user.js](./backend/routes/user.js) will acuire a `Pool` from the mentioned db folder. It then defines:

```js
//* Get all users
router.get('/', async (req, res) => {
  const query = await db.query('SELECT * FROM users');
  res.send(query.rows);
})
```
to handle GET request to the url `<hostname>/users`. It makes a database query to get all users and returns an array of users.

```js
//* Get specific user
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query('SELECT * FROM users WHERE users_id = $1', [id]);
  console.log(rows[0])
  res.send(rows[0]);
})
```
This route returns a specific user given an `id` through `<hostname>/users/id` using `id` as the `user_id` primary key.

```js
//* Update password (or anything) of a user
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const newPass = body['password'];
  const update = await db.query('UPDATE users SET user_password = $1 WHERE users_id = $2', [newPass, id]);
  res.json('User was updated');
})
```

And here we handle a PUT request whose body should ideally contain a
```js
{
    'password': '<user_input_of_new_password>'
}
```

to use as the new password. This API call is made when a user that is logged in wants to update their password.

### Testing backend without any frontend

My favorite tool that I discovered during this process has undoubtedly been [Postman](https://www.postman.com/downloads/). Postman allows you to specifically test API calls. For example, I would test the exact API call that a React component that needs to see all users will make through `http://127.0.0.1:8080/users` by inputting that into Postman as a GET request. Postman would then display the result of that call as defined by [backend/routes/user.js](./backend/routes/user.js).


