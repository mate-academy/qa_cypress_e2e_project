class PageObject {
  get usernameLinkElement() {
    return cy.getByDataQa('username-link');
  }

  get signInLinkElement() {
    return cy.getByDataQa('sign-in-link');
  }

  get settingsLinkElement() {
    return cy.getByDataQa('settings-link');
  }

  get newArticleLinkElement() {
    return cy.getByDataQa('new-article-link');
  }

  get dialogTextElement() {
    return cy.getByDataQa('dialog-text');
  }

  get dialogConfirmElement() {
    return cy.getByDataQa('dialog-confirm');
  }

  visit(url) {
    cy.visit(url || this.url);
  }

  reload() {
    cy.reload();
  }

  assertPath(path) {
    cy.location('hash').should('eq', path);
  }

  assertHeaderContainUsername(username) {
    this.usernameLinkElement.should('contain', username);
  }

  assertSignedOut() {
    this.usernameLinkElement.should('not.exist');
    this.signInLinkElement.should('be.visible');
  }

  openSettings() {
    this.settingsLinkElement.click();
  }

  openNewArticle() {
    this.newArticleLinkElement.click();
  }

  openProfile() {
    this.usernameLinkElement.click();
  }

  assertErrors(text) {
    this.dialogTextElement.should('be.visible').and('contain', text);
  }

  dismissDialog() {
    this.dialogConfirmElement.should('be.visible').click();
  }
}

export default PageObject;
