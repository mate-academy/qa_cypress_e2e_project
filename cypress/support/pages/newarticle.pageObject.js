import PageObject from '../PageObject';

class NewArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitle() {
    return cy.getByDataCy('article-title');
  }

  get articleDescription() {
    return cy.getByDataCy('article-description');
  }

  get articleBody() {
    return cy.getByDataCy('article-body');
  }

  get articleTags() {
    return cy.get('.ti-tags');
  }

  get submitbtn() {
    return cy.getByDataCy('submit');
  }

  typeArticleTitle(title) {
    this.articleTitle
      .type(title);
  }

  typeArticleDescription(description) {
    this.articleDescription
      .type(description);
  }

  typeArticleBody(text) {
    this.articleBody
      .type(text);
  }

  typeArticleTags(tag) {
    this.articleTags
      .type(tag);
  }

  clickSubmitBtn() {
    this.submitbtn.click();
  }

  clearArticleBody() {
    this.articleBody.clear();
  }
}

export default NewArticlePageObject;
