/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPageObject from "../support/pages/signUp.pageObject";
const signUpPage = new SignUpPageObject();
import HomePageObject from '../support/pages/home.pageObject';
const homePage = new HomePageObject();
const wrongEmail = 'test@gmail.com';

describe('Sign Up page', () => {
  beforeEach(() => {
    let user;
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = new Object(generateUser);
    });
    signUpPage.visit();
  });

  it('should sign up with valid credentials', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to sign up in with wrong credentials', () => {
    signUpPage.typeEmail(wrongEmail);
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertErrorMessage('This email is taken.');
  });
});
