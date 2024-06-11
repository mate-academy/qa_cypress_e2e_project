import PageObject from '../PageObject';

class userPageObject extends PageObject {
    url = '/#/@+${username}/';

    get newArticleLink() {
        return cy.get('.container > .nav > :nth-child(2) > .nav-link');
      }
    
      clicknewArticleLink(){
        this.newArticleLink
          .click();
}
}

export default userPageObject;
