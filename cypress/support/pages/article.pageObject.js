import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
    url = '/editor';

    get articleTitle() {
        return cy.getByDataQa('article_title');
    }

    typeArticleTitle(title) {
        this.articleTitle.clear().type(title);
    }

    get articleDesc() {
        return cy.getByDataQa('article_desc');
    }

    typeArticleDesc(desc) {
        this.articleDesc.clear().type(desc);
    }

    get articleBody() {
        return cy.getByDataQa('article_body');
    }

    typeArticleBody(body) {
        this.articleBody.clear().type(body);
    }

    publishArticle() {
        cy.getByDataQa('publish_btn').click();
    }

    editArticle() {
        cy.getByDataQa('edit_btn').click();
    }

    deleteArticle() {
        cy.getByDataQa('delete_btn').click();
    }

    updateArticle() {
        cy.contains('button.btn', 'Update').click();
    }
}

export default ArticlePageObject;
