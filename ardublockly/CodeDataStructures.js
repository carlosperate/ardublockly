//*************************************************************************
//*
//* CODE CLASSES
//*
//*************************************************************************

var g_strIndent = "&nbsp&nbsp&nbsp&nbsp";

class CLiteral
{
	constructor()
	{
		this.m_strType = "";
		this.m_strValue = "";
		this.m_strKINDOF = "LITERAL";
	};

	init(strType, strValue)
	{
		this.m_strType = strType;
		this.m_strValue = strValue;
	};
	
	evaluate()
	{
		var Value = null;
		
		if (this.m_strType == "char")
			Value = this.m_strValue[0];
		else if (this.m_strType == "boolean")
		{
			if ((this.m_strValue == "true") || (this.m_strValue == "1"))
				Value = true;
			else if ((this.m_strValue == "false") || (this.m_strValue == "0"))
				Value = false;
		}
		else if (this.m_strType == "float")
			Value = parseFoat(this.m_strValue);
		else if (this.m_strType == "String")
			Value = this.m_strValue;
		else
			Value = parseInt(this.m_strType[0], 10);
		
		return Value;
	}
	
	setValue(strValue)
	{
		this.m_strValue = strValue;
	}
	
	getType()
	{
		return this.m_strType;
	}

	getValue()
	{
		return this.m_strValue;
	}

	isEmpty()
	{
		return (this.m_strType == "") && (this.m_strValue == "");
	}
	
	toString()
	{
		return this.m_strValue;
	}
	
};

class CVariable 
{
	constructor() 
	{
		this.m_strName = "";
		this.m_strType = "";
		this.m_strValue = null;
		this.m_strKINDOF = "VARIABLE";
	}

	init(strName, strType, strValue) 
	{
		this.m_strName = strName;
		this.m_strType = strType;
		this.m_strValue = strValue;
	}

	evaluate()
	{
		var Value = null;

		if (this.m_strType == "char")
			Value = this.m_strValue[0];
		else if (this.m_strType == "boolean")
		{
			if ((this.m_strValue == "true") || (this.m_strValue == "1"))
				Value = true;
			else if ((this.m_strValue == "false") || (this.m_strValue == "0"))
				Value = false;
		}
		else if (this.m_strType == "float")
			Value = parseFoat(this.m_strValue);
		else if (this.m_strType == "String")
			Value = this.m_strValue;
		else
			Value = parseInt(this.m_strType[0], 10);

		return Value;
	}

	setValue(strValue)
	{
		this.m_strValue = strValue;
	}
	
	getType()
	{
		return this.m_strType;
	}

	getName()
	{
		return this.m_strName;
	}

	getValue()
	{
		return this.m_strValue;
	}

	isEmpty()
	{
		return (this.m_strName == "") && (this.m_strType == "") && (this.m_strValue == "");
	}
	
	toString(strNewLine, strIndent)
	{
		var strText = "";
	
		if (strNewLine == "")
			strText = this.m_strName;
		else
			strText = strIndent + this.m_strType + " " + this.m_strName + " = " + this.m_strValue + ";" + strNewLine;
		
		return strText;
	}
	
};

class CVariableArray
{
	constructor()
	{
		this.m_arrayVariables = [];
		this.m_strKINDOF = "VARIABLE ARRAY";
	}
	
	add(Variable)
	{
		this.m_arrayVariables[this.m_arrayVariables.length] = Variable;
	}
	
	getLength()
	{
		return this.m_arrayVariables.length;
	}
	
	setValue(nI, Value)
	{
		if (nI >= this.m_arrayVariables.length)
			alert("ERROR: CVariableArray:setValue, nI = " + nI + ", m_arrayVariables.length = " + this.m_arrayVariables.length + "!");
		
		this.m_arrayVariables[nI].setValue(Value);
	}
	setValue(strVariableName, Value)
	{
		var nI = this.indexOf(strName);
		this.setValue(nI, Value);
	}
	
	getValue(nI)
	{
		if (nI >= this.m_arrayVariables.length)
			alert("ERROR: CVariableArray:getValue, nI = " + nI + ", m_arrayVariables.length = " + this.m_arrayVariables.length + "!");
		return this.m_arrayVariables[nI].getValue();
	}
	
