import PageObject from '../PageObject';

class EditArticlePageObject extends PageObject {
  url = '/#/editor';

  editTitleField (editTitle) {
    cy.findByPlaceholder('Article Title').clear().type(editTitle);
  }

  editDescriptionField (editDescription) {
    // eslint-disable-next-line max-len
    cy.findByPlaceholder('What\'s this article about?').clear().type(editDescription);
  }

  editBodyField (editBody) {
    // eslint-disable-next-line max-len
    cy.findByPlaceholder('Write your article (in markdown)').clear().type(editBody);
  }

  editTagField (editTag) {
    cy.findByPlaceholder('Enter tags').clear().type(editTag);
  }

  clickPublishBtn() {
    cy.contains('.btn', 'Publish Article')
      .click();
  }
}

export default EditArticlePageObject;
