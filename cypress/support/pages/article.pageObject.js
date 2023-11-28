import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataCy('article-title');
  }
  typeTitle(title) {
    this.titleField.type(title);
  }
}
export default ArticlePageObject;