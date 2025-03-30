/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  let user1;
  let user2;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user1 = generateUser;
      cy.login(user1.email, user1.username, user1.password);
    });

    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
      cy.login(user2.email, user2.username, user2.password);
    });
  });

  it('should be able to follow the another user', () => {
    userPage.visitUserPage(user1.username);
    userPage.clickOnFollowButton();

    userPage.checkSuccessFollowed(user1.username);
  });
});
