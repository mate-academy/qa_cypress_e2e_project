/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from "../support/pages/signIn.pageObject";
import HomePageObject from "../support/pages/home.pageObject";
import * as alertMessage from "../support/alertMessages";

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe("Sign In page", () => {
	let user;
	before(() => {
		cy.task("db:clear");
		cy.task("generateUser").then((generateUser) => {
			user = generateUser;
		});
		signInPage.visit();
	});

	it("should provide an ability to log in with existing credentials", () => {
		signInPage.typeEmail(user.email);
		signInPage.typePassword(user.password);
		signInPage.clickSignInBtn();
		homePage.assertHeaderContainUsername(user.username);
	});

	it("should not provide an ability to log in with wrong email", () => {
		signInPage.typeEmail(user.updatedEmail);
		signInPage.typePassword(user.password);
		signInPage.clickSignInBtn();
		signInPage.assertModalContent(alertMessage.loginFailedMessage);
		signInPage.assertModalContent(alertMessage.invalidCredentialsMessage);
		signInPage.clickOkBtn();
	});

	it("should not provide an ability to log in with wrong password", () => {
		signInPage.typeEmail(user.email);
		signInPage.typePassword(user.updatedPassword);
		signInPage.clickSignInBtn();
		signInPage.assertModalContent(alertMessage.loginFailedMessage);
		signInPage.assertModalContent(alertMessage.invalidCredentialsMessage);
		signInPage.clickOkBtn();
	});
});
