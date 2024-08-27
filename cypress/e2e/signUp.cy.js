/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const pageTitle = require('../fixtures/pageTitles.json');
const linkTitle = require('../fixtures/linkTitles.json');
const validation = require('../fixtures/validationMessages.json');
const btnNames = require('../fixtures/buttonNames.json');

const signUpPage = new SignUpPageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe(`'Sign Up' page`, () => {
  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUserData').as('userData');

    cy.task('generateUserData').as('newUserData');

    signUpPage.visit();
  });

  it(`should allow user to get the 'Sign in' page by 'Have an account?' link`, () => {
    signUpPage.assertPageTitle(pageTitle.signUpTitle);
    signUpPage.assertLinkHaveAccountExists(linkTitle.accountExists);
    signUpPage.assertSignUpFormExists(btnNames.signUp);

    signUpPage.clickOnHaveAccountLink();
    signInPage.assertPageUrl(signInPage.url);
    signInPage.assertPageTitle(pageTitle.signInTitle);
  });

  it(`should allow to register`, function () {
    const {
      username,
      email: { validEmail },
      password: { validPassword }
    } = this.userData;

    signUpPage.typeUsername(username);
    signUpPage.typeEmail(validEmail);
    signUpPage.typePassword(validPassword);
    signUpPage.assertPasswordIsMasked();
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertSuccessfulMessage(validation.success.registration);
    signUpPage.clickOnOkeyBtn();

    homePage.assertHeaderContainUsername(username);
  });

  it(`should not allow to register with taken email`, function () {
    const {
      username: newUsername,
      password: { validPassword }
    } = this.newUserData;
    const { email: { validEmail } } = this.userData;

    cy.register(this.userData);

    signUpPage.typeUsername(newUsername);
    signUpPage.typeEmail(validEmail);
    signUpPage.typePassword(validPassword);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertErrorMessage(validation.error.takenEmail);
    signUpPage.clickOnOkeyBtn();

    signUpPage.assertPageUrl(signUpPage.url);
    signUpPage.assertHeaderNotContainUsername(newUsername);
  });

  it(`should allow to register with password that contains 8 characters`, function () {
    const { username } = this.userData;

    signUpPage.fillFormAndSubmit(this.userData);
    signUpPage.assertSuccessfulMessage(validation.success.registration);
    signUpPage.clickOnOkeyBtn();

    homePage.assertHeaderContainUsername(username);
  });

  it(`should not allow to register with password ` +
    `that contains less then 8 characters`, function () {
    signUpPage.fillFormAndSubmit(this.userData);
    signUpPage.assertErrorMessage(validation.error.invalidPassword);
    signUpPage.clickOnOkeyBtn();

    signUpPage.assertPageUrl(signUpPage.url);
    signUpPage.assertHeaderNotContainUsername();
  });

  it(`should not allow to register with password ` +
    `without numbers`, function () {
    signUpPage.fillFormAndSubmit(this.userData);
    signUpPage.assertErrorMessage(validation.error.invalidPassword);
    signUpPage.clickOnOkeyBtn();

    signUpPage.assertPageUrl(signUpPage.url);
    signUpPage.assertHeaderNotContainUsername();
  });

  it(`should not allow to register with password ` +
    `without capital letter`, function () {
    signUpPage.fillFormAndSubmit(this.userData);
    signUpPage.assertErrorMessage(validation.error.invalidPassword);
    signUpPage.clickOnOkeyBtn();

    signUpPage.assertPageUrl(signUpPage.url);
    signUpPage.assertHeaderNotContainUsername();
  });

  it(`should not allow to register with email ` +
    `without [name] part`, function () {
    signUpPage.fillFormAndSubmit(this.userData);
    signUpPage.assertErrorMessage(validation.error.invalidEmail);
    signUpPage.clickOnOkeyBtn();

    signUpPage.assertPageUrl(signUpPage.url);
    signUpPage.assertHeaderNotContainUsername();
  });

  it(`should not allow to register with email ` +
    `without "@" symbol`, function () {
    signUpPage.fillFormAndSubmit(this.userData);
    signUpPage.assertErrorMessage(validation.error.invalidEmail);
    signUpPage.clickOnOkeyBtn();

    signUpPage.assertPageUrl(signUpPage.url);
    signUpPage.assertHeaderNotContainUsername();
  });

  it(`should not allow to register with email ` +
    `without [domain] part`, function () {
    signUpPage.fillFormAndSubmit(this.userData);
    signUpPage.assertErrorMessage(validation.error.invalidEmail);
    signUpPage.clickOnOkeyBtn();

    signUpPage.assertPageUrl(signUpPage.url);
    signUpPage.assertHeaderNotContainUsername();
  });

  it(`should not allow to register with email ` +
    `without dot (.)`, function () {
    signUpPage.fillFormAndSubmit(this.userData);
    signUpPage.assertErrorMessage(validation.error.invalidEmail);
    signUpPage.clickOnOkeyBtn();

    signUpPage.assertPageUrl(signUpPage.url);
    signUpPage.assertHeaderNotContainUsername();
  });

  it(`should not allow to register with email ` +
    `without [top-domain] part`, function () {
    signUpPage.fillFormAndSubmit(this.userData);
    signUpPage.assertErrorMessage(validation.error.invalidEmail);
    signUpPage.clickOnOkeyBtn();

    signUpPage.assertPageUrl(signUpPage.url);
    signUpPage.assertHeaderNotContainUsername();
  });

  it(`should not allow to register with the empty "Username" field`, function () {
    signUpPage.fillFormAndSubmit(this.userData);
    signUpPage.assertErrorMessage(validation.error.emptyUsername);
    signUpPage.clickOnOkeyBtn();

    signUpPage.assertPageUrl(signUpPage.url);
    signUpPage.assertHeaderNotContainUsername();
  });

  it(`should not allow to register with the empty "Email" field`, function () {
    signUpPage.fillFormAndSubmit(this.userData);
    signUpPage.assertErrorMessage(validation.error.emptyEmail);
    signUpPage.clickOnOkeyBtn();

    signUpPage.assertPageUrl(signUpPage.url);
    signUpPage.assertHeaderNotContainUsername();
  });

  it(`should not allow to register with the empty "Password" field`, function () {
    signUpPage.fillFormAndSubmit(this.userData);
    signUpPage.assertErrorMessage(validation.error.emptyPassword);
    signUpPage.clickOnOkeyBtn();

    signUpPage.assertPageUrl(signUpPage.url);
    signUpPage.assertHeaderNotContainUsername();
  });
});
