/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  before(() => {
    // Setup actions before the tests run
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to sign up with generated credentials', () => {
    signUpPage.visit();
    cy.register(user.email, user.username, user.password);

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to register with wrong credentials', () => {
    signUpPage.visit();
    cy.register(user.email, user.username, user.password);

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('testpass');
    signUpPage.clickSignUpBtn();

    signUpPage.assertFailedRegistration();
  });
});
