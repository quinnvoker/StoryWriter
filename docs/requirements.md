# Goal

- Build a web app from start to finish using the tech and approaches learned to date
- Turn requirements into a working product
- Practice architecting an app in terms of UI/UX, Routes/API and Database
- Manage a multi-developer project with git
- Simulate the working world where you do not always get to completely cherry pick your team, stack or product features
- Practice demoing an app to help prepare for the final project and employer interviews

# Stack Requirements
Your projects must use:

- ES6 for server-side (NodeJS) code
- NodeJS
- Express
- RESTful routes
- One or more CSS or UI "framework"s:
- jQuery
- A CSS preprocessor such as SASS, Stylus, or PostCSS for styling -- or CSS Custom properties and no CSS preprocessor
- PostgreSQL and pg (with promises) for DBMS
- git for version control

## Optional Requirements
- SPA (Single-Page Application) Behaviour
- Hosting, such as heroku, netlify, github pages, AWS, or Azure
- Project Options

# Story Creator
An app that lets you write a story and lets other people contribute to that story. Users that created a story can select which contribution is worthy to the next part of the story, and reject all others.

## Requirements:
- authorized users can start a story
- users can add contributions to an existing story
- users can upvote a contribution
- users can see upvotes of a contribution
- creator of story can accept a contribution; this merges it to the rest of the story
- creator of a story can mark the story completed
- users can view a list of stories on the homepage along with their status e.g. in progress or completed
- users cannot add to a completed story
- users can read a story
