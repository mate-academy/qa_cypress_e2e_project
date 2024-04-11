import PageObject from '../PageObject';

class EditArticlePageObject extends PageObject {
  url = '/#/editor';

  editTitle(title) {
    cy.findByPlaceholder('Article Title').clear().type(title);
  }

  editDescription(description) {
    cy.findByPlaceholder('What\'s this article about?').clear().type(description);
  }

  editBody(body) {
    cy.findByPlaceholder('Write your article (in markdown)').clear().type(body);
  }

  editTags(tags) {
    cy.findByPlaceholder('Enter tags').clear().type(tags);
  }

  clickOnThePublish() {
    cy.contains('button', 'Publish Article')
      .click();
  }
}
export default EditArticlePageObject;