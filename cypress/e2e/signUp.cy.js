/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('generateUser')
      .then((generateUser) => {
        user = generateUser;
      });
  });

  beforeEach(() => {
    cy.task('db:clear');

    signUpPage.visit();
  });

  it('should provide an ability to register with valid data', () => {
    signUpPage
      .typeUsername(user.username);

    signUpPage
      .typeEmail(user.email);

    signUpPage
      .typePassword(user.password);

    signUpPage
      .clickSignUpBtn();

    signUpPage
      .assertSuccessMessage();

    signUpPage
      .clickOkBtn();

    homePage
      .assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to register with invalid email', () => {
    signUpPage
      .typeUsername(user.username);

    signUpPage
      .typeEmail('email.com');

    signUpPage
      .typePassword(user.password);

    signUpPage
      .clickSignUpBtn();

    signUpPage
      .assertErrorMessage();

    signUpPage
      .clickOkBtn();

    homePage
      .assertUsernameNotExist();
  });

  it('should not provide an ability to register with invalid password', () => {
    signUpPage
      .typeUsername(user.username);

    signUpPage
      .typeEmail(user.email);

    signUpPage
      .typePassword('pass');

    signUpPage
      .clickSignUpBtn();

    signUpPage
      .assertErrorMessage();

    signUpPage
      .clickOkBtn();

    homePage
      .assertUsernameNotExist();
  });
});
