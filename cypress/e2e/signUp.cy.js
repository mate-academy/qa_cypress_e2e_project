/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import { faker } from '@faker-js/faker';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;
  let invalidEmail;
  let validEmail;
  let uniqValidEmail;
  const validPassword = '12345Qwert!';
  const invalidPassword = '12345';

  before(() => {
    invalidEmail = faker.string.alphanumeric(10);
    validEmail = faker.internet.email();
    cy.task('db:clear')
      .then(() => cy.task('generateUser'))
      .then((generateUser) => {
        user = generateUser;
      });
  });

  beforeEach(() => {
    uniqValidEmail = faker.internet.email();
  });

  it('should provide an ability to register with valid credentials', () => {
    signUpPage.visit();
    signUpPage.register(user.email, user.username, user.password);

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to register with invalid email', () => {
    signUpPage.visit();
    signUpPage.register(invalidEmail, user.username, user.password);

    signUpPage.assertErrorMessageVisible();
    signUpPage.assertErrorMessageContains('Email must be a valid email.');
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to register with already taken email', () => {
    signUpPage.visit();
    cy.register(validEmail, user.username, validPassword);
    signUpPage.register(validEmail, user.username, user.password);

    signUpPage.assertErrorMessageVisible();
    signUpPage.assertErrorMessageContains('Email already taken.');
  });

  it('should not provide an ability to register with invalid password', () => {
    signUpPage.visit();
    signUpPage.register(uniqValidEmail, user.username, invalidPassword);
    signUpPage.assertErrorMessageVisible();
    signUpPage.assertErrorMessageContains('Password must be ' +
        '8 characters long and include 1 number, ' +
        '1 uppercase letter, and 1 lowercase letter.'
    );
  });
});
