/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPage from '../support/pages/signUp.pageObject';
import HomePage from '../support/pages/home.pageObject';
const faker = require('faker');

const signUpPage = new SignUpPage();
const homePage = new HomePage();

describe('Sign Up page', () => {
  let user;
  let newUser;
  const invalidUsername = '    ';
  const invalidEmail = faker.name.firstName() + 'gmail.com';
  const randomNumber = faker.random.number({ min: 10, max: 99 }).toString();
  const invalidPassword = faker.lorem.word(6).toLowerCase() + randomNumber;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateUser').then((generateUser) => {
      newUser = generateUser;
    });
    signUpPage.visit();
  });

  it('Should provide the ability to sign up successfully', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.alertSuccessfulRegistration();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('Should not provide an ability to sign up with empty Sign up form', () => {
    signUpPage.clickSignUpBtn();
    signUpPage.allertRegistrationFailed();
  });

  it('Should not provide the ability to sign up with empty email field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.alertEmailRequired();
  });

  it('Should not allow register with an existed email', () => {
    cy.register(user.username, user.email, user.password);
    signUpPage.typeUsername(newUser.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(newUser.password);
    signUpPage.clickSignUpBtn();
    signUpPage.alertEmailTaken();
  });

  it('Should not provide the ability to sign up with invalid email', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(invalidEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.alertInvalidEmail();
  });

  it('Should not provide the ability to sign up with invalid password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(invalidPassword);
    signUpPage.clickSignUpBtn();
    signUpPage.alertInvalidPassword();
  });

  it('Should not provide the ability to sign up with invalid username', () => {
    signUpPage.typeUsername(invalidUsername);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.alertInvalidUsername();
  });
});
