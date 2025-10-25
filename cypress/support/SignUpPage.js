import PageObject from '../PageObject';

class SignUpPage extends PageObject {
  url = '/user/register';

  // Pola formularza
  get usernameField() {
    return cy.get('input[placeholder="Username"]');
  }

  get emailField() {
    return cy.get('input[placeholder="Email"]');
  }

  get passwordField() {
    return cy.get('input[placeholder="Password"]');
  }

  get signUpButton() {
    return cy.get('button[type="submit"]');
  }

  // Akcje
  typeUsername(username) {
    this.usernameField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignUp() {
    this.signUpButton.click();
  }

  // Metoda do wypełnienia całego formularza
  fillForm(user) {
    this.typeUsername(user.username);
    this.typeEmail(user.email);
    this.typePassword(user.password);
  }

  submitForm(user) {
    this.fillForm(user);
    this.clickSignUp();
  }
}

export default SignUpPage;
