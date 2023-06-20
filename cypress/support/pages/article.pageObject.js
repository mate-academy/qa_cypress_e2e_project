import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/articles';
  
  get titleArticle() {
    return cy.getByDataQa('article-title');
  }

  checkTitleArticle(title) {
    this.titleArticle
      .should('contain', title);
  }

  get bodyArticle() {
    return cy.getByDataQa('article-body');
  }

  checkBodyArticle(body) {
    this.bodyArticle
    .should('contain', body);
  }

  get editArticleBtn() {
    return cy.getByDataQa('edit-article-btn');
  }

  clickEditArticle() {
    this.editArticleBtn
     .eq(0)
     .click();
  }

  get deleteArticleBtn() {
    return cy.getByDataQa('delete-article-btn');
  }

  clickDeleteArticle() {
    this.deleteArticleBtn
     .eq(0)
     .click();
  }
}

export default ArticlePageObject;
