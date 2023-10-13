import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get signInLink() {
    return cy.getByDataQa('sign-in-link');
  }

  get newArticleLink() {
    return cy.getByDataQa('new-article-link');
  }

  get globalFeedTab() {
    return cy.get('.nav-link')
      .contains('Global Feed');
  }

  get userName() {
    return cy.getByDataQa('author-name');
  }

  visitUserPage() {
    this.userName
      .click();
  }

  clickNewArticleForm() {
    this.newArticleLink
      .should('exist')
      .click();
  }

  clickGlobalFeed() {
    this.globalFeedTab
      .click();
  }

  clickUsernameLink() {
    this.usernameLink
      .click();
  }

  assertHeaderNotContainUsername() {
    this.usernameLink
      .should('not.exist');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderContainSignIn() {
    this.signInLink
      .should('exist');
  }

  assertUrlAfterLogout() {
    cy.url().should('eq', Cypress.config().baseUrl + '/#/');
  }
}

export default HomePageObject;
