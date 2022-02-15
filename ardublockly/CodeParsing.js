//*************************************************************************
//*
//* CODE PARSING FUNCTIONS
//*
//*************************************************************************

function doInfiniteLoopErrorMessage(strFunctionName, strCode, strLastCode)
{		
	alert("INIFINITE LOOP: function '" + strFunctionName + "'\n\n" + strCode + "\n\n" + strLastCode);
	console.log("INIFINITE LOOP: function '" + strFunctionName + "'\n\n" + strCode + "\n\n" + strLastCode);
	return strCode;
}

function doErrorMessage(strMsg)
{
	alert("ERROR: " + strMsg + "\n\n" + g_strCode);
	console.log("ERROR: " + strMsg + "\n\n" + g_strCode);
	//throw new Error("ERROR: " + strMsg);
}

function doExpectingErrorMessage(strFuncName, stExpected, strFound)
{
	var strErrorMsg = strFuncName + ", expecting '" + stExpected + "' but found '" + strFound + "'!";
	
	doErrorMessage(strErrorMsg);
}

function doExpectingForErrorMessage(strFuncName, stExpected, strFound, strForFuncName)
{
	var strErrorMsg = strFuncName + ", expecting '" + stExpected + "' but found '" + strFound + "' for function '" + strForFuncName + "!";
	
	doErrorMessage(strErrorMsg);
}

function doUnexpectedErrorMessage(strFuncName, strSymbol)
{
	var strErrorMsg = strFuncName + ", unexpected symbol '" + strSymbol + "' for function '" + strForFuncName + "!";
	
	doErrorMessage(strErrorMsg);
}

function isAlpha(nCharCode)
{
	return ((nCharCode >= 97/* a */) && (nCharCode <= 122/* z */)) || ((nCharCode >= 65/* A */) && (nCharCode <= 90/* Z */)) || (nCharCode == 95/* _ */);
}

function isAlphaNumeric(nCharCode)
{				
	return isAlpha(nCharCode) || ((nCharCode >= 48/* 0 */) && (nCharCode <= 57/* 9 */));
}

function isQuote(nCharCode)
{
	return (nCharCode == 34/* " */) || (nCharCode == 39/* ' */);
}

function isNumeric(nCharCode)
{
	return ((nCharCode >= 97/* a */) && (nCharCode <= 'f')) || ((nCharCode >= 65/* A */) && (nCharCode <= 'F')) || ((nCharCode >= 48/* 0 */) && (nCharCode <= 57/* 9 */));
}

function isOperator(nCharCode)
{
	return (nCharCode == 43/* + */) || (nCharCode == 45/* - */) || (nCharCode == 42/* * */) || (nCharCode == 47/* / */) || (nCharCode == 38/* & */) || 
			(nCharCode == 124/* | */) || (nCharCode == 61/* = */) || (nCharCode == 62/* > */) || (nCharCode == 60/* < */) || (nCharCode == 37/* % */) ||
			(nCharCode == 33/* ! */);
}

function doGetNextToken(strExpecting)
{
	var strIdentifier = "", strTemp = "", strOrigCode = g_strCode;

	if ((g_strCode[0] == "\"") || (g_strCode[0] == "'"))
	{
		strIdentifier = g_strCode[0];
		g_strCode = g_strCode.substring(1);
		
		while ((g_strCode.charCodeAt(0) != 34/* " */) && (g_strCode.charCodeAt(0) != 39/* ' */))
		{
			strIdentifier += g_strCode[0];
			g_strCode = g_strCode.substring(1);
		}
		strIdentifier += g_strCode[0];
		g_strCode = g_strCode.substring(1);
	}
	else
	{
		while (isAlphaNumeric(g_strCode.charCodeAt(0)) || (g_strCode.charCodeAt(0) == 46/* . */))
		{
			strIdentifier += g_strCode[0];
			g_strCode = g_strCode.substring(1);
		}
		g_strCode = g_strCode.trim();
		if (strIdentifier == "else")
		{
			strTemp = g_strCode.substring(0, 2);
			if (strTemp == "if")
			{
				strIdentifier += " " + strTemp;
				g_strCode = g_strCode.substring(2);
			}
		}
		g_strCode = g_strCode.trim();

		if ((strExpecting != null) && !strIdentifier.includes(strExpecting))
		{
			g_strCode = strOrigCode;
			strIdentifier = "";
		}
	}
	return strIdentifier;
}

