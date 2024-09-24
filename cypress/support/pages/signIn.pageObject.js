import PageObject from "../PageObject";

class SignInPageObject extends PageObject {
  url = "/#/login";

  get emailFieldL() {
    return cy.get('[data-qa="loginEmail"]');
  }

  get passwordFieldL() {
    return cy.get('[data-qa="loginPassword"]');
  }

  get signInBtnL() {
    return cy.get('[data-qa="signInBtn"]');
  }

  typeEmail(email) {
    this.emailFieldL.type(email);
  }

  typePassword(password) {
    this.passwordFieldL.type(password);
  }

  clickSignInBtn() {
    this.signInBtnL.click();
  }
}

export default SignInPageObject;
