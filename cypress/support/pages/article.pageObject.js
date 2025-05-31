import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  get articleTitle() {
    return cy.getByDataCy('article-title');
  }

  get articleBody() {
    return cy.getByDataCy('article-body');
  }

  get editBtn() {
    return cy.getByDataCy('edit-article-btn');
  }

  get deleteBtn() {
    return cy.getByDataCy('delete-article-btn');
  }

  assertArticleTitle(title) {
    this.articleTitle.should('contain', title);
  }

  assertArticleBody(body) {
    this.articleBody.should('contain', body);
  }

  clickEditBtn() {
    this.editBtn.first().click();
  }

  clickDeleteBtn() {
    this.deleteBtn.first().click();
  }
}

export default ArticlePageObject;
