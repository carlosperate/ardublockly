// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored) {
  return '<div style="display: none"><span id="subtitle">un entorn visual de programació</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">Veure el codi JavaScript generat.</span><span id="linkTooltip">Desa i enllaça als blocs.</span><span id="runTooltip">Executa el programa definit pels blocs de l\'àrea \\nde treball. </span><span id="runProgram">Executa el programa</span><span id="resetProgram">Reinicialitza</span><span id="dialogOk">D\'acord</span><span id="dialogCancel">Cancel·la</span><span id="catLogic">Lògica</span><span id="catLoops">Bucles</span><span id="catMath">Matemàtiques</span><span id="catText">Text</span><span id="catLists">Llistes</span><span id="catColour">Color</span><span id="catVariables">Variables</span><span id="catProcedures">Procediments</span><span id="httpRequestError">Hi ha hagut un problema amb la sol·licitud.</span><span id="linkAlert">Comparteix els teus blocs amb aquest enllaç: %1</span><span id="hashError">Ho sentim, \'%1\' no es correspon amb cap fitxer desat de Blockly.</span><span id="xmlError">No s\'ha pogut carregar el teu fitxer desat.  Potser va ser creat amb una versió diferent de Blockly?</span><span id="listVariable">llista</span><span id="textVariable">text</span></div>';
};


apps.dialog = function(opt_data, opt_ignored) {
  return '<div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.codeDialog = function(opt_data, opt_ignored) {
  return '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null) + '</div>';
};


apps.storageDialog = function(opt_data, opt_ignored) {
  return '<div id="dialogStorage" class="dialogHiddenContent"><div id="containerStorage"></div>' + apps.ok(null) + '</div>';
};


apps.ok = function(opt_data, opt_ignored) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">D\'acord</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof appsIndex == 'undefined') { var appsIndex = {}; }


appsIndex.messages = function(opt_data, opt_ignored) {
  return apps.messages(null) + '<div style="display: none"><span id="indexTitle">Aplicacions Blockly</ span><span id="indexFooter">Blockly és gratis i de codi font lliure. Per contribuir amb codi o amb traduccions a Blockly, o per usar Blockly en la vostra app, visiteu %1.<span></div>';
};


appsIndex.start = function(opt_data, opt_ignored) {
  return appsIndex.messages(null) + '<table><tr><td><h1><span id="title">Aplicacions Blockly</span></h1></td><td class="farSide"><select id="languageMenu"></select></td></tr><tr><td>Blockly és un entorn de programació gràfic. A continuació trobareu algunes aplicacions que usen Blockly.</td></tr></table><table><tr><td><a href="puzzle/index.html"><img src="index/puzzle.png" height=80 width=100></a></td><td><div><a href="puzzle/index.html">Trencaclosques</a></div><div>Apreneu a usar la interfície de Blockly.</div></td></tr><tr><td><a href="maze/index.html"><img src="index/maze.png" height=80 width=100></a></td><td><div><a href="maze/index.html">Laberint</a></div><div>Useu Blockly per resoldre un laberint.</div></td></tr><tr><td><a href="turtle/index.html"><img src="index/turtle.png" height=80 width=100></a></td><td><div><a href="turtle/index.html">Gràfiques tortuga</a></div><div>Useu Blockly per dibuixar.</div></td></tr><tr><td><a href="graph/index.html"><img src="index/graph.png" height=80 width=100></a></td><td><div><a href="graph/index.html">Calculadora gràfica</a></div><div>Funcions de dibuix amb Blockly.</div></td></tr><tr><td><a href="code/index.html"><img src="index/code.png" height=80 width=100></a></td><td><div><a href="code/index.html">Codi</a></div><div>Exporteu un programa Blockly a JavaScript, Python o XML.</div></td></tr><tr><td><a href="plane/index.html"><img src="index/plane.png" height=80 width=100></a></td><td><div><a href="plane/index.html">Calculadora de seients d\'avió</a></div><div>Resoldre un problema matemàtic amb una o dues variables.</div></td></tr><tr><td><a href="blockfactory/index.html"><img src="index/blockfactory.png" height=80 width=100></a></td><td><div><a href="blockfactory/index.html">Fàbrica de blocs</a></div><div>Construir blocs personalitzats usant Blockly.</div></td></tr></table><p><span id="footer_prefix"></span><a href="http://blockly.googlecode.com/">blockly.googlecode.com</a><span id="footer_suffix"></span>';
};
