/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import generateUser from '../support/utils/generateUser';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.visit();
  });

  it('should provide ability to register with valid credentials', () => {
    const { username, email, password } = generateUser();
    signUpPage.typeUserName(username);
    signUpPage.typeEmail(email);
    signUpPage.typePassword(password);
    signUpPage.clickSignUpBtn();
    homePage.assertHeaderContainUsername(username);
  });

  it(`should not accept email without dot, '@' and spaces`, () => {
    const { username, password } = generateUser();
    signUpPage.typeUserName(username);
    signUpPage.typeEmail('Cierra@examplecom');
    signUpPage.typePassword(password);
    signUpPage.clickSignUpBtn();
    signInPage.assertSignInError();
    signUpPage.clickSwalBtn();
    signUpPage.typeUserName(username);
    signUpPage.typeEmail('Cierra@example      com');
    signUpPage.typePassword(password);
    signUpPage.clickSignUpBtn();
    signInPage.assertSignInError();
    signUpPage.clickSwalBtn();
    signUpPage.typeUserName(username);
    signUpPage.typeEmail('Cierraexample.com');
    signUpPage.typePassword(password);
    signUpPage.clickSignUpBtn();
    signInPage.assertSignInError();
  });
});
