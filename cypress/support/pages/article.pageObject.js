import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  get articleTitleField() {
    return cy.getByDataCy('title-arcticle');
  }

  get articleTextField() {
    return cy.getByDataCy('text-article');
  }

  get editBtn() {
    return cy.getByDataCy('edit-article');
  }

  get deleteBtn() {
    return cy.getByDataCy('delete-article');
  }

  get authorLink() {
    return cy.getByDataCy('article-author');
  }

  assertTitle(title) {
    this.articleTitleField
      .should('contain', title);
  }

  assertText(text) {
    this.articleTextField
      .should('contain', text);
  }

  clickAuthorLink() {
    this.authorLink.eq(0).click();
  }

  clickEditBtn() {
    this.editBtn.eq(0).click();
  }

  clickDeleteBtn() {
    this.deleteBtn.eq(0).click();
  }
}

export default ArticlePageObject;
