import PageObject from "../PageObject";

class CreateArticlePageObject extends PageObject {
    url = '#/editor';

    get articleTitle() {
        return cy.getByDataCy('title-create-article-page');
    }

    get articleDescription() {
        return cy.getByDataCy('description-create-article-page');
    }

    get articleBody() {
        return cy.getByDataCy('body-create-article-page');
    }

    get articleTag() {
        // return cy.getByDataCy('tags-article-page').should('contain', '[placeholder="Enter tags"]'); ???
        return cy.get('[placeholder="Enter tags"]');
    }

    get publishArticleBtn() {
        return cy.getByDataCy('publish-create-article-btn');
    }



    typeArticleTitle(value) {
        this.articleTitle.type(value);
    }

    typeArticleDescription(value) {
        this.articleDescription.type(value);
    }

    typeArticleBody(value) {
        this.articleBody.type(`{selectAll}${value}`);
    }

    typeArticleTag(value) {
        this.articleTag.type(value);
    }

    clickPublishBtn() {
        this.publishArticleBtn.click();
    }


}

export default CreateArticlePageObject;