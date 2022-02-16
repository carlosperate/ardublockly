//*************************************************************************
//*
//* CODE FORMATTING FUNCTIONS
//*
//*************************************************************************

function doProcessGetData(strNewLine, strSpace)
{
	var strGetData = window.location.search;
	var arrayASCII = [["%21", "!"], ["%22", "\""], ["%23", "#"], ["%24", "$"], ["%25", "%"], ["%26", "&"], ["%27", "'"], ["%28", "("],
					  ["%29", ")"], ["%2A", "*"], ["%2B", "+"], ["%2C", ","], ["%2D", "-"], ["%2E", "."], ["%2F", "/"], ["%3A", ":"],
					  ["%3B", ";"], ["%3C", "<"], ["%3D", "="], ["%3E", ">"], ["%3F", "?"], ["%40", "@"], ["%5B", "["], ["%5C", "\\"],
					  ["%5D", "]"], ["%5E", "^"], ["%5F", "_"], ["%60", "`"], ["%7B", "{"], ["%7C", "|"], [ "%7D", "}"], ["%7E", "~"]];			
		
	strGetData = strGetData.substring(1);
	
	// void+setup%28%29%0D%0A%7B%0D%0A%7D%0D%0A%0D%0A%0D%0Avoid+loop%28%29%0D%0A%7B%0D%0A++if+%28false%29%0D%0A++%7B%0D%0A++%7D%0D%0A%7D
	while (strGetData.includes("%0D%0A"))
		strGetData = strGetData.replace("%0D%0A", strNewLine);
		
	while (strGetData.includes("+"))
		strGetData = strGetData.replace("+", strSpace);
		
	for (let nI = 0; nI < arrayASCII.length; nI++)
	{
		while (strGetData.includes(arrayASCII[nI][0]))
			strGetData = strGetData.replace(arrayASCII[nI][0], arrayASCII[nI][1]);
	}	
	return strGetData;
}

function doGetCode(strGetData)
{
	var nIndexCode = strGetData.indexOf("Code"),
		nIndexBoard = strGetData.indexOf("SelectedBoard");
	var strCode = "";
	
	if (nIndexBoard > nIndexCode)
		strCode = strGetData.substring(nIndexCode + 5, nIndexBoard - 1);
	else
		strCode = strGetData.substring(nIndexCode + 5);
	
	return strCode;
}

function doGetMCU(strGetData)
{
	var nIndexCode = strGetData.indexOf("Code"),
		nIndexBoard = strGetData.indexOf("SelectedBoard");
	var strBoard = "";

	if (nIndexCode > nIndexBoard)
		strBoard = strGetData.substring(nIndexBoard + 14, nIndexCode);
	else
		strBoard = strGetData.substring(nIndexBoard + 14);
	
	return strBoard;
}

function doRemoveComments(strCode)
{
	var nI = 0, nJ = 0;

	while (true)
	{		
		if (strCode.includes("//"))
		{
			nI = strCode.indexOf("//");
			nJ = strCode.indexOf("\n", nI) + 1;
			nI--;
			
		}
		else if (strCode.includes("/*"))
		{
			nI = strCode.indexOf("/*");
			nJ = strCode.indexOf("*/", nI) + 2;
			nI--;
		}
		else
		{
			break;
		}
		if (nI == -1)
		{
			strCode = strCode.substring(nJ);
		}
		else
		{
			strCode = strCode.substring(0, nI) + strCode.substring(nJ);
		}
	}
	return strCode;
}

function doRemoveNewLines(strCode)
{
	var strTempCode = "";
	
	while (strCode.length > 0)
	{
		if ((strCode.charCodeAt(0) == 10) || (strCode.charCodeAt(0) == 13))
		{
			if (isAlphaNumeric(strTempCode.charCodeAt(strTempCode.length - 1)) && isAlphaNumeric(strCode.charCodeAt(1)))
			{
				strTempCode += " ";
				strCode = strCode.substring(1);
			}
			else
			{
				strCode = strCode.substring(1);
			}
		}
		else
		{
			strTempCode += strCode[0];
			strCode = strCode.substring(1);
		}
	}
	return strTempCode;
}

function doRemoveSpaces(strCode)
{
	var strCodeTemp = "";
	var nI = 0;

	while (nI < strCode.length)
	{
		if (strCode[nI] != ' ')
		{
			strCodeTemp += strCode[nI];
			nI++;
		}
		else if (isAlphaNumeric(strCodeTemp.charCodeAt(strCodeTemp.length - 1)) && isAlphaNumeric(strCode.charCodeAt(nI + 1)))
		{
			strCodeTemp += strCode[nI];
			nI++;
		}
		else 
			nI++;
	}	
	return strCodeTemp;
}

var g_strGetData = doProcessGetData("\n", " ");
var	g_strRawCode = doGetCode(g_strGetData);
var	g_strNoComments = doRemoveComments(g_strRawCode);
var	g_strNoNewLines = doRemoveNewLines(g_strNoComments);
var	g_strNoSpaces = doRemoveSpaces(g_strNoNewLines);
g_strCode = g_strNoSpaces;
var g_strSelectedMCUType = doGetMCU(g_strGetData);

/*
alert("\n\n============================================\n\nCODE\n\n" + g_strCode + 
		"\n\n============================================\n\nMCU\n\n" + g_strSelectedMCUType + "\n\n");
*/
g_strCode = "bool bState=true;" + 
			"int nVal=0;" + 
		 "void setup(){" +  
		 "Serial.begin(9600);" +
		 "Serial.println(\"In setup()...\");" +
		 "pinMode(10,OUTPUT);" + 
		 "pinMode(11,INPUT);" + 
		 "}" + 
		 "void loop(){" + 
		  "Serial.println(\"In loop()...\");" + 
		  "digitalWrite(10,bState);" + 
		  "bState=!bState;" + 
		  "nVal=digitalRead(11);" + 
		  //"delay(1000);" + 
		  "}";
g_strSelectedMCUType = "Mega";

g_strSelectedMCUType = g_strSelectedMCUType.toUpperCase();
doParse(g_strCode);


