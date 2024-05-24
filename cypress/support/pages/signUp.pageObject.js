import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '#/register';

  get SignUpLinkbtn() {
    return cy.getByDataQa('SignUp').click();
  }

  get fillUserNameField() {
    return cy.getByDataQa('usernamefield').type('validusername123');
  }

  get fillMailField() {
    return cy.getByDataQa('emailField').type('validEmail@mail.com');
  }

  clickSignUpBtn() {
    return cy.getByDataQa('SignUpbtn').click();
  }

  get fillPasswordField() {
    return cy.getByDataQa('passwordField').type('validPassword123');
  }

  get fillUsernameInvalid() {
    return cy.getByDataQa('usernamefield')
      .type('Thisusernameisexactly41charactersleght123');
  }

  get fillMailInvalid() {
    return cy.getByDataQa('emailField').type('invalidEmail');
  }

  get fillPasswordInvalid() {
    return cy.getByDataQa('passwordField').type('password');
  }
}
export default SignUpPageObject;
