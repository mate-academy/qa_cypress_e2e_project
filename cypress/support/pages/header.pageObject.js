class Header {
  get logoLink() {
    return cy.getByDataQA('logo-link');
  }

  get homeLink() {
    return cy.getByDataQA('home-link');
  }

  get loginLink() {
    return cy.getByDataQA('login-link');
  }

  get registerLink() {
    return cy.getByDataQA('register-link');
  }

  get newArticleLink() {
    return cy.getByDataQA('new-article-link');
  }

  get settingsLink() {
    return cy.getByDataQA('settings-link');
  }

  get usernameLink() {
    return cy.getByDataQA('username-link');
  }
}

export default Header;
