import PageObject from '../PageObject';

class EditorPageObject extends PageObject {
  url = 'editor';

  get articleTitle() {
    return cy.getByDataCy('Article Title');
  }

  get articleBody() {
    return cy.getByDataCy('Write your article (in markdown)');
  }

  get articleDescription() {
    return cy.getByDataCy(`What's this article about?`);
  }

  get articleTag() {
    return cy.getByDataCy('Enter tags');
  }

  get publishArticleButton() {
    return cy.get('.btn');
  }

  get updateArticleButton() {
    return cy.get('.btn');
  }

  typeArticleDescription(articleDescription) {
    this.articleDescription.type(articleDescription);
  }

  typeArticleBody(articleBody) {
    this.articleBody.type(articleBody);
  }

  typeArticleTitle(articleTitle) {
    this.articleTitle.type(articleTitle);
  }

  typeArticleTag(articleTag) {
    this.articleTag.type(articleTag);
  }

  clickOnPublishArticleButton() {
    this.publishArticleButton.click().click();
  }

  clickOnUpdateArticleButton() {
    this.updateArticleButton.click();
  }
}

export default EditorPageObject;
