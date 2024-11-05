import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
    url = '/#/articles';
    
    get editArticleBtn() {
        return cy.getByDataCy('edit-article-btn');
    }

    get deleteArticleBtn() {
        return cy.getByDataCy('delete-article-btn')
    }

    clickOnEditArticleBtn() {
        this.editArticleBtn
            .click();
    }

    clickOnDeleteArticleBtn() {
        this.deleteArticleBtn
            .click();
    }
}

export default ArticlePageObject;