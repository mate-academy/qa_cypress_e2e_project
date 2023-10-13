/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

const newUsername = faker.lorem.word();
const newPassword = faker.internet.password();
const invalidEmail = faker.lorem.word();
const invalidPassword = faker.lorem.word();

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
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

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to sign up with existed email', () => {
    cy.register(user.email, user.username, user.password);
    signUpPage.typeUsername(newUsername);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(newPassword);
    signUpPage.clickSignUpBtn();

    signUpPage.assertTakenEmail();
  });

  it('should not provide an ability to sign up with invalid email format', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(invalidEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertInvalidEmail();
  });

  it('should not provide an ability to sign up with invalid password format', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(invalidPassword);
    signUpPage.clickSignUpBtn();

    signUpPage.assertInvalidPassword();
  });
});
