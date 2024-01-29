import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  get articlePage() {
    return cy.getByDataQa('article-page');
  }

  get editArticleButton() {
    return cy.getByDataQa('edit-article-btn');
  }

  get deleteArticleButton() {
    return cy.getByDataQa('delete-article-btn');
  }

  clickEditArticleButton() {
    this.editArticleButton.eq(0).click();
  }

  clickDeleteArticleButton() {
    this.deleteArticleButton.eq(0).click();
  }

  assertNewArticleCreated(title, body, tag) {
    this.articlePage
      .should('contain', title)
      .and('contain', body)
      .and('contain', tag);
  }
}

export default ArticlePageObject;
