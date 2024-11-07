import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  it('should allow a new user to sign up with valid data', () => {
    signUpPage.visit();
    signUpPage.fillSignUpForm(user.email, user.username, user.password);
    signUpPage.submitSignUp();

    cy.contains('Your account has been created').should('be.visible'); // Verify successful sign-up
  });

  it('should show error for invalid sign up data', () => {
    signUpPage.visit();
    signUpPage.fillSignUpForm('invalidemail', 'short', 'weak');
    signUpPage.submitSignUp();

    cy.contains('Sign up failed').should('be.visible'); // Verify error for invalid sign-up
  });
});
