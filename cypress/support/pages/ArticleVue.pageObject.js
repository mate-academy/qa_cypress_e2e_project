import PageObject from '../PageObject';

class ArticleVuePageObject extends PageObject {

  get titleField() {
    return cy.getByDataCy('article-title');
  }
  
}
export default ArticleVuePageObject;
