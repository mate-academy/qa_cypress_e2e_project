/// <reference types="cypress" />
/// <reference types="../support" />

import UserPageObject from '../support/pages/user.pageObject';
const userPage = new UserPageObject();

describe('Follow/Unfollow User', () => {
  let user;
  let newuser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateUser').then((generatedUser) => {
      newuser = generatedUser;
    });
    cy.visit('/#/');
    cy.register();
  });

  it('should follow and unfollow a user', () => {
    cy.register(newuser.email, newuser.username, newuser.password);
    cy.register(user.email, user.username, user.password);
    cy.signIn(user.email, user.password);
    userPage.visitUserUrl(user.username);

    userPage.follow();
    userPage.assertFollowing();

    userPage.unfollow();
    userPage.assertNotFollowing();
  });
});
