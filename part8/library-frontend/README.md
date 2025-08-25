# Library

使用https://github.com/fullstack-hy2020/library-frontend作为开始.

## 8.8: Authors view

Implement an Authors view to show the details of all authors on a page.

## 8.9: Books view

Implement a Books view that shows the details of all books except their genres.

## 8.10: Adding a book

Implement a possibility to add new books to your application.

Make sure that the Authors and Books views are kept up to date after a new book is added.

In case of problems when making queries or mutations, check from the developer console what the server response is.

## 8.11: Authors birth year

Implement a possibility to set authors birth year. You can create a new view for setting the birth year, or place it on the Authors view.

Make sure that the Authors view is kept up to date after setting a birth year.

## 8.12: Authors birth year advanced

Change the birth year form so that a birth year can be set only for an existing author. Use [select tag](https://react.dev/reference/react-dom/components/select), [react select](https://github.com/JedWatson/react-select), or some other mechanism.

## 8.17 Listing books

After the backend changes, the list of books does not work anymore. Fix it.

## 8.18 Log in

Adding new books and changing the birth year of an author do not work because they require a user to be logged in.

Implement login functionality and fix the mutations.

It is not necessary yet to handle validation errors.

You can decide how the login looks on the user interface. One possible solution is to make the login form into a separate view which can be accessed through a navigation menu.

When a user is logged in, the navigation changes to show the functionalities which can only be done by a logged-in user.

## 8.19 Books by genre, part 1

Complete your application to filter the book list by genre.

In this exercise, the filtering can be done using just React.

## 8.20 Books by genre, part 2

Implement a view which shows all the books based on the logged-in user's favourite genre.

## 8.21 books by genre with GraphQL

In the previous two exercises, the filtering could have been done using just React. To complete this exercise, you should redo the filtering of the books based on a selected genre (that was done in exercise 8.19) using a GraphQL query to the server. If you already did so then you do not have to do anything.

This and the next exercise are quite **challenging**, like they should be this late in the course. It may help you to complete the easier exercises in the [next part](https://fullstackopen.com/en/part8/fragments_and_subscriptions) before doing 8.21 and 8.22.

## 8.22 Up-to-date cache and book recommendations

If you did the previous exercise, that is, fetch the books in a genre with GraphQL, ensure somehow that the books view is kept up to date. So when a new book is added, the books view is updated **at least** when a genre selection button is pressed.

When new genre selection is not done, the view does not have to be updated.

## 8.23: Subscriptions - server

Do a backend implementation for subscription 'bookAdded', which returns the details of all new books to its subscribers.

## 8.24: Subscriptions - client, part 1

Start using subscriptions in the client, and subscribe to 'bookAdded'. When new books are added, notify the user. Any method works. For example, you can use the `window.alert` function.

## 8.25: Subscriptions - client, part 2

Keep the application's book view updated when the server notifies about new books (you can ignore the author view!). You can test your implementation by opening the app in two browser tabs and adding a new book in one tab. Adding the new book should update the view in both tabs.

## 8.26: n+1

Solve the n+1 problem of the following query using any method you like.

```
query {
  allAuthors {
    name 
    bookCount
  }
}
```
