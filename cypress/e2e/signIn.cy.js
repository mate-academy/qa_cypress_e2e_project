/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;
  const wrongUser = {
    emptyEmail: '',
    emptyPassword: '',
    email: 'ANy',
    passwordBad: 'ccrvrbtrvlrlcec65'
  };

  before(() => {
    cy.task('db:clear');
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

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials',
    () => {
      signInPage.visit();

      signInPage.typeEmail(user.email);
      signInPage.typePassword(wrongUser.passwordBad);

      signInPage.clickSignInBtn();
      signInPage.assertTheMessageErrorBadPassword();

      signInPage.visit();

      signInPage.typeEmail(wrongUser.email);
      signInPage.typePassword(user.password);

      signInPage.clickSignInBtn();
      signInPage.assertTheMessageErrorBadEmail();

      signInPage.visit();

      signInPage.typeEmail(wrongUser.emptyEmail);
      signInPage.typePassword(user.password);

      signInPage.clickSignInBtn();
      signInPage.assertTheMessageBlankEmail();
    });
});
