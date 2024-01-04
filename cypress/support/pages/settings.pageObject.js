import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get userName() {
    return cy.getByDataCy('settingsUsername');
  }

  typeUserName(username) {
    this.userName.type(`{selectAll}{del}${username}`);
  }

  get bio() {
    return cy.getByDataCy('settingsBio');
  }

  typeBio(bio) {
    this.bio.type(`{selectAll}{del}${bio}`);
  }

  get email() {
    return cy.getByDataCy('settingsEmail');
  }

  typeEmail(email) {
    this.email.type(`{selectAll}{del}${email}`);
  }

  get password() {
    return cy.getByDataCy('settingsPassword');
  }

  typePassword (password) {
    this.password.type(`{selectAll}{del}${password}`);
  }

  clickUpdateSettings () {
    cy.getByDataCy('updateSettings').click();
  }

  clickOk () {
    cy.get('.swal-button').click();
  }
};

export default SettingsPageObject;
