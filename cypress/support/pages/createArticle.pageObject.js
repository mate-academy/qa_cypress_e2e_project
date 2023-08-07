import PageObject from '../PageObject';

class CreateArticlePageObject extends PageObject {
  url = '/#/editor';

  titleField (title) {
    cy.findByPlaceholder('Article Title').type(title);
  }

  descriptionField (description) {
    cy.findByPlaceholder('What\'s this article about?').type(description);
  }

  bodyField (body) {
    cy.findByPlaceholder('Write your article (in markdown)').type(body);
  }

  tagField (tag) {
    cy.findByPlaceholder('Enter tags').type(tag);
  }

  clickPublishBtn() {
    cy.contains('.btn', 'Publish Article')
      .click();
  }
}

export default CreateArticlePageObject;
