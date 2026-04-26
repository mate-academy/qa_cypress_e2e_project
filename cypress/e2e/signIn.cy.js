/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;

      cy.register(user.email, user.username, user.password);
      signInPage.visit();
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    cy.intercept('POST', '/users/login').as('loginRequest');

    signInPage.typeEmail(user.email);
    signInPage.typePassword('wrongPassword123');
    signInPage.clickSignInBtn();

    cy.wait('@loginRequest').then(({ response }) => {
      expect(response.statusCode).to.eq(422);
    });
  });
});
