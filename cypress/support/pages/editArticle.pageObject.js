import PageObject from '../PageObject';

class EditArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.getByDataCy('article-edit-title');
  }

  typeArticleTitle(articleTitile) {
    this.articleTitleField.clear()
      .type(articleTitile);
  }

  get articleDescriptionField() {
    return cy.getByDataCy('article-edit-description');
  }

  typeArticleDescription(articleDescription) {
    this.articleDescriptionField.clear()
      .type(articleDescription);
  }

  get articleBodyField() {
    return cy.getByDataCy('article-edit-body');
  }

  typeArticleBody(articleBody) {
    this.articleBodyField.clear()
      .type(articleBody);
  }

  get articleTegsField() {
    return cy.getByDataCy('article-edit-tags');
  }

  typeArticleTegs(articleTegs) {
    this.articleTegsField.eq(0).clear()
      .type(articleTegs);
  }

  get createArticleBtn() {
    return cy.getByDataCy('article-edit-create-newArticle');
  }

  clickCreateArticleBtn() {
    this.createArticleBtn
      .click();
  }

  createArticle(articleTitile, articleDescription, articleBody, articleTegs) {
    this.typeArticleTitle(articleTitile);
    this.typeArticleDescription(articleDescription);
    this.typeArticleBody(articleBody);
    this.typeArticleTegs(articleTegs);

    this.clickCreateArticleBtn(articleBody);
  }
}

export default EditArticlePageObject;
