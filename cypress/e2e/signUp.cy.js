/// <reference types='cypress' />
/// <reference types='../support' />

import faker from "faker";
import HomePageObject from "../support/pages/home.pageObject";
import SignUpPageObject from "../support/pages/signUp.pageObject";

const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;
  const testData = {
    username: faker.lorem.word(),
    password: 'Password1!'
  }

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an ability to sign up', () => {
    signUpPage.visit();

    signUpPage.usernameField
    .type(user.username);
    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();

    homePage.usernameLink
      .should('contain', user.username);
  });

  it('should provide an ability to sign up with existing email', () => {
    signUpPage.visit();
    cy.register(user.email, user.username, user.password);

    signUpPage.usernameField
    .type(testData.username);
    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type(testData.password);
    signUpPage.signUpBtn
      .click();

    signUpPage.dialogWindow
      .should('contain', 'Registration failed!')
      .and('contain', 'Email already taken.')
  });
});