function doGetNextStringOrChar()
{
	var strValue = "";
	
	while (isAlphaNumeric(g_strCode.charCodeAt(0)) || isQuote(g_strCode.charCodeAt(0)))
	{
		strValue += g_strCode[0];
		g_strCode = g_strCode.substring(1);
	}
	g_strCode = g_strCode.trim();
	return strValue;
}

function doGetNextValue(bFloat)
{
	var strIdentifier = "";

	while (isNumeric(g_strCode.charCodeAt(0)) || (bFloat && (g_strCode.charCodeAt(0) == 46/* . */)))
	{
		strIdentifier += g_strCode[0];
		g_strCode = g_strCode.substring(1);
	}
	g_strCode = g_strCode.trim();

	return strIdentifier;
}

function doGetNextSymbol(strExpecting)
{
	var strSymbol = "";
	var strOrigCode = g_strCode;

	g_strCode = g_strCode.trim();
	if (!isAlphaNumeric(g_strCode.charCodeAt(0)))
	{
		strSymbol = g_strCode[0]
		g_strCode = g_strCode.substring(1);
		g_strCode = g_strCode.trim();
	
		if ((strSymbol == "!") || (strSymbol == ";") || (strSymbol == "(") || (strSymbol == ")") || (strSymbol == "{") || (strSymbol == "}") || 
			(strSymbol == "[") || (strSymbol == "]") || (strSymbol == "?") || (strSymbol == ".") || (strSymbol == ",") || (strSymbol == ":"))
		{
			// Do nothing
		}
		else if (strSymbol == "+")
		{
			if ((g_strCode.charCodeAt(0) == 61/* = */) || (g_strCode.charCodeAt(0) == 43/* + */))
				strSymbol += g_strCode[0];
		}
		else if (strSymbol == "-")
		{
			if ((g_strCode.charCodeAt(0) == 61/* = */) || (g_strCode.charCodeAt(0) == 45/* - */))
				strSymbol += g_strCode[0];

		}
		else if (strSymbol == "*")
		{
			if (g_strCode.charCodeAt(0) == 61/* = */)
				strSymbol += g_strCode[0];
		}
		else if (strSymbol == "/")
		{
			if (g_strCode.charCodeAt(0) == 61/* = */)
				strSymbol += g_strCode[0];
		}
		else if (strSymbol == "|")
		{
			if ((g_strCode.charCodeAt(0) == 61/* = */) || (g_strCode.charCodeAt(0) == 124/* | */))
				strSymbol += g_strCode[0];
		}
		else if (strSymbol == "&")
		{
			if ((g_strCode.charCodeAt(0) == 61/* = */) || (g_strCode.charCodeAt(0) == 38/* & */))
				strSymbol += g_strCode[0];
		}
		else if (strSymbol == "=")
		{
			if (g_strCode.charCodeAt(0) == 61/* = */)
				strSymbol += g_strCode[0];
		}
		else if (strSymbol == ">")
		{
			if ((g_strCode.charCodeAt(0) == 61/* = */) || (g_strCode.charCodeAt(0) == 62/* > */))
				strSymbol += g_strCode[0];
		}
		else if (strSymbol == "<")
		{
			if ((g_strCode.charCodeAt(0) == 61/* = */) || (g_strCode.charCodeAt(0) == 60/* < */))
				strSymbol += g_strCode[0];
		}
		else 
		{
			alert("ERROR: doGetNextSymbol, unexpected symbol '" + g_strCode[0] + "'!\n\n\n" + g_strCode);
		}
		if (strSymbol.length == 2)
		{
			g_strCode = g_strCode.substring(1);
			g_strCode = g_strCode.trim();
		}
	}
	if ((strExpecting != null) && (strSymbol != strExpecting))
	{
		g_strCode = strOrigCode;
		strSymbol = "";
	}
	return strSymbol;
}

function doParseCases()
{
	var strToken = doGetNextToken("case"), strSymbol = "", strLastCode = g_strCode;
	var arrayCases = new CCaseArray();
	var Expression = null;
	var Case = null;
	var arrayStatements = [];

	while (strToken == "case")
	{
		//g_strCode = "(" + g_strCode;
		//g_strCode = g_strCode.replace(":", "):");
		Expression = doParseExpression();
		strSymbol = doGetNextSymbol(":");
		if (strSymbol == ":")
		{
			Case = new CSwitchCase();
			arrayStatements = doParseStatements();
			Case.init(Expression, arrayStatements);
			arrayCases.add(Case);
		}
		else
		{
			doExpectionErrorMessage("doParseCases", ":", strSymbol);
		}
		strToken = doGetNextToken("case");

		if (strLastCode == g_strCode)
			strLastCode = doInfiniteLoopErrorMessage("doParseFunctionCallParams", g_strCode, strLastCode);
	}
	return arrayCases;
}

