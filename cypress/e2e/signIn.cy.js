/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import PageObject from '../support/PageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const pageObject = new PageObject();

describe('Sign In page', () => {
  let data;
  const popupInvalidText = 'Invalid user credentials.';

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateData').then((generateData) => {
      data = generateData;
    });
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.register(data.email, data.username, data.password);

    signInPage.typeEmail(data.email);
    signInPage.typePassword(data.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(data.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.typeEmail(data.email);
    signInPage.typePassword(data.password);
    signInPage.clickSignInBtn();

    pageObject.assertPopupContainText(popupInvalidText);
  });
});
