/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong email', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email + 'WRONG!');
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.errorLoginMessage();
  });

  it('should not provide an ability to log in with wrong password', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password + 'WRONG!');
    signInPage.clickSignInBtn();

    signInPage.errorLoginMessage();
  });

  it('should not provide an ability to log in with empty email', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail('{backspace}');
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.errorLoginMessage();
  });

  it('should not provide an ability to log in with empty password', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword('{backspace}');
    signInPage.clickSignInBtn();

    signInPage.errorLoginMessage();
  });
});