function doParseSwitch()
{
	var SwitchStatement = new CSwitchStatement();
	var Expression = doParseExpression();
	var strSymbol = doGetNextSymbol("{"), strToken = "";
	var arrayCases = [];
	var arrayDefaultStatements = [];

	SwitchStatement.setExpression(Expression);

	if (strSymbol == "{")
	{
		arrayCases = doParseCases();
		SwitchStatement.setCases(arrayCases);
		strToken = doGetNextToken();
		if (strToken == "default")
		{
			strOperator = doGetNextSymbol(":");
			arrayDefaultStatements = doParseStatements();
			SwitchStatement.setDefault(arrayDefaultStatements);
		}
		strSymbol = doGetNextSymbol();
		if (strSymbol != "}")
			doExpectingErrorMessage("doParseSwitch", "}", strSymbol);
	}
	else
	{
		doExpectingErrorMessage("doParseSwitch", "{", g_strCode[0]);
	}
	return SwitchStatement;
}

function doParseIf()
{
	var Expression = doParseExpression();
	var arrayStatements = doParseStatements();
	var IfStatement = new CIfStatement(), IfStatementPrev = null;
	var strToken = "";
	var arrayIfStack = [];
	
	IfStatement.init(Expression, arrayStatements);		
	arrayIfStack.push(IfStatement);

	do
	{
		strToken = doGetNextToken("else");			

		if (strToken == "else if")
		{			
			IfStatement = new CIfStatement();			
			Expression = doParseExpression();		
			arrayStatements = doParseStatements();		
			IfStatement.init(Expression, arrayStatements);
			IfStatement.setKindOf("ELSE IF");				
			arrayIfStack.push(IfStatement);			
		}
		else if (strToken == "else")
		{			
			IfStatement = new CIfStatement();			
			arrayStatements = doParseStatements();			
			IfStatement.init(null, arrayStatements);
			IfStatement.setKindOf("ELSE");						
			arrayIfStack.push(IfStatement);			
		}
		else
			break;
	}
	while ((strToken == "else if") || (strToken == "else"));	

	while (arrayIfStack.length > 0)
	{
		IfStatement = arrayIfStack.pop();
		IfStatementPrev = arrayIfStack.pop();
		if (IfStatementPrev != null)
		{
			IfStatementPrev.setNext(IfStatement);
			arrayIfStack.push(IfStatementPrev);
		}
	}
	return IfStatement;
}

function doParseWhile()
{
	var Expression = doParseExpression();
	var arrayStatements = []
	var WhileStatement = new CWhileStatement();

	if (g_strCode.charCodeAt(0) == 123) // {
	{
		arrayStatements = doParseStatements();
	}
	else
	{
		arrayStatements.push(doParseStatement());
		doGetNextSymbol(); // Consume the terminating ;
	}	
	WhileStatement.init(Expression, arrayStatements);
	
	return WhileStatement;
}

function doParseRepeat()
{
	var RepeatStatement = new CRepeatStatement();
	var arrayStatements = doParseStatements();
	var strUntil = doGetNextToken();
	var Expression = null;

	if (strUntil == "until")
	{
		Expression = doParseExpression();
		RepeatStatement.init(Expression, arrayStatements);
		doGetNextSymbol(); // Consume the terminating ; or }
	}
	else
	{
		alert("ERROR: doParseRepeat, 'until' expected but found '" + strUntil + "'!");
	}
	return RepeatStatement;
}

function doParseFor()
{
	// break
}

function getInitValue(strType)
{
	var strValue = "";
	
	if (strType == "String")
		strValue = "";
	else if (strType == 'float')
		strValue = "0.0";
	else if ((strType == "boolean") || (strType == "bool"))
		strValue = "false";
	else
		strValue = "0";
		
	return strValue;
}

function doParseFunctionParams(strFuncName)
{	
	var arrayParams = new CVariableArray();
	var Variable = new CVariable();
	var strType = "", strName = "", strLastCode = g_strCode, strSymbol = doGetNextSymbol("(");

	if (strSymbol == "(")
	{
		do
		{
			strType = doGetNextToken();
			strName = doGetNextToken();
			
			if ((strType != "") && (strName != ""))
			{
				Variable.init(strName, strType, getInitValue(strType));
				arrayParams.add(Variable);
			
				if (strLastCode == g_strCode)
					strLastCode = doInfiniteLoopErrorMessage("doParseFunctionParams", g_strCode, strLastCode);
			}
		}
		while ((strType != "") && (strName != ""));
		
		strSymbol = doGetNextSymbol(); // Consume the closing )
	}
	else
		doExpectingForErrorMessage("doParseFunctionParams", "(", strSymbol, strFuncName);
	
	return arrayParams;
}

