import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
 // url = '/#/articles/' + ;

  get editArticleBtn() {
    return cy.getByDataCy('email-sign-in');
  }

  get deleteArticleBtn() {
    return cy.getByDataCy('password-sign-in');
  }
}

export default ArticlePageObject;