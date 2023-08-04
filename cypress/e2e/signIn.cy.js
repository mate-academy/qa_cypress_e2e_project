/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  // eslint-disable-next-line max-len
  it('should provide an ability to log in with existing credentials', () => {
    cy.registerUser(user.email, user.username, user.password);

    signInPage.visit();

    signInPage.typeEmail(user.email);

    signInPage.typePassword(user.password);

    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);

    homePage.assertMainPageLogo();

    homePage.assertMainPageLogoText();

    homePage.assertMainPageUrl();
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to log in with invalid email', () => {
    cy.registerUser(user.email, user.username, user.password);

    signInPage.visit();

    signInPage.typeEmail(user.invalidEmail);

    signInPage.typePassword(user.password);

    signInPage.clickSignInBtn();

    signInPage.popUpWindow();

    signInPage.assertLogInError();

    signInPage.assertLogInErrorMsg();

    signInPage.closePopUpWindow();
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to log in with invalid password', () => {
    cy.registerUser(user.email, user.username, user.password);

    signInPage.visit();

    signInPage.typeEmail(user.email);

    signInPage.typePassword(user.invalidPassword);

    signInPage.clickSignInBtn();

    signInPage.popUpWindow();

    signInPage.assertLogInError();

    signInPage.assertLogInErrorMsg();

    signInPage.closePopUpWindow();
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to log in without the email', () => {
    cy.registerUser(user.email, user.username, user.password);

    signInPage.visit();

    signInPage.typePassword(user.password);

    signInPage.clickSignInBtn();

    signInPage.popUpWindow();

    signInPage.assertLogInError();

    signInPage.assertEmptyEmailError();

    signInPage.closePopUpWindow();
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to log in without the password', () => {
    cy.registerUser(user.email, user.username, user.password);

    signInPage.visit();

    signInPage.typeEmail(user.email);

    signInPage.clickSignInBtn();

    signInPage.popUpWindow();

    signInPage.assertLogInError();

    signInPage.assertEmptyPassError();

    signInPage.closePopUpWindow();
  });
});
