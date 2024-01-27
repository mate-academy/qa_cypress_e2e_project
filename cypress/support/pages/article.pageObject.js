import PageObject from "../PageObject";

class ArticlePageObject extends PageObject{
    url = '/#/editor';

    get titleField(){
        return cy.getByDataCy('article-title');
    }

    typeInTitleField(titleName){
        this.titleField.type(titleName);
    }

    get describeField(){
        return cy.getByDataCy('article-describe');
    }

    typeInDescribeField(describeName){
        this.describeField.type(describeName);
    }

    get bodyField(){
        return cy.getByDataCy('article-body');
    }

    typeInBodyField(bodyText){
        this.bodyField.type(bodyText);
    }

    get tagField(){
        return cy.getByDataCy('tags');
    }

    typeInTagField(tagsText){
        this.tagField.type(tagsText);
    }

    get publishArticleBtn(){
        return cy.getByDataCy('publish-article-btn');
    }

    clickOnPublishArticleBtn(clickBtn){
        this.publishArticleBtn.click(clickBtn);
    }

    get containArticleTitle(){
        return cy.getByDataCy('article-title-on-article-page')

    }

    containArticleTitlEOnPage(articleTitle){
        this.containArticleTitle.should('contain.text', articleTitle);
    }

    get editArticleBtn(){
        return cy.getByDataCy('edit-article-btn')

    }

    clickOnEditArticleBtn(btn){
        this.editArticleBtn.click({ multiple: true } );
    }

    get clickTitleField(){
        return cy.getByDataCy('article-title')

    }

    clearIntitleField(clear){
        this.clickTitleField.clear(clear);
    }

    get clickBodyField(){
        return cy.getByDataCy('article-body')

    }

    clearInBodyField(clear){
        this.clickBodyField.clear(clear);
    }

    get containArticleBody(){
        return cy.getByDataCy('article-body-on-article-page')

    }

    containArticleBodyOnPage(articleBody){
        this.containArticleBody.should('contain.text', articleBody);
    }

    get deleteBtn(){
        return cy.get('.container > .article-meta > :nth-child(3) > [data-cy="delete-article"] > span')
    }


    

    clickOnDeleteBtn(deleteBtn){
        this.deleteBtn.click();
    }

    //cy.on('window:confirm', (text) => {
       // expect(text).to.contains('Do you confirm action?');
        //return true;
      //});






    

}

export default ArticlePageObject;