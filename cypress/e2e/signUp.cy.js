import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    return cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  it('should provide an ability to register with valid data', () => {
    cy.then(() => {
      signUpPage.visit();
      signUpPage.typeUsername(user.username);
      signUpPage.typeEmail(user.email);
      signUpPage.typePassword(user.password);
      signUpPage.clickSignUpBtn();

      homePage.assertHeaderContainUsername(user.username);
    });
  });

  it('should not allow registration with invalid email', () => {
    cy.then(() => {
      signUpPage.visit();
      signUpPage.typeUsername(user.username);
      signUpPage.typeEmail('invalid-email');
      signUpPage.typePassword(user.password);
      signUpPage.clickSignUpBtn();

      signUpPage.assertErrorMessage('Email must be a valid email.');
      signUpPage.assertUrl();
    });
  });

  it('should not allow registration with weak password', () => {
    cy.then(() => {
      signUpPage.visit();
      signUpPage.typeUsername(user.username);
      signUpPage.typeEmail(user.email);
      signUpPage.typePassword('123');
      signUpPage.clickSignUpBtn();

      signUpPage.assertErrorMessage(
        // eslint-disable-next-line max-len
        'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.'
      );
      signUpPage.assertUrl();
    });
  });

  it('should not allow registration with existing email', () => {
    cy.then(() => {
      cy.register(user.email, user.username, user.password);

      signUpPage.visit();
      signUpPage.typeUsername(user.username + '2');
      signUpPage.typeEmail(user.email);
      signUpPage.typePassword(user.password);
      signUpPage.clickSignUpBtn();

      signUpPage.assertErrorMessage('Email already taken.');
      signUpPage.assertUrl();
    });
  });
});
