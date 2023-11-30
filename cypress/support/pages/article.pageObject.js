import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get publishBtn() {
    return cy.getByDataQa('submit');
  }

  clickPublishBtn() {
    this.publishBtn.click();
  }

  get editArticleBtn() {
    return cy.getByDataQa('edit-btn');
  }

  clickEditArticleBtn() {
    this.editArticleBtn.eq(0).click();
  }

  get deleteArticleBtn() {
    return cy.getByDataQa('delete-btn');
  }

  clickDeleteBtn() {
    this.deleteArticleBtn.eq(0).click();
  }

  get articleTitle() {
    return cy.getByDataQa('article-title');
  }

  typeArticleTitle(title) {
    this.articleTitle.type(title);
  }

  get articleDescription() {
    return cy.getByDataQa('article-description');
  }

  typeArticleDescription(description) {
    this.articleDescription.type(description);
  }

  get articleBody() {
    return cy.getByDataQa('article-body');
  }

  typeArticleBody(body) {
    this.articleBody.type(body);
  }

  get articleTag() {
    return cy.get('.ti-input');
  }

  typeArticleTag(tag) {
    this.articleTag.type('{selectAll}' + tag);
  }
}

export default ArticlePageObject;
