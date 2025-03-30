import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get yourFeedSection() {
    return cy.getByDataQa('your-feed-section');
  }

  get articlePreview() {
    return cy.getByDataQa('article-preview');
  }

  get authorName() {
    return cy.getByDataQa('author-name');
  }

  get SignInLink() {
    return cy.getByDataQa('link-sign-in');
  }

  get signUpLink() {
    return cy.getByDataQa('link-sign-up');
  }

  clickOnauthorName(){
    this.authorName.click();
  }

  assertYourFeedArticle(text){
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
