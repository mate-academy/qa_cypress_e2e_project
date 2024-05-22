import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '#/register';

  get SignUpLinkbtn() {
    return cy.getByDataQa('SignUp').click();
  }

  get fillUserNameField() {
    return cy.getByDataQa('usernamefield').type('HectorAntonia123');
  }

  get fillMailField() {
    return cy.getByDataQa('emailField').type('Kelly112@mail.com');
  }

  clickSignUpBtn() {
    return cy.getByDataQa('SignUpbtn').click();
  }

  get fillPasswordField() {
    return cy.getByDataQa('passwordField').type('SuperSafePassword123');
  }

  get fillUsernameInvalid() {
    return cy.getByDataQa('usernamefield');
  }
}

export default SignUpPageObject;
