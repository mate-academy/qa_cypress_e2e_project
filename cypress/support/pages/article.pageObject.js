import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/articles';

  get editArticleBtn(){
    return cy.getByDataCy('edit-article').eq(0);
  }

  get deleteArticleBtn(){
    return cy.getByDataCy('delete-article').eq(0);
  }

  get articleText(){
    return cy.getByDataCy('article-text');
  }

  get followAuthorBtn(){
    return cy.getByDataCy('follow-author').eq(0);
  }

  get articleTitle(){
    return cy.getByDataCy('article-title');
  }

  get articleAuthor(){
    return cy.getByDataCy('article-author');
  }

  clickEditArticleBtn(){
    this.editArticleBtn.click();
  }

  clickDeleteArticleBtn(){
    this.deleteArticleBtn.click();
  }

  clickFollowBtn(){
    this.followAuthorBtn.click();
  }

  assertArticleText(articleText){
    this.articleText.should('have.text', articleText +'\n');
  }

  assertArticleTitle(title){
    this.articleTitle.should('have.text', title);
  } 

  assertArticleAuthor(author){
    this.articleAuthor.should('contain', author);
  }

  assertFollowBtnText(user){
    this.followAuthorBtn.should('contain', `Follow ${user}`);
  }

  assertUnfollowBtnText(user){
    this.followAuthorBtn.should('contain', `Unfollow ${user}`);
  }
}

export default ArticlePageObject;