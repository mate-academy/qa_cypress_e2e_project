import { PageObject } from '../PageObject';

export class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get userNameField() {
    return cy.getByDataCy('username-field');
  }

  get bioField() {
    return cy.getByDataCy('bio-field');
  }

  get emailField() {
    return cy.getByDataCy('email-field');
  }

  get passwordField() {
    return cy.getByDataCy('password-field');
  }

  get updateSettingsButton() {
    return cy.getByDataCy('update-button');
  }

  get modal() {
    return cy.get('.swal-title').contains('Update successful!');
  }

  assertModalIsVisible() {
    this.modal.should('be.visible');
  }

  get OKButton() {
    return cy.contains('.swal-button', 'OK');
  }

  clickOKButton() {
    this.OKButton.click();
  }

  get logoutButton() {
    return cy.getByDataCy('logout-button');
  }

  userBioTextUpdated(containBio) {
    this.bioField.should('contain.value', containBio);
  }

  get alert() {
    return cy.get('.swal-modal');
  }

  assertAlertErrorMessage() {
    this.alert.should('contain', 'Invalid user credentials.');
  }
}
