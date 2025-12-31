import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataQa('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataQa('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataQa('sign-in-btn');
  }

  get followBtn() {
    return cy.getByDataQa('follow-btn');
  }

  get unfollowBtn() {
    return cy.getByDataQa('unfollow-btn');
  }

  assertFollowingText(text) {
    cy.contains(text).should('be.visible');
  }

  login(email, password) {
    this.emailField.type(email);
    this.passwordField.type(password);
    this.signInBtn.click();
  }
}

export default UserPageObject;
