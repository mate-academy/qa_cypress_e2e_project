import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = 'user/register';

  get usernameField() {
    return cy.get('input[placeholder="Username"]', { timeout: 10000 });
  }

  get emailField() {
    return cy.get('input[placeholder="Email"]', { timeout: 10000 });
  }

  get passwordField() {
    return cy.get('input[placeholder="Password"]');
  }

  get signUpBtn() {
    return cy.get('.btn.btn-lg');
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  fillSignUpForm(user) {
    this.typeUsername(user.username);
    this.typeEmail(user.email);
    this.typePassword(user.password);
  }

  signUpSuccessful(user) {
    this.fillSignUpForm(user);
    this.signUpBtn.click();
  }

  signUpUnsuccessful(user, message) {
    this.fillSignUpForm(user);
    this.signUpBtn.click();
    cy.contains(message).should('be.visible');
  }
}

export default SignUpPageObject;
