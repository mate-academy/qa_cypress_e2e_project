import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  clickUsername() {
    this.usernameLink.click();
  }

  get homeLink() {
    return cy.getByDataCy('home-link');
  }

  clickHome() {
    this.homeLink.click();
  }

  get newArticleLink() {
    return cy.getByDataCy('newarticle-link');
  }

  clickNewArticle() {
    this.newArticleLink.click();
  }

  get settingLink() {
    return cy.getByDataCy('settings-link');
  }

  clickSettings() {
    this.settingLink.click();
  }

  get signInLink() {
    return cy.getByDataCy('login-link');
  }

  clickSignIn() {
    this.signInLink.click();
  }

  get signUpLink() {
    return cy.getByDataCy('sign-up-link');
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
