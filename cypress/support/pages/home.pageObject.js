import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get yourFeedSection() {
    return cy.getByDataCy('your-feed-section');
  }

  get articlePreview() {
    return cy.getByDataCy('article-preview');
  }

  get authorName() {
    return cy.getByDataCy('author-name');
  }

  get SignInLink() {
    return cy.getByDataCy('link-sign-in');
  }

  get signUpLink() {
    return cy.getByDataCy('link-sign-up');
  }

  clickOnauthorName() {
    this.authorName.click();
  }

  assertYourFeedArticle(text) {
    this.articlePreview.should('not.contain', text);
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  clickOnYourFeed() {
    this.yourFeedSection.click();
  }

  assertHeaderContainSignIn() {
    this.SignInLink.should('be.visible');
  }

  assertHeaderContainSignUp() {
    this.signUpLink.should('be.visible');
  }
}

export default HomePageObject;
