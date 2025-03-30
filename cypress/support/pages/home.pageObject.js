import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get settingsLink(){
    return cy.getByDataCy('header-settings');
  }

  get yourFeedTab(){
    return cy.getByDataCy('your-feed');
  }

  get articleList(){
    return cy.getByDataCy('articles-list');
  }
  get authorName(){
    return cy.getByDataCy('author-name').eq(0);
  }

  get articlePreview(){
    return cy.getByDataCy('preview-article').eq(0);
  }

  clickAuthorName(){
    this.authorName.click();
  }

  clickArticlePreview(){
    this.articlePreview.click();
  }

  clickYourFeed(){
    this.yourFeedTab.click();
  }

  clickSettings(){
    this.settingsLink.click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderNotContainUsername() {
    this.usernameLink
      .should('not.exist');
  }

  assertEmptyArticleList(){
    this.articleList
      .should('contain', 'No articles are here... yet.' );
  }
}

export default HomePageObject;
