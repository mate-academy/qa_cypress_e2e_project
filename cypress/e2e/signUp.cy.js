/// <reference types='cypress' />
/// <reference types='../support' />
import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const { faker } = require('@faker-js/faker');
describe('Sign Up page', () => {
  let user;
  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.visit('/');
  });

  it('should login with valid data', () => {
    const registrationSuccessful = 'Your registration was successful!';
    homePage.clickSignUpLink;
    signUpPage.writeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalHaveText(registrationSuccessful);
    signUpPage.clickSwallOk();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should NOT login with no @ in the email', () => {
    const regFailed = 'Registration failed!';
    const emailMustBeValid = 'Email must be a valid email.';
    homePage.clickSignUpLink;
    signUpPage.writeUsername(user.username);
    signUpPage.typeEmail(user.username + faker.internet.domainName());
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalTitle(regFailed);
    signUpPage.assertModalHaveText(emailMustBeValid);
    signUpPage.clickSwallOk();
    homePage.assertHeaderNotContainUsername();
  });
});
