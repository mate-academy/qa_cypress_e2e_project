/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const signInPage = new SignInPageObject();
const profilePage = new ProfilePageObject();

describe('User', () => {
  let userTarget;
  let userFollower;

  before(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((target) => {
      userTarget = target;
      cy.register(userTarget.email, userTarget.username, userTarget.password);
    });

    cy.task('generateUser').then((follower) => {
      userFollower = follower;
      // eslint-disable-next-line max-len
      cy.register(userFollower.email, userFollower.username, userFollower.password);
    });
  });

  it('should be able to follow and unfollow another user', () => {
    signInPage.visit();

    cy.intercept('POST', `**/api/profiles/${userTarget.username}/follow`).as('followUser');
    cy.intercept('DELETE', `**/api/profiles/${userTarget.username}/follow`).as('unfollowUser');
    cy.intercept('GET', '**/api/articles/feed*').as('getFeed');

    signInPage.typeEmail(userFollower.email);
    signInPage.typePassword(userFollower.password);
    signInPage.clickSignInBtn();

    cy.wait('@getFeed');

    profilePage.visit(userTarget.username);

    profilePage.followToggleButton.click();
    cy.wait('@followUser');
    // eslint-disable-next-line max-len
    profilePage.followToggleButton.should('be.visible').and('contain.text', 'Unfollow');

    profilePage.followToggleButton.click();
    cy.wait('@unfollowUser');
    // eslint-disable-next-line max-len
    profilePage.followToggleButton.should('be.visible').and('contain.text', 'Follow');
  });
});
