import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get settingsLink() {
    return cy.getByDataQa('settings-link');
  }

  get globalFeed() {
    return cy.get('.home-global');
  }

  get okBtn() {
    return cy.contains('.swal-button', 'OK');
  }

  clickOk() {
    this.okBtn.click();
  }

  clickOnSettingsLink() {
    this.settingsLink.click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertArticleDoesNotExist(title) {
    this.globalFeed.should('not.contain', title);
  }
}

export default HomePageObject;
