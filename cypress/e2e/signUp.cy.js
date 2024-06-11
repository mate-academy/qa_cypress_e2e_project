/// <reference types='cypress' />
/// <reference types='../support' />
import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide to sign up with valid credentials (positive test)', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide to sign up with the empty "Email" field (negative test)', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertMessageEmptyEmail();
  });

  it('should not provide to sign up with the empty "Username" field (negative test)', () => {
    signUpPage.visit();

    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertMessageEmptyUsername();
  });

  it('should not provide to sign up with the empty "Password" field (negative test)', () => {
    signUpPage.visit();

    signUpPage.typeEmail(user.email);
    signUpPage.typeUsername(user.username);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertMessageEmptyPassword();
  });
});
