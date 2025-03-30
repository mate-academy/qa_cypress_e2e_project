import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
    url = '/editor';

    get articleTitle() {
        return cy.get('.banner h1');
    }

    get articleBody() {
        return cy.get('.article-content');
    }

    get editArticleBtn() {
        return cy.get('.banner [data-cy^="edit-article-btn"]');
    }

    get deleteArticleBtn() {
        return cy.get('.banner [data-cy^="delete-article-btn"]');
    }

    clickEditArticleBtn() {
        this.editArticleBtn.click();
    }

    clickDeleteArticleBtn() {
        this.deleteArticleBtn.click();
    }

    assertArticleTitle(title) {
        this.articleTitle.should('contain', title);
    }

    assertArticleBody(body) {
        this.articleBody.should('contain', body);
    }

  }
  
  export default ArticlePageObject;