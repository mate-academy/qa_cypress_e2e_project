import PageObject from '../PageObject';

class NewArticleFormPageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByPlaceholder('Article Title');
  }

  get descriptionField() {
    return cy.getByPlaceholder(`What's this article about?`);
  }

  get bodyField() {
    return cy.getByPlaceholder('Write your article');
  }

  get tagField() {
    return cy.getByPlaceholder('Enter tags');
  }

  get publishArticleButton() {
    return cy.contains('.btn', 'Publish Article');
  }
  
}

  

export default NewArticleFormPageObject;
