import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleInput() {
    return cy.getByPlaceholder('Article Title');
  }

  get descriptionInput() {
    return cy.getByPlaceholder(`What's this article about?`);
  }

  get bodyInput() {
    return cy.getByPlaceholder('Write your article (in markdown)');
  }

  get tagsInput() {
    return cy.getByPlaceholder('Enter tags');
  }

  typeTitle(title) {
    this.titleInput.type(title);
  }

  typeDescription(description) {
    this.descriptionInput.type(description);
  }

  typeBody(bodyText) {
    this.bodyInput.type(bodyText);
  }

  typeTags(tags) {
    this.tagsInput.type(tags);
  }

  clickOnPublishBtn() {
    cy.contains('button', 'Publish Article').click();
  }

  clickOnUpdatehBtn() {
    cy.contains('button', 'Update Article').click();
  }

  // chekProfileUsername(username) {
  //   cy.visit('/');
  //   cy.contains('a', username.toLowerCase())
  //     .should('have.attr', 'href', `/profile/${username.toLowerCase()}`)
  //     .click();
  // }
}

export default ArticlePageObject;
