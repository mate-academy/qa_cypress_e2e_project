import PageObject from '../PageObject';
import faker from 'faker';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  static generateFakeData() {
    const fakeData = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      bio: faker.lorem.sentence(),
      password: faker.internet.password()
    };

    return fakeData;
  }

  get settingsBtn() {
    return cy.getByDataCy('settings-btn');
  }

  get usernameField() {
    return cy.getByDataCy('username-field');
  }

  get bioField() {
    return cy.getByDataCy('bio-field');
  }

  get emailField() {
    return cy.getByDataCy('email-field');
  }

  get passwordField() {
    return cy.getByDataCy('newPassword-field');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('update-btn');
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typeBio(bio) {
    this.bioField.clear().type(bio);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickSettingsBtn() {
    this.settingsBtn.click();
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  assertInput(input) {
    cy.get('body').should('contain', input);
  }

  get modalWindow() {
    return cy.get('.swal-modal');
  }

  assertModal() {
    this.modalWindow.should('contain',
      'Update successful!').find('.swal-button').click();
  }
}

export default SettingsPageObject;
