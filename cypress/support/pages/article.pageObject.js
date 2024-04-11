import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = `/articles/`;

  get titleCon() {
    return cy.getByDataCy('title');
  }

  get bodyCon() {
    return cy.getByDataCy('body');
  }

  get editButton() {
    return cy.getByDataCy('edit-art-btn');
  }

  get deleteButton() {
    return cy.getByDataCy('delete-art-btn');
  }

  clickEdit() {
    this.editButton.first().click();
  }

  clickDelete() {
    this.deleteButton.first().click();
  }

  assertArticle(title, body) {
    this.titleCon.should('contain', title);
    this.bodyCon.should('contain', body);
  }

  assertNewArticle(newTitle, newBody) {
    this.titleCon.should('contain', newTitle);
    this.bodyCon.should('contain', newBody);
  }
}

export default ArticlePageObject;
