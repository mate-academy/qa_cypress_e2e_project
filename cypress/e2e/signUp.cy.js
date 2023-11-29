/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const { faker } = require('@faker-js/faker');

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  const registerData = {
    username: faker.person.firstName().toLowerCase(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password()
  };

  const invalidRegisterData = {
    username: faker.person.firstName().toLowerCase(),
    invalidEmail: faker.internet.color(),
    password: faker.internet.password()
  };

  before(() => {
    cy.task('db:clear');
  });

  it('should provide an ability to sign up', () => {
    signUpPage.visit();

    signUpPage.typeUsername(registerData.username);
    signUpPage.typeEmail(registerData.email);
    signUpPage.typePassword(registerData.password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(registerData.username);
  });

  it('should not provide an ability to sign up with involid email field', () => {
    signUpPage.visit();

    signUpPage.typeUsername(invalidRegisterData.username);
    signUpPage.typeEmail(invalidRegisterData.invalidEmail);
    signUpPage.typePassword(invalidRegisterData.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertContainErrorMessage();
  });
});
