describe('Конструктор бургеров', () => {
  it('Ингредиенты добавляются в в конструктор', () => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('ingredients');

    cy.intercept('GET', '/api/auth/user', {
      fixture: 'user.json'
    }).as('user');

    cy.visit('http://localhost:4000/');
    cy.wait('@ingredients');

    let bun = '';
    cy.get('[data-testid="ingredient-type-bun"]')
      .first()
      .within(() => {
        cy.get('button').click();
      })
      .then(item => {
        bun = item.find('[data-testid="ingredient-name"]').text();
      });

    let main = '';
    cy.get('[data-testid="ingredient-type-main"]')
      .first()
      .within(() => {
        cy.get('button').click();
      })
      .then(item => {
        main = item.find('[data-testid="ingredient-name"]').text();
      });

    let sauce = '';
    cy.get('[data-testid="ingredient-type-sauce"]')
      .first()
      .within(() => {
        cy.get('button').click();
      })
      .then(item => {
        sauce = item.find('[data-testid="ingredient-name"]').text();
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