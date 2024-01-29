import PageObject from "../PageObject";

class NewArticlePageObject extends PageObject {
    url = '/#/editor';

    get titleField() {
        return cy.getByDataCy('articleTitle-field');
    }

    typeTitle(title) {
        this.titleField.type(title);
    }
    clearTitle(title) {
        this.titleField.clear();
    }

    get aboutField() {
        return cy.getByDataCy('about-field');
    }
    typeAboutField(description) {
        this.aboutField.type(description);
    }
    get bodyField() {
        return cy.getByDataCy('body-field');
    }
    typeBodyField(body) {
        this.bodyField.type(body);
    }
    get tagsField() {
        return cy.get('.ti-tags');
    }
    typeTagsField(tag) {
        this.tagsField.type(tag);
    }
    get publArtBut() {
        return cy.getByDataCy('publ-button');
    }
    clickPublButton() {
        this.publArtBut.click();
    }

}
export default NewArticlePageObject;
