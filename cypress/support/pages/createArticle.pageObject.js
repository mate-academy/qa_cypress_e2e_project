import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataCy('article-title');
  }

  get descriptionField() {
    return cy.getByDataCy('article-description');
  }

  get bodyField() {
    return cy.getByDataCy('article-body');
  }

  get tagsField() {
    return cy.get('.ti-tags');
  }

  get publishArticleBtn() {
    return cy.getByDataCy('publish-article-button')
  }

  typeTitle(title) {
    this.titleField.type(`{selectAll}${title}`);
  }

  typeDescription(description) {
    this.descriptionField.type(`{selectAll}${description}`);
  }

  typeBody(body) {
    this.bodyField.type(`{selectAll}${body}`);
  }

  typeTags(tags) {
    this.tagsField.type(`{selectAll}${tags}`);
  } 

  clickOnPublishArticleBtn() {
    this.publishArticleBtn.click();
  }
}


export default ArticlePageObject;