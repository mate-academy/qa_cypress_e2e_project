/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    return cy.task('db:clear')
      .then(() => cy.task('generateUser'))
      .then((generateUser) => {
        user = generateUser;
        return cy.register(user.email, user.username, user.password);
      });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.visit();
    signInPage.typeEmail('wrong@example.com');
    signInPage.typePassword('wrongPassword');
    signInPage.clickSignInBtn();
    cy.contains('email or password is invalid').should('be.visible');
  });
});