function doGetArduinoFunctionParamType(strFuncName, nParamNum)
{
	var strType = "";

	if (strFuncName == "Serial.begin")
	{
		if (nParamNum == 0)
			strType = "int";
		else
			doErrorMessage("doGetArduinoFunctionParamType, parameter '" + nParamNum + "' not expected for function '" + strFuncName + "'!");
	}
	else if ((strFuncName == "Serial.print") || (strFuncName == "Serial.println"))
	{
		if (nParamNum == 0)
			strType = "void";
		else if (nParamNum == 1)
			strType = "int";
		else
			doErrorMessage("doGetArduinoFunctionParamType, parameter '" + nParamNum + "' not expected for function '" + strFuncName + "'!");
	}
	else if ((strFuncName == "digitalWrite") || (strFuncName == "analogWrite"))
	{
		if (nParamNum == 0)
			strType = "int";
		else if (nParamNum == 1)
			strType = "int";
		else
			doErrorMessage("doGetArduinoFunctionParamType, parameter '" + nParamNum + "' not expected for function '" + strFuncName + "'!");
	}
	else if ((strFuncName == "digitalRead") || (strFuncName == "analogRead"))
	{
		if (nParamNum == 0)
			strType = "int";
		else
			doErrorMessage("doGetArduinoFunctionParamType, parameter '" + nParamNum + "' not expected for function '" + strFuncName + "'!");
	}
	else if (strFuncName == "delay")
	{
		if (nParamNum == 0)
			strType = "int";
		else
			doErrorMessage("doGetArduinoFunctionParamType, parameter '" + nParamNum + "' not expected for function '" + strFuncName + "'!");
	}
	else if (strFuncName == "pinMode")
	{
		if (nParamNum == 0)
			strType = "int";
		else if (nParamNum == 1)
			strType = "int";
		else
			doErrorMessage("doGetArduinoFunctionParamType, parameter '" + nParamNum + "' not expected for function '" + strFuncName + "'!");
	}
	else
	{
		doErrorMessage("doGetArduinoFunctionParamType, no type available for function '" + strFuncName + "', parameter " + nParamNum + "!");
	}
	return strType;
}

function doGetFunctionCallParamType(strFunctionName, nParamNum)
{
	var Function = g_arrayFunctions.find(strFunctionName);
	var Param = null;
	var strType = "";
	
	if (Function != null)
	{
		Param = Function.getParam(nParamNum);
		if (Param != null)
		{
			strType = Param.getType();
		}
		else
		{
			doErrorMessage("doGetFunctionCallParamType, function '" + strFunctionName + "' does not have " + nParamNum + " parameters!");
		}
	}
	else if (isArduinoFunctionCall(strFunctionName))
	{
		strType = doGetArduinoFunctionParamType(strFunctionName, nParamNum);
	}
	else
	{
		doErrorMessage("doGetFunctionCallParamType, function '" + strFunctionName + "' was not found!");
	}
	return strType;
}

function doParseFunctionCallParams(strFuncName)
{	
	var arrayParams = new CVariableArray();
	var Variable = new CVariable();
	var strType = "", strName = "", strLastCode = g_strCode, strSymbol = doGetNextSymbol("(");
	var nParamNum = 0;

	if (strSymbol == "(")
	{
		do
		{
			strName = doGetNextToken();

			if (strName != "")
			{
				strType = doGetFunctionCallParamType(strFuncName, nParamNum);
				Variable.init(strName, strType, getInitValue(strType));
				arrayParams.add(Variable);

				if (strLastCode == g_strCode)
					strLastCode = doInfiniteLoopErrorMessage("doParseFunctionCallParams", g_strCode, strLastCode);

				nParamNum++;
			}
		}
		while (strName != "");
			
		doGetNextSymbol(); // Consume the closing )
	}
	else
		doExpectingForErrorMessage("doParseFunctionCallParams", "(", strSymbol, strFuncName);

	return arrayParams;
}

function isGlobalVariable(strName)
{
	return g_arrayGlobalVariables.indexOf(strName) > -1;
}

function isFunctionCall(strName)
{
	return isArduinoFunctionCall(strName) || (g_arrayFunctions.indexOf(strName) > -1);
}

function isArduinoConst(strName)
{
	return (strName == "HIGH") || (strName == "LOW") || (strName == "DEC") || (strName == "HEX") || (strName == "BIN");
}

