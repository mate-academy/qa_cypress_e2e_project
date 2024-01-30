/// <reference types='cypress' />
/// <reference types='../support' />
import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();
let user;
let newUser;

describe('User', () => {
  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.registerAndLogin(user.email, user.username, user.password);
    });
    cy.task('generateUser').then((generateUser) => {
      newUser = generateUser;
    });
  });

  it.only('should be able to follow the another user', () => {
    cy.visit(`#/@${newUser.username.toLowerCase()}`);
    userPage.clickFollowButton();
    userPage.assertFollowButton();
  });
});
