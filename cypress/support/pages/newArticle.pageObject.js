import PageObject from '../PageObject';

class NewArticlePageObject extends PageObject {
    url = '/#/editor';

    get titleField() {
        return cy.getByDataCy('title-new-article');
    }

    get descriptionField() {
        return cy.getByDataCy('description-new-article');
    }

    get bodyField() {
        return cy.getByDataCy('body-new-article');
    }

    get newArticleBtn() {
        return cy.getByDataCy('publish-new-article')
    }

    get newArticleLink() {
        return cy.url()
    }

    typeTitle(title) {
        this.titleField
            .type(title);
    }

    typeDescription(description) {
        this.descriptionField
            .type(description);
    }

    typeBody(body) {
        this.bodyField
            .type(body);
    }

    clickOnPublishBtn() {
        this.newArticleBtn
            .click();
    }

    checkNewArticleLink(title) {
        this.newArticleLink
            .should('contain', title);
    }
}

export default NewArticlePageObject;