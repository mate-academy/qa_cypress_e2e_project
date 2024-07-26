# User Flow Testing - POM

## Project Description

This project covers key aspects of user experience, including:

- User registration and login.
- User data modification.
- Creating, editing, and deleting articles.
- Interaction with other users.

Testing includes both positive and negative test cases. Page Object Model (POM) was used to enhance code readability and facilitate easier modifications `cypress`/`support`/`pages`.
Each element interacted with by the code has been assigned a `data-cy` attribute.

Additionally, `cy.task` was utilized for improved server interaction. API was employed for creating new users and articles directly on the site.

## How to Run the Project

- Fork the repo.
- Clone **your** forked repository.
- Run `npm i`.
- Install Cypress `npm install cypress --save -dev`
- Run the [app](./DEV.md).
- Run Cypress `npx cypress open`

## Test Locations

- e2e testing folder `cypress`/`e2e`.
- test data generation `cypress.config.js`.
- new cypress commands with API request `cypress`/`support`/`commands.js`.
- Page Object Model `cypress`/`support`/`pages`.
