import PageObject from '../PageObject';

class ArticlePage extends PageObject {
    get articleBanner() {
        return cy.getByDataCy('article-title-banner');
    }
    
    assertArticleTitle(title) {
        this.articleBanner.should('contain', title)
    }
    
    get editArticleBtn() {
        return cy.getByDataCy('edit-article');
    }

    clickOnEditArticle() {
        this.editArticleBtn.eq(0).click();
    }

    get deleteArticleBtn() {
        return cy.getByDataCy('delete-article')
    }

    clickOnDeleteArticle() {
        this.deleteArticleBtn.eq(0).click();
    }
}

export default ArticlePage;
