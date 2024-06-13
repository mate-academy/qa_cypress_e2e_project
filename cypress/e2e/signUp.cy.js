/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;
  const invalidData = {
    emptyUsername: '',
    emptyEmail: '',
    emptyPassword: ''
  };

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should allow registration with valid credentials', () => {
    signUpPage.visit();

    signUpPage.registerAllRequiredFields(
      user.username,
      user.email,
      user.password
    );

    signUpPage.assertTheSucessfulMessage();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should prevent registration with invalid credentials', () => {
    signUpPage.visit();

    signUpPage.registerAllRequiredFields(
      invalidData.emptyUsername,
      user.email,
      user.password
    );

    signUpPage.assertTheMessageErrorEmptyUsername();

    signUpPage.registerAllRequiredFields(
      user.username,
      invalidData.emptyEmail,
      user.password
    );

    signUpPage.assertTheMessageErrorEmptyEmail();

    signUpPage.registerAllRequiredFields(
      user.username,
      user.email,
      invalidData.emptyPassword
    );

    signUpPage.assertTheMessageErrorEmptyPassword();
  });
});
