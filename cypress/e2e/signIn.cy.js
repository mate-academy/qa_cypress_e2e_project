/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;
  const wrongUser = {
    wrongEmail: 'maksi',
    passwordBad: 'maksi'
  };

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with empty email', () => {
    signInPage.typePassword(user.password);

    signInPage.clickSignInBtn();
    signInPage.assertMessageBlankEmail();
  });

  it('should not provide an ability to log in with empty password', () => {
    signInPage.typeEmail(user.email);

    signInPage.clickSignInBtn();
    signInPage.assertErrorMessageBadPassword();
  });

  it('should not provide an ability to log in with wrong password', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(wrongUser.passwordBad);

    signInPage.clickSignInBtn();
    signInPage.assertErrorMessageBadPassword();
  });

  it('should not provide an ability to log in with wrong email', () => {
    signInPage.typeEmail(wrongUser.wrongEmail);
    signInPage.typePassword(user.password);

    signInPage.clickSignInBtn();
    signInPage.asserErrorMessageBadEmail();
  });
});
