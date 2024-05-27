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

  const user2 = {
    username: 'riot2',
    email: 'riot2@qa.team',
    password: '123425Qwert!'
  };

  before(() => {
    cy.task('db:clear');
    cy.register(user.email, user.username, user.password);
    cy.register(user2.email, user2.username, user2.password);
  });

  it('should be able to follow another user', () => {
    cy.login(user.email, user.password);
    cy.visit('profile/riot2');
    userPage.followBtn().should('be.visible').click();
    userPage.assertUnfollowButtonVisible();
  });

  it('should be able to unfollow another user', () => {
    cy.followUser();
    userPage.followBtn().should('be.visible').click();
    userPage.unfollowBtn().should('be.visible').click();
    userPage.assertFollowButtonVisible();
  });
});
