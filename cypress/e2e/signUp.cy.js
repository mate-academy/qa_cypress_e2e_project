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
  const popupInvalidEmail = 'Email must be a valid email.';
  const popupInvalidPassword =
    // eslint-disable-next-line max-len
    'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.';

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
    signUpPage.typeEmail(data.emailWithotDomain);
    signUpPage.typePassword(data.password);
    signUpPage.clickSignUpBtn();

    pageObject.assertPopupContainText(popupInvalidEmail);
    pageObject.clickOnPopupBtn();

    signUpPage.typeUsername(data.username);
    signUpPage.typeEmail(data.email);
    signUpPage.typePassword(data.passwordWithoutNumber);
    signUpPage.clickSignUpBtn();

    pageObject.assertPopupContainText(popupInvalidPassword);
    pageObject.clickOnPopupBtn();

    signUpPage.typeUsername(data.username);
    signUpPage.typeEmail(data.email);
    signUpPage.typePassword(data.passwordWithoutLeter);
    signUpPage.clickSignUpBtn();

    pageObject.assertPopupContainText(popupInvalidPassword);
    pageObject.clickOnPopupBtn();

    signUpPage.typeUsername(data.username);
    signUpPage.typeEmail(data.email);
    signUpPage.typePassword(data.shortPassword);
    signUpPage.clickSignUpBtn();

    pageObject.assertPopupContainText(popupInvalidPassword);
    pageObject.clickOnPopupBtn();
  });
});
