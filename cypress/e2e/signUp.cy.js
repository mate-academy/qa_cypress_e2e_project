/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    }).then(() => {
      signUpPage.visit();
    });
  });

  it('should successfully sign up with valid credentials', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should show validation error for invalid email format', () => {
    const { username, password } = user;

    signUpPage.typeUserName(username);
    signUpPage.typeEmail('isInvalidEmail');
    signUpPage.typePassword(password);
    signUpPage.clickSignUpBtn();

    signUpPage.errorIsInvalidEmail();
  });

  it('should show validation error for invalid password', () => {
    const { email, username } = user;

    signUpPage.typeUserName(username);
    signUpPage.typeEmail(email);
    signUpPage.typePassword('isInvalidPassword');
    signUpPage.clickSignUpBtn();

    signUpPage.errorIsInvalidPassword();
  });

  it('should show error when email is already taken', () => {
    const { email, username, password } = user;

    cy.register(email, username, password).then(() => {
      signUpPage.typeUserName(username);
      signUpPage.typeEmail(email);
      signUpPage.typePassword(password);
      signUpPage.clickSignUpBtn();

      signUpPage.errorEmailIsTaken();
    });
  });
});
