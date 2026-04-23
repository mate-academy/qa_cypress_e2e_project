/// <reference types='cypress' />
/// <reference types='../support' />

import ProfilePageObject from '../support/pages/profile.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const profilePage = new ProfilePageObject();
const signInPage = new SignInPageObject();

describe('User', () => {
  let user;
  let author;

  before(() => {
    cy.task('generateUser').then((res) => { user = res; });
    cy.task('generateUser').then((res) => { author = res; });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.register(author.email, author.username, author.password);
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  });

  it('should be able to follow the another user', () => {
    cy.visit(`/#/profile/${author.username}`);

    profilePage.followBtn
      .should('be.visible')
      .should('contain', `Follow ${author.username}`)
      .click();

    profilePage.unfollowBtn.should('be.visible');
  });

  it('should be able to unfollow the another user', () => {
    cy.visit(`/#/profile/${author.username}`);
    profilePage.followBtn.click();
    profilePage.unfollowBtn.should('be.visible');
    profilePage.unfollowBtn.click();
    profilePage.followBtn.should('be.visible').and('contain', `Follow ${author.username}`);
  });
});