	getType(nI)
	{
		if (nI >= this.m_arrayVariables.length)
			alert("ERROR: CVariableArray:getType, nI = " + nI + ", m_arrayVariables.length = " + this.m_arrayVariables.length + "!");
		return this.m_arrayVariables[nI].getType();
	}
	
	find(strName)
	{
		var Variable = null;
		
		for (let nI = 0; nI < this.m_arrayVariables.length; nI++)
		{
			if (strName == this.m_arrayVariables[nI].getName())
			{
				Variable = this.m_arrayVariables[nI];
				break;
			}
		}
		return Variable;
	}
	
	indexOf(strName)
	{
		var nIndex = -1;
		
		for (let nI = 0; nI < this.m_arrayVariables.length; nI++)
		{
			if (strName == this.m_arrayVariables[nI].getName())
			{
				nIndex = nI;
				break;
			}
		}
		return nIndex;
	}
	
	isEmpty()
	{
		return this.m_arrayVariables.length == 0;
	}
	
	toString(strNewLine, strIndent)
	{
		var strValues = "";
		
		for (let nI = 0; nI < this.m_arrayVariables.length; nI++)
		{
			if (strNewLine.length > 0)
				strValues += this.m_arrayVariables[nI].toString(strNewLine, strIndent);
			else
			{
				strValues += this.m_arrayVariables[nI].toString("", "");
				if (nI < (this.m_arrayVariables.length - 1))
					strValues += ", ";
			}
				
		}
		return strValues;
	}
	
};

class CExpression
{
	constructor()
	{
		this.m_Arg1 = null;
		this.m_Arg2 = null;
		this.m_strOperator = "";
		this.m_strKINDOF = "EXPRESSION";
	}
	
	init(Arg1, Arg2, strOperator)
	{
		this.m_Arg1 = Arg1;
		this.m_Arg2 = Arg2;
		this.m_strOperator = strOperator;
	}

	setArg1(Arg1)
	{
		this.m_Arg1 = Arg1;
	}
	
	setArg2(Arg2)
	{
		this.m_Arg2 = Arg2;
	}
	
	getArg1()
	{
		return this.m_Arg1;
	}
	
	getArg2()
	{
		return this.m_Arg2;
	}
	
	setOperator(strOperator)
	{
		this.m_strOperator = strOperator;
	}
	
	isSimple()
	{
		return this.m_strOperator == "";
	}
	
	evaluate()
	{
		var Result
		
		if (this.m_strOperator == "!")
			Result = !this.m_Arg2.evaluate();
		else if (this.m_strOperator == "+")
			Result = this.m_Arg1.evaluate();
		else if (this.m_strOperator == "-")
			Result = -1 * this.m_Arg1.evaluate();
		else if (this.m_strOperator == "")
			Result = this.m_Arg1.evaluate();
		else if (this.m_strOperator == "==")
			Result = this.m_Arg1.evaluate() == this.m_Arg2.evaluate();
		else if (this.m_strOperator == "!=")
			Result = this.m_Arg1.evaluate() != this.m_Arg2.evaluate();
		else if (this.m_strOperator == ">")
			Result = this.m_Arg1.evaluate() > this.m_Arg2.evaluate();
		else if (this.m_strOperator == ">=")
			Result = this.m_Arg1.evaluate() >= this.m_Arg2.evaluate();
		else if (this.m_strOperator == "<")
			Result = this.m_Arg1.evaluate() < this.m_Arg2.evaluate();
		else if (this.m_strOperator == "<=")
			Result = this.m_Arg1.evaluate() <= this.m_Arg2.evaluate();
		else if (this.m_strOperator == "+")
			Result = this.m_Arg1.evaluate() + this.m_Arg2.evaluate();
		else if (this.m_strOperator == "-")
			Result = this.m_Arg1.evaluate() - this.m_Arg2.evaluate();
		else if (this.m_strOperator == "*")
			Result = this.m_Arg1.evaluate() * this.m_Arg2.evaluate();
		else if (this.m_strOperator == "/")
			Result = this.m_Arg1.evaluate() / this.m_Arg2.evaluate();
		
		return Result;
	}
	
	isEmpty()
	{
		return (this.m_Arg1 == null) && (this.m_strOperator == "") && (this.m_Arg2 == null);
	}
	
	hasArg1()
	{
		return this.m_Arg1 != null;
	}
	
	isComplete()
	{
		return (this.m_Arg1 != null) && (this.m_strOperator != "") && (this.m_Arg2 != null);
	}
	
