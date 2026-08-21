/// <reference types='cypress' />
/// <reference types='../support' />

import ProfilePageObject from '../support/pages/profile.pageObject';

const profilePage = new ProfilePageObject();

describe('Profile', () => {
  let currentUser;
  let anotherUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser')
      .then((generatedUser) => {
        currentUser = generatedUser;
        return cy.register(
          currentUser.email,
          currentUser.username,
          currentUser.password
        );
      })
      .then(() => cy.task('generateUser'))
      .then((generatedUser) => {
        anotherUser = generatedUser;
        return cy.register(
          anotherUser.email,
          anotherUser.username,
          anotherUser.password
        );
      })
      .then(() => cy.login(
        currentUser.email,
        currentUser.password
      ));
  });

  it('should be able to follow and unfollow another user', () => {
    profilePage.visitUser(anotherUser.username);
    profilePage.assertNotFollowing();

    profilePage.follow();
    profilePage.assertFollowing();

    profilePage.visitUser(anotherUser.username);
    profilePage.assertFollowing();

    profilePage.unfollow();
    profilePage.assertNotFollowing();

    profilePage.visitUser(anotherUser.username);
    profilePage.assertNotFollowing();
  });
});
