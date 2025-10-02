import { faker } from '@faker-js/faker';

// Reset DB
Cypress.Commands.add("resetDatabase", () => {
  return cy.request("POST", "http://localhost:1667/api/testing/reset");
});

// Create user
Cypress.Commands.add("createUser", () => {
  const user = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(12)
  };
  return cy.request("POST", "http://localhost:1667/api/users", { user })
    .then(() => cy.wrap(user));
});

// API login
Cypress.Commands.add("login", (user) => {
  return cy.request("POST", "http://localhost:1667/api/users/login", {
    user: { email: user.email, password: user.password }
  }).then((resp) => {
    window.localStorage.setItem("jwt", resp.body.user.token);
    cy.visit("/");
  });
});
