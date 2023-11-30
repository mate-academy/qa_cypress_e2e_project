import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/articles/';

  get articleTitle() {
    return cy.getByDataQa('article-title');
  }

  get editArticleBtn() {
    return cy.getByDataQa('edit-article');
  }

  get deleteArticleBtn() {
    return cy.getByDataQa('delete-article');
  }

  clickEditArticleBtn() {
    this.editArticleBtn.first().click();
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn.first().click();
  }

  assertArticlePageContainTitle(title) {
    this.articleTitle
      .should('contain', title);
  }
}

export default ArticlePageObject;
