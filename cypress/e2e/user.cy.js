/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  const user = {
    username: 'riot',
    email: 'riot@qa.team',
    password: '12345Qwert!'
  };

  before(() => {
    cy.task('db:clear');
    cy.register(user.email, user.username, user.password);
  });

  it('should be able to follow another user', () => {
    cy.followUser('mewa');
    userPage.followBtn().should('be.visible').click();

    userPage.assertUnfollowButtonVisible();
  });

  it('should be able to unfollow another user', () => {
    cy.unfollowUser('mewa');
    userPage.followBtn().should('be.visible').click();

    userPage.unfollowBtn().should('be.visible').click();
    userPage.assertFollowButtonVisible();
  });
});
