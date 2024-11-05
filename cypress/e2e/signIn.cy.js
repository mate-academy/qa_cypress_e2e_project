/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;
  const wrongEmail = 'rodionmail.com';
  const wrongPassword = 'password';

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('shouldn\'t provide an ability to log in with wrong email', () => {
    signInPage.typeEmail(wrongEmail);
    signInPage.typePassword(user.password);

    signInPage.clickSignInBtn();

    signInPage.assertLoginFailed();
  });

  it('shouldn\'t provide an ability to log in with wrong password', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(wrongPassword);

    signInPage.clickSignInBtn();

    signInPage.assertLoginFailed();
  });
});
