import { faker } from '@faker-js/faker';
import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get bioField() {
    return cy.findByPlaceholder('Short bio about you');
  }

  get emailField() {
    return cy.findByPlaceholder('Email');
  }

  get userNameField() {
    return cy.findByPlaceholder('Your username');
  }

  get passwordField() {
    return cy.findByPlaceholder('Password');
  }

  get updateSettingsBtn() {
    return cy.get('.btn.btn-lg');
  }

  checkUpdate() {
    cy.get('.swal-modal').should('contain', 'Update successful!');
  }

  generateBio() {
    return faker.person.bio();
  }

  generateEmail() {
    return faker.internet.email();
  }

  generateUserName() {
    return faker.internet.userName();
  }

  generatePassword() {
    return faker.internet.password();
  }

  updateBio() {
    const bio = this.generateBio();
    this.bioField.clear().type(bio);
    this.updateSettingsBtn.click();
    this.checkUpdate();
  }

  updateEmail() {
    const email = this.generateEmail();
    this.emailField.clear().type(email);
    this.updateSettingsBtn.click();
    this.checkUpdate();
  }

  updateUserName() {
    const username = this.generateUserName();
    this.userNameField.clear().type(username);
    this.updateSettingsBtn.click();
    this.checkUpdate();
  }

  updatePassword() {
    const password = this.generatePassword();
    this.passwordField.clear().type(password);
    this.updateSettingsBtn.click();
    this.checkUpdate();
  }

  logout() {
    return cy
      .get('.btn.btn-outline-danger')
      .contains('Or click here to logout')
      .click();
  }
}

export default SettingsPageObject;
