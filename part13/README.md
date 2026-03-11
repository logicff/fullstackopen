# Relational databases

...

# Exercise

## 1. Repository and the Database

In the exercises of this course part, we will build a blog application backend similar to the exercises in part 4 (opens in a new tab). The backend we build should be compatible with the frontend in part 5, except for error handling. We will also add various features to the backend that the frontend in part 5 will not know how to use.

Create a GitHub repository for the application. If you are using a private repository, add the GitHub user *mluukkai* as a collaborator.

Make sure that you also have a Postgres database for the application, and that you can establish a psql console connection to the database. You can

* create the database in aiven.io,
* use Docker to run the database in your computer, or
* install Postgres to your computer

## 2. Console connection

In the psql-console create a *blogs* table for the application with the following columns:

* id (unique, incrementing id)
* author (string)
* url (string that cannot be empty)
* title (string that cannot be empty)
* likes (integer with default value zero)

Add at least two blogs to the database.

Save the SQL commands you used at the root of the application repository in a file called `commands.sql`.

## 3. Connecting form app

Create a file called `cli.js` that connects to the database and prints all blogs to the console in a readable format, for example,.as follows:

```bash
$ node cli.js
Executing (default): SELECT * FROM blogs
Dan Abramov: 'On let vs const', 0 likes
Matti Luukkainen: 'Kun MOOCit Helsingin yliopistoon tulivat', 0 likes
```

## 4. Web app is born

Create a web application that supports the following operations

* `GET api/blogs` (list all blogs)
* `POST api/blogs` (add a new blog)
* `DELETE api/blogs/:id` (delete a blog)

The application is started by running `npm start` in the root of the exercise repository.

## 5. Better structure

Change the structure of your application to match the example above, or to follow some other similar clear convention.

My directory structure and files look like:

```bash
index.js
app.js
util
  config.js
models
  index.js
  blog.js
routes
  blogs.js
```

## 6. Moar likes

Implement support for changing the number of a blog's likes in the application,that is, the operation

`PUT /api/blogs/:id` (modifying the like count of a blog)

The updated number of likes is at the request body:

```json
{
  "likes": 3
}
```

## 7. Clean error handling

Centralize the application error handling in middleware, as in part 3.

At this stage, the situations that require error handling in the application are creating a new blog and changing the number of likes for a blog. Ensure that the error handler handles both of these in an appropriate manner.

For now you do not need to worry about the format of the error messages.

## 8. Let there be users

Add support for users to the application. In addition to ID, users have the following fields:

* name (string, must not be empty)
* username (string, must not be empty)