function isString(strToken)
{
	return strToken.includes("\"");
}

function isCharacter(strToken)
{
	return strToken.includes("\'");
}

function isNumber(strToken)
{
	var Number = null;
	
	if (strToken.includes("."))
		Number = parseFloat(strToken);
	else
		Number = parseInt(strToken);

	return !isNaN(Number);
}

function getLiteralType(strLiteral)
{
	var strType = "";
	
	if (strLiteral.includes("\""))
		strType = "String";
	else if (strLiteral.includes("'"))
		strType = "char";
	else if (strLiteral.includes("."))
		strType = "float";
	else if (strLiteral.includes("true") || strLiteral.includes("false"))
		strType = "boolean";
	else 
		strType = "int";
	
	return strType;
}

function doParseArduinoFunctionCall(strFuncName)
{
	var FuncCall = new CFunctionCall();
	var Variable = new CVariable();
	var nParamNum = 0;
	var strType = "", strVal = "", strLastCode = g_strCode, strSymbol = doGetNextSymbol();
	var GlobalVar = null;
	
	FuncCall.init(strFuncName);
	
	if (strSymbol == "(")
	{
		do
		{
			strParam = doGetNextToken();
			if (strParam != "")
			{
				GlobalVar = g_arrayGlobalVariables.find(strParam);

				if (GlobalVar != null)
				{
					if (GlobalVar != null)
						Variable.init(GlobalVar.getName(), GlobalVar.getType(), GlobalVar.getValue());
					else	
						doErrorMessage("doParseArduinoFunctionCall, cannot find global variable '" + strParam + ",!");
				}
				else if (isArduinoConst(strParam))
				{	
					strType = doGetArduinoFunctionParamType(strFuncName, nParamNum);
					strVal = strParam;	
					Variable.init("strParam" + nParamNum.toString(), strType, strVal);
				}
				else // Must be a literal value
				{
					strType = getLiteralType(strParam);
					Variable = new CLiteral();
					Variable.init(strType, strParam);
				}
				FuncCall.addParameter(Variable);
				
				if (strLastCode == g_strCode)
					strLastCode = doInfiniteLoopErrorMessage("doParseArduinoFunctionCall", g_strCode, strLastCode);
			}
		}
		while (strParam != "");

		strSymbol = doGetNextSymbol(")"); // Consume the closing )
		strSymbol = doGetNextSymbol(";"); // Consume any terminating ;
	}
	else
		doExpectingForErrorMessage("doParseArduinoFunctionCall", "(", g_strCode[0], strFuncName);
	
	return FuncCall;
}

function doParseFunctionCall(strFuncName)
{			
	var FuncCall = new CFunctionCall();
	var arrayParams = new CVariableArray();
	var nI = 0;
	var Function = g_arrayFunctions.find(strFuncName);
	var Variable = null;
	var Literal = new CLiteral();
	var strLastCode = g_strCode;

	FuncCall.init(strFuncName);
	
	if (g_strCode.charCodeAt(0) == 40/*(*/)
	{
		g_strCode = g_strCode.substring(1); // Consume the (
		
		while (g_strCode.charCodeAt(0) != 41/*)*/)
		{
			strParam = doGetNextToken();
			Variable = g_arrayGlobalVariables.find(strParam);
			
			if (Variable != null)
				FuncCall.addParam(Variable);
			else
			{
				Variable = Function.findParam(nI);
				if (Variable != null)
					Literal.init(Variable.getType(), strParam);
				else
					doErrorMessage("doParseFunctionCall, parameter '" + nI + "' for function '" + strFuncName + "' is null!");
			}
			nI++
			if (strLastCode == g_strCode)
				strLastCode = doInfiniteLoopErrorMessage("doParseFunctionCall", g_strCode, strLastCode);
		}
	}
	else
		doExpectingForErrorMessage("doParseFunctionCall", "(", g_strCode[0], strFuncName);
		
	doGetNextSymbol(); // Consume the terminating ;

	return FuncCall;
}

function doGetExpressionArg()
{
	var strToken = "", strOperator = "";
	var Arg = null;
	var arrayParams = null;
	
	if (g_strCode.length > 0)
	{
		if (g_strCode.charCodeAt(0) == 33/*!*/)
			strOperator = doGetNextSymbol();
		
		if (isQuote(g_strCode.charCodeAt(0)))
			strToken = doGetNextStringOrChar();
		else
			strToken = doGetNextToken();

		if (isArduinoConst(strToken))
		{
			Arg = new CLiteral();
			Arg.init(getLiteralType(strToken), strToken);
		}
		else if (isNumber(strToken))
		{					
			Arg = new CLiteral()
			Arg.init("int", strToken);
		}
		else if (isString(strToken))
		{
			Arg = new CLiteral()
			Arg.init("string", strToken);
		}
		else if (isCharacter(strToken))
		{
			Arg = new CLiteral()
			Arg.init("char", strToken);
		}
		else if (isGlobalVariable(strToken))
		{
			Arg = g_arrayGlobalVariables.find(strToken);
		}
		else if (isArduinoFunctionCall(strToken) || isFunctionCall(strToken))
		{
			Arg = new CFunctionCall();
			Arg.init(strToken);
			arrayParams = doParseFunctionCallParams(strToken);
			Arg.setParameters(arrayParams);
		}
		else
		{
			doErrorMessage("doGetExpressionArg, unknown token '" + strToken + "'!\n\n\n" + g_strCode);
		}
		if (strOperator == "!")
		{
			var Expression = new CExpression();
			Expression.init(null, Arg, strOperator);
			Arg = Expression;
		}
	}
	return Arg;
}

function doGetExpression()
{
	var nI = 0;
	var strExpression = "";

	while ((g_strCode.charCodeAt(nI) == 40/* ( */) || (g_strCode.charCodeAt(nI) == 41/* ) */)|| (g_strCode.charCodeAt(nI) == 46/* . */) || 
		   (g_strCode.charCodeAt(nI) == 33/* ! */) || (g_strCode.charCodeAt(nI) == 39/* ' */) || (g_strCode.charCodeAt(nI) == 34/* " */) || 
			isAlphaNumeric(g_strCode.charCodeAt(nI)) || isOperator(g_strCode.charCodeAt(nI)))
	{
		if ((g_strCode.charCodeAt(nI - 1) == 41/* ) */) && isAlphaNumeric(g_strCode.charCodeAt(nI)))
		{
			break;
		}
		nI++;
	}
	strExpression = g_strCode.substring(0, nI);
	
	if (g_strCode.charCodeAt(0) == 41/*)*/)
	{
		strExpression += g_strCode[0];
		g_strCode = g_strCode.substring(1);
	}
	return strExpression;
}

function doAssertNotNull(Value, nLineNumber, strFuncName, strVarName)
{
	if (Value === null)
		doErrorMessage(strFuncName + ", line " + nLineNum + ", '" + strVarName + "' cannot be null!\n\n\n" + g_strCode);
}

function doAssertNotEmpty(strValue, nLineNumber, strFuncName, strVarName)
{
	if (strValue.length == 0)
		doErrorMessage(strFuncName + ", line " + nLineNum + ", '" + strVarName + "' cannot be empty!\n\n\n" + g_strCode);
}
			
