/// <reference types='cypress' />
/// <reference types='../support' />

/// <reference types='cypress' />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  before(() => {
    cy.task('db:clear');
  });

  it('should provide an ability to follow the another user', () => {
    userPage.visit();
    userPage.followUser();

    cy.contains('Following').should('be.visible');
  });

  it('should provide an ability to unfollow the user', () => {
    userPage.visit();
    userPage.unfollowUser();

    cy.contains('Follow').should('be.visible'); // Verify that the user is unfollowed
  });
});
