import PageObject from '../PageObject';

class articlePageObject extends PageObject {

    createArticleBtn(){
        cy.get('.container > .nav > :nth-child(2) > .nav-link').click()
    }

    articleTitle(title){
        cy.get(':nth-child(1) > .form-control').type(title)
    }

    articleDescription(description){
        cy.get(':nth-child(2) > .form-control').type(description)
    }

    articleBody(body){
        cy.get(':nth-child(3) > .form-control').type(body)
    }

    get publishBtn(){
       return cy.get('.btn')
    }

    clickPublichBtn(){
    this.publishBtn.click()
    }

    edidBtn(){
        cy.get('.article-actions > .article-meta > :nth-child(3) > .btn-outline-secondary').click()
    }

    deleteBtn(){
        cy.get('.article-actions > .article-meta > :nth-child(3) > .btn-outline-danger').click();
    }
}

export default articlePageObject;