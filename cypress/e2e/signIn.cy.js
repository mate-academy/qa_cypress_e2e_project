/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();

let element;
let user;
let wrongCreds;
let text;

describe('Sign In page', () => {
  before(() => {
    cy.allure()
      .feature('Sign in flow')
      .epic('Logged out user');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('customVariables').then((customVariables) => {
      element = customVariables;
    });
    cy.task('generateUser').then((generateUser) => {
      wrongCreds = generateUser;
    });
    cy.task('websiteText').then((websiteText) => {
      text = websiteText;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.registerUser(user);
    signInPage.openPage(element.url.signIn);
  });

  it('should allow the user to log in with existing credentials', () => {
    signInPage.fillIn(element.field.email, user.email);
    signInPage.fillIn(element.field.password, user.password);
    signInPage.clickOnButton(element.button.signIn);

    homePage.assertData(element.link.headerUsername, user.username);
  });

  it('should redirect the user to the Sign Un page', () => {
    signInPage.clickOnLink(element.link.needAnAccount);
    signInPage.assertUrl(element.url.signUp);
  });

  it('should not allow the user to log in with wrong email', () => {
    signInPage.fillIn(element.field.email, wrongCreds.email);
    signInPage.fillIn(element.field.password, user.password);
    signInPage.clickOnButton(element.button.signIn);
    signInPage.assertPopupStatus(element.icon.fail);
    signInPage.assertPopupMessage(element.popup.text, text.invalidCredentials);
    signInPage.closePopUp(element.popup.button);
  });

  it('should not allow the user to log in with wrong password', () => {
    signInPage.fillIn(element.field.email, user.email);
    signInPage.fillIn(element.field.password, wrongCreds.password);
    signInPage.clickOnButton(element.button.signIn);
    signInPage.assertPopupStatus(element.icon.fail);
    signInPage.assertPopupMessage(element.popup.text, text.invalidCredentials);
    signInPage.closePopUp(element.popup.button);
  });
});
