/// <reference types="cypress" />
/// <reference types="../support" />

import faker from 'faker';

describe('User', () => {
  let user;

  const secondUser = {
    secondUsername: faker.name.firstName(),
    secondPassword: 'Qw12345678!',
    secondEmail: faker.internet.email()
  };

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it.skip('should be able to follow the another user', () => {
    cy.register(user.email, user.username, user.password);

    cy.register(secondUser.secondEmail, secondUser.secondUsername, secondUser.secondPassword);
    cy.login(secondUser.secondEmail, secondUser.secondPassword);
    cy.visit(`http://localhost:1667/#/@${user.username}`);
    cy.get('.btn-outline-secondary').click();
  });
});
