import PageObject from "../PageObject";

class CreateArticlePageObject extends PageObject {
    url = '/#/editor';

    get titleField() {
        return cy.getByDataCy('article-title');
    }

    get descriptionField() {
        return cy.getByDataCy('article-description');
    }

    get bodyField() {
        return cy.getByDataCy('article-body');
    }

    get tagsField() {
        // return cy.getByDataCy('article-tags');
        return cy.get('.ti-tags');
    }

    get submitButton() {
        return cy.getByDataCy('article-submit-button');
    }

    

    typeTitle(title) {
        this.titleField.type(`{selectAll}${title}`)
    }

    typeDescription(description) {
        this.descriptionField.type(`{selectAll}${description}`)
    }

    typeBody(body) {
        this.bodyField.type(`{selectAll}${body}`)
    }

    typeTags(tags) {
        this.tagsField.type(`{selectAll}${tags}`)
    }

    clickPublishArticle() {
        this.submitButton.click()
    }

    
}

export default CreateArticlePageObject