import PageObject from '../PageObject';

class CreateArticlePage extends PageObject {
  url = '#/editor';

  get articleTitle() {
    return cy.getByDataCy('articleTitle');
  }

  get articleDescription() {
    return cy.getByDataCy('articleDescription');
  }

  get articleBody() {
    return cy.getByDataCy('articleBody');
  }

  get articleTags() {
    return cy.getByDataCy('articleTags');
  }

  get articleCreateBtn() {
    return cy.getByDataCy('articleCreateBtn');
  }

  get articleEditBtn() {
    return cy.getByDataCy('editArticleBtn').first();
  }

  get articleDeleteBtn() {
    return cy.getByDataCy('deleteArticleBtn').first();
  }

  typeTitle(title) {
    this.articleTitle.clear()
      .type(title);
  }

  typeDescription(description) {
    this.articleDescription.clear()
      .type(description);
  }

  typeBody(body) {
    this.articleBody.clear()
      .type(body);
  }

  typeTags(tag) {
    this.articleTags.clear()
      .type(tag);
  }

  clickArticleCreateBtn() {
    this.articleCreateBtn
      .click();
  }

  clickEditBtn() {
    this.articleEditBtn.click();
  }

  clickDeleteBtn() {
    this.articleDeleteBtn.click();
  }
}

export default CreateArticlePage;
