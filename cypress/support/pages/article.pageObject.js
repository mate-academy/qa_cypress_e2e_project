import PageObject from '../PageObject';

class articlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataCy('article-title-editor');
  }

  get aboutField() {
    return cy.getByDataCy('What-s-this-article-about-?-editor');
  }

  get articleField() {
    return cy.getByDataCy('Write-your-article-editor');
  }

  get tagsField() {
    return cy.getByDataCy('tag-enter-editor');
  }

  get publishButton() {
    return cy.getByDataCy('publish-article-btn');
  }

  get banner() {
    return cy.getByDataCy('banner');
  }

  get articleContent() {
    return cy.getByDataCy('article-content');
  }

  get editButton() {
    return cy.getByDataCy('edit-article-btn');
  }

  get deleteButton() {
    return cy.getByDataCy('delete-article-btn');
  }

  get globalFeed() {
    return cy.getByDataCy('global-feed');
  }

  typeTitle(title) {
    this.titleField
      .type(title);
  }

  typeAbout(about) {
    this.aboutField
      .type(about);
  }

  typeArticle(article) {
    this.articleField
      .type(article);
  }

  typeTags(tags) {
    this.tagsField.first()
      .type(tags);
  }

  clickOnPublishButton() {
    this.publishButton
      .click();
  }

  checkBannerContainArticle(title) {
    this.banner
      .should('contain', title);
  }

  checkArticleContentContainBody(body) {
    this.articleContent
      .should('contain', body);
  }

  checkGlobalFeed() {
    this.globalFeed
      .should('contain', 'No articles are here... yet.');
  }

  clickOnEditButton() {
    this.editButton.first()
      .click();
  }

  clickOnDeletwButton() {
    this.deleteButton.first()
      .click();
  }
}

export default articlePageObject;