import PageObject from "../PageObject";

class ArticlePageObject extends PageObject {
    get articleBanner() {
        return cy.getByDataCy('article-title-in-banner')
    }

    assertTitleInBanner(title) {
        this.articleBanner.should('contain', title)
    }

    get editArticleButton() {
        return cy.getByDataCy('edit-article-button')
    }

    get deleteArticleButton() {
        return cy.getByDataCy('delete-article-button')
    }

    clickEditArticleButton() {
        this.editArticleButton.eq(0).click();
    }

    clickDeleteArticleButton() {
        this.deleteArticleButton.eq(0).click();
    }
}

export default ArticlePageObject