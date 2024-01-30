/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;
  let user2;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
    });
  });
  it('should provide an ability to register with valid credentials', () => {
    signUpPage.visit();

    signUpPage.typeInUserNameField(user.username);
    signUpPage.typeInUserEmailField(user.email);
    signUpPage.typeInUserPasswordField(user.password);
    signUpPage.clickOnSignUpBtn();
    signUpPage
      .warmMessageTextContain('Welcome!Your registration was successful!');
    signUpPage.warmMessageClickOk();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to register with an existing email', () => {
    cy.register();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);
    cy.register(user2.email, user2.username, user2.password);

    signUpPage.visit();
    signUpPage.typeInUserNameField(user.username);
    signUpPage.typeInUserEmailField(user2.email);
    signUpPage.typeInUserPasswordField(user.password);
    signUpPage.clickOnSignUpBtn();
    homePage.warmMessageTextContain('Registration failed!Email already taken.');
    homePage.warmMessageClickOk();
  });
});
