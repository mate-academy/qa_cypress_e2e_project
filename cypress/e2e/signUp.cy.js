/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from "../support/pages/signUp.pageObject";
import { faker } from "@faker-js/faker";

const signUpPage = new SignUpPageObject();

describe("Sign Up page", () => {
  beforeEach(() => {
    cy.task("db:clear");
    cy.visit("/#/register");
  });

  it("should register user", () => {
    const fakeUsername = faker.internet.userName();
    const fakeEmail = faker.internet.email();
    const fakePassword = faker.internet.password();

    signUpPage.usernameField.type(fakeUsername);
    signUpPage.emailField.type(fakeEmail);
    signUpPage.passwordField.type(fakePassword);

    signUpPage.signUpBtn;
  });

  it("should not register a user with invalid email format", () => {
    const fakeUsername = faker.internet.userName();
    const fakeEmail = faker.internet.email();
    const fakePassword = faker.internet.password();

    signUpPage.usernameField.type(fakeUsername);
    signUpPage.emailField.type(fakeUsername);
    signUpPage.passwordField.type(fakePassword);

    signUpPage.signUpBtn;
  });
});
