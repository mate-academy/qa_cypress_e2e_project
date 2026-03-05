class PageObject {
  getNavbar() {
    return cy.get('[data-qa="main-navbar"]');
  }

  getHomeLogoLink() {
    return cy.get('[data-qa="home-logo-link"]');
  }

  getHomeLinkAnon() {
    return cy.get('[data-qa="home-link"]');
  }

  getSignInLink() {
    return cy.get('[data-qa="signin-link"]');
  }

  getSignUpLink() {
    return cy.get('[data-qa="signup-link"]');
  }

  getHomeLinkAuth() {
    return cy.get('[data-qa="home-link-auth"]');
  }

  getNewArticleLink() {
    return cy.get('[data-qa="new-article-link"]');
  }

  getSettingsLink() {
    return cy.get('[data-qa="settings-link"]');
  }

  getProfileLink() {
    return cy.get('[data-qa="profile-link"]');
  }

  getErrorMessagesList() {
    return cy.get('[data-qa="error-messages-list"]');
  }

  getErrorMessageItem(index = 0) {
    return this.getErrorMessagesList()
      .find('[data-qa="error-message-item"]').eq(index);
  }

  getErrorMessageText(index = 0) {
    return this.getErrorMessageItem(index)
      .find('[data-qa="error-message-value"]');
  }
}

export default PageObject;
