import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/articles/';

  get editArticlebtn() {
    return cy.getByDataCy('edit-article');
  }

  get deleteArticlebutton() {
    return cy.getByDataCy('delete-article');
  }

  get editArticletextarea() {
    return cy.getByDataCy('article-body');
  }

  get submitbtn() {
    return cy.getByDataCy('submit');
  }

  get articlecontent() {
    return cy.getByDataCy('article-content');
  }

  get newArticlebtn() {
    return cy.getByDataCy('new-article');
  }

  assertContent(text) {
    this.articlecontent.should('contain', text);
  }

  clickeditArticlebtn() {
    this.editArticlebtn.eq(0).click();
  }

  clickdeleteArticlebtn() {
    this.deleteArticlebutton.eq(0).click();
  }
}

export default ArticlePageObject;
