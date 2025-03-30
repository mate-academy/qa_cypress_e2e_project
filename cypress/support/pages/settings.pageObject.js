import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get bioTextarea() {
    return cy.getByDataCy('bio');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('update-btn');
  }

  typeBio(bio) {
    this.bioTextarea.type(bio);
  }

  clickUpdateBtn() {
    this.updateSettingsBtn.click();
  }
}

export default SettingsPageObject;
