import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  get username() {
    return cy.getByDataQa('signUp-username');
  }

  get email() {
    return cy.getByDataQa('signUp-email');
  }

  get password() {
    return cy.getByDataQa('signUp-password');
  }

  typeUsername(username) {
    return this.username.type(`{selectall}${username}`);
  }

  typeEmail(email) {
    return this.email.type(`{selectall}${email}`);
  }

  typePassword(password) {
    return this.password.type(`{selectall}${password}`);
  }

  get clickOnSignUpBtn() {
    return cy.getByDataQa('signUp-button').click();
  }
}

export default SignUpPageObject;
