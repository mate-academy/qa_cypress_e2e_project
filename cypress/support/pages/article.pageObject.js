import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/articles';
  
  visitArticlePage(slug) {
    cy.visit(`#/articles/${slug}`);
  }

  get articleTitle() {
    return cy.getByDataCy('article-title');
  }

  get editArticleBtn() {
    return cy.getByDataCy('edit-article-btn');
  }

  clickEditArticleBtn() {
    this.editArticleBtn.eq(0).click();
  }

  get deleteArticleBtn() {
    return cy.getByDataCy('delete-article-btn');
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn.eq(0).click();
  }

  get articleBody() {
    return cy.getByDataCy('article-body');
  }

  assertArticleTitle(title) {
    this.articleTitle.should('contain', title);
  }

  assertArticleBody(body) {
    this.articleBody.should('contain', body);
  }

  assertArticleButtons() {
    this.editArticleBtn.should('contain', 'Edit Article');
    this.deleteArticleBtn.should('contain', 'Delete Article');
  }
}

export default ArticlePageObject;
