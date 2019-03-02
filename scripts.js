// Aqui, obtemos o elemento que contém a class 'poltronas'.
var poltronas = 
	document.querySelector(".poltronas")

// Nesta função, fazemos a criação de uma poltrona (tag 'p' do HTML), e adicionamos um texto à ela
// É esta a função responsável por adicionar uma nova poltrona ao elemento que contém a class 'poltronas'
function criarPoltrona(id) {
	var umaPoltrona = document.createElement("p")
		umaPoltrona.textContent = "Poltrona "+id
		poltronas.appendChild( umaPoltrona )
}

// Neste loop, chamamos a função anteriormente criada, para que sejam adicionadas novas poltronas (nesse caso, '40')
for (var i = 0; i < 40; i++) {
	var ident = i+1
	criarPoltrona(ident)
}

// Esta variável irá conter todas as poltronas reservadas, à medida que selecionamos na tela
var reservadas = []

// Aqui, obtemos todos os elementos 'p' da página, para usarmos depois
var todasAsPoltronas = 	document.querySelectorAll("p")

// Aqui, obtemos o elemento que contem a class 'texto-resposta', que irá mostrar na tela as mensagens à medida que marcamos ou 'desmarcamos' as poltronas desejadas
var textoResposta = document.querySelector(".texto-resposta")

// Nessa parte, fazemos um loop pra poder iterar com cada poltrona (tag 'p', no caso, do HTML)
todasAsPoltronas.forEach(function(item, index){
	// Adicionamos um atributo, chamado 'data-id', para ser possível depois aparecer no texto de apresentação o número(humano) exato da poltrona incluída na lista. E não o índice do array!
	item.setAttribute("data-id" , index+1)

	// Aqui, adicionamos uma função a medida que o elemento que está iterando 'ouvir' o evento 'CLICK'
	item.addEventListener("click", 
		function(){
			// Primeramente colocamos numa variável o atributo 'data-id' que cada um tem (criado ali encima! Lembra?!)
			var atributoDataId = item.getAttribute("data-id")

			// Nesse momento, verificamos se a lista de reservas tem o item com o atributo 'data-id' em questão. Pegamos ele pra agora comparar dentro do array
			if( reservadas.indexOf(atributoDataId) >= 0 ) {
				// Se tiver, ele irá atribuir a class 'desmarcado', e ficar 'branco' na tela.
				item.setAttribute("class", "desmarcado")
				// Além de também retirar este item da lista! Lembre-se de retirar APENAS 1 item, passando o segundo parâmetro do 'splice'!!! :)
				reservadas.splice(reservadas.indexOf( atributoDataId ) , 1)
			} else {
				// Se não tiver, ele irá atribuir a class 'marcado', e ficar 'verde' na tela.
				reservadas.push(atributoDataId)
				// Além de também adicionar este item na lista!
				item.setAttribute("class", "marcado")
			}

			// Quase no fim, verificamos se o tamanho da lista de reservas é maior que ZERO (ou seja, se tem algo nela!)
			if(reservadas.length > 0){
				// Se tiver, atribuimos este texto, falando que as reservadas são as poltronas 'tal', 'tal' e 'tal' ... 
				// Fiz um ordenamento aqui usando o método 'sort()', e adicionando dentro dele uma função para retornar de forma crescente o número das poltronas contidas na lista.
				textoFinal = "Poltronas reservadas: " + reservadas.sort(function(a ,b){ return a - b }).join(", ")
			} else{ 
				// Se não tiver, mostra a frase 'padrão', dizendo que não tem nada reservado ainda...
				textoFinal = "Nenhuma poltrona reservada ainda."
			}

			// E, finalmente, apresentamos na tela o texto de acordo com que for selecionado (ou 'deselecionado', se é que essa palavra ecxiste =p )
			textoResposta.innerHTML = textoFinal
		})
})