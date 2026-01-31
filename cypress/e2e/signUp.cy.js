/// <reference types='cypress' />
/// <reference types='../support' />

import { faker } from '@faker-js/faker';

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

const invalidData = {
  email: faker.word.sample(),
  password: faker.number.int({ min: 1, max: 999 })
};

const validEmail = 'riot@qa.team';

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      signUpPage.visit();
    });
  });

  it('should provide an ability to register with valid credentials', () => {
    signUpPage.register(user.email, user.username, user.password);

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to register with invalid email',
    () => {
      signUpPage.register(
        invalidData.email,
        user.username,
        user.password
      );

      signUpPage.assertErrorMessage('Email must be a valid email.');
    });

  it('should not provide an ability to register with invalid password',
    () => {
      signUpPage.register(
        user.email,
        user.username,
        invalidData.password
      );

      signUpPage.assertErrorMessage('Password must be ' +
        '8 characters long and include 1 number, ' +
        '1 uppercase letter, and 1 lowercase letter.');
    });

  it('should not provide an ability to register with already taken email',
    () => {
      cy.register(validEmail, user.username, user.password);
      signUpPage.register(validEmail, user.username, user.password);

      signUpPage.assertErrorMessage('Email already taken.');
    });
});
