/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import ProfilePageObject from '../support/pages/profile.PageObject';

const signInPage = new SignInPageObject();
const profilePage = new ProfilePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.username, user.email, user.password);
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.login(user.email, user.password);
    cy.visit(`/#/@${user.username}`);

    profilePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong email', () => {
    signInPage.visit();
    signInPage.typeEmail('s' + user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertDialogMessage('Login failed!');
  });

  it('should not provide an ability to log in with an empty email', () => {
    signInPage.visit();
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertDialogMessage('Login failed!');
  });

  it('should not provide an ability to log in with wrong password', () => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword('s' + user.password);
    signInPage.clickSignInBtn();

    signInPage.assertDialogMessage('Login failed!');
  });

  it('should not provide an ability to log in with an empty password', () => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();

    signInPage.assertDialogMessage('Login failed!');
  });
});
