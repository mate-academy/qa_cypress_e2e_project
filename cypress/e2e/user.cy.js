/// <reference types="cypress" />
/// <reference types="../support" />
import UserPageObject from '../support/pages/user.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const userPage = new UserPageObject();
const signInPage = new SignInPageObject();
const signUpPage = new SignUpPageObject();

describe('User', () => {
  let firstUser;
  let user;
  before(() => {
    cy.task('generateUser').then(generateUser => {
      firstUser = generateUser;
    });
    cy.task('generateUser').then(generateUser => {
      suser = generateUser;
    });
  });
  beforeEach(() => {
    cy.register(firstUser.email, firstUser.username, firstUser.password);
    cy.register(user.email, user.username, user.password);
  });

  it.skip('should be able to follow the another user', () => {
    cy.login(user.email, user.password);
    userPage.visit();
    cy.visit(`#/@${firstUser.username}/`);
    userPage.followButton
      .click();
  });
  it.skip('should be able to unfollow the another user', () => {
    cy.login(user.email, user.password);
    userPage.visit();
    cy.visit('http://localhost:1667/#/' + firstUser.username);
    userPage.unfollowButton
      .click();
  });
});
