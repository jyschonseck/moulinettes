// JavaScript Document
var textDebut = "<span data-caract='0' data-debut='8.54' data-fin='10.42' > - Emmanuelle Canut, bonjour.<br>- Bonjour.</span><br><span data-caract='39' data-debut='10.42' data-fin='18.56' >- Vous êtes professeure en sciences du langage et spécialiste dans l'acquisition et l'apprentissage des langues, et à ce propos j'ai une petite question : comment est-ce qu'on apprend à parler ?<br></span><span data-caract='231' data-debut='19.1' data-fin='28.98' >- En général on a tous plus ou moins un avis sur cette question, qu'on soit parent, éducateur, enseignant, on pense savoir effectivement comment les enfants apprennent à parler.</span><span data-caract='406' data-debut='28.99' data-fin='32.04' > En général, on dit qu'ils apprennent à parler en répétant et imitant ce qu'ils entendent.</span><span data-caract='495' data-debut='32.53' data-fin='34.08' > C'est un petit peu plus complexe que ça.</span>";

var txt2Sauv = "";

function addId(){
    var parser, xmlDoc ;
    var txtSortie = "";
    var txtEntree ="<document>"+ document.getElementById("txtEntree").value+"</document>";
    txtEntree= txtEntree.replace(/<br>/g , "-br-");
    console.log ("ENTREE"  + txtEntree);
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(txtEntree,"text/xml");
    console.log("LONGUEUR : " + xmlDoc.getElementsByTagName("span").length);
    for (var i = 0 ; i < xmlDoc.getElementsByTagName("span").length ; i++){
        var temp = xmlDoc.getElementsByTagName("span")[i];
        txtSortie += "<span id=\"span_" + i + "\" data-debut=\"" + temp.getAttribute("data-debut") + "\"";
        txtSortie += " data-fin=\"" + temp.getAttribute("data-fin") + "\">" + temp.childNodes[0].nodeValue;
        txtSortie += "</span>"+ "\n" ;
    }
    document.getElementById("txtSortie").value = txtSortie.replace(/-br-/g , "<br>");
    document.getElementById("txtNomFichier").innerHTML += " <strong>rajout id  : OK</strong>";
}