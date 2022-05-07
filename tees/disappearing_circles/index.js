// gera um número aleatório
function random(min,max) {
	const num = Math.floor(Math.random()*(max-min)) + min;
	return num;
}

// gera uma cor aleatória
function randomColor() {
	return 'rgb(' + random(0,255) + ', ' + random(0,255) + ', ' + random(0,255) +  ')';
}

function addCircle() {

	// conta a quantidade de círculos criados
	// e usa esse valor para criar ids únicos
	if (typeof addCircle.counter == "undefined") {
		addCircle.counter = 1;
	} else {
		++addCircle.counter;
	}

	var circ = document.createElement("div"); // cria uma div para o círculo
	var circId = "circle_" + addCircle.counter.toString(); // id único
	circ.setAttribute("id", circId);

	// css
	circ.style.width = "130px";
	circ.style.height = "130px";
	circ.style.borderRadius = "50%";
	circ.style.float = "left";
	circ.style.margin = "25px";

	var circText = document.createTextNode(circId.split('_')[1]);
	circ.appendChild(circText);

	// insere o novo círculo no final
	divCircles.insertAdjacentElement("beforeend", circ);

	// adiciona uma cor aleatória ao círculo
	var thisCirc = document.getElementById(circId);
	const newBgColor = randomColor();
	thisCirc.style.setProperty('background-color', newBgColor);

	// círculo some ao ser clicado
	circ.onclick = function () {
		circ.style.display = "none";
	}

}

// configuração inicial da página com textos e botões
var body = document.body;

// css do body
body.style.display = "flex";
body.style.flexDirection = "column";

// título
var title = document.createElement("h1");
title.setAttribute("id", "title");
title.style.textAlign = "center";
var titleText = document.createTextNode("Disappearing Circles");
title.appendChild(titleText);
body.insertAdjacentElement("afterbegin", title);

// introdução explicativa
var intro = document.createElement("div");
intro.setAttribute("id", "intro");
intro.style.display = "flex";
intro.style.flexDirection = "column";
intro.style.alignItems = "center";
intro.style.height = "50px";
var introSpan1 = document.createElement("span");
introSpan1.style.textAlign = "center";
var introText1 = document.createTextNode("Clique em um círculo para ele desaparecer.");
introSpan1.appendChild(introText1);
var introSpan2 = document.createElement("span");
introSpan2.style.textAlign = "center";
var introText2 = document.createTextNode("Ctrl + Z para todos reaparecerem.");
introSpan2.appendChild(introText2);
intro.insertAdjacentElement("beforeend", introSpan1);
intro.insertAdjacentElement("beforeend", introSpan2);
body.insertAdjacentElement("beforeend", intro);

// div do botão de criar círculos
var divButton = document.createElement("div");
divButton.setAttribute("id", "divButton");
divButton.style.display = "flex";
divButton.style.justifyContent = "center";
divButton.style.height = "50px";
divButton.style.marginBottom = "2%";
body.insertAdjacentElement("beforeend", divButton);

// botão de criar círculos
var addButton = document.createElement("button");
addButton.style.width = "30%";
var text = document.createTextNode("Clique aqui para criar um círculo");
addButton.appendChild(text);
addButton.onclick = addCircle;
divButton.insertAdjacentElement("afterbegin", addButton);

// div dos círculos
var divCircles = document.createElement("div");
divCircles.setAttribute("id", "divCircles");
divCircles.style.display = "flex";
divCircles.style.flexWrap = "wrap";
divButton.insertAdjacentElement("afterend", divCircles);

// Ctrl + Z faz todos os círculos reaparecerem
window.addEventListener("keydown", function (event) {
	if (event.defaultPrevented) {
		return; // Não faz nada se o evento já tiver sido processado
	}

	// retira o display = "none" de todos os círculos
	if (event.ctrlKey && (event.key == 'z' || event.key == 'Z')) {
		let circ = document.getElementById("circle_1");
		while (circ != null) {
			circ.style.display = "";
			circ = circ.nextSibling;
		}
	}
});