import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/articles/'

  get articleTitle() {
    return cy.getByDataCy('article-title');
  }
  
  get editArticleBtn() {
    return cy.getByDataCy ('edit-btn');
  }

  get deleteArticleBtn() {
    return cy.getByDataCy ('delete-btn');
  }

  clickEdit() {
    this.editArticleBtn.click();
  }

  clickDelete() {
    this.deleteArticleBtn.click();
  }

  assertArticlePageContainTitle(title) {
    this.articleTitle
      .should('contain', title);
  }
    
}

export default ArticlePageObject;