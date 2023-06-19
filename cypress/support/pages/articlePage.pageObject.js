import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/articles';

  get articleTitle() {
    return cy.getByDataQa('article-title');
  }

  get editArticleBtn() {
    return cy.getByDataQa('edit-article-btn');
  }

  clickEditArticleBtn() {
    this.editArticleBtn.click();
  }

  get deleteArticleBtn() {
    return cy.getByDataQa('delete-article-btn');
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn.eq(0).click();
  }

  get articleBody() {
    return cy.getByDataQa('article-body');
  }

  assertArticleElements(title, body) {
    this.articleTitle.should('contain', title);
    this.articleBody.should('contain', body);
  }

  assertArticleButtons() {
    this.editArticleBtn.should('contain', "Edit Article");
    this.deleteArticleBtn.should('contain', "Delete Article");
  }
}

export default ArticlePageObject;
