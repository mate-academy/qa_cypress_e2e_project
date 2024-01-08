/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.register(user.otherEmail, user.otherUsername, user.otherPassword);
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
  });

  it('should be able to follow the another user', () => {
    userPage.visitUserPage(user.otherUsername);
    userPage.clickFollowBtn();
    userPage.assertFollowBtnBroken(user.otherUsername);
  });

  it('should be able to unfollow the another user', () => {
    userPage.visitUserPage(user.otherUsername);
    userPage.clickFollowBtn();
    userPage.assertFollowButtonStateUnchanged(user.otherUsername);
  });
});
