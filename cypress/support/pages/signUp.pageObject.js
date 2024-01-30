import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  typeInUserNameField(userName) {
    cy.getByDataCy('user-name-sign-up').type(userName);
  }

  typeInUserEmailField(Email) {
    cy.getByDataCy('email-sign-in').type(Email);
  }

  typeInUserPasswordField(Password) {
    cy.getByDataCy('password-sign-in').type(Password);
  }

  clickOnSignUpBtn(signUpBtn) {
    cy.getByDataCy('sign-in-btn').click(signUpBtn);
  }
}

export default SignUpPageObject;
