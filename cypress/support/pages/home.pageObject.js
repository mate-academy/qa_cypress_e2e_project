import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get homeLink() {
    return cy.getByDataCy('home-link');
  }

  get signInLink() {
    return cy.getByDataCy('sign-in-link');
  }

  get signUpLink() {
    return cy.getByDataCy('sign-up-link');
  }

  get newArticleLink() {
    return cy.getByDataCy('new-article-link');
  }

  get settingsLink() {
    return cy.getByDataCy('settings-link');
  }

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get yourFeedLink() {
    return cy.getByDataCy('your-feed-home');
  }

  get globalFeedLink() {
    return cy.getByDataCy('global-feed-home');
  }

  get articlePreviewLink() {
    return cy.getByDataCy('article-preview');
  }

  clickArticlePreview(title) {
    this.articlePreviewLink
      .contains(title).click();
  }

  clickHomeLink() {
    this.homeLink.click();
  }

  clickSignInLink() {
    this.signInLink.click();
  }

  clickSignUpLink() {
    this.signUpLink.click();
  }

  clickNewArticleLink() {
    this.newArticleLink.click();
  }

  clickSettingsLink() {
    this.settingsLink.click();
  }

  clickUsernameLink() {
    this.usernameLink.click();
  }

  clickYourFeedLink() {
    this.yourFeedLink.click();
  }

  clickGlobalFeedLink() {
    this.globalFeedLink.click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertArticle(article) {
    cy.get('div[class="article-preview"]')
      .should('contain', article);
  }

  assertLogOut(username) {
    this.signInLink
      .should('exist');
    this.signUpLink
      .should('exist');
  }
}

export default HomePageObject;
