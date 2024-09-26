import PageObject from '../PageObject';

class ArticlePagePageObject extends PageObject {
    url = `/#/article/`;

    visitArticlePage(slug) {
        cy.visit(`/#/articles/${slug}`);
    }

    get articleTitle() {
        return cy.get('h1');
    }

    get articleBody(){
        return cy.get('p');
    }

    get editArticleBtn() {
        return cy.contains('.btn', 'Edit Article');
    }

    get deleteArticleBtn() {
        return cy.contains('.btn', 'Delete Article');
    }
  }

export default ArticlePagePageObject;
