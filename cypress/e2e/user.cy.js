/// <reference types="cypress" />
/// <reference types="../support" />

import UserPageObject from '../support/pages/user.pageObject';
const userPage = new UserPageObject();

describe('Follow/Unfollow User', () => {
  let user;
  const profileUsername = 'riot';

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.visit('/#/');
    cy.register();
  });

  it('should follow and unfollow a user', () => {
    cy.register(user.email, user.username, user.password);
    cy.signIn(user.email, user.password);
    userPage.visitUserUrl(profileUsername);

    userPage.follow();
    userPage.assertFollowing();
  });
});
