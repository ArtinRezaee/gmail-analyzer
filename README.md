## Gmail Analyzer

This is an application that allows you to get snippets of your most frequently sent emails

## What would I do if I had more time?

 - Write unit and system tests for both frontend and server
 - Host the server on Google Compute Engine
 - Host the frontend on Firebase hosting
 - Setup CI/CD for both Frontend and Backend using Github actions
 - Better Natural Language Processing Algorithm to detect duplicates and not have to read/write from files in order to snippatize the emails
 - Better token management so the application doesn't rely on a token.json file
 - Implement pagination so the user can get more emails (This is already supported by the server)

## Why is this application not hosted?

The main challenge to hosting the application was token management. The application relies on oAuth2 tokens and the current implementation relies on a token.json file. I made an attempt to get around this but unfortunately was not successful. Here is the detail to my proposed workaround:

 - When user is unauthorized, create a token and an id. Store the token in Firestore with the id
 - Send the id back to the client and store in session storage
 - Send this id to the server with each request so the user can verify user's authorization
 - If the id doesn't exist in session stora