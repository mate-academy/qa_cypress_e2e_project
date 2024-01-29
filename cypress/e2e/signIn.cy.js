/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In functionality', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should successfully log in with existing credentials', () => {
    cy.register(user.username, user.email, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not allow logging in with incorrect email', () => {
    cy.register(user.username, user.email, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.newEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertLoginFailed();
  });

  it('should not allow logging in with incorrect password', () => {
    cy.register(user.username, user.email, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.newPassword);
    signInPage.clickSignInBtn();
    signInPage.assertLoginFailed();
  });

  it('should not allow logging in with an empty email', () => {
    cy.register(user.username, user.email, user.password);
    signInPage.visit();
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertLoginEmptyEmail();
  });

  it('should not allow logging in with an empty password', () => {
    cy.register(user.username, user.email, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();
    signInPage.assertLoginEmptyPassword();
  });
});
