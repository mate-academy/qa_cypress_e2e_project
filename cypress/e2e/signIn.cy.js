/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const SignInPage = new SignInPageObject();
const HomePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    SignInPage.visit();
    cy.register(user.email, user.username, user.password);

    SignInPage.typeEmail(user.email);
    SignInPage.typePassword(user.password);
    SignInPage.clickSignInBtn();

    HomePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    SignInPage.visit();

    SignInPage.typeEmail('testtesttest@example.com');
    SignInPage.typePassword('test123123!');
    SignInPage.clickSignInBtn();

    cy.contains('email or password:is invalid').should('be.visible');
  });
});
