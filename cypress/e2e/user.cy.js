/// <reference types='cypress' />
/// <reference types='../support' />

import ProfilePageObject from '../support/pages/profile.pageObject';

const profilePage = new ProfilePageObject();

describe('User', () => {
  let user1;
  let user2;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user1 = generateUser;
      cy.register(user1.email, user1.username, user1.password);
    });

    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
      cy.register(user2.email, user2.username, user2.password);
    });
  });

  it('should be able to follow the another user', () => {
    cy.login(user1);
    cy.visit(`profile/${user2.username}`);
    profilePage.clickOnFollowButton();
    profilePage.assertSuccessfulFollow();
  });
});
