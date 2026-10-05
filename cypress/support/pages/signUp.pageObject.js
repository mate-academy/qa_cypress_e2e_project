import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  get usernameSignUpElement() {
    return cy.getByDataQa('username-sign-up');
  }

  get emailSignUpElement() {
    return cy.getByDataQa('email-sign-up');
  }

  get passwordSignUpElement() {
    return cy.getByDataQa('password-sign-up');
  }

  get signUpBtnElement() {
    return cy.getByDataQa('sign-up-btn');
  }

  url = '/#/register';

  signUp(user) {
    this.usernameSignUpElement.type(user.username);
    this.emailSignUpElement.type(user.email);
    this.passwordSignUpElement.type(user.password);
    this.signUpBtnElement.click();
  }
}

export default SignUpPageObject;
