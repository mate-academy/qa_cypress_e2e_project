/// <reference types='cypress' />
/// <reference types='../support' />

import { signInPage } from '../support/pages/ProjectPages/SignInPage';
import { homePage } from '../support/pages/ProjectPages/HomePage';

describe('SignIn page', () => {
  let user;
  let wrongUser;

  beforeEach(() => {
    cy.task('db:clear');
  });
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateWrongUser').then((generateWrongUser) => {
      wrongUser = generateWrongUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user);
    signInPage.typePassword(user);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeWrongEmail(wrongUser);
    signInPage.typeWrongPassword(wrongUser);
    signInPage.clickSignInBtn();
    signInPage.AssertLoginFailed();
    signInPage.AssertInvalidusercredentials();
    signInPage.clickOkBtn();
    signInPage.clearEmail();
    signInPage.clearPassword();

    signInPage.typeshortEmail(wrongUser);
    signInPage.typeWrongPassword(wrongUser);
    signInPage.clickSignInBtn();
    signInPage.AssertLoginFailed();
    signInPage.AssertEmailmustbeavalidemail();
    signInPage.clickOkBtn();
    signInPage.clearEmail();
    signInPage.clearPassword();

    signInPage.clickSignInBtn();
    signInPage.AssertLoginFailed();
    signInPage.AssertEmailfieldrequired();
  });
});
