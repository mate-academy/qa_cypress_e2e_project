/// <reference types="cypress" />
/// <reference types="../support" />

import ProfilePage from '../support/pages/profile.pageObject.js';

describe('User Following/Unfollowing Functionality', () => {
  let currentUser;
  let targetUser;

  beforeEach(() => {
    cy.task('db:clear');

    cy.registerAndLogin().then((user) => {
      currentUser = user;
    });

    cy.task('generateUser').then((generatedUser) => {
      cy.request({
        method: 'POST',
        url: '/users',
        body: {
          username: generatedUser.username,
          email: generatedUser.email,
          password: generatedUser.password
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        targetUser = response.body.user;
      });
    });
  });

  it('should allow a user to follow another user', () => {
    ProfilePage.visit(targetUser.username);

    ProfilePage.getFollowButton().should('be.visible');
    ProfilePage.getFollowButton().click();

    ProfilePage.getUnfollowButton().should('be.visible')
      .and('contain', `Unfollow`);
  });

  it('should allow a user to unfollow another user', () => {
    cy.request({
      method: 'POST',
      url: `/profiles/${targetUser.username}`,
      body: {
        action: 'follow',
        user_id: currentUser.id
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.profile.following).to.equal(true);
      ProfilePage.visit(targetUser.username);
    });

    ProfilePage.getUnfollowButton().should('be.visible');
    ProfilePage.getUnfollowButton().click();

    ProfilePage.getFollowButton().should('be.visible')
      .and('contain', `Follow`);
  });
});
