import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

/// <reference types='cypress' />
/// <reference types='../support' />

const homePage = new HomePageObject();
const SignUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;
  const tooShortPassword = '12Qwert';

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to Sign up with valid credentials', () => {
    SignUpPage.visit();
    SignUpPage.typeUserName(user.username);
    SignUpPage.typeEmail(user.email);
    SignUpPage.typePassword(user.password);
    SignUpPage.clickSignUpBtn();
    homePage.assertSuccesfulRegistrationMessage();
    homePage.clickSuccessfulRegistrationBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide ability to Sign up with empty UserName field', () => {
    SignUpPage.visit();
    SignUpPage.typeEmail(user.email);
    SignUpPage.typePassword(user.password);
    SignUpPage.clickSignUpBtn();
    SignUpPage.assertUsernameRequiredMessage();
  });

  it('should not provide ability to Sign up with empty Email field', () => {
    SignUpPage.visit();
    SignUpPage.typeUserName(user.username);
    SignUpPage.typePassword(user.password);
    SignUpPage.clickSignUpBtn();
    SignUpPage.asserEmailRequiredMessage();
  });

  it('should not provide ability to Sign up with empty Password field', () => {
    SignUpPage.visit();
    SignUpPage.typeUserName(user.username);
    SignUpPage.typeEmail(user.email);
    SignUpPage.clickSignUpBtn();
    SignUpPage.asserPasswordRequiredMessage();
  });

  it('should not allow to Sign up with password shorter than 8 letters', () => {
    SignUpPage.visit();
    SignUpPage.typeUserName(user.username);
    SignUpPage.typeEmail(user.email);
    SignUpPage.typePassword(tooShortPassword);
    SignUpPage.clickSignUpBtn();
    SignUpPage.assertInvalidPasswordMessage();
  });
});
