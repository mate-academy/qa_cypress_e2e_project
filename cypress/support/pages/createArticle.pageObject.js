import PageObject from '../PageObject';

class CreateArticlePageObject extends PageObject {
  url = '/#/editor';

  addTitle(title) {
    cy.findByPlaceholder('Article Title')
      .type(title);
  }

  addDescription(description) {
    cy.findByPlaceholder('What\'s this article about?')
      .type(description);
  }

  addBody(body) {
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(body);
  }

  addTags(tags) {
    cy.findByPlaceholder('Enter tags')
      .type(tags);
  }

  clickOnThePublish() {
    cy.contains('button', 'Publish Article')
      .click();
  }
}

export default CreateArticlePageObject;
