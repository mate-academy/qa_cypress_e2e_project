import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get userNameField() {
    return cy.findByPlaceholder('Your username');
  }

  get userBioField() {
    return cy.findByPlaceholder('Short bio about you');
  }

  get emailField() {
    return cy.findByPlaceholder('Email');
  }

  get passwordField() {
    return cy.findByPlaceholder('Password');
  }

  get button() {
    return cy.get('.btn');
  }

  get swalButton() {
    return cy.get('.swal-button');
  }

  get updateModal() {
    return cy.get('.swal-modal');
  }

  typeUserName(userName) {
    this.userNameField.clear().type(userName);
  }

  typeBio(bio) {
    this.userBioField.clear().type(bio);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickBtn(text) {
    this.button.contains(text).click();
  }

  clickSwalBtn(text) {
    this.swalButton.contains(text).click();
  }

  assertUpdateSuccessful() {
    this.updateModal.should('contain', 'Update successful!');
  }

  assertUserNameValue(userNameValue) {
    this.userNameField.should('have.value', userNameValue);
  }

  assertUserBioValue(userBioValue) {
    this.userBioField.should('have.value', userBioValue);
  }

  assertUserPasswordValue(passowrdValue) {
    this.passwordField.should('have.value', passowrdValue);
  }

  assertUserEmailValue(userEmailValue) {
    this.emailField.should('have.value', userEmailValue);
  }
}

export default SettingsPageObject;
