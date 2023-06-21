/// <reference types="cypress" />
/// <reference types="../support" />

import userPageObject from '../support/pages/user.pageObject';

const userPage = new userPageObject();

describe('User', () => {
  let userForFollow;
  let userFollower;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      userForFollow = generateUser;
    });
    cy.task('generateUser').then(generateUser => {
      userFollower = generateUser;
    });
  });

  it.skip('should be able to follow the another user', () => {
    cy.register(userForFollow.email, userForFollow.username, userForFollow.password);

    cy.login(userFollower.email, userFollower.username, userFollower.password);

    userPage.visitUserPage(userForFollow.username);
    userPage.followBtn.click();
    userPage.should('contain', 'Unfollow');
  });
});
