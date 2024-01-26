/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const faker = require('faker');
const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;
  const newUsername = faker.random.word();
  const newPassword = 'G' + faker.random.alphaNumeric(8);
  const shortPassword = faker.random.alpha(2) + 'F1;';
  const noNumberPassword = faker.random.alpha(7) + 'Y';
  const noUppercasePassword = faker.random.alphaNumeric(8);
  const noLowercasePassword = faker.random.alphaNumeric(8).toUpperCase();
  const noAtSignEmail = faker.random.word() + '.gmail.com';
  const noTopDomainEmail = faker.random.word() + '@gmail';
  const noNameEmail = '@gmail.com';

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    signUpPage.visit();
  });

  it('should provide an ability to sign up with valid data', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertSuccessfulRegistrationModal();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not allow registration with existing email', () => {
    cy.register(user.email, user.username, user.password);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(newPassword);
    signUpPage.typeUsername(newUsername);
    signUpPage.clickSignUpBtn();
    signUpPage.assertEmailTakenModal();
  });

  it('should not allow registration with empty username field', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertUsernameRequiredModal();
  });

  it('should not allow registration with empty email field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertEmailRequiredModal();
  });

  it('should not allow registration with empty password field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.assertPasswordRequiredModal();
  });

  it('should not allow registration with password less than 8 char', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(shortPassword);
    signUpPage.clickSignUpBtn();
    signUpPage.assertInvalidPasswordModal();
  });

  it('should not allow registration with password without a number', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(noNumberPassword);
    signUpPage.clickSignUpBtn();
    signUpPage.assertInvalidPasswordModal();
  });

  it('should not allow registration with password without uppercase letter',
    () => {
      signUpPage.typeUsername(user.username);
      signUpPage.typeEmail(user.email);
      signUpPage.typePassword(noUppercasePassword);
      signUpPage.clickSignUpBtn();
      signUpPage.assertInvalidPasswordModal();
    });

  it('should not allow registration with password without lowercase letter',
    () => {
      signUpPage.typeUsername(user.username);
      signUpPage.typeEmail(user.email);
      signUpPage.typePassword(noLowercasePassword);
      signUpPage.clickSignUpBtn();
      signUpPage.assertInvalidPasswordModal();
    });

  it('should not allow registration with email without @', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(noAtSignEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertInvalidEmailModal();
  });

  it('should not allow registration with email without top domain', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(noTopDomainEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertInvalidEmailModal();
  });

  it('should not allow registration with email without name part', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(noNameEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertInvalidEmailModal();
  });
});
