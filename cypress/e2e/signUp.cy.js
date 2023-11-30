/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPage from '../support/pages/signUp.pageObject';
import HomePage from '../support/pages/home.pageObject';

const signUpPage = new SignUpPage();
const homePage = new HomePage();

const testData = {
  invalidUsername: `1=${faker.name.firstName()}`,
  invalidEmail: `${faker.name.firstName()}gmail.com`,
  invalidPassword: `${faker.lorem.word().toLowerCase()}${faker.random.number()}`
};

describe('Sign Up page', () => {
  let user;
  let newUser;
  
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      newUser = generateUser;
    });

    signUpPage.visit();
  });

  it('should provide ability to sign up', () => {
    signUpPage.typeUsername(newUser.username);
    signUpPage.typeEmail(newUser.email);
    signUpPage.typePassword(newUser.password);
    signUpPage.clickSignUpBtn();
    signUpPage.alertSuccessfulRegistration();
    homePage.assertHeaderContainUsername(newUser.username);
  });

  it('should not provide ability to sign up with empty form', () => {
    signUpPage.clickSignUpBtn();
    signUpPage.allertRegistrationFailed();
  });

  it('should not provide ability to sign up with empty email field', () => {
    signUpPage.typeUsername(newUser.username);
    signUpPage.typePassword(newUser.password);
    signUpPage.clickSignUpBtn();
    signUpPage.alertEmailRequired();
  });

  it('should not provide ability to register with taken email', () => {
    cy.register(user.username, user.email, user.password);
    signUpPage.typeUsername(newUser.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(newUser.password);
    signUpPage.clickSignUpBtn();
    signUpPage.alertEmailTaken();
  });

  it('should not provide ability to sign up with invalid email', () => {
    signUpPage.typeUsername(newUser.username);
    signUpPage.typeEmail(testData.invalidEmail);
    signUpPage.typePassword(newUser.password);
    signUpPage.clickSignUpBtn();
    signUpPage.alertInvalidEmail();
  });

  it('Should not provide ability to sign up with invalid password', () => {
    signUpPage.typeUsername(newUser.username);
    signUpPage.typeEmail(newUser.email);
    signUpPage.typePassword(testData.invalidPassword);
    signUpPage.clickSignUpBtn();
    signUpPage.alertInvalidPassword();
  });

  it('Should not provide ability to sign up with invalid username', () => {
    signUpPage.typeUsername(testData.invalidUsername);
    signUpPage.typeEmail(newUser.email);
    signUpPage.typePassword(newUser.password);
    signUpPage.clickSignUpBtn();
    signUpPage.alertInvalidUsername();
  });
});
