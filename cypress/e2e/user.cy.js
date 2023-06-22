/// <reference types="cypress" />
/// <reference types="../support" />

import faker from 'faker';
import HomePageObject from '../support/pages/home.pageObject';

const homePage = new HomePageObject();

describe('User', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  const secondUser = {
    secondUsername: faker.name.firstName(),
    secondPassword: 'Allo1234_',
    secondEmail: faker.internet.email().toLowerCase(),
  };

  it('should be able to follow another user', () => {
    cy.register(user.email, user.username, user.password);
    cy.register(secondUser.secondEmail, secondUser.secondUsername, secondUser.secondPassword);
    cy.login(secondUser.secondEmail, secondUser.secondPassword);
    cy.visit(`http://localhost:1667/#/@${user.username}`);
    cy.getByDataCy('follow-btn').click();
    cy.get('.swal-modal').should('be.visible');
  });
});
