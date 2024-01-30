import PageObject from '../PageObject';

class UserAccountPageObject extends PageObject {

    get userBio() {
        return cy.getByDataCy('bio-account-profile')
    }

    get followUserBtn(){
        return cy.getByDataCy('followUser-Btn-account-profile');
    }

    get unfollowUserBtn() {
        return cy.getByDataCy('unfollowUser-Btn-account-profile')
    }

    get articleList() {
        return cy.getByDataCy('articles-list-userProfile-page');
    }

    clickFollowUserBtn() {
        this.followUserBtn.click();
    }

    clickUnfollowUserBtn() {
        this.unfollowUserBtn.click();
    }

    assertUserBio(value) {
        this.userBio.should('contain', value)
    }
    
    assertUnfollowUserBtn() {
        this.unfollowUserBtn.should('exist');
    }

    assertNoArticle(value) {
        this.articleList.should('not.contain', value)
    }
}

export default UserAccountPageObject;