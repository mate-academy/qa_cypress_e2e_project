/// <reference types='cypress' />
/// <reference types='../support' />

import PageObject from '../support/PageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const pageObject = new PageObject();

describe('Sign Up page', () => {
  let data;
  const popupSuccessText = 'Your registration was successful!';
  const popupInvalidText = 'Email must be a valid email.';

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateData').then((generateData) => {
      data = generateData;
    });
    signUpPage.visit();
  });

  it('should provide an ability to sign up with existing credentials', () => {
    signUpPage.typeUsername(data.username);
    signUpPage.typeEmail(data.email);
    signUpPage.typePassword(data.password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(data.username);
    pageObject.assertPopupContainText(popupSuccessText);
  });

  it('should not provide an ability to sign up with wrong credentials', () => {
    signUpPage.typeUsername(data.username);
    signUpPage.typeEmail(data.username);
    signUpPage.typePassword(data.password);
    signUpPage.clickSignUpBtn();

    pageObject.assertPopupContainText(popupInvalidText);
  });
});
