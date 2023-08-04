/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it.only('should allow to sign up with valid data', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);

    signUpPage.successfulRegistrationMessage();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not allow to sign up with an empty username', () => {
    signUpPage.visit();

    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.emptyUsernameAlert();
  });

  it('should not allow to sign up with an empty email', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.emptyEmailAlert();
  });

  it('should not allow to sign up with an empty password', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickOnSignUpBtn();

    signUpPage.emptyPasswordAlert();
  });

  it('should not allow to sign up with email without @', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('invalidemailmail.com');
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.invalidEmailAlert();
  });

  it('should not allow to sign up with email without dot', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('invalidemail@mailcom');
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.invalidEmailAlert();
  });

  it('should not allow to sign up with email without name part', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('@mail.com');
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.invalidEmailAlert();
  });

  it('should not allow to sign up with password with 7 characters', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('Qwe123#');
    signUpPage.clickOnSignUpBtn();

    signUpPage.invalidPasswordAlert();
  });

  it('should not allow to sign up with password without 1 number', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('Qwerqwe#');
    signUpPage.clickOnSignUpBtn();

    signUpPage.invalidPasswordAlert();
  });

  // eslint-disable-next-line max-len
  it('should not allow to sign up with password without 1 uppercase letter', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('qwer123#');
    signUpPage.clickOnSignUpBtn();

    signUpPage.invalidPasswordAlert();
  });

  // eslint-disable-next-line max-len
  it('should not allow to sign up with password without 1 lowercase letter', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('QWER123#');
    signUpPage.clickOnSignUpBtn();

    signUpPage.invalidPasswordAlert();
  });
});
