/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPage from '../support/pages/signUp.pageObject';
import HomePage from '../support/pages/home.pageObject';

const signUpPage = new SignUpPage();
const homePage = new HomePage();

describe('Sign Up page', () => {
  let user;
  let newUser;
  let testData;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      newUser = generateUser;
    });
    cy.task('generateTestData').then((generateTestData) => {
      testData = generateTestData;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    signUpPage.visit();
  });

  it('should provide ability to sign up successfully', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.alertSuccessfulRegistration();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide ability to sign up with empty Sign up form', () => {
    signUpPage.clickSignUpBtn();
    signUpPage.allertRegistrationFailed();
  });

  it('should not provide ability to sign up with empty email field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.alertEmailRequired();
  });

  // eslint-disable-next-line max-len
  it('should not provide ability to register with previously registered email', () => {
    cy.register(user.username, user.email, user.password);
    signUpPage.typeUsername(newUser.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(newUser.password);
    signUpPage.clickSignUpBtn();
    signUpPage.alertEmailTaken();
  });

  it('should not provide ability to sign up with invalid email', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(testData.invalidEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.alertInvalidEmail();
  });

  it('Should not provide ability to sign up with invalid password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(testData.invalidPassword);
    signUpPage.clickSignUpBtn();
    signUpPage.alertInvalidPassword();
  });

  it('Should not provide ability to sign up with invalid username', () => {
    signUpPage.typeUsername(testData.invalidUsername);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.alertInvalidUsername();
  });
});
