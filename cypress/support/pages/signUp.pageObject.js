import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get signUpUsernameField() {
    return cy.getByDataQa('sign-up-username');
  }

  get signUpEmailField() {
    return cy.getByDataQa('sign-up-email');
  }

  get signUpPasswordField() {
    return cy.getByDataQa('sign-up-password');
  }

  get signUpBtn() {
    return cy.getByDataQa('sign-up-btn');
  }
};

export default SignUpPageObject;
