import PageObject from "../PageObject";

class ArticlePageObject extends PageObject {
  url = '#/editor';

  get articleTitleField() {
    return cy.getByDataCy('article-title-field');
  }

  typeArticleTitle(articleTitle) {
    this.articleTitleField.clear().type(articleTitle);
  }

  get articleDescField() {
    return cy.getByDataCy('article-desc-field');
  }

  typeArticleDesc(articleDesc) {
    this.articleDescField.clear().type(articleDesc);
  }

  get articleBodyField() {
    return cy.getByDataCy('article-body-field');
  }

  typeArticleBody(articleBody) {
    this.articleBodyField.clear().type(articleBody);
  }

  get articleTagsField() {
    return cy.getByDataCy('article-tags-field');
  }

  typeArticleTags(articleTag) {
    this.articleTagsField.clear().type(`${articleTag}{enter}`);
  }

  get publishBtn() {
    return cy.getByDataCy('article-publish-btn');
  }

  clickPublishBtn() {
    this.publishBtn.click();
  }

  get container() {
    return cy.get('.container');
  }

  verifyArticleCreation(articleTitle) {
    this.container.should('contain', articleTitle)
      .and('contain', 'Delete Article')
      .and('contain', 'Edit Article');
  }

  get deleteArticleBtn() {
    return cy.getByDataCy('delete-article-btn');
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn.click();
  }

  verifyDeletedArticle(articleTitle) {
    this.container.should('not.contain', articleTitle)
      .and('not.contain', 'Delete Article')
      .and('not.contain', 'Edit Article');
  }

  get editArticleBtn() {
    return cy.getByDataCy('edit-article-btn');
  }

  clickEditArticleBtn() {
    this.editArticleBtn.click();
  }
}

export default ArticlePageObject;