function doParseExpression()
{
	var Expression = null, Arg = null;
	var strOperator = "", strExpression = "", strOrigCode = "", strLastCode = "";
	var arrayExpressionStack = [];
	var nState = 0, nNone = 0, nArg1 = 1, nArg2 = 2, nOperator = 3;

	strExpression = doGetExpression();						
	g_strCode = g_strCode.substring(strExpression.length);

	// All because javascript does not allow you to return values through function parameters
	strOrigCode = g_strCode;
	g_strCode = strExpression;	
	strLastCode = g_strCode;
	Expression = null;	
	
	while (g_strCode.length > 0)
	{
				
		if (g_strCode.charCodeAt(0) == 40) // (
		{								
			doGetNextSymbol(); // Consume the open (
			arrayExpressionStack.push(new CExpression());
		}
		else if (isAlphaNumeric(g_strCode.charCodeAt(0)) || isQuote(g_strCode.charCodeAt(0)))
		{								
			Arg = doGetExpressionArg();
			doAssertNotNull(Arg, 702, "doParseExpression", "Arg");								
			Expression = arrayExpressionStack.pop();
			if (Expression == null)
				Expression = new CExpression();
					
			if (Expression.isEmpty())
			{
				nState = nArg1;
				Expression.setArg1(Arg);
			}
			else
			{
				nState = nArg2;
				Expression.setArg2(Arg);
			}
			arrayExpressionStack.push(Expression);											
		}
		else if (((g_strCode.charCodeAt(0) == 45 /* - */) || (g_strCode.charCodeAt(0) == 43 /* + */)) && ((nState == nNone) || (nState == nOperator)))
		{
			// E.G. -nSensorValue
			// E.G. X > -nSensorValue
			strOperator = doGetNextSymbol();
			Expression = new CExpression();
			Arg = doGetExpressionArg();
			Expression.init(null, Arg, strOperator);
			Arg = Expression;
			Expression = arrayExpressionStack.pop();
			if (Expression== null)
				Expression = new CExpression();
			if (Expression.isEmpty())
				Expression.setArg1(Arg);
			else
				Expression.setArg2(Arg);
			arrayExpressionStack.push(Expression);
		}
		else if (g_strCode.charCodeAt(0) == 33 /* ! */)
		{
			strOperator = doGetNextSymbol();
			doAssertNotEmpty(strOperator, 718, "doParseExpression", "strOperator");
			Arg = doGetExpressionArg();
			Expression = new CExpression();
			Expression.setArg2(Arg);
			Expression.setOperator("!");
			Arg = Expression;
			
			Expression = arrayExpressionStack.pop();
			if (Expression == null)
				Expression = new CExpression();
			
			if (Expression.isEmpty())
				Expression.setArg1(Arg);
			else
				Expression.setArg2(Arg);
			arrayExpressionStack.push(Expression);
		}
		else if (isOperator(g_strCode.charCodeAt(0)))
		{
			strOperator = doGetNextSymbol();
			doAssertNotEmpty(strOperator, 718, "doParseExpression", "strOperator");

			Expression = arrayExpressionStack.pop();
			doAssertNotNull(Expression, 721, "doParseExpression", "Expression");
			
			if (!Expression.isComplete())
			{
				Expression.setOperator(strOperator);
				arrayExpressionStack.push(Expression);
			}
			else
			{
				Arg = Expression;
				Expression = new CExpression();
				Expression.setArg1(Arg);
				Expression.setOperator(strOperator);
				arrayExpressionStack.push(Expression);
			}
			nState = nOperator;
		}
		else if (g_strCode.charCodeAt(0) == 41) // )
		{		
			doGetNextSymbol(); // Consume the closing )
			
			Arg = arrayExpressionStack.pop();
			doAssertNotNull(Arg, 732, "doParseExpression", "Arg");		
			Expression = arrayExpressionStack.pop();
			if (Expression == null)
				Expression = Arg;
			else
			{
				if (Expression.isEmpty())
					Expression.setArg1(Arg);
				else
					Expression.setArg2(Arg);
			}
			arrayExpressionStack.push(Expression);
		}
		else
		{
			doUnexpectedErrorMessage("doParseExpression", g_strCode[0])
		}
		if (strLastCode == g_strCode)
			strLastCode = doInfiniteLoopErrorMessage("doParseExpression", g_strCode, strLastCode);
	}
	Expression = arrayExpressionStack.pop();
	
	// All because javascript does not allow you to return values through function parameters
	g_strCode = strOrigCode;

	return Expression;	
}

function doParseVariableStatement(strVarName)
{
	var Statement = new CVariableStatement();
	var	strOperator = doGetNextSymbol();
	var	Expression = new CExpression();
	var Const1 = new CLiteral();

	if (strOperator == "--")
	{
		Const1.init("int", 1);
		Expression.init(strVarName, Const1, "-");
		strOperator = "=";
	}
	else if (strOperator == "++")
	{
		Const1.init("int", 1);
		Expression.init(strVarName, Const1, "-");
		strOperator = "=";
	}
	else
	{
		Expression = doParseExpression();
	}
	Statement.init(strVarName, strOperator, Expression);		
	strOperator = doGetNextSymbol(); // Consume the terminating ;				
	
	return Statement;
}

function doParseBreak()
{
	var Break = new CBreak();
	var strSymbol = doGetNextSymbol(";");
	
	if (strSymbol != ";")
		doExpectingErrorMessage("doParseBreak", ";", strSymbol);
	
	return Break;
}

function doParseStatement()
{
	var Statement = new CVariableStatement();
	var strToken = doGetNextToken();
	var arrayParams = null;

	if (strToken == "Serial")
	{
		if (g_strCode.charCodeAt(0) == 46/*.*/) 
		{
			strToken += g_strCode[0]
			g_strCode = g_strCode.substring(1);
			g_strCode = g_strCode.trim();
			strToken += doGetNextToken();			
		}
		else
			doExpectingErrorMessage("doParseStatement", ".", g_strCode[0]);
	}
	if (strToken == "switch")
	{
		Statement = doParseSwitch();
	}
	else if (strToken == "if")
	{
		Statement = doParseIf();
	}
	else if (strToken == "while")
	{
		Statement = doParseWhile();
	}
	else if (strToken == "repeat")
	{
		Statement = doParseRepeat();
	}
	else if (strToken == "for")
	{
		Statement = doParseFor();
	}
	else if (strToken == "break")
	{
		Statement = doParseBreak();
	}
	else if (isArduinoFunctionCall(strToken))
	{
		Statement = doParseArduinoFunctionCall(strToken);
	}
	else if (isFunctionCall(strToken))
	{
		Statement = doParseFunctionCall(strToken);
		
	}
	else if (isGlobalVariable(strToken))
	{
		Statement = doParseVariableStatement(strToken);
	}
	else
	{
		doErrorMessage("doParseStatement, unknown identifier '" + g_strCode[0] + "'!\n\n\n" + g_strCode);
	}
	return Statement;
}

