/// <reference types="cypress" />
/// <reference types="../support" />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();
let user;

describe('User', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.register();
  });

  it.skip('should be able to follow the another user', () => {
    cy.createUser(user.email, user.username);
    userPage.visit(`#/@${user.username}/`);
    userPage.followBtn.click();
    userPage.followBtn.should('contain', 'Unfollow');
  });
});
