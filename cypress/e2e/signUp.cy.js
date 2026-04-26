/// <reference types='cypress' />
/// <reference types='../support' />

import { faker } from '@faker-js/faker';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
  });

  it('should provide an ability to sign up with valid credentials', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
    cy.location('hash').should('eq', '#/');
  });

  it('should not provide an ability to sign up with existing email', () => {
    cy.register(user.email, user.username, user.password);

    signUpPage.visit();

    signUpPage.typeUsername(faker.internet.userName());
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.contains('email', { matchCase: false }).should('be.visible');
    cy.location('hash').should('eq', '#/register');
  });
});
