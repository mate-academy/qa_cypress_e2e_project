import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get homeLink() {
    return cy.getByDataCy('home-link');
  }

  get newArticleLink() {
    return cy.getByDataCy('newarticle-link');
  }

  get settingLink() {
    return cy.getByDataCy('settings-link');
  }

  get signInLink() {
    return cy.getByDataCy('login-link');
  }

  get signUpLink() {
    return cy.getByDataCy('sign-up-link');
  }

  clickUsername() {
    this.usernameLink.click();
  }

  clickHome() {
    this.homeLink.click();
  }

  clickNewArticle() {
    this.newArticleLink.click();
  }

  clickSettings() {
    this.settingLink.click();
  }

  clickSignIn() {
    this.signInLink.click();
  }

  clickSignUp() {
    this.signUpLink.click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderContainSignIn() {
    this.signInLink
      .should('contain', 'Sign in');
  }

  get articlesPrewie() {
    return cy.get('.article-preview');
  }

  assertNoArticles() {
    this.articlesPrewie.should('contain', 'No articles are here... yet.');
  }
}

export default HomePageObject;
