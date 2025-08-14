# Blog List

Continue our work on the BlogList application that we worked on in parts four and five.

## 7.9: Automatic Code Formatting

In the previous parts, we used ESLint to ensure that the code follows the defined conventions. Prettier is yet another approach for the same. According to the documentation, Prettier is an opinionated code formatter, that is, Prettier not only controls the code style but also formats the code according to the definition.

Prettier is easy to integrate into the code editor so that when it is saved, it is automatically formatted.

Take Prettier to use in your app and configure it to work with your editor.

## State Management: Redux

There are two alternative versions to choose for exercises 7.10-7.13: you can do the state management of the application either using Redux or React Query and Context. If you want to maximize your learning, you should do both versions!

## 7.10: Redux, Step 1

Refactor the application to use Redux to manage the notification data.

## 7.11: Redux, Step 2

Note that this and the next two exercises are quite laborious but incredibly educational.

Store the information about blog posts in the Redux store. In this exercise, it is enough that you can see the blogs in the backend and create a new blog.

You are free to manage the state for logging in and creating new blog posts by using the internal state of React components.

## 7.12: Redux, Step 3

Expand your solution so that it is again possible to like and delete a blog.

## 7.13: Redux, Step 4

Store the information about the signed-in user in the Redux store.

## State Management: React Query and Context

There are two alternative versions to choose for exercises 7.10-7.13: you can do the state management of the application either using Redux or React Query and Context. If you want to maximize your learning, you should do both versions!

## 7.10: React Query and Context step 1

Refactor the app to use the useReducer-hook and context to manage the notification data.

## 7.11: React Query and Context step 2

Use React Query to manage the state for blog posts. For this exercise, it is sufficient that the application displays existing blogs and that the creation of a new blog is successful.

You are free to manage the state for logging in and creating new blog posts by using the internal state of React components.

## 7.12: React Query and Context step 3

Expand your solution so that it is again possible to like and delete a blog.

## 7.13: React Query and Context step 4

Use the useReducer-hook and context to manage the data for the logged in user.

## Views

The rest of the tasks are common to both the Redux and React Query versions.

## 7.14: Users view

Implement a view to the application that displays all of the basic information related to users.

## 7.15: Individual User View

Implement a view for individual users that displays all of the blog posts added by that user.

You can access this view by clicking the name of the user in the view that lists all users.

**NB**: you will almost certainly stumble across the error message "TypeError: Cannot read property 'name' of undefined" during this exercise.

The error message will occur if you refresh the individual user page.

The cause of the issue is that, when we navigate directly to the page of an individual user, the React application has not yet received the data from the backend. One solution for this problem is to use conditional rendering:

```jsx
const User = () => {
  const user = ...

  if (!user) {
    return null
  }

  return (
    <div>
      // ...
    </div>
  )
}
```

## 7.16: Blog View

Implement a separate view for blog posts.

Users should be able to access this view by clicking the name of the blog post in the view that lists all of the blog posts.

After you're done with this exercise, the functionality that was implemented in exercise 5.7 is no longer necessary. Clicking a blog post no longer needs to expand the item in the list and display the details of the blog post.

## 7.17: Navigation

Implement a navigation menu for the application.

## 7.18: Comments, step 1

Implement the functionality for commenting the blog posts.

Comments should be anonymous, meaning that they are not associated with the user who left the comment.

In this exercise, it is enough for the frontend to only display the comments that the application receives from the backend.

An appropriate mechanism for adding comments to a blog post would be an HTTP POST request to the 'api/blogs/:id/comments' endpoint.

## 7.19: Comments, step 2

Extend your application so that users can add comments to blog posts from the frontend.

## 7.20: Styles, step 1

Improve the appearance of your application by applying one of the methods shown in the course material.

## 7.21: Styles, step 2

You can mark this exercise as finished if you use an hour or more for styling your application.
