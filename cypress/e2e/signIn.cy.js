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
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.launchLoginPage();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.launchLoginPage();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(`${user.password}TestPass!23`);
    signInPage.clickSignInBtn();

    cy.contains('div[class="swal-text"]', `Invalid user credentials.`).should(
      'be.visible'
    );
  });

  it(
    'should not provide the ability to log' + 'in without entering a email',
    () => {
      signInPage.launchLoginPage();

      signInPage.typePassword(`${user.password}TestPass!23`);
      signInPage.clickSignInBtn();

      cy.contains('div[class="swal-text"]', `Email field required.`).should(
        'be.visible'
      );
    }
  );

  it(
    'should not provide the ability to log' + 'in without entering a password',
    () => {
      signInPage.launchLoginPage();

      signInPage.typeEmail(user.email);
      signInPage.clickSignInBtn();

      cy.contains('div[class="swal-text"]', `Password field required.`).should(
        'be.visible'
      );
    }
  );
});
