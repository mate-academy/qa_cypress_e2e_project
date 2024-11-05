import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
    url = '/#/articles';
    
    get editArticleBtn() {
        return cy.getByDataCy('edit-article-btn');
    }

    get deleteArticleBtn() {
        return cy.getByDataCy('delete-article-btn');
    }

    clickOnEditArticleBtn() {
        this.editArticleBtn
            .click();
    }

    clickOnDeleteArticleBtn() {
        this.deleteArticleBtn
            .click();
    }

    visitArticle(title){
        cy.visit(`/${title}`);
    }
}

export default ArticlePageObject;