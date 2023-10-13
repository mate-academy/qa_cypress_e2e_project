/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  beforeEach(() => {
    cy.setupUserSession();
    cy.register();
  });

  it('should be able to follow another user', () => {
    userPage.toUserProfile();
    userPage.clickFollowUser();
    userPage.assertUnfollowBtn();
  });
});
