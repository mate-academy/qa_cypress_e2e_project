import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  get modalWind() {
    return cy.get('.swal-modal'); // там все на TS написано, мені було страшно в нього лізти + я так і не зрозумів звідки воно бере список атрибутів
  }
}

export default SignInPageObject;
