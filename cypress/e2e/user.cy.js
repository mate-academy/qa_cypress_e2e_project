/// <reference types='cypress' />
/// <reference types='../support' />

import FollowPageObject from '../support/pages/follow.pageObject';

const followPage = new FollowPageObject();

describe('User Follow/Unfollow', () => {
  before(() => {
    cy.task('db:clear'); // Ensure a clean database state before tests
    cy.login('testuser', 'TestPassword123'); // Ensure user is logged in
  });

  beforeEach(() => {
    followPage.visitProfile('anotherUser'); // Navigate to another user's profile
  });

  it('should be able to follow another user', () => {
    followPage.followUser();
    followPage.assertFollowStatus(true);
  });

  it('should be able to unfollow another user', () => {
    followPage.unfollowUser();
    followPage.assertFollowStatus(false);
  });
});
