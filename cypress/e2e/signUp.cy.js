/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;
  let user2;

  before(() => {
    cy.task('generateUser').then((generateUser1) => {
      user = generateUser1;
    });

    cy.task('generateUser').then((generateUser2) => {
      user2 = generateUser2;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.visit();
  });

  it('should provide an ability to register with valid credentials', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignInBtn();
    homePage.assertSuccessfullRegistration();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to register with blank username', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignInBtn();
    signUpPage.assertRequiredUsername();
  });

  it('should not allow to register with already exist username', () => {
    signUpPage.typeUsername(user2.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignInBtn();
    signUpPage.assertAlreadyExistUsername();
  });

  it('should not allow to register with spaces in username', () => {
    signUpPage.typeUsername(user.withSpaceName);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignInBtn();
    signUpPage.assertInvalidUsername();
  });

  it('should not provide an ability to register with blank email', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignInBtn();
    signUpPage.assertRequiredEmail();
  });

  it('should not allow to register with already exist email', () => {
    cy.register(user2.email, user2.username, user2.password);
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user2.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignInBtn();
    signUpPage.assertAlreadyExistEmail();
  });

  it('should not allow to register without domain in email', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.withotDomainEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignInBtn();
    signUpPage.assertInvalidEmail();
  });

  it('should not provide an ability to register without text in email', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.withotTextEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignInBtn();
    signUpPage.assertInvalidEmail();
  });

  it('should not provide an ability to register with blank password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignInBtn();
    signUpPage.assertRequiredPassword();
  });

  it('should not allow to register with 7 symbols in password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.smallPassword);
    signUpPage.clickSignInBtn();
    signUpPage.assertInvalidPassword();
  });

  it('should not allow to register without number in password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.withotNumberPassword);
    signUpPage.clickSignInBtn();
    signUpPage.assertInvalidPassword();
  });

  it('should not allow to register without uppercase in password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.withotUppercasePassword);
    signUpPage.clickSignInBtn();
    signUpPage.assertInvalidPassword();
  });
});
