/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const faker = require('faker');
const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  const modalMessage = {
    general: 'Registration failed!',
    emptyPassword: 'Password field required.',
    takenEmail: 'Email already taken.',
    successRegistration: 'Your registration was successful!',
  };

  const user2 = {
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should provide an ability to sign up with user credentials', () => {
    signUpPage.visit();
    signUpPage.fillUsernameField(user.username);
    signUpPage.fillEmailField(user.email);
    signUpPage.fillPasswordField(user.password);
    signUpPage.clickOnSignUpBtn();

    homePage.assertRegistrationSuccessModal(modalMessage.successRegistration);
    homePage.clickOnModalOkBtn();
    homePage.assertUsername(user.username);
  });
  it('should not provide an ability to sign up with taken email', () => {
    cy.register(user.email, user.username, user.password);

    signUpPage.visit();
    signUpPage.fillUsernameField(user2.username);
    signUpPage.fillEmailField(user.email);
    signUpPage.fillPasswordField(user2.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertRegistrationFailedModal(modalMessage.takenEmail);
  });
  it('should not provide an ability to sign up with empty field', () => {
    signUpPage.visit();
    signUpPage.fillUsernameField(user.username);
    signUpPage.fillEmailField(user.email);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertRegistrationFailedModal(modalMessage.emptyPassword);
  });
});
