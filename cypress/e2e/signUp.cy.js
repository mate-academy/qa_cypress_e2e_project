/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to sign up with valid credentials', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertPageContainSuccesIcon();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('shouldn\'t provide an ability to sign up without filling all fields', () => {
    signUpPage.visit();
    
    signUpPage.clickSignUpBtn();

    signUpPage.assertPageContainAlertIcon();
  });

  it('shouldn\'t provide an ability to sign up without filling the "username" field', () => {
    signUpPage.visit();

    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertPageContainAlertIcon();
  });
});
