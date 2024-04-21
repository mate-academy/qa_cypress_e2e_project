import PageObject from '../PageObject';
class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataCy('username-field')
  }

  get emailField() {
    return cy.getByDataCy('email-field')
  }

  get passwordField() {
    return cy.getByDataCy('password-field')
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-up-btn')
  }

  fillInUsernameField(username) {
    this.usernameField.type(username)
  }

  fillInEmailField(email) {
    this.emailField.type(email)
  }

  fillInPasswordField(password) {
    this.passwordField.type(password)
  }

  clickOnSignUpBtn() {
    this.signUpBtn.click()
  }

  assertSuccessSignUp(email, password, username) {
    cy.intercept('POST', '/register', {
      statusCode: 200,
      body: {
        email: email,
        password: password,
        username: username
      },
    })
  }

  assertErrorMessage(message) {
    cy.intercept('POST', '/register', {
      statusCode: 422,
      body: {
        error: message,
      },
    })
  }
}

export default SignUpPageObject;