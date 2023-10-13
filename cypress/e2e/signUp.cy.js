/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

const testData = {
  username: faker.name.firstName().toLowerCase(),
  email: faker.internet.email().toLowerCase(),
  password: `${faker.random.alpha({ count: 1 }).toUpperCase()}${faker.random.alphaNumeric(9)}`
};

const invalidEmail = faker.random.word() + faker.random.number() + faker.random.word() + '.com';
const invalidusername = '#$%^&^!*';
const invalidShortPassword = `${faker.random.alpha({ count: 1 }).toUpperCase()}${faker.random.alphaNumeric(3)}`;
const invalidLongPassword = `${faker.random.alpha({ count: 1 }).toUpperCase()}${faker.random.alphaNumeric(51)}`;
const invalidShortUsername = faker.random.alpha({ count: 2, upcase: false }).toLowerCase();
const invalidLongUsername = faker.random.alpha({ count: 128, upcase: false }).toLowerCase();


describe('Sign Up page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.visit();
  });

  it('should provide the abilities to register with valid data', () => {
    signUpPage.typeUsername(testData.username);
    signUpPage.typeEmail(testData.email);
    signUpPage.typePassword(testData.password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(testData.username);
    signUpPage.assertModalContainPositiveText();
  });

  it('should provide the abilities to register with an empty usename field', () => {
    signUpPage.typeEmail(testData.email);
    signUpPage.typePassword(testData.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertModalContainText();
  });

  it('should provide the abilities to register with an empty email field', () => {
    signUpPage.typeUsername(testData.username);
    signUpPage.typePassword(testData.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertModalContainText();
  });

  it('should provide the abilities to register with an empty password field', () => {
    signUpPage.typeUsername(testData.username);
    signUpPage.typeEmail(testData.email);
    signUpPage.clickSignUpBtn();

    signUpPage.assertModalContainText();
  });

  it('should provide the abilities to register with an email without @', () => {
    signUpPage.typeUsername(testData.username);
    signUpPage.typeEmail(invalidEmail);
    signUpPage.typePassword(testData.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertModalContainText();
  });

  it('should provide the abilities to register with an username with #$%^&^!*', () => {
    signUpPage.typeUsername(invalidusername);
    signUpPage.typeEmail(testData.email);
    signUpPage.typePassword(testData.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertModalContainText();
  });

  it('should provide the abilities to register with 3 characters in the password ', () => {
    signUpPage.typeUsername(testData.username);
    signUpPage.typeEmail(testData.email);
    signUpPage.typePassword(invalidShortPassword);
    signUpPage.clickSignUpBtn();

    signUpPage.assertModalContainText();
  });

  it('should provide the abilities to register with 51 characters in the password ', () => {
    signUpPage.typeUsername(testData.username);
    signUpPage.typeEmail(testData.email);
    signUpPage.typePassword(invalidLongPassword);
    signUpPage.clickSignUpBtn();

    signUpPage.assertModalContainPositiveText();
  });

  it('should provide the abilities to register with 2 characters in the username ', () => {
    signUpPage.typeUsername(invalidShortUsername);
    signUpPage.typeEmail(testData.email);
    signUpPage.typePassword(testData.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertModalContainPositiveText();
  });

  it('should provide the abilities to register with 128 characters in the username ', () => {
    signUpPage.typeUsername(invalidLongUsername);
    signUpPage.typeEmail(testData.email);
    signUpPage.typePassword(testData.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertModalContainText();
  });
});
