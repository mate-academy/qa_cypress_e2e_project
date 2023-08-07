import PageObject from '../PageObject';

class CreateArticlePageObject extends PageObject {
  url = '/#/editor';

  typeTitle(title) {
    cy.findByPlaceholder('Article Title').type(title);
  }

  typeDescription(description) {
    cy.findByPlaceholder('What\'s this article about?').type(description);
  }

  typeBody(body) {
    cy.findByPlaceholder('Write your article (in markdown)').type(body);
  }

  typeTags(tag) {
    cy.findByPlaceholder('Enter tags').type(tag);
  }

  clickOnPublishBtn() {
    cy.contains('button', 'Publish Article').click();
  }
}

export default CreateArticlePageObject;
