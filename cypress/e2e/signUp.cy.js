/// <reference types="cypress" />
/// <reference types="../support" />
import faker from "faker";
import SignUpPageObject from "../support/pages/signUp.pageObject";
import HomePageObject from '../support/pages/home.pageObject';

const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();

let testData;
let user;

describe('Sign Up page', () => {
  before(() => {
    testData = {
      userName: faker.name.firstName().toLowerCase(),
      email: faker.name.lastName().toLowerCase(),
      password: faker.random.number(10, 50)
    };
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.visit();
  });

  it('should provide an ability to sign up with correct credentials', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    homePage.usernameLink
      .should('contain', user.username);
  });

  it('should not provide an ability to sign up with wrong email', () => {
    signUpPage.signUp(user.username, testData.email, user.password);
    signUpPage.assertsignUpFailed('Registration failed!', 'Email must be a valid email.');
  });

  it('should not provide an ability to sign up with wrong password', () => {
    signUpPage.signUp(user.username, user.email, testData.password);
    signUpPage.assertsignUpFailed('Registration failed!', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });
});