Unlike in the material, do not prevent Sequelize from creating [timestamps](https://sequelize.org/master/manual/model-basics.html#timestamps) *created_at* and *updated_at* for users

All users can have the same password as the material. You can also choose to properly implement passwords as in part 4.

Implement the following routes

* `POST api/users` (adding a new user)
* `GET api/users` (listing all users)
* `PUT api/users/:username` (changing a user's name, keep in mind that the parameter is not id but username)

Make sure that the timestamps *created_at* and *updated_at* automatically set by Sequelize work correctly when creating a new user and changing a username.

## 9. Better errors

Sequelize provides a set of pre-defined [validations](https://sequelize.org/master/manual/validations-and-constraints.html) for the model fields, which it performs before storing the objects in the database.

It's decided to change the user creation policy so that only a valid email address is valid as a username. Email addresses should be unique, so no two users should have the same email address. Implement validation that verifies this issue during the creation of a user.

Modify the error handling middleware to provide a more descriptive error message of the situation (for example, using the Sequelize error message), e.g.

```json
{
  "error": [
    "username must be a valid email address"
  ]
}
```

## 10. Blog ownership

Extend the application so that the blog is linked to a logged-in user identified by a token. This means you will also need to implement an endpoint that returns the token and handles the login process: `POST /api/login`.

## 11. Control the destruction

Make deletion of a blog only possible for the user who added the blog.

## 12. User of blogs and blogs of users

Modify the routes for retrieving all blogs and all users so that each blog shows the user who added it, and each user shows the blogs they have added.

## 13. Search

Implement filtering by keyword in the application for the route returning all blogs. The filtering should work as follows

* `GET /api/blogs?search=react` returns all blogs with the search word *react* in the title field, the search word is case-insensitive
* `GET /api/blogs` returns all blogs

[This](https://sequelize.org/master/manual/model-querying-basics.html#operators) should be useful for this task and the next one.

## 14. Better search

Expand the filter to search for a keyword in either the *title* or *author* fields, i.e.

`GET /api/blogs?search=jami` returns blogs with the search word *jami* in the *title* field or in the *author* field.

## 15. Ordering

Modify the blogs route so that it returns blogs based on likes in descending order. Search the [documentation](https://sequelize.org/master/manual/model-querying-basics.html) for instructions on ordering.

## 16. Authors

Make a route for the application `/api/authors` that returns the number of blogs for each author and the total number of likes. Implement the operation directly at the database level. You will most likely need the [group by](https://sequelize.org/master/manual/model-querying-basics.html#grouping) functionality, and the [sequelize.fn](https://sequelize.org/master/manual/model-querying-basics.html#specifying-attributes-for-select-queries) aggregator function.

The JSON returned by the route might look like the following, for example:

```json
[
  {
    author: "Jami Kousa",
    articles: "3",
    likes: "10"
  },
  {
    author: "Robert C. Martin",
    articles: "1",
    likes: "2"
  },
  {
    author: "Dan Abramov",
    articles: "1",
    likes: "4"
  }
]
```

Bonus: Order the data returned based on the number of likes, and do the ordering in the database query.

## 17. Checkup

In repository https://github.com/fullstack-hy2020/tests/tree/main/fs-psql there is a set of tests that you should run to see that your application is going to right direction. Do now the following

* Add an endpoint `POST /api/reset` that empties both the database tables
* Add a endpoint `GET /` that return responds with HTTP 200

* Copy the directories `tests` and `.github` from the above repository to the root of your project, and add these to the repository
* Add an npm script `"test": "node --test --test-concurrency=1 tests/api_ch3.test.js",` to your project

**Note that tests assume that**

* when tests are run locally, the app should be started and running in http://localhost:3001
* The database address is defined with env variable `DATABASE_URL` 

The file `.github/workflows/test.yaml` defines a GitHub Action workflow that runs the tests also on GitHub when you push the code. Make sure the tests work.

## 18. Set up migrations

Delete all tables from your application's database.

Make a migration that initializes the database.

Add `created_at` and `updated_at` [timestamps](https://sequelize.org/master/manual/model-basics.html#timestamps) for both tables. Keep in mind that you will have to add them in the migration yourself.

**NOTE**: be sure to remove the commands `User.sync()` and `Blog.sync()`, which synchronizes the models' schemas from your code, otherwise your migrations will fail.

**NOTE2**: if you have to delete tables from the command line (i.e. you don't do the deletion by undoing the migration), you will have to delete the contents of the `migrations` table if you want your program to perform the migrations again.

## 19. Remember the year

Expand your application (by migration) so that the blogs have a year written attribute, i.e. a field `year` which is an integer at least equal to 1991 but not greater than the current year. Make sure the application gives an appropriate error message if an incorrect value is attempted to be given for a year written.

## 20. Reading list

Give users the ability to add blogs to a *reading list*. When added to the reading list, the blog should be in the *unread state*. The blog can later be marked as *read*. Implement the reading list using a join table. Make database changes using migrations.

In this exercise, you don’t need to implement the features yet, “add to reading list” or “display reading list” in the app. Those will be added in the next exercise!

## 21. Expanding the reading list

Now add functionality to the application to support the reading list.

Adding a blog to the reading list is done by making an HTTP POST to the path `/api/readinglists`, the request will be accompanied with the blog and user id:

```json
{
  "blogId": 5,
  "userId": 3
}
```

Make sure to give appropriate error message in case of not valid userId or blogId.

Also modify the individual user route `GET /api/users/:id` to return not only the user's other information but also the reading list, e.g., in the following format:

```json
{
  name: "Matti Luukkainen",
  username: "mluukkai@iki.fi",
  readings: [
    {
      id: 3,
      url: "https://google.com",
      title: "Clean React",
      author: "Dan Abramov",
      likes: 34,
      year: null,
    },
    {
      id: 4,
      url: "https://google.com",
      title: "Clean Code",
      author: "Bob Martin",
      likes: 5,
      year: null,
    }
  ]
}
```

At this point, information about whether the blog is read or not does not need to be available.

## 22. Bookkeeping

Expand the single-user route so that each blog in the reading list shows also whether the blog has been read and the id of the corresponding join table row.

For example, the information should be in the following form:

```json
{
  name: "Matti Luukkainen",
  username: "mluukkai@iki.fi",
  readings: [
    {
      id: 3,
      url: "https://google.com",
      title: "Clean React",
      author: "Dan Abramov",
      likes: 34,
      year: null,
      readinglists: [
        {
          read: false,
          id: 2
        }
      ]
    },
    {
      id: 4,
      url: "https://google.com",
      title: "Clean Code",
      author: "Bob Martin",
      likes: 5,
      year: null,
      readinglists: [
        {
          read: false,
          id: 3
        }
      ]
    }
  ]
}
```

Note: there are several ways to implement this functionality. [This](https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/#the-best-of-both-worlds-the-super-many-to-many-relationship) should help.

Note also that despite having an array field readinglists in the example, it should always just contain exactly one object, the join table entry that connects the book to the particular user's reading list.

## 23. Better bookkeeping

Implement functionality in the application to mark a blog in the reading list as read. Marking as read is done by making a request to the `PUT /api/readinglists/:id` path, and sending the request with

```json
{ "read": true }
```

The user can only mark the blogs in their own reading list as read. The user is identified as usual from the token accompanying the request.

## 24. More control

Modify the route that returns a single user's information so that one can control which of the blogs in the reading list are returned:

* `GET /api/users/:id` returns the entire reading list
* `GET /api/users/:id?read=true` returns blogs that have been read
* `GET /api/users/:id?read=false` returns blogs that have not been read

## 25. Grande finale

At the end of part 4 there was a mention of problems related to token authentication: if a user's access rights to the system are revoked, the user can still use the token in their possession to access the system.

The usual solution to this is to store each token issued to the client in the backend database and to check with each request whether the token is still valid. In this case, the validity of the token can be removed immediately if necessary. Such a solution is often referred to as a `server-side session`.

Now expand the system so that the user who has lost access will not be able to perform any actions that require login.

You will need at least the following for the implementation

* a boolean value column in the user table to indicate whether the user is disabled
    * it is sufficient to disable and enable users directly from the database
* a table _sessions_ that stores active sessions
    * A session is stored in the table when a user logs in, i.e. operation `POST /api/login`
    * The existence (and validity) of the session is always checked when the user makes an operation that requires login
    * The corresponding model should be called `Session`
* a route that allows the user to "log out" of the system, i.e., to practically remove active sessions from the database, the route should be `DELETE /api/logout`

Keep in mind that actions requiring login should not be successful with an "expired token", i.e., with the same token after logging out.

You may also choose to use some purpose-built npm library to handle sessions.

Make the database changes required for this task using migrations.

## 26. The final check

In the repository https://github.com/fullstack-hy2020/tests/tree/main/fs-psql there are more tests to cover the changes made in this Chapter. Do now the following

* Extend the endpoint `POST /api/reset` so that it empties also the new tables
* Modify the npm script for testing to be `"test": "node --test --test-concurrency=1",`

Run tests to ensure everything works. Make sure that also the file `.github/workflows/test.yaml` is in your repository and GitHub actions run your rests succesfully.

**Note that tests assume that**

* when tests are run locally, the app should be started and running in http://localhost:3001
* The database address is defined with env variable `DATABASE_URL`

## 27. Your GitHub repository

In this exercise, you should only tell us what your submission repository is.

Note that if you are using a private repository, add the GitHub user `mluukkai` as a collaborator. If the repository can not be accessed, your course is not graded.