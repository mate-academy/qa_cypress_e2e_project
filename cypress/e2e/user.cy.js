/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPage from '../support/pages/signIn.pageObject';
import ProfilePage from '../support/pages/profile.pageobject';

const signInPage = new SignInPage();
const profilePage = new ProfilePage();

describe('Follow/unfollow button', () => {
  let userA;
  let userB;

  beforeEach(() => {
    cy.task('db:clear');

    return cy.task('generateUsers', 2).then(([uA, uB]) => {
      userA = uA;
      userB = uB;

      cy.request('POST', '/api/users', { user: userA });
      cy.request('POST', '/api/users', { user: userB });
    });
  });

  it('should provide an ability to follow another user', () => {
    cy.register(userA.email, userA.username, userA.password);
    cy.register(userB.email, userB.username, userB.password);

    signInPage.visit();
    signInPage.typeEmail(userA.email);
    signInPage.typePassword(userA.password);
    signInPage.clickSignInBtn();

    profilePage.visit(userB.username);

    profilePage.clickFollowBtn();
    profilePage.verifyUnfollowBtnText('Unfollow');

    profilePage.clickUnfollowBtn();
    profilePage.verifyFollowBtnText('Follow');
  });
});
