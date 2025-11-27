/// <reference types='cypress' />
/// <reference types='../support' />

// import SettingsPage from '../support/pages/settings.pageObject';
import SignUpPage from '../support/pages/signUp.pageObject';

// const settingsPage = new SettingsPage();
const signUpPage = new SignUpPage();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((u) => {
      user = u;
    });
  });

  it('should register a new user successfully', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.contains(user.username).should('exist');
  });

  it('should show error when email already exists', () => {
    cy.register(user);

    cy.task('generateUser').then((u2) => {
      const duplicateEmailUser = {
        username: u2.username,
        email: user.email,
        password: u2.password
      };

      signUpPage.visit();
      signUpPage.typeUsername(duplicateEmailUser.username);
      signUpPage.typeEmail(duplicateEmailUser.email);
      signUpPage.typePassword(duplicateEmailUser.password);
      signUpPage.clickSignUpBtn();

      cy.contains('This email is taken.').should('exist');
    });
  });

  it('should show error when username already exists', () => {
    cy.register(user);

    cy.task('generateUser').then((u2) => {
      const duplicateUsernameUser = {
        username: user.username,
        email: u2.email,
        password: u2.password
      };

      signUpPage.visit();
      signUpPage.typeUsername(duplicateUsernameUser.username);
      signUpPage.typeEmail(duplicateUsernameUser.email);
      signUpPage.typePassword(duplicateUsernameUser.password);
      signUpPage.clickSignUpBtn();

      cy.get('[data-cy=signup-errors]').should('be.visible');
    });
  });
});
