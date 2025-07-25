import { SELECTOR_MODAL, SELECTOR_INGREDIENT_NAME, SELECTOR_INGREDIENT_TYPE_BUN } from './constants';

describe('Конструктор бургеров', () => {
  it('Ингредиенты добавляются в в конструктор', () => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('ingredients');

    cy.intercept('GET', '/api/auth/user', {
      fixture: 'user.json'
    }).as('user');

    cy.visit('/');
    cy.wait('@ingredients');

    let bun = '';
    cy.get(SELECTOR_INGREDIENT_TYPE_BUN)
      .first()
      .within(() => {
        cy.get('button').click();
      })
      .then(item => {
        bun = item.find(SELECTOR_INGREDIENT_NAME).text();
      });

    let main = '';
    cy.get('[data-testid="ingredient-type-main"]')
      .first()
      .within(() => {
        cy.get('button').click();
      })
      .then(item => {
        main = item.find(SELECTOR_INGREDIENT_NAME).text();
      });

    let sauce = '';
    cy.get('[data-testid="ingredient-type-sauce"]')
      .first()
      .within(() => {
        cy.get('button').click();
      })
      .then(item => {
        sauce = item.find(SELECTOR_INGREDIENT_NAME).text();
      });

    cy.get('[data-testid="burger-top"]')
      .should('exist')
      .within(() => {
        cy.contains(`${bun} (верх)`).should('exist');
      });

    cy.get('[data-testid="burger-bottom"]')
      .should('exist')
      .within(() => {
        cy.contains(`${bun} (низ)`).should('exist');
      });

    cy.get('[data-testid="burger-middle"]')
      .should('exist')
      .within(() => {
        cy.contains(main).should('exist');
        cy.contains(sauce).should('exist');
      });
  })
})