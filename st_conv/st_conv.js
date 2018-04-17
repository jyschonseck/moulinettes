// JavaScript Document
var textDebut = "1\n00:00:00,280 --> 00:00:04,300\nLaurent Sparrow, vous qui êtes spécialiste en psychologie cognitive,\n\n2\n00:00:04,300 --> 00:00:07,500\nde votre point de vue, pourquoi les humains parlent-il ?\n\n3\n00:00:07,700 --> 00:00:12,220\nles humains parlent-ils ?\nDonc je vais commencer à répondre à cette question d’abord\n\n4\n00:00:12,220 --> 00:00:14,220\nen expliquant ce que c’est que parler.\n\n5\n00:00:14,440 --> 00:00:18,300\nParler c’est émettre des sons, mais des sons très particuliers,\n\n6\n00:00:18,400 --> 00:00:22,380\nÇa nécessite d’abord de savoir contrôler très finement sa respiration.";
var txt2Sauv = "";

function convSrtVtt(){
	"use strict";
	var blocST = $("#txtEntree").val().split("\r\n\r\n");
	console.log(blocST.length);
	var txtVTT = "WEBVTT \nKind: captions\n\n";
	for (var i = 0 ; i < blocST.length ; i++){
		var ligneS = blocST[i].split("\n");//split("\r\n") voir suivant source ...
		
		console.log(ligneS.length);
		for (var j = 1 ; j < ligneS.length ; j++){
			txtVTT += ligneS[j] ;
			txtVTT += "\n";
		}
		txtVTT += "\n";
	}
	/// virer les séparation virgule ..
	var re = /:([0-9]{2}),([0-9]{3})/g;
	document.getElementById("txtSortie").value =  txtVTT.replace(re , ":$1.$2");
}

function convSrtHtml(){
	"use strict";
	$("#ctnSortie").html("");
	var blocST = $("#txtEntree").val().split("\n\n");//split("\r\n\r\n");
	//console.log(blocST.length);
	var spanInd = 0;
	var elt = document.createElement("div");
	elt.id = "ctnST_" + spanInd;
	elt.className = "ctnST";
	console.log("longueur = " + blocST.length);
	for (var i = 0 ; i < blocST.length ; i ++ ){
		console.log("i = " + i );
		//elt.innerHTML = blocST[i];
		var ligneS =blocST[i].split("\n");
		if ( elt.childNodes.length === 0){
			var tIn = document.createElement("p");
			tIn.innerText = ligneS[1].split(" --> ")[0];
			elt.appendChild(tIn);
		}
		//ajoute toutes les ligne du ST au segment 
		for (var j = 2 ; j < ligneS.length ; j ++){
			var elt1 = document.createElement("span");
			elt1.innerHTML = " " + ligneS[j];
			elt.appendChild(elt1);
			
		}
		if (elt.innerText.endsWith("?") || elt.innerText.endsWith(".") ){
			//mettre le point de sortie 
			var tOut = document.createElement("p");
			tOut.innerText = ligneS[1].split(" --> ")[1];
			elt.appendChild(tOut);
			document.getElementById("ctnSortie").appendChild(elt);
			spanInd += 1;
			elt = document.createElement("div");
			elt.id = "ctnST_" + spanInd;
			elt.className = "ctnST";
			//mettre le point d'entrée
			//var tIn = document.createElement("p");
			//tIn.innerText = "123";
			//elt.appendChild(tIn);
		}
	}
	//ajout du bouton d'export
	var btnElt = document.createElement("button");
	btnElt.innerText = "exporter le text";
	btnElt.onclick = btnExportTrans;
	document.getElementById("ctnSortie").appendChild(btnElt);
}

function btnExportTrans(){
	"use strict";
	txt2Sauv = "";
	var ctnSortie = document.getElementById("ctnSortie").childNodes;
	var caractPasset = 0
	for (var i = 0 ; i < ctnSortie.length - 1  ; i++){// -1 car bouton exporter :/
		console.log ("boucle segment " + i );
		var texte = "";
		var segmentDernier =ctnSortie[i].childNodes.length - 1;
		for (var j = 1 ; j < ( segmentDernier) ; j++){
			texte += ctnSortie[i].childNodes[j].innerText;
		}
		txt2Sauv += "<span data-caract=\""+caractPasset+"\" data-debut=\"" + tcVersSec(ctnSortie[i].childNodes[0].innerText) + "\" data-fin=\"" + tcVersSec(ctnSortie[i].childNodes[segmentDernier].innerText) + "\" >";
		txt2Sauv += " " + texte;
		caractPasset += texte.length;
		txt2Sauv += "</span>";
	}
	
	$( "#ctnPopupSauveFichier" ).dialog("open");
}

function convSrtTxt(){
	"use strict";
	//vider #ctnSortie et remettre textarea
	$("#ctnSortie").html("");
	var elt = document.createElement("textArea");
	elt.id = "txtSortie";
	document.getElementById("ctnSortie").appendChild(elt);
		
	var blocST = $("#txtEntree").val().split("\n\n");
	for (var i = 0 ; i < blocST.length ; i++){
		var ligneS = blocST[i].split("\n");//split("\r\n") voir suivant source ...
		
		console.log(ligneS.length);
		for (var j = 2 ; j < ligneS.length ; j++){
			document.getElementById("txtSortie").value  += " " + ligneS[j] ;
		}
	}
}


function tcVersSec(tc){
	"use strict";
	var sortie="0.00";
	var minute =  parseInt(tc.substring (3 , 5)) * 60;
	var tsec = parseInt(tc.substring (6 , 8));
	var tmsec = parseInt(tc.substring (9 , 12))*0.001;
	console.log ( tc+ " --> " + minute + " / " + tsec + " / " + tmsec);
	sortie = minute + tsec + tmsec;
	return sortie;
}