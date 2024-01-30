import PageObject from "../PageObject";

class Article extends PageObject {
    get articleTitle() {
        return cy.getByDataCy('title-article-page');
    }

    get articleBody() {
        return cy.getByDataCy('body-article-page')
    }

    get editBtn() {
        return cy.getByDataCy('edit-Btn-article-page').eq(0)
    }

    get deleteBtn() {
        return cy.getByDataCy('delete-Btn-article-page').eq(0)
    }

    clickEditBtn() {
        this.editBtn.click()
    }

    clickDeleteBtn() {
        this.deleteBtn.click();
    }

    assertArticleTitle(value) {
        this.articleTitle.should('contain', value);
    }

    assetArticleBody(value) {
        this.articleBody.should('contain', value)
    }
}

export default Article;