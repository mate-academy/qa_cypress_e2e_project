import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get settingsLink() {
    return cy.getByDataQa('settings-link');
  }

  get newArticleLink() {
    return cy.getByDataQa('new-article-link');
  }

  clickNewArticleLink() {
    this.newArticleLink.click();
  }

  clickSettingsLink() {
    this.settingsLink.click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }
}

export default HomePageObject;
