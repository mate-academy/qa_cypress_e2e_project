import PageObject from "../PageObject";

class SignUpPageObject extends PageObject {
  url = "/#/register";

  get usernameField() {
    return cy.get('[data-qa="registerUsername"]');
  }

  get emailField() {
    return cy.get('[data-qa="registerEmail"]');
  }

  get passwordField() {
    return cy.get('[data-qa="registerPassword"]');
  }

  get signUpBtn() {
    return cy.get('[data-qa="registerBtn"]').click();
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

  clickSignInBtn() {
    this.signInBtn.click();
  }
}

export default SignUpPageObject;