function doParseStatements()
{
	var arrayStatements = new CStatementArray();
	var Statement = null;
	var strSymbol = doGetNextSymbol("{"), strLastCode = g_strCode;

	if (strSymbol == "{")
	{	
		while (strSymbol != "}")
		{
			strSymbol = doGetNextSymbol("}");
			if (strSymbol != "}")
			{
				Statement = doParseStatement();	
				arrayStatements.add(Statement);
			}
			if (strLastCode == g_strCode)
				strLastCode = doInfiniteLoopErrorMessage("doParseStatements", g_strCode, strLastCode);
		}				
	}
	else
	{
		Statement = doParseStatement();
		arrayStatements.add(Statement);					
		doGetNextSymbol(); // Consume the closing ;					
	}
	return arrayStatements;
}

function doParseFunction(strName, strReturnType)
{
	// E.G. char doSomething(char cParam, int nParam) { };				
	var Function = new CFunction();
	var arrayParams = doParseFunctionParams(strName);
	var arrayStatements = doParseStatements();

	Function.init(strName, strReturnType, arrayParams, arrayStatements);
	
	return Function;
}

function doParseVariable(strName, strType)
{
	var strSymbol = doGetNextSymbol();
	var strValue = doGetNextValue(strType == "float");
	var Variable = new CVariable();		

	strSymbol = doGetNextSymbol(); // Consume the semi colon				
	Variable.init(strName, strType, strValue);
	
	return Variable;
}

function isFunction()
{
	// E.G. char doSomething(char cParam, int nParam) { };
	var nI = 0;
	
	while (isAlphaNumeric(g_strCode.charCodeAt(nI)))
	{
		nI++;
		g_strCode = g_strCode.trim();
	}
	return g_strCode.charCodeAt(nI) == '(';
}

function doParse()
{
	var strIdentifier1 = "", strIdentifier2 = "", strLastCode = g_strCode;
	var nI = 0;
	var Variable = null, Function = null;

	while (g_strCode.length > 0)
	{		
		if (isAlphaNumeric(g_strCode.charCodeAt(0)))
		{
			strIdentifier1 = doGetNextToken();

			if ((strIdentifier1 == 'char') || (strIdentifier1 == 'float') || (strIdentifier1 == 'int') || (strIdentifier1 == 'long') || 
					 (strIdentifier1 == 'byte') || (strIdentifier1 == 'uint8_t') || (strIdentifier1 == 'int8_t') || (strIdentifier1 == 'uint16_t') || 
					 (strIdentifier1 == 'int16_t') || (strIdentifier1 == 'uint32_t') || (strIdentifier1 == 'int32_t') || (strIdentifier1 == 'void')) 
			{
				strIdentifier2 = doGetNextToken();			

				if (strIdentifier2 == "setup")
					g_SetupFunc = doParseFunction("setup", "void");
				else if (strIdentifier2 == "loop")
					g_LoopFunc = doParseFunction("loop", "void");
				else if (isFunction())
				{
					Function = doParseFunction(strIdentifier2, strIdentifier1);
					g_arrayFunctions.add(Function);
				}
				else
				{
					Variable = doParseVariable(strIdentifier2, strIdentifier1);
					g_arrayGlobalVariables.add(Variable);
				}
			}
			if (strLastCode == g_strCode)
				strLastCode = doInfiniteLoopErrorMessage("doParse", g_strCode, strLastCode);
		}

	}
}

function doReproduceCode()
{
	var strText = "";

	strText += g_arrayGlobalVariables.toString("<br>", "") + "<br>";
	strText += g_arrayFunctions.toString("<br>", "") + "<br>";
	strText += g_SetupFunc.toString("<br>", "") + "<br>";
	strText += g_LoopFunc.toString("<br>", "") + "<br><br><br><br>";
	
	return strText;
}




//*************************************************************************
//*
//* GLOBAL VARIBALES
//*
//*************************************************************************

var g_arrayFunctions = new CFunctionArray();
var g_SetupFunc = null, g_LoopFunc = null;
var g_arrayGlobalVariables = new CVariableArray();
