import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '#/register';

  get SignUpLinkbtn() {
    return cy.getByDataQa('SignUp');
  }

  SignUpbtn() {
    this.SignUpLinkbtn.click();
  }

  get fillUserNameField() {
    return cy.getByDataQa('usernamefield');
  }

  UserNameField() {
    this.fillUserNameField.type('validusername123');
  }

  get fillMailField() {
    return cy.getByDataQa('emailField');
  }

  MailField() {
    this.fillMailField.type('validEmail@mail.com');
  }

  clickSignUpBtn() {
    return cy.getByDataQa('SignUpbtn').click();
  }

  get fillPasswordField() {
    return cy.getByDataQa('passwordField');
  }

  PasswordField() {
    this.fillPasswordField.type('validPassword123');
  }

  get fillUsernameInvalid() {
    return cy.getByDataQa('usernamefield');
  }

  UsernameInvalid() {
    this.fillUsernameInvalid.type('Thisusernameisexactly41charactersleght123');
  }

  get fillSecondEmail() {
    return cy.getByDataQa('emailField');
  }

  SecondEmail() {
    this.fillSecondEmail.type('secondValidEmail@gmail.com');
  }

  get fillMailInvalid() {
    return cy.getByDataQa('emailField');
  }

  MailInvalid() {
    this.fillMailInvalid.type('invalidEmail');
  }

  get fillPasswordInvalid() {
    return cy.getByDataQa('passwordField');
  }

  PasswordInvalid() {
    this.fillPasswordInvalid.type('password');
  }

  registrationFailedAssert() {
    cy.get('.swal-title').should('contain', 'Registration failed!');
  }

  registrationPassedAssert() {
    cy.get('.swal-title').should('contain', 'Welcome!');
  }
}
export default SignUpPageObject;
