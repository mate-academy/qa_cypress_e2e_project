/// <reference types='cypress' />
/// <reference types='../support' />

import UserAccountPageObject from "../support/pages/userAccount.pageObject";

const userPage = new UserAccountPageObject()

describe('User', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    
  });

  beforeEach(() => {
    cy.register(user.email, user.username, user.password);
  })

  it('should be able to follow the another user', () => {
    cy.login(user.newEmail, user.newUsername, user.newPassword);
    
    userPage.visit(`/#/@${user.username}`)
    userPage.clickFollowUserBtn();
    userPage.assertUnfollowUserBtn(); 
  });
});
