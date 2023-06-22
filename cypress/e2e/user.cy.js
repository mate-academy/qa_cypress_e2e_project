/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from "../support/pages/signUp.pageObject";
import HomePageObject from "../support/pages/home.pageObject";
import faker from "faker";

const homePage = new HomePageObject;
const signUpPage = new SignUpPageObject;

describe('User', () => {
  let user;
  const anotherUser = {
    username: faker.name.firstName(),
    email: faker.internet.email().toLowerCase(),
    password: 'ManintheMiddle123!'
  };

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it.skip('should be able to follow the another user', () => {
    cy.register(user.email, user.username, user.password);

    cy.register(anotherUser.email, anotherUser.username, anotherUser.password);
    cy.login(anotherUser.email, anotherUser.username, anotherUser.password);
    cy.visit(`http://localhost:1667/#/@${user.username}`);
    
    // cy.getByDataCy('follow-btn')
    //   .click();

    cy.contains('.btn', 'Follow')
      .click();

    cy.get('.swal-modal')
      .should('be.visible')
  });
});
