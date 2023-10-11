import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get settingsLink() {
    return cy.getByDataQa('settings-link');
  }

  get signInLink() {
    return cy.getByDataQa('sign-in-link');
  }

  get newArticle() {
    return cy.getByDataQa('new-article-link');
  }

  get noArticlesBlock() {
    return cy.getByDataQa('no-articles');
  }

  get globalFeedTab() {
    return cy.getByDataQa('global-feed');
  }

  get firstAuthorLink() {
    return cy.getByDataQa('author-link').first();
  }

  clickGlobalFeedTab() {
    this.globalFeedTab.click();
  }

  clickFirstAuthorLink() {
    this.firstAuthorLink.click();
  }

  clickSettingsLink() {
    this.settingsLink.click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }

  assertHeaderDoesNotContainUsername() {
    this.usernameLink.should('not.exist');
  }

  assertThereAreNoArticles() {
    this.noArticlesBlock.should('exist');
    this.clickGlobalFeedTab();
    this.noArticlesBlock.should('exist');
  }
}

export default HomePageObject;
