import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  userNamePlusText(TestData) {
    cy.findByPlaceholder('Your username').type(TestData);
  }

  bioPlusText(TestData) {
    cy.findByPlaceholder('Short bio about you').type(TestData);
  }

  emailForTest(TestData) {
    cy.findByPlaceholder('Email').clear();
    cy.findByPlaceholder('Email').type(TestData);
  }

  passwordForTest(TestData) {
    cy.findByPlaceholder('Password').type(TestData);
  }

  clickUpdateSettings() {
    cy.contains('button', 'Update Settings').click();
  }

  clickOk() {
    cy.contains('button', 'OK').click();
  }

  assertUserName(TestData) {
    cy.contains('h4', TestData).should(`be.visible`);
  }

  assertBio(TestData) {
    cy.contains('p', TestData).should(`be.visible`);
  }

  loggoutButtonclick() {
    cy.contains('button', 'Or click here to logout.').click();
  }

  assertSignInLink() {
    cy.contains('.nav-item', 'Sign in').should(`be.visible`);
  }

  assertSignUpLink() {
    cy.contains('.nav-item', 'Sign up').should(`be.visible`);
  }
}
export default SettingsPageObject;
