
describe('US66291', () => {
	beforeEach('passes', () => {
		cy.LoginAdm()

		cy.get('.ci-settings').click()
		cy.get('.sub-menu > :nth-child(5)').click()

	})

	it('CT001 - Teste campo texto', () => {
		cy.get('.grow > .ng-untouched').should('have.attr', 'placeholder', 'Nome da etapa')

	})

	it('CT002 - Teste de limite de caracteres de Campos Texto', () => {
		cy.get('.grow > .ng-untouched').testaCampo(120)

	})

	it('CT003 - Teste Filtro', () => {

		cy.get('.filters').children().should('have.length', 3).each((child, index) => {
			const expectedTexts = ['Fase do Recrutamento', 'Template de e-mail', 'Status'];
			cy.wrap(child).should('have.text', expectedTexts[index]);
			cy.wrap(child).find('.ng-select-container')
			
		  });


	})

	it('CT004- Teste caixa fase do recrutamento', ()=>{
		cy.get('.filters').find('.ng-select-container').eq(0).click()
		const opcoes =['Avaliação', 'Contratação', 'Entrevista', 'Oferta', 'Triagem',]
		
		cy.get('.ng-dropdown-panel .ng-option').should('have.length', opcoes.length).each(($option, index)=>{
			cy.wrap($option).should('have.text',opcoes[index])

		})


		cy.get('.ng-dropdown-panel .ng-option').contains("Avaliação").click()
		cy.get('.ng-dropdown-panel .ng-option').contains("Entrevista").click()

		cy.get('.filters').find('.ng-select-container').find('.ng-arrow-wrapper').eq(0).click()

		cy.get('.list-item-multiselect > :nth-child(1)').should('contain.text', 'Avaliação')
		cy.get('.list-item-multiselect > :nth-child(2)').should('contain.text', 'Entrevista')

	})

	it('CT005- Teste caixa Template de Email', () => {

		cy.get('.filters').find('.ng-select-container').eq(1).click()
		
		cy.get('.ng-dropdown-panel .ng-option').contains("Bem Vindo").click()
		cy.get('.ng-dropdown-panel .ng-option').contains("Admissão 1").click()

		cy.get('.filters').find('.ng-select-container').find('.ng-arrow-wrapper').eq(1).click()

		cy.get('.list-item-multiselect > :nth-child(1)').should('contain.text', 'Bem Vindo')
		cy.get('.list-item-multiselect > :nth-child(2)').should('contain.text', 'Admissão 1')

	})

	it('CT006- Teste caixa Status', () => {

		cy.get('.filters').find('.ng-select-container').eq(2).click()
		
		cy.get('.ng-dropdown-panel .ng-option').contains("Ativo").click()
		cy.get('.ng-dropdown-panel .ng-option').contains("Inativo").click()

		cy.get('.filters').find('.ng-select-container').find('.ng-arrow-wrapper').eq(2).click()

		cy.get('.list-item-multiselect > :nth-child(1)').should('contain.text', 'Ativo')
		cy.get('.list-item-multiselect > :nth-child(2)').should('contain.text', 'Inativo')


	})

	it('CT007- Teste botão Limpar Filtros', ()=>{
		
		cy.get('.filters').find('.ng-select-container').eq(0).click()

		cy.get('.ng-dropdown-panel .ng-option').contains("Avaliação").click()
		cy.get('.ng-dropdown-panel .ng-option').contains("Entrevista").click()

		cy.get('.filters').find('.ng-select-container').find('.ng-arrow-wrapper').eq(0).click()

		cy.get('.list-item-multiselect > :nth-child(1)').should('contain.text', 'Avaliação')
		cy.get('.list-item-multiselect > :nth-child(2)').should('contain.text', 'Entrevista')

		cy.get('.filters').find('.ng-select-container').eq(1).click()
		
		cy.get('.ng-dropdown-panel .ng-option').contains("Bem Vindo").click()
		cy.get('.ng-dropdown-panel .ng-option').contains("Admissão 1").click()

		cy.get('.filters').find('.ng-select-container').find('.ng-arrow-wrapper').eq(1).click()

		cy.get('.list-item-multiselect > :nth-child(1)').should('contain.text', 'Bem Vindo')
		cy.get('.list-item-multiselect > :nth-child(2)').should('contain.text', 'Admissão 1')

		cy.get('.filters').find('.ng-select-container').eq(2).click()
		
		cy.get('.ng-dropdown-panel .ng-option').contains("Ativo").click()
		cy.get('.ng-dropdown-panel .ng-option').contains("Inativo").click()

		cy.get('.filters').find('.ng-select-container').find('.ng-arrow-wrapper').eq(2).click()

		cy.get('.list-item-multiselect > :nth-child(1)').should('contain.text', 'Ativo')
		cy.get('.list-item-multiselect > :nth-child(2)').should('contain.text', 'Inativo')

		cy.get('.grow > .ng-untouched').type('a')
		cy.get('.row > .actions > .primary').click()

		cy.get('header > :nth-child(2) > span').click()

		cy.get('table').should('exist')
		
		const tableLabel = ['Nome', 'Fase', 'E-mail', 'Status' , 'Criado em']
		for(let index in tableLabel){
			cy.get(`thead > tr > :nth-child(${parseInt(index)+1})`).should('be.visible')	
		}

	})

	it('CT008-Teste pesquisar filtros preenchido existente', () => {
		cy.fazPesquisa('.grow > .ng-untouched', '.row > .actions > .primary' , 'Curr')


	})

	it('CT009-Teste ordem lista', () =>{
		
		let anterior = null
		cy.get('tbody > tr').each(($row)=>{
			cy.wrap($row).find(':nth-child(5)').invoke('text').then((text)=>{
				const valorAtual = text.split('/').map(Number)
				if(anterior === null){
					anterior = valorAtual
					
				} else {
					for(let index in valorAtual){
						if(valorAtual[index] > (anterior[index])){
							break
						}


					}

					anterior = valorAtual;

				}

			})
			

		})

	})

	it('CT010-Teste limite de registros por página', () =>{
		cy.get('.cluster-filter table tbody tr').its('length').should('be.at.most', 10);

	})

	it('CT011-Teste pesquisar filtros preenchido não existente', () =>{
		cy.fazPesquisa('.grow > .ng-untouched', '.row > .actions > .primary', 'aaaaaa')
	})
	
	it('CT012-Teste visualizar', () =>{
		cy.get('tbody > :nth-child(1) > .description').click()
		cy.get('.chore > span').should('be.visible')
			.and('contain.text','Cadastre etapas que poderão ser utilizadas no processo de recrutamento de uma vaga')

	})
	
	it('CT013- Teste Adicionar Etapas', () =>{
		cy.get('.secondary').click()
		cy.get('.chore > span').should('be.visible')
			.and('contain.text','Cadastre etapas que poderão ser utilizadas no processo de recrutamento de uma vaga')

	})

	it('CT014- Teste Exportar Etapas', () =>{
		cy.get('.form-wrapper > :nth-child(1) > .actions > .primary').click()
		cy.get('.chore > span').should('be.visible')
			.and('contain.text','Cadastre etapas que poderão ser utilizadas no processo de recrutamento de uma vaga')

	})




})