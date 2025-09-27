import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = 'articles';

  get articleTitle() {
    return cy.getByDataCy('atricle-title');
  }

  get editBtn() {
    return cy.getByDataCy('edit-article-btn');
  }

  get deleteBtn() {
    return cy.getByDataCy('delete-article-btn');
  }

  isCorrectTitle(title) {
    this.articleTitle.should('contain', title);
  }

  editArticle() {
    this.editBtn.click();
  }

  deleteArticle() {
    this.deleteBtn.click();
  }
}

export default ArticlePageObject;
