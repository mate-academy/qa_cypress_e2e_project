/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    getByDataCy(selector: string): Chainable<any>;

    login(email: string, password: string): Chainable<any>;
    register(email: string, username: string, password: string): Chainable<any>;

    registerAndLogin(): Chainable<any>;
    createArticle(authorId: number): Chainable<any>;
  }
}
