
/// <reference types="Cypress" />


describe('US 66294 Template de Vaga - Pesquisar', () => {
  beforeEach('passes', ()=>{
    cy.clearCookies()
    cy.getCookies().should('be.empty')
    cy.visit('https://app.dev.recrutamento.itixti-lab.com.br/?vid=8cdb223f3f39f2537d7856993abd539c')

    cy.get('.ci-settings').click()
    cy.get('.sub-menu > :nth-child(14)').click()

  })


  it('TC001 - tela de template de vagas', () => {
    cy.get('.form-wrapper > :nth-child(1) > :nth-child(1) > h3').should("be.visible").and("have.text","Template de Vagas")

    cy.get('.secondary').should("be.visible").and("have.text", " Adicionar Template ")

    cy.get('.grow > .ng-untouched').should("be.visible")

    cy.get('.primary').should("be.visible")

    cy.get('.cluster-filter table tbody tr').its('length').should('be.at.most', 11);

    cy.get('.cluster-filter-select')

    cy.get('.cluster-filter-select > header > :nth-child(1) > h3').should("be.visible").and("have.text", 'Filtros')

    cy.get('.cluster-filter-select').should('contain.text', 'Área de Trabalho')

    cy.get('#areaTrabalho > .custom > .ng-select-container').should("exist")
    .and("have.text", 'Selecione')

    cy.get('.cluster-filter-select').should('contain.text','Área de Trabalho')
    cy.get('.cluster-filter-select').should('contain.text','Período de Criação')
    cy.get('.cluster-filter-select').should('contain.text','Criado por')
    cy.get('.cluster-filter-select').should('contain.text','Status')

    cy.get('#periodoCriacaoInicial > .input-date-picker').should("exist")
    cy.get(':nth-child(3) > date-picker.ng-untouched > .input-date-picker').should('exist')

  })

  it("TC002 - nome de template válido na barra de pesquisa", ()=>{
    cy.fazPesquisa('.grow > .ng-untouched', ".primary", "abc")


  })

  it("TC003 - nome de template não existente", ()=>{
    cy.fazPesquisa('.grow > .ng-valid', ".primary", "dabaca")


  })

  it("TC004 - nome de template vazio", ()=>{
    
    cy.fazPesquisa('.grow > .ng-untouched', ".primary", "abc")
    cy.get('.grow > .ng-valid').clear()
    cy.get('.primary').click()


  })

  it('TC005 - filtro "área de trabalho"', () => {
    
    cy.get('#areaTrabalho > .custom > .ng-select-container').click()
    cy.get(`div.ng-option:nth(0)`).click();
    cy.get('.primary').click();
    cy.get('.cluster-filter table tbody tr').its('length').should('be.at.most', 11);
    cy.get('#areaTrabalho > .custom > .ng-select-container').click();
    cy.contains('Limpar filtros').click();

  })

  it('TC006 - filtro "criado por"', () => {


  })

  it('TC007 - filtro "status" - ativo',()=>{
    cy.comparaFiltro("#status > .custom > .ng-select-container", 'div.ng-option:nth(0)', ':nth-child(3)')

  })

  it('TC007 - filtro "status" - inativo',()=>{
    cy.comparaFiltro("#status > .custom > .ng-select-container", 'div.ng-option:nth(1)', ':nth-child(3)')

  })

  it('TC008 - filtro "período de criação"',()=>{
    cy.get('.filters > :nth-child(2) > :nth-child(1)')
    .find(".input-date-picker")
    .eq(0)
    .find(":nth-child(2)").click({force: true})
    cy.get('.ngb-dp-header').find('[aria-label="Select month"]').select('jan.')
    cy.get('.ngb-dp-header').find('[aria-label="Select year"]').select('2023')
    cy.get('[aria-label="quinta-feira, 12 de janeiro de 2023"] > .btn-light').click()

    cy.get('.filters > :nth-child(2) > :nth-child(1)')
    .find(".input-date-picker")
    .eq(1)
    .find(":nth-child(2)").click({force: true})
    cy.get('.ngb-dp-header').find('[aria-label="Select month"]').select('fev.')
    cy.get('.ngb-dp-header').find('[aria-label="Select year"]').select('2023')
    cy.get('[aria-label="domingo, 12 de fevereiro de 2023"] > .btn-light').click()

    cy.get('.primary').click()

    

  })

  it("TC009 - indice de resultados", ()=>{
		cy.get('.ci-chevron_right').click()
		cy.get('.ci-chevron_left').click()


	})

  it("TC010 - limpar filtros", ()=>{
    cy.comparaFiltro("#status > .custom > .ng-select-container", 'div.ng-option:nth(1)', ':nth-child(3)')

		cy.get('div.cluster-filter-select').find('span:first').click()


	})


})

