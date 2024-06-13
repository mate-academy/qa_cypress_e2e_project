/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;
  const wrongData = {
    emailWithoutAt: 'maksi',
    emailWithoutDomain: 'maksi@mail',
    emailWithoutName: '@gmail.com'
  };

  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.visit();
  });

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to sign up with valid data', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertTheSuccessfulMessage();
    signUpPage.clickOkBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to sign up email without @', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(wrongData.emailWithoutAt);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertTheErrorMessageEmailNonvalid();
    signUpPage.clickOkBtn();
  });

  it('should provide an ability to sign up email without domain', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(wrongData.emailWithoutDomain);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertTheErrorMessageEmailNonvalid();
    signUpPage.clickOkBtn();
  });

  it('should provide an ability to sign up email without name', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(wrongData.emailWithoutName);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertTheErrorMessageEmailNonvalid();
    signUpPage.clickOkBtn();
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to sign up with empty username field', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertTheErrorMessageUserEmpty();
    signUpPage.clickOkBtn();
  });

  it('should not provide an ability to sign up with empty email field', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertTheErrorMessageEmptyEmail();
    signUpPage.clickOkBtn();
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to sign up with empty password field', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.assertTheErrorMessageEmptyPassword();
    signUpPage.clickOkBtn();
  });
});
