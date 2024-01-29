/// <reference types='cypress' />
/// <reference types='../support' />

import ProfilePageObject from '../support/pages/profile.pageObject';

const profilePage = new ProfilePageObject();

describe('User', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.register(user.email, user.username.to, user.password);
    cy.login(user.newEmail, user.newUsername, user.newPassword);
  });

  it('should be able to follow the another user', () => {
    cy.visit(`#/@${user.username.toLowerCase()}`);
    profilePage.clickFollowButton();
    profilePage.assertUnfollowButton();
  });

  it('should be able to unfollow the another user', () => {
    cy.visit(`#/@${user.username.toLowerCase()}`);
    profilePage.clickFollowButton();
    profilePage.assertUnfollowButton();
    profilePage.clickFollowButton();
    profilePage.assertFollowButton();
  });
});
