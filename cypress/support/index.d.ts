/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    getByDataQa(selector: string): Chainable<any>
    register(email: string, username: string, password: string): Chainable<any>
    login(email: string, username: string, password: string): Chainable<any>
    createArticle(title: string, description: string, body: string): Chainable<any>
  }
}
