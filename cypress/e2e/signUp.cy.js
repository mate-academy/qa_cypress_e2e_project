/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

let element;
let user;
let newUser;
let invalid;
let text;

describe('Sign Up page', () => {
  before(() => {
    cy.allure()
      .feature('Sign up flow')
      .epic('Logged out user');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateInvalid').then((generateInvalid) => {
      invalid = generateInvalid;
    });
    cy.task('customVariables').then((customVariables) => {
      element = customVariables;
    });
    cy.task('websiteText').then((websiteText) => {
      text = websiteText;
    });
    cy.task('generateUser').then((generateUser) => {
      newUser = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.openPage(element.url.signUp);
  });

  it('should allow the user to register with valid credentials', () => {
    signUpPage.fillIn(element.field.username, user.username);
    signUpPage.fillIn(element.field.email, user.email);
    signUpPage.fillIn(element.field.password, user.password);
    signUpPage.clickOnButton(element.button.signUp);
    signUpPage.assertPopupStatus(element.icon.success);
    signUpPage.assertPopupMessage(element.popup.text, text.userRegistered);
    signUpPage.closePopUp(element.popup.button);

    homePage.assertData(element.link.headerUsername, user.username);
  });

  it('should redirect the user to the Sign In page', () => {
    signUpPage.clickOnLink(element.link.haveAnAccount);
    signInPage.assertUrl(element.url.signIn);
  });

  it('should not allow the user to register with an invalid username', () => {
    signUpPage.fillIn(element.field.username, invalid.username);
    signUpPage.fillIn(element.field.email, user.email);
    signUpPage.fillIn(element.field.password, user.password);
    signUpPage.clickOnButton(element.button.signUp);
    signUpPage.assertPopupStatus(element.icon.fail);
    signUpPage.closePopUp(element.popup.button);
  });

  it('should not allow the user to register with an invalid email', () => {
    signUpPage.fillIn(element.field.username, user.username);
    signUpPage.fillIn(element.field.email, invalid.email);
    signUpPage.fillIn(element.field.password, user.password);
    signUpPage.clickOnButton(element.button.signUp);
    signUpPage.assertPopupStatus(element.icon.fail);
    signUpPage.assertPopupMessage(element.popup.text, text.invalidEmail);
    signUpPage.closePopUp(element.popup.button);
  });

  it('should not allow the user to register with an invalid password', () => {
    signUpPage.fillIn(element.field.username, user.username);
    signUpPage.fillIn(element.field.email, user.email);
    signUpPage.fillIn(element.field.password, invalid.password);
    signUpPage.clickOnButton(element.button.signUp);
    signUpPage.assertPopupStatus(element.icon.fail);
    signUpPage.assertPopupMessage(element.popup.text, text.invalidPassword);
    signUpPage.closePopUp(element.popup.button);
  });

  it('should not allow the user to register without a username', () => {
    signUpPage.fillIn(element.field.email, user.email);
    signUpPage.fillIn(element.field.password, user.password);
    signUpPage.clickOnButton(element.button.signUp);
    signUpPage.assertPopupStatus(element.icon.fail);
    signUpPage.assertPopupMessage(element.popup.text, text.usernameRequired);
    signUpPage.closePopUp(element.popup.button);
  });

  it('should not allow the user to register without an email', () => {
    signUpPage.fillIn(element.field.username, user.username);
    signUpPage.fillIn(element.field.password, user.password);
    signUpPage.clickOnButton(element.button.signUp);
    signUpPage.assertPopupStatus(element.icon.fail);
    signUpPage.assertPopupMessage(element.popup.text, text.emailRequired);
    signUpPage.closePopUp(element.popup.button);
  });

  it('should not allow the user to register without a password', () => {
    signUpPage.fillIn(element.field.username, user.username);
    signUpPage.fillIn(element.field.email, user.email);
    signUpPage.clickOnButton(element.button.signUp);
    signUpPage.assertPopupStatus(element.icon.fail);
    signUpPage.assertPopupMessage(element.popup.text, text.passwordRequired);
    signUpPage.closePopUp(element.popup.button);
  });

  it('should not allow the user to register with an existing username',
    () => {
      signUpPage.registerUser(user);
      signUpPage.fillIn(element.field.username, user.username);
      signUpPage.fillIn(element.field.email, newUser.email);
      signUpPage.fillIn(element.field.password, newUser.password);
      signUpPage.clickOnButton(element.button.signUp);
      signUpPage.assertPopupStatus(element.icon.fail);
      signUpPage.assertPopupMessage(element.popup.text, text.existingUsername);
      signUpPage.closePopUp(element.popup.button);
    });

  it('should not allow the user to register with an existing email', () => {
    signUpPage.registerUser(user);
    signUpPage.fillIn(element.field.username, newUser.username);
    signUpPage.fillIn(element.field.email, user.email);
    signUpPage.fillIn(element.field.password, newUser.password);
    signUpPage.clickOnButton(element.button.signUp);
    signUpPage.assertPopupStatus(element.icon.fail);
    signUpPage.assertPopupMessage(element.popup.text, text.existingEmail);
    signUpPage.closePopUp(element.popup.button);
  });
});
