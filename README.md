*This is an old project I no longer activly maintain. I've reimplemented this in Go in petermlm/RiftForum.*

This is an implementation of a simple forum in Node.js. It is inspired on
Simple Machine forums and phpBB, although it is way much simpler.

I made this in order to learn a few new technologies, namely Node.js.

# Implementation

## Backend

The backend is implemented in Node.js. It uses Express and a few other NPM
libraries.

## Database

The project uses PostgreSQL for everything. It also uses PostgreSQL stored
procedures to do some insertions.

## FrontEnd

The frontend is very simple. It uses JQuery and Bootstrap.

## Page Rendering

The HTML pages are rendered from EJS templates. No CSS templates are used.

## Authentication

Passwords are stored using Hash+Salt.

Authentication is done using Json Web Tokens. The token is stored in a cookie
client side. Nothing about authentication is stored in the server.
