import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get editProfileSettingsLink() {
    return cy.getByDataQa('edit-profile-settings-link');
    // або cy.getByDataCy(), якщо у вас однаковий хелпер
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }
}

export default HomePageObject;
