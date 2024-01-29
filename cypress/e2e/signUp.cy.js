/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require("faker");

import HomePageObject from '../support/pages/home.pageObject';
import PageObject from '../support/PageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const pageObject = new PageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    signUpPage.visit();
  })

  it('should provide an ability to register a new user', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpButton();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to register with email without @ sign', () => {
    const email_without_at_sign = faker.name.firstName() + faker.name.lastName() + 'gmail.com'

    signUpPage.typeEmail(email_without_at_sign);
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpButton();

    pageObject.assertErrorWindow('Email must be a valid email.')
  })

  it('should not provide an ability to register with password less than 8 characters', () => {
    const password_less_than_8 = 'te1T'

    signUpPage.typeEmail(user.email);
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(password_less_than_8);
    signUpPage.clickSignUpButton();

    pageObject.assertErrorWindow('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.')
  })

  it('should not provide an ability to register with password without number', () => {
    const password_without_number = 'teSttest'

    signUpPage.typeEmail(user.email);
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(password_without_number);
    signUpPage.clickSignUpButton();

    pageObject.assertErrorWindow('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.')
  })

  it('should not provide an ability to register with password without uppercase letter', () => {
    const password_without_uppercase = 'testtest1'

    signUpPage.typeEmail(user.email);
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(password_without_uppercase);
    signUpPage.clickSignUpButton();

    pageObject.assertErrorWindow('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.')
  })

  it('should not provide an ability to register with password without lowercase letter', () => {
    const password_without_lowercase = 'TESTTEST1'

    signUpPage.typeEmail(user.email);
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(password_without_lowercase);
    signUpPage.clickSignUpButton();

    pageObject.assertErrorWindow('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.')
  })

  it('should not provide an ability to register with taken email', () => {
    const password = faker.internet.password();
    const username = faker.internet.firstName + "63523536"
    cy.register(user.email, user.username, user.password);
    
    signUpPage.typeEmail(user.email);
    signUpPage.typeUsername(username);
    signUpPage.typePassword(password);
    signUpPage.clickSignUpButton();

    pageObject.assertErrorWindow('Email already taken.')
  })

  it('should not provide an ability to register with empty email field', () => {
    const password = faker.internet.password();
    const username = faker.internet.firstName + "63523536"
    
    signUpPage.typeUsername(username);
    signUpPage.typePassword(password);
    signUpPage.clickSignUpButton();

    pageObject.assertErrorWindow('Email field required.')
  })

  it('should not provide an ability to register with empty username field', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpButton();

    pageObject.assertErrorWindow('Username field required.')
  })

  it('should not provide an ability to register with empty password field', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typeUsername(user.username);
    signUpPage.clickSignUpButton();

    pageObject.assertErrorWindow('Password field required.')
  })

  it('should not provide an ability to register with taken username', () => {
    cy.register(user.email, user.username, user.password);
    signUpPage.typeEmail(user.newEmail);
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.newPassword);
    signUpPage.clickSignUpButton();

    pageObject.assertErrorWindow('Username already taken.')
  })
});
