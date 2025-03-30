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
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
    homePage.assertHomePageUrl();
  });

  it('should not provide an ability to log in with wrong password', () => {
    cy.register(user.email, user.username, user.password);
    user = { ...user, password: 'qwert!' };
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertWrongData(
      'Login failed!',
      'Invalid user credentials.'
    );
  });

  it('should not provide an ability to log in with wrong email', () => {
    cy.register(user.email, user.username, user.password);
    user = { ...user, email: 'qa@test.com' };
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertWrongData(
      'Login failed!',
      'Invalid user credentials.'
    );
  });
});
