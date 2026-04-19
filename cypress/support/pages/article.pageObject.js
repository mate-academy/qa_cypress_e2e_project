import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  get editArticleBtn() {
    return cy.getByDataQa('edit-article-btn').first();
  }

  get deleteArticleBtn() {
    return cy.getByDataQa('delete-article-btn').first();
  }

  get articleTitle() {
    return cy.get('.article-page h1');
  }

  get articleBody() {
    return cy.get('.article-content .col-xs-12 div')
      .first();
  }

  clickEditArticleBtn() {
    return this.editArticleBtn.click();
  }

  clickDeleteArticleBtn() {
    return this.deleteArticleBtn.click();
  }

  assertArticleTitle(title) {
    return this.articleTitle.should('contain', title);
  }

  assertArticleBody(body) {
    return this.articleBody.should('contain', body);
  }
}

export default ArticlePageObject;
