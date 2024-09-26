/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('Register a new account', () => {
    const successMsg = 'Your registration was successful!';

    // Visit register page
    signUpPage.visit();

    // Corrects credentials
    signUpPage.userNameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpBtn.click();

    // Check success message existing or not
    signUpPage.modalText.should('contain', successMsg);

    // Allert
    cy.contains('button', 'OK').click();
    cy.get('a[data-testid="profile-nav"]').should('contain', user.username);

    // User profile
    cy.get('a[data-testid="profile-nav"]').click();
    cy.get('a.btn').click();

    // Login out
    cy.contains('button', 'Or click here to logout.').click();
  });

  it('Register a new account with wrong details', () => {
    const failedMsg = 'Registration failed!';
    const failedMsgBottom = 'Email must be a valid email.';

    // Odwiedza stronę rejestracji
    signUpPage.visit();

    // Wypełnia formularz niepoprawnymi danymi
    signUpPage.userNameField.type(user.username);
    signUpPage.passwordField.type(user.email); // Błędne dane: zamienione miejscami email i hasło
    signUpPage.emailField.type(user.password); // Błędne dane: zamienione miejscami hasło i email

    // Kliknięcie przycisku "Sign up"
    signUpPage.signUpBtn.click();

    // Sprawdza czy pojawia się komunikat o nieudanej rejestracji
    cy.get('div.swal-title').should('contain', failedMsg);
    signUpPage.modalText.should('contain', failedMsgBottom);
  });

  it('Register a new account with wrong details', () => {
    const failedMsg = 'Registration failed!';
    const failedMsgBottom = 'Email must be a valid email.';

    // Odwiedza stronę rejestracji
    signUpPage.visit();

    // Wypełnia formularz niepoprawnymi danymi
    signUpPage.userNameField.type(user.username);
    signUpPage.passwordField.type(user.email); // Błędne dane: zamienione miejscami email i hasło
    signUpPage.emailField.type(user.password); // Błędne dane: zamienione miejscami hasło i email

    // Kliknięcie przycisku "Sign up"
    signUpPage.signUpBtn.click();

    // Sprawdza czy pojawia się komunikat o nieudanej rejestracji
    cy.get('div.swal-title').should('contain', failedMsg);
    signUpPage.modalText.should('contain', failedMsgBottom);
  });
});