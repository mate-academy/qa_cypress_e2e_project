/// <reference types="cypress" />
/// <reference types="../support" />

import faker from 'faker';
import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  const userToFollow = {
    secondUsername: faker.name.firstName(),
    secondEmail: faker.internet.email(),
    secondPassword: 'SecondPassword!!1'
  };

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should be able to follow the another user', () => {
    cy.register(userToFollow.secondEmail, userToFollow.secondUsername, userToFollow.secondPassword);
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);

    cy.visit(`/#/@${userToFollow.secondUsername}`);
    userPage.followBtn
      .click();

    userPage.followBtn
      .should('contain', `Unfollow ${userToFollow.secondUsername}`);
  });

  it.skip('should be able to unfollow the user', () => {
    cy.register(userToFollow.secondEmail, userToFollow.secondUsername, userToFollow.secondPassword);
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);

    cy.visit(`/#/@${userToFollow.secondUsername}`);
    userPage.followBtn
      .click('{waitForAnimations}');
    userPage.followBtn
      .click();

    userPage.followBtn
      .should('contain', `Follow ${userToFollow.secondUsername}`);
  });
});
