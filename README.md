# Books

[Checkout the site on Heroku](https://page--turner.herokuapp.com/).

## Why?

The main focus of this project was for users to be able to collect books and get specific recommendations based on the books they already have.

By collecting a long list of detailed categories for each book and cross-referencing them to other books in a user’s collection, I was able to compile a unique list of categories for each user. This could reveal some subjects that a user might not have noticed on their own and expand their reading interest.

Users are also able to like books and mark them as ‘read’. They are also able to leave comments on books and read other users' comments on the same book, seeing how many people have liked or read the same book.

### MERN stack

**MongoDB, Express.js, React, Node.js**

### RESTful APIs -

https://www.googleapis.com/books
https://openlibrary.org

Used OpenLibrary API and Google Books API with user search call in order to get book details images and, most importantly, the categories associated with each book. This includes two calls to OpenLibrary and one additional call to Google for missing information.

### Authentication

When a user signs up **BcryptJs** hashes the password and **JsonWebToken** provides a token that can be exchanged for authenticated calls between the client and server-side.

Created an Authorization middleware using **JWT** that checks the header in each call for a valid token before executing any request and sending a status back.

### Avatar

Used **Malter** as part of a server-side middleware that uploads images and uses them as an avatar picture on a user's profile.
