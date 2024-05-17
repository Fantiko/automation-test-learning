/// <reference types="Cypress" />

describe('US68312', () => {
  beforeEach('passes', () => {
	cy.clearCookies()
    cy.getCookies().should('be.empty')
    cy.visit('https://app.dev.recrutamento.itixti-lab.com.br/?vid=c0c57cefce721e119b155b441e1722d6')

    cy.get('.ci-settings').click()
    // cy.get(':nth-child(3) > .menu > .sub-menu').scrollTo('bottom')
    cy.get('.sub-menu > :nth-child(11)').click()
  })

  it.skip('TC001 -  tela de "Motivos de Contratação/Demissão"',()=>{
    cy.get('#title-section > h1').should('be.visible')
      	.and('have.text','Setup da Empresa')
    cy.get('.form-wrapper > :nth-child(1) > :nth-child(1) > h3').should('be.visible')
      	.and('have.text','Cadastrar Motivos de Contratação/Demissão')


	cy.get('.btn').should('be.visible').and('have.text', ' Adicionar ')
	cy.get('.primary').should('be.visible').and('have.text', 'Filtrar')

	cy.get('.grow > .ng-untouched').should('be.visible').invoke('attr', 'placeholder')
	.should('contain', 'Ex: Projeto Novo')

	cy.get('.cluster-filter-select').should('be.visible')

	cy.get('table tbody tr').its('length').should('be.at.most', 11);

	let descricao =['Motivo', 'Tipo', 'Status']
	for (let index = 1; index <= descricao.length ; index++) {
		cy.get(`thead > tr > :nth-child(${index})`).should('be.visible').and('have.text', descricao[index-1])
	}

	cy.get('#tipo > .custom').should('be.visible')
    cy.get('#status > .custom').should('be.visible')

	cy.get('.pages').should('be.visible')

  })

  it.skip('TC002 - entrada válida em barra de pesquisa',()=>{
	cy.fazPesquisa('.grow > .ng-valid', ".primary", 'a')
  })

  it.skip('TC003 - entrada inválida em barra de pesquisa', ()=>{
	cy.fazPesquisa('.grow > .ng-untouched', ".primary", 'bla')

  })

  it.skip("TC004 - pesquisa com filtros tipo", () => {
		
		cy.comparaFiltro('#tipo > .custom > .ng-select-container', 'div.ng-option:nth(1)', ':nth-child(2)')
		cy.comparaFiltro('#tipo > .custom > .ng-select-container', 'div.ng-option:nth(0)', ':nth-child(2)')

	})

	it.skip("TC005 - pesquisa com filtros status", () => {
		cy.comparaFiltro('#status > .custom > .ng-select-container', 'div.ng-option:nth(1)', ':nth-child(3)')
		cy.comparaFiltro('#status > .custom > .ng-select-container', 'div.ng-option:nth(0)', ':nth-child(3)')


	})

	it.skip("TC008 - limpar filtros", ()=>{
		cy.comparaFiltro('#status > .custom > .ng-select-container', 'div.ng-option:nth(1)', ':nth-child(3)')
		cy.get('header > :nth-child(2) > span').click()
		cy.get('.primary')


	})

	it.skip("TC009 - navegação pelo index", ()=>{
		cy.get('.ci-chevron_right').click()
		cy.get('.ci-chevron_left').click()


	})



})

