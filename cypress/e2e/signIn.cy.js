/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ModalObject from '../support/pages/modal.Object';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const modal = new ModalObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
  });

  beforeEach(() => {
    signInPage.visit();
  });

  afterEach(() => {
    cy.logout();
    homePage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.login(user.email + 'random', user.password);
    modal.assertPageContainsCredsErrorMessage();
    modal.clickOkButton();

    signInPage.clearEmail();
    signInPage.clearPassword();
    signInPage.login(user.email, user.password + 'random');
    modal.assertPageContainsCredsErrorMessage();
    modal.clickOkButton();
  });
});