	toString()
	{
		var strExpression = "";
		
		if ((this.m_Arg1 == null) && (this.m_Arg2 != null))
		{
			if ((this.m_strOperator == "!") || (this.m_strOperator == "-") || (this.m_strOperator == "+"))
				strExpression = this.m_strOperator + this.m_Arg2.toString("", "");
			else
				doErrorMessage("CExpression::toString, unexptected operator for argument 2 '" + this.m_strOperator + "'!");
		}
		else if ((this.m_Arg1 != null) && (this.m_Arg2 == null) && (this.m_strOperator == ""))
		{
			strExpression = this.m_Arg1.toString("", "");
		}
		else if ((this.m_Arg1 != null) && (this.m_Arg2 != null) && (this.m_strOperator != ""))
		{
			strExpression = "(" + this.m_Arg1.toString("", "") + " " + this.m_strOperator + " " + this.m_Arg2.toString("", "") + ")";
		}
		else
			doErrorMessage("CExpression::toString!");
		
		return strExpression;
	}
	
};

class CVariableStatement
{
	constructor()
	{
		this.m_strVariableName = null;
		this.m_strOperator = "";
		this.m_Expression = null;
		this.m_strKINDOF = "VARIABLE STATEMENT";
	}
	
	init(strVariableName, strOperator, Expression)
	{
		this.m_strVariableName = strVariableName;
		this.m_strOperator = strOperator;
		this.m_Expression = Expression;
	}
	
	getName()
	{
		return this.m_strVariableName;
	}
	
	getOperator()
	{
		return this.m_strOperator;
	}
	
	getName()
	{
		return this.m_strVariableName;
	}
	
	evaluate()
	{
		var NewValue = this.m_Expression.evaluate(),
			OldValue = g_arrayGlobalVariables.find(this.strVariableName);
		
		if (this.m_strOperator == "=")
			g_arrayGlobalVariables.setValue(this.strVariableName, NewValue);
		else if (this.m_strOperator == "+=")
			g_arrayGlobalVariables.setValue(this.strVariableName, OldValue + NewValue);
		else if (this.m_strOperator == "-=")
			g_arrayGlobalVariables.setValue(this.strVariableName, OldValue - NewValue);
		else if (this.m_strOperator == "*=")
			g_arrayGlobalVariables.setValue(this.strVariableName, OldValue * NewValue);
		else if (this.m_strOperator == "/=")
			g_arrayGlobalVariables.setValue(this.strVariableName, OldValue / NewValue);
		else if (this.m_strOperator == "&=")
			g_arrayGlobalVariables.setValue(this.strVariableName, OldValue & NewValue);
		else if (this.m_strOperator == "|=")
			g_arrayGlobalVariables.setValue(this.strVariableName, OldValue | NewValue);
		else
			alert("ERROR: CVariableStatement::evaluate, invalid operator '" + this.m_strOperator + "'!");
	}
	
	isEmpty()
	{
		return (this.m_strVariableName == "") && (this.m_strOperator == "") && this.m_Expression.isEmpty();
	}
	
	toString(strNewLine, strIndent)
	{
		var strText = strIndent + this.m_strVariableName + " " + this.m_strOperator + " ";

		if (this.m_Expression == null)
			strText += "null" + ";" + strNewLine;
		else
			strText += this.m_Expression.toString("", "") + ";" + strNewLine;
		
		return strText;
	}
	
};

class CStatementArray
{
	constructor()
	{
		this.m_arrayStatements = [];
		this.m_strKINDOF = "STATEMENT ARRAY";
	};
	
	getLength()
	{
		return this.m_arrayStatements.length;
	}
	
	get(nIndex)
	{
		var Statement = null;
		
		if ((nIndex >= 0) && (nIndex < this.m_arrayStatements.length))
			Statement = this.m_arrayStatements[nIndex];
		
		return Statement;
	}
	
	add(Statement)
	{
		this.m_arrayStatements.push(Statement);
	};
	
	isEmpty()
	{
		return this.m_arrayStatements.length == 0;
	}
	evaluate()
	{
		for (let nI = 0; nI < this.m_arrayStatements.length; nI++)
			m_arrayStatements.evaluate();
	}
	
	toString(strNewLine, strIndent)
	{
		var strText = "";

		for (let nI = 0; nI < this.m_arrayStatements.length; nI++)
		{
			strText += this.m_arrayStatements[nI].toString(strNewLine, strIndent);
		}
		return strText;
	}
	
};

class CForStatement
{
	constructor()
	{
		this.m_strCounterVarName = "";
		this.m_ExpressionStart = null;
		this.m_ExpressionEnd = null;
		this.m_ExpressionContinue = null;
		this.m_strOperator = "";
		this.m_arrayStatements = new CStatementArray();
		this.m_strKINDOF = "FOR";
	}
	
	init(strCounterVarName, ExpressionStart, ExpressionEnd, ExpressionContinue, strOperator, arrayStatements)
	{
		this.m_strCounterVarName = strCounterVarName;
		this.m_ExpressionStart = ExpressionStart;
		this.m_ExpressionEnd = ExpressionEnd;
		this.m_ExpressionContinue = ExpressionContinue;
		this.m_strOperator = strOperator;
		this.m_arrayStatements = arrayStatements;
	}

	addStatement(Statement)
	{
		this.m_arrayStatements.add(Statement);
	}
	
	evaluate()
	{
		var strReturnVal = "";
		
		for (let nI = this.m_ExpressionStart.evaluate(); nI < this.m_ExpressionContinue.m_ExpressionEnd(); n += this.m_ExpressionContinue.evaluate())
		{
			strReturnVal = this.m_arrayStatements.evaluate();
			if (strReturnVal == null)
				continue;
			else if (strReturnVal == "break")
				break;
		}
	}
	
	toString(strNewLine, strIndent)
	{
		var strText = "";
		
		strText += strIndent + "for (" + this.m_strCounterVarName + " = " + this.m_ExpressionStart.toString("", "") + "; " + 
					this.m_strCounterVarName + " " + this.m_strOperator + " " + this.m_ExpressionEnd.toString("", "") + "; " + 
					this.m_strCounterVarName + this.m_ExpressionContinue + ")" + strNewLine;
		strText += strIndent + "{" + strNewLine;
		strText += this.m_arrayStatements.toString(strNewLine, strIndent + g_strIndent);
		strText += strIndent + "}" + strNewLine;
		
		return strText;
	}
	
}

class CWhileStatement
{
	constructor()
	{
		this.m_Expression = null;
		this.m_arrayStatements = new CStatementArray();
		this.m_strKINDOF = "WHILE";
	}
	
	init(Expression, arrayStatements)
	{
		this.m_Expression = Expression;
		this.m_arrayStatements = arrayStatements;
	}
	
	addStatement(Statement)
	{
		this.m_arrayStatements.add(Statement);
	}
	
	evaluate()
	{
		var strReturnVal = "";
		
		while (this.m_Expression.evaluate())
		{
			strReturnVal = this.m_arrayStatements.evaluate();
			if (strReturnVal == null)
				continue;
			else if (strReturnVal == "break")
				break;
		}
	}
	
	toString(strNewLine, strIndent)
	{
		var strText = "";
		
		strText += strIndent + "while " + this.m_Expression.toString("", "") + strNewLine;
		strText += strIndent + "{" + strNewLine;
		strText += this.m_arrayStatements.toString(strNewLine, strIndent + g_strIndent);
		strText += strIndent + "}" + strNewLine;
		
		return strText;
	}
}

class CRepeatStatement
{
	constructor()
	{
		this.m_Expression = null;
		this.m_arrayStatements = new CStatementArray();
		this.m_strKINDOF = "REPEAT";
	}

	init(Expression, arrayStatements)
	{
		this.m_Expression = Expression;
		this.m_arrayStatements = arrayStatements;
	}
	
	addStatement(Statement)
	{
		this.m_arrayStatements.add(Statement);
	}
	
	evaluate()
	{
		var strReturnVal = "";
		
		do
		{
			strReturnVal = this.m_arrayStatements.evaluate();
			
			if (strReturnVal == null)
				continue;
			else if (strReturnVal == "break")
				break;
		}
		while (this.m_Expression.evaluate());
	}
	
	toString(strNewLine, strIndent)
	{
		var strText = "";
		
		strText += strIndent + "do" + strNewLine;
		strText += strIndent + "{" + strNewLine;
		strText += this.m_arrayStatements.toString(strNewLine, strIndent + g_strIndent);
		strText += strIndent + "}" + strNewLine;
		strText += strIndent + "while " + this.m_Expression.toString("", "") + ";" + strNewLine;
		
		return strText;
	}
}

class CBreak
{
	constructor()
	{
		this.m_strKINDOF = "BREAK";
	}
	
	evaluate()
	{
		return "break";
	}
	
	toString(strNewLine, strIndent)
	{
		return strIndent + "break" + strNewLine;
	}
	
}

class CCaseArray
{
	constructor()
	{
		this.m_Expression = null;
		this.m_arrayCases = [];
		this.m_strKINDOF = "CASE ARRAY";
	}
	
	getLength()
	{
		this.m_arrayCases.length;
	}
	
	add(Case)
	{
		this.m_arrayCases.push(Case);
	};
	
	isEmpty()
	{
		return this.m_arrayCases.length == 0;
	}
	evaluate()
	{
		for (let nI = 0; nI < this.m_arrayCases.length; nI++)
			m_arrayCases.evaluate();
	}
	
	toString(strNewLine, strIndent)
	{
		var strText = "";

		for (let nI = 0; nI < this.m_arrayCases.length; nI++)
		{
			strText += this.m_arrayCases[nI].toString(strNewLine, strIndent);
		}
		return strText;
	}
}

class CSwitchCase
{
	constructor()
	{
		this.m_Expression = null;
		this.m_arrayStatements = new CStatementArray();
		this.m_strKINDOF = "CASE";
	}

	init(Expression, arrayStatements)
	{
		this.m_Expression = Expression;
		this.m_arrayStatements = arrayStatements;
	}
	
	addStatement(Statement)
	{
		this.m_arrayStatements.add(Statement);
	}
	
	setExpression(Expression)
	{
		this.m_Expression = Expression;
	}
	
	toString(strNewLine, strIndent)
	{
		var strText = strIndent + "case ";

		strText	+= this.m_Expression.toString("", "");
		strText += ":" + strNewLine + strIndent + "{" + strNewLine
		strText += this.m_arrayStatements.toString(strNewLine, strIndent + g_strIndent)
		strText += strIndent + "}" + strNewLine + strNewLine;
		
		return strText;
	}
}

class CSwitchStatement
{
	constructor()
	{
		this.m_Expression = null;
		this.m_arrayCases = new CCaseArray();
		this.m_arrayDefaultStatements = null;
		this.m_strKINDOF = "SWITCH";
	}

	init(Expression, arrayCases)
	{
		this.m_Expression = Expression;
		this.m_m_arrayCases = arrayCases;
		this.m_arrayDefaultStatements = null;
	}
	
	setDefault(arrayDefaultStatements)
	{
		this.m_arrayDefaultStatements = arrayDefaultStatements;
	}
	
	setExpression(Expression)
	{
		this.m_Expression = Expression;
	}
	
	setCases(arrayCases)
	{
		this.m_arrayCases = arrayCases;
	}
	
	addCase(Case)
	{
		this.m_arrayCases.add(Case);
	}
	
	toString(strNewLine, strIndent)
	{
		var strText = strIndent + "switch (";

		strText += this.m_Expression.toString("", "");
		strText += ")" + strNewLine + strIndent + "{" + strNewLine;
		strText += this.m_arrayCases.toString(strNewLine, strIndent + g_strIndent);
		if (this.m_arrayDefaultStatements != null)
		{
			strText += strIndent + g_strIndent + "default:" + strNewLine;
			strText += strIndent + g_strIndent + "{" + strNewLine;
			strText += this.m_arrayDefaultStatements.toString(strNewLine, strIndent + g_strIndent + g_strIndent);
			strText += strIndent + g_strIndent + "}" + strNewLine;
		}
		strText += strIndent + "}" + strNewLine;
		
		return strText;
	}
}

class CIfStatement
{
	constructor()
	{
		this.m_Expression = null;
		this.m_arrayStatements = new CStatementArray();
		this.m_Next = null;
		this.m_strKINDOF = "IF";
	}

	init(Expression, arrayStatements)
	{
		this.m_Expression = Expression;
		this.m_arrayStatements = arrayStatements;
		this.m_Next = null;
	}
	
	setKindOf(strKindOf)
	{
		this.m_strKINDOF = strKindOf;
	}
	
	getNext()
	{
		return this.m_Next;
	}
	
	setNext(Next)
	{
		this.m_Next = Next;
	}
	
	addStatement(Statement)
	{
		this.m_arrayStatements.add(Statement);
	}
	
	toString(strNewLine, strIndent)
	{
		var strText = "";

		if (this.m_Expression != null)
		{
			if (this.m_strKINDOF == "IF")
			{
				strText = strIndent + "if " + this.m_Expression.toString("", "") + strNewLine;
			}
			else if (this.m_strKINDOF == "ELSE IF")
			{
				strText = strIndent + "else if " + this.m_Expression.toString("", "") + strNewLine;
			}
		}
		else
			strText = strIndent + "else" + strNewLine;

		strText += strIndent + "{" + strNewLine;
		strText += this.m_arrayStatements.toString(strNewLine, strIndent + g_strIndent);
		strText += strIndent + "}" + strNewLine;
		if (this.m_Next != null)
			strText += this.m_Next.toString(strNewLine, strIndent);
		
		return strText;
	}
}

class CFunction
{
	constructor()
	{
		this.m_strFunctionName = "";
		this.m_strReturnType = "";
		this.m_arrayParams = new CVariableArray();
		this.m_arrayStatements = new CStatementArray();
		this.m_strKINDOF = "FUNCTION";
	}
	
	init(strFuncName, strReturnType, arrayParams, arrayStatements)
	{
		this.m_strFunctionName = strFuncName;
		this.m_strReturnType = strReturnType;
		this.m_arrayParams = arrayParams;
		this.m_arrayStatements = arrayStatements;
	}
	
	addStatement(Statement)
	{
		this.m_arrayStatements.add(Statement);
	}
	
	setStatementList(arrayStatement)
	{
		this.m_arrayStatements = arrayStatement;
	}
	
	addParam(Param)
	{
		this.m_arrayParams.add(Param);
	}
	
	setStatementList(arrayParams)
	{
		this.m_arrayStatements = arrayParams;
	}
	
	getName()
	{
		return this.m_strFunctionName;
	}
	
	getParam(nI)
	{
		var Param = null;
		
		if (nI >= this.m_arrayParams.getLength())
			alert("ERROR: CFunction::getParam, '" + nI + "' is an invalid parameter number (" + this.m_arrayParams.getLength() + ")!");
		else
		{
			Param = this.m_arrayParams[nI];
		}
		return Param;
	}

	evaluate() //(...)
	{
		for (let nI = 0; nI < arguments.length; nI++)
		{
			if (nI < this.m_arrayParams.getLength())
				this.m_arrayParams.setValue(nI, arguments[nI]);
		}
		for (let nI = 0; nI < this.m_arrayStatements.getLength(); nI++)
		{
			this.m_arrayStatements.get(nI).evaluate();
		}
	}
	
	isEmpty()
	{
		return (this.m_strFunctionName == "") && (this.m_strReturnType == "") && this.m_arrayParams.isEmpty() && this.m_arrayStatements.isEmpty();
	}
	
	toString(strNewLine, strIndent)
	{
		var strText = this.m_strReturnType + " " + this.m_strFunctionName + "(" + this.m_arrayParams.toString("", "") + ")";
		strText += strNewLine + "{" + strNewLine;
		strText += this.m_arrayStatements.toString(strNewLine, strIndent + g_strIndent);
		strText += "}" + strNewLine;

		return strText;
	}
	
};

class CFunctionArray
{
	constructor()
	{
		this.m_arrayFunctions = [];
		this.m_strKINDOF = "FUNCTION ARRAY";
	}
	
	add(strName, arrayParams, arrayStatements)
	{
		var Function = new CFunction()
		Function.init(strName, arrayParams, arrayStatements);
		this.add(Function);
	}
	
	getLength()
	{
		return this.m_arrayFunctions.length;
	}
	
	add(Function)
	{
		this.m_arrayFunctions.push(Function);
	}
	
	find(strName)
	{
		var Function = null;
		
		for (let nI = 0; nI < this.m_arrayFunctions.length; nI++)
		{
			if (this.m_arrayFunctions[nI].getName() == strName)
			{
				Function = this.m_arrayFunctions[nI];
				break;
			}
		}
		return Function;
	}
	
	indexOf(strName)
	{
		var nIndex = -1;
		
		for (let nI = 0; nI < this.m_arrayFunctions.length; nI++)
		{
			if (this.m_arrayFunctions[nI].getName() == strName)
			{
				nIndex = nI;
				break;
			}
		}	
		return nIndex;
	}
	
	getNameAt(nI)
	{
		var strName = "";
		
		if ((nI >= 0) && (nI < this.m_arrayFunctions.length))
			strName = this.m_arrayFunctions[nI].getName();
		
		return strName;
	}

	isEmpty()
	{
		return this.m_arrayFunctions.length == 0;
	}
	
	toString(strNewLine, strIndent)
	{
		var strText = "";
		
		for (let nI = 0; nI < this.m_arrayFunctions.length; nI++)
			strText += this.m_arrayFunctions[nI].toString(strNewLine, strIndent);
		
		return strText;
	}
	
};

g_arrayArduinoFunctions = ["Serial.print", "Serial.println", "Serial.begin", "digtalRead", "digtalWrite", 
							"analogRead", "analogWrite", "pinMode", "setup", "loop", "delay"];
							
function isArduinoFunctionCall(strFuncName)
{
	var bResult = false;
	
	for (let nI = 0; nI < g_arrayArduinoFunctions.length; nI++)
	{
		bResult = strFuncName == g_arrayArduinoFunctions[nI];
		if (bResult)
			break;
	}
	return bResult;
}

class CFunctionCall
{
	constructor()
	{
		this.m_strFuncName = "";
		this.m_arrayParams = new CVariableArray();
		this.m_strKINDOF = "FUNCTION CALL";
	}
	
	init(strFuncName)
	{
		//var Function = g_arrayFunctions.find(strFuncName);

		if ((Function == null) && !isArduinoFunctionCall(strFuncName))
			alert("ERROR: CFunctionCall:init, function '" + strFuncName + "' not found!");
		else
			this.m_strFuncName = strFuncName;
	}
	
	addParameter(Parameter)
	{
		this.m_arrayParams.add(Parameter);
	}
	
	setParameters(arrayParameters)
	{
		this.m_arrayParams = arrayParameters;
	}
	
	isEmpty()
	{
		return (this.m_strFunctionName == "") && (this.m_arrayParams.length == 0);
	}
	
	toString(strNewLine, strIndent)
	{
		var strFuncCall = "";
		
		if (strNewLine == "")
		{
			strFuncCall = this.m_strFuncName + "(" + this.m_arrayParams.toString("") + ")";
		}
		else
		{
			strFuncCall = strIndent + this.m_strFuncName + "(" + this.m_arrayParams.toString("") + ");" + strNewLine;
		}
		return strFuncCall;
	}
	
	evaluate()
	{
		if ((this.m_strFuncName == "Serial.print") || (this.m_strFuncName == "Serial.println"))
		{
			if (this.m_arrayParams.getLength() == 1)
			{
				if (this.m_arrayParams.getType(0) == "char")
					g_SerialMonitor.printText("" + this.m_arrayParams.getValue(0));
				else if ((this.m_arrayParams.getType(0) == "String") || (this.m_arrayParams.getType(0) == "string"))
					g_SerialMonitor.printText(this.m_arrayParams.getValue(0));
				else if (this.m_arrayParams.getType(0) == "int")
					g_SerialMonitor.printInt(this.m_arrayParams.getValue(0), "DEC");
			}
			else if (this.m_arrayParams.getLength() == 2)
			{
				if (this.m_arrayParams.getType(0) == "int")
					g_SerialMonitor.printInt(this.m_arrayParams.getValue(0), this.m_arrayParams.getValue(1));
			}
			if (this.m_strFuncName == "Serial.println")
				g_SerialMonitor.printlnText("");
		}
		else if (this.m_strFuncName == "Serial.begin")
		{
			g_SerialMonitor.begin(this.m_arrayParams.getValue(0));
		}
		else if (this.m_strFuncName == "digtalRead")
		{
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
			// TO DO
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
		}
		else if (this.m_strFuncName == "digtalWrite")
		{
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
			// TO DO
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
		}
		else if (this.m_strFuncName == "analogRead")
		{
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
			// TO DO
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
		}
		else if (this.m_strFuncName == "analogWrite")
		{
				//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
			// TO DO
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
		}
		else if (this.m_strFuncName == "pinMode")
		{
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
			// TO DO
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
		}
		else if (this.m_strFuncName == "delay")
		{
			if (g_Delay.isExpired())
				g_Delay.set(parseInt(this.m_arrayParams.getValue(0)));
		}
		else
		{
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
			// TO DO
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
			//*****************************************
		}
	}
	
};