describe("US 67093 ", () => {

	beforeEach('passes', () => {
		cy.clearCookies()
		cy.getCookies().should('be.empty')
		cy.visit('https://app.dev.recrutamento.itixti-lab.com.br/?vid=c0c57cefce721e119b155b441e1722d6')
	
		cy.get('.ci-settings').click()
		cy.get('.sub-menu > :nth-child(11)').click()
		cy.get('tbody > :nth-child(1) > .description').click()
	  })

	it.skip("TC001 - selecionando motivo para edição", ()=>{

		cy.get('h3').should('be.visible')
		cy.get('.chore > span').should('be.visible').and('have.text', 'Cadastro de motivos de contratação e demissão')

		cy.get('.toogle-switch').should('be.visible').and('have.text', 'Status')
		.find('.toggle') 
		.should('exist')
		.and('be.visible')
		.and('not.be', 'editable');

		cy.get('.col-2').should('be.visible').and('contain.text', 'Tipo')
		.find('.ng-select-container')
		.should('exist')
		.and('be.visible')
		.and('not.be', 'editable');

		cy.get('.grow').should('be.visible').and('contain.text', 'Descrição do Motivo')
		.find('#motivo')
		.should('exist')
		.and('be.visible')
		.and('not.be', 'editable');

		cy.get('.btn').should('be.visible').and('contain.text', 'Voltar')

		cy.get('.primary').should('be.visible').and('contain.text', 'Editar')



	})

	it.skip('TC002 - habilitando edição', () => {
		cy.get('.primary').click()
		cy.get('h3').should('be.visible')
		cy.get('.chore > span').should('be.visible').and('have.text', 'Cadastro de motivos de contratação e demissão')

		cy.get('.toogle-switch').should('be.visible').and('have.text', 'Status')
		.find('.toggle') 
		.should('exist')
		.and('be.visible')
		.should('not.be.disabled');


		cy.get('.col-2').should('be.visible').and('contain.text', 'Tipo')
		.find('.ng-select-container')
		.should('exist')
		.and('be.visible')
		.and('not.be.disabled');

		cy.get('.grow').should('be.visible').and('contain.text', 'Descrição do Motivo')
		.find('#motivo')
		.should('exist')
		.and('be.visible')
		.and('not.be.disabled');


		cy.get('.btn').should('be.visible').and('contain.text', 'Voltar')

		cy.get('.primary').should('be.visible').and('contain.text', 'Salvar')


	})
	describe('editando', ()=>{

		beforeEach('habilitando edição', ()=>{
			cy.get('.primary').click()




		})

		it.skip('TC003 - editando descrição de motivo', () => {
			
			cy.get('.slider').click()
			cy.get('.ng-select-container').click()
			cy.get("div.ng-option:nth(1)").click()
			cy.get('#motivo').clear().type('aaaaaaaaabbbbbbcccccc')
			cy.get('.primary').click()
			cy.get('.swal2-popup').should('be.visible')
			cy.get('.swal2-popup').find('#swal2-title').should('contain.text', 'Sucesso')
			cy.get('.swal2-popup').should('contain.text', 'Registro atualizado com sucesso!')
			cy.get('.swal2-confirm').should('be.visible')
			
			
		})
		
		it.skip('TC004 - botão voltar em popup de edição de motivo', ()=>{

			cy.get('.slider').click()
			cy.get('.ng-select-container').click()
			cy.get("div.ng-option:nth(1)").click()
			cy.get('#motivo').clear().type('aaaaaaaaabbbbbbcccccc')
			cy.get('.primary').click()
			cy.get('.swal2-popup').should('be.visible')
			cy.get('.swal2-popup').find('#swal2-title').should('contain.text', 'Sucesso')
			cy.get('.swal2-popup').should('contain.text', 'Registro atualizado com sucesso!')
			cy.get('.swal2-confirm').should('be.visible').click()
			cy.get('.form-wrapper > :nth-child(1) > :nth-child(1) > h3').should('be.visible')


		})

		it.skip('TC005 - edição válida de descrição de motivo', ()=>{
			
			cy.get('#motivo').clear().type('aaaaaaaaabbbbbbcccccc')
			cy.get('.primary').click()
			cy.get('.swal2-popup').should('be.visible')
			cy.get('.swal2-popup').find('#swal2-title').should('contain.text', 'Sucesso')
			cy.get('.swal2-popup').should('contain.text', 'Registro atualizado com sucesso!')
			cy.get('.swal2-confirm').should('be.visible')
		})

		it.skip('TC006 - edição de descrição de motivo para campo vazio',()=>{
			cy.get('#motivo').clear()
			cy.get('.primary').click()

			cy.get('.swal2-popup').should("be.visible")
			cy.get('#swal2-title').should('be.visible').and('contain.text', 'Erro na requisição')
			cy.get('.swal2-popup').should('contain.text', 'A nova descrição do motivo está vazia!')
			cy.get('.swal2-confirm').click()

		})

		it.skip('TC007 - edição de descrição de motivo para descrição já existente', () =>{
			cy.get('#motivo').clear().type("saddasadasdsa")
			cy.get('.primary').click()

			cy.get('.swal2-popup').should("be.visible")
			cy.get('#swal2-title').should('be.visible').and('contain.text', 'Erro na requisição')
			cy.get('.swal2-popup').should('contain.text', 'Já existe um registro com essa descrição e tipo!')
			cy.get('.swal2-confirm').click()



		})

		it.skip('TC008 - editar ativando campo status inativo', () =>{
			cy.get('.slider').click()
			cy.get('.primary').click()
			cy.get('.swal2-confirm').click()
			cy.get('tbody > :nth-child(1) > :nth-child(3)').should('contain.text'," ")



		})

		it.skip('TC009 - editar desativando campo status ativo de motivo associado a usuário', ()=>{


		})

		it.skip("TC010 - editar alterando campo tipo - válido", ()=>{
			
			cy.get('.ng-select-container').click()
			cy.get("div.ng-option:nth(0)").click()
			
			cy.get('.primary').click()

			cy.get('.swal2-popup').should('be.visible')
			cy.get('.swal2-popup').find('#swal2-title').should('contain.text', 'Sucesso')
			cy.get('.swal2-popup').should('contain.text', 'Registro atualizado com sucesso!')
			cy.get('.swal2-confirm').should('be.visible').click()


		})

		it.skip('TC011 - editar alterando campo "tipo" - inválido', ()=>{
			cy.get('.ng-clear-wrapper').click()
			cy.get('.ng-select-container').type('dabaca')
			

		})

		it.skip('TC012 - editar alterando campo "descrição de motivo" - válido', ()=>{
			cy.get('#motivo').clear().type('aaaaaaaaabbbbbbcccccc')
			cy.get('.primary').click()



		})

		it('TC013 - editar alterando campo "descrição de motivo" - inválido',() => {
			cy.get('#motivo').testaCampo(120)


		} )

	})

})