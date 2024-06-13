import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get urlProfilePictireField() {
    return cy.getByDataCy('url-profile-picture-field');
  }

  get userNameField() {
    return cy.getByDataCy('username-field');
  };

  get bioField() {
    return cy.getByDataCy('bio-field');
  };

  get emailField() {
    return cy.getByDataCy('email-field');
  };

  get passwordField() {
    return cy.getByDataCy('password-field');
  };

  get updateSettingsBtn() {
    return cy.getByDataCy('update-settings-button');
  };

  get loggedOutBtn() {
    return cy.getByDataCy('logged-out-button');
  };

  get settingsTittle() {
    return cy.getByDataCy('settings-title');
  };

  get modalka() {
    return cy.get('.swal-modal');
  };

  get modalOkBtn() {
    return cy.get('.swal-button.swal-button--confirm');
  }

  get modalText() {
    return cy.get('.swal-text');
  }

  typeNewUserName(userName) {
    this.userNameField.clear();
    this.userNameField.type(userName);
  };

  typeNewEmail(newEmail) {
    this.emailField.clear().type(newEmail);
  };

  typeNewBio(newBio) {
    this.bioField.type(newBio);
  };

  typeNewPassword(newPassword) {
    this.passwordField.type(newPassword);
  };

  clickUpdateBtn() {
    this.updateSettingsBtn.click();
  };

  clickLoggedOutBtn() {
    this.loggedOutBtn.click();
  }

  assertModalWindow() {
    this.modalka.should('be.visible');
    this.modalka.should('contain', 'Update successful!');
  }

  clickOkBtn() {
    this.modalOkBtn.should('contain', 'OK').click();
  }

  checkNewBio(newBio) {
    this.bioField.should('have.value', newBio);
  };
};
export default SettingsPageObject;
