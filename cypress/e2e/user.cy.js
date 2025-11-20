/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPage from '../support/pages/signIn.pageObject';
import ProfilePage from '../support/pages/profile.pageObject';

const signInPage = new SignInPage();
const profilePage = new ProfilePage();

describe('Follow/unfollow button', () => {
  let userA;
  let userB;

  before(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((u) => userA = u);
    cy.task('generateUser').then((u) => userB = u);
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
