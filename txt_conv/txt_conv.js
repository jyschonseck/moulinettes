// JavaScript Document

function convTxtCsv(){
	
	var blocTxt = $("#txtEntree").val().split("\n");
	var sortie = "";
	console.log("1- " + blocTxt.length );
	for (i = 0 ; i < blocTxt.length ; i++){
		var ligne = blocTxt[i].split(",");
		console.log("2-" + i + " -- " + ligne.length )
		if (ligne.length === 1){
			sortie += ",,"+ligne[0] +"\n";
		} else if (ligne.length === 2){
			sortie += "," +ligne[0] + ","+ligne[1]+"\n";
		} else if (ligne.length === 3){
			sortie += ligne[0] + "," +ligne[1] + ","+ligne[2]+"\n";
		} 
	}
	$("#txtSortie").val(sortie);
}