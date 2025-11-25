/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let userData;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      userData = generateUser;
    });
  });

  it('should provide an ability to register with valid data', () => {
    signUpPage.visit();
    signUpPage.typeUsername(userData.username);
    signUpPage.typeEmail(userData.email);
    signUpPage.typePassword(userData.password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(userData.username);
  });

  it('should not allow registration with existing email', () => {
    cy.register(userData.email, userData.username, userData.password);
    signUpPage.visit();
    signUpPage.typeUsername(`new_${userData.username}`);
    signUpPage.typeEmail(userData.email);
    signUpPage.typePassword(userData.password);
    signUpPage.clickSignUpBtn();

    signUpPage.errorMessages
      .should('be.visible')
      .and('contain', 'email has already been taken');
  });

  it('should validate required fields', () => {
    signUpPage.visit();
    signUpPage.clickSignUpBtn();

    signUpPage.errorMessages
      .should('be.visible')
      .and('contain', `username can't be blank`)
      .and('contain', `email can't be blank`)
      .and('contain', `password can't be blank`);
  });

  it('should validate email format', () => {
    signUpPage.visit();
    signUpPage.typeEmail('invalid-email');
    signUpPage.clickSignUpBtn();

    signUpPage.errorMessages
      .should('be.visible')
      .and('contain', 'email is invalid');
  });

  it('should validate password length', () => {
    signUpPage.visit();
    signUpPage.typePassword('short');
    signUpPage.clickSignUpBtn();

    signUpPage.errorMessages
      .should('be.visible')
      .and('contain', 'password is too short (minimum is 8 characters)');
  });
});
