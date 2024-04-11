import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  get artcleTitle() {
    return cy.getByDataQa('article-page-title');
  }

  get articleBody() {
    return cy.getByDataQa('article-page-body');
  }

  get articleUsername() {
    return cy.getByDataQa('article-page-username').first();
  }

  checkArticleTitle(title) {
    return this.artcleTitle.should('contain.text', title);
  }

  checkArticleBody(body) {
    return this.articleBody.should('contain.text', body);
  }

  get clickOnUsernameInArticle() {
    return this.articleUsername.click();
   }

  get clickOnEditArticleButton() {
    return cy.getByDataQa('edit-article-button').first().click();
  }

  get clickOnDeleteArticleButton() {
    return cy.getByDataQa('delete-article-button').first().click();
  }
}

export default ArticlePageObject;
