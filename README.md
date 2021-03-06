## Gmail Analyzer

This is an application that allows you to get snippets of your most frequently sent emails

![image](https://user-images.githubusercontent.com/22065489/131299267-cb898621-4f05-4d96-9bb7-0ff9315e95d4.png)

## What would I do if I had more time?

 - Write unit and system tests for both frontend and server
 - Host the server on Google Compute Engine
 - Host the frontend on Firebase hosting
 - Setup CI/CD for both Frontend and Backend using Github actions
 - Better Natural Language Processing Algorithm to detect duplicates and not have to read/write from files in order to snippatize the emails. The app currently relies on the [jscpd](https://github.com/kucherenko/jscpd) library
 - Use cookies for token management so the application doesn't rely on a token.json file
 - Implement pagination so the user can get more emails (This is already supported by the server)

## Why is this application not hosted?

The main challenge to hosting the application was token management. The application relies on oAuth2 tokens and the current implementation relies on a token.json file. I made an attempt to get around this but unfortunately was not successful
