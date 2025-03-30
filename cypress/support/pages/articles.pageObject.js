import PageObject from '../PageObject';

class ArticlesPageObject extends PageObject{
    url = '/#/editor';

    clickWriteArticle() {
      cy.get('.container > .nav > :nth-child(2) > .nav-link').click();
    }
  
    typeTitle(title) {
      cy.get(':nth-child(1) > .form-control').type(title);
    }
  
    typeDescription(description) {
      cy.get(':nth-child(2) > .form-control').type(description);
    }
  
    typeBody(body) {
      cy.get(':nth-child(3) > .form-control').type(body);
    }
  
    clickPublishButton() {
      cy.get('.btn').click();
    }
  
    clickEditButton() {
      cy.get('.container > .article-meta > :nth-child(3) > .btn-outline-secondary').click();
    }
  
    clickSomeButton() {
     
      cy.get('.btn').click();
    }
  
    clickDangerButton() {
      cy.get('.container > .article-meta > :nth-child(3) > .btn-outline-danger')
      .click();
    }
  }
  
  export default ArticlesPageObject;
  