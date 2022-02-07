//*************************************************************************
//*
//* CODE FORMATTING FUNCTIONS
//*
//*************************************************************************

function doGetCode(strNewLine, strSpace)
{
	var g_strCode = window.location.search;

	var arrayASCII = [["%21", "!"], ["%22", "\""], ["%23", "#"], ["%24", "$"], ["%25", "%"], ["%26", "&"], ["%27", "'"], ["%28", "("],
					  ["%29", ")"], ["%2A", "*"], ["%2B", "+"], ["%2C", ","], ["%2D", "-"], ["%2E", "."], ["%2F", "/"], ["%3A", ":"],
					  ["%3B", ";"], ["%3C", "<"], ["%3D", "="], ["%3E", ">"], ["%3F", "?"], ["%40", "@"], ["%5B", "["], ["%5C", "\\"],
					  ["%5D", "]"], ["%5E", "^"], ["%5F", "_"], ["%60", "`"], ["%7B", "{"], ["%7C", "|"], [ "%7D", "}"], ["%7E", "~"]];			
	
	g_strCode = g_strCode.substring(6);
	
	// void+setup%28%29%0D%0A%7B%0D%0A%7D%0D%0A%0D%0A%0D%0Avoid+loop%28%29%0D%0A%7B%0D%0A++if+%28false%29%0D%0A++%7B%0D%0A++%7D%0D%0A%7D
	while (g_strCode.includes("%0D%0A"))
		g_strCode = g_strCode.replace("%0D%0A", strNewLine);
		
	while (g_strCode.includes("+"))
		g_strCode = g_strCode.replace("+", strSpace);
		
	for (let nI = 0; nI < arrayASCII.length; nI++)
	{
		while (g_strCode.includes(arrayASCII[nI][0]))
			g_strCode = g_strCode.replace(arrayASCII[nI][0], arrayASCII[nI][1]);
	}
	g_strCode = "/*\n" + 
			  "ReadAnalogVoltage\n" + 
			  "\n" +
			  "Reads an analog input on pin 0, converts it to voltage, and prints the result to the Serial Monitor.\n" +
			  "Graphical representation is available using Serial Plotter (Tools > Serial Plotter menu).\n" + 
			  "Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.\n" + 
			  "\n" + 
			  "This example code is in the public domain.\n" + 
			  "\n" + 
			  "https://www.arduino.cc/en/Tutorial/BuiltInExamples/ReadAnalogVoltage\n" + 
			  "*\/\n" + 
			  "\n" + 

			  "int sensorValue = 0;\n" +
			  "float voltage = 0.0;\n" +

			 "// the setup routine runs once when you press reset:\n" + 
			 
			 "void setup() {\n" + 
			 "// initialize serial communication at 9600 bits per second:\n" + 
			 "Serial.begin(9600);\n" +
			 "}\n" + 
			 "\n" + 
			 "// the loop routine runs over and over again forever:\n" + 

			 "void loop() {\n" + 

			  "// read the input on analog pin 0:\n" + 
			  "sensorValue = analogRead(A0);\n" + 
			  "sensorValue = analogRead(A0) + !analogRead(A0) + analogRead(A0);\n" + 
			  "sensorValue = ((sensorValue >= 'A') && (sensorValue >= 'Z')) || ((sensorValue >= 'a') && (sensorValue >= 'z'));\n" + 
			  "sensorValue = (sensorValue >= 0) && (sensorValue >= 10) || (sensorValue >= 20) && (sensorValue >= 30);\n" + 

			  "while (sensorValue > 0)\n" + 
			  "{\n" + 
			  "sensorValue--;\n" + 
			  "sensorValue = sensorValue + 1;\n" + 
			  "}\n" + 

			  "while (sensorValue > 0)\n" + 
			  "{\n" + 
			  "sensorValue--;\n" + 
			  "}\n" + 

			  "repeat\n" + 
			  "{\n" + 
			  "sensorValue--;\n" + 
			  "sensorValue = sensorValue + 1;\n" + 
			  "}\n" + 
			  "until (sensorValue > 0);\n" + 

			  "repeat\n" + 
			  "{\n" + 
			  "sensorValue--;\n" + 
			  "}\n" + 
			  "until (sensorValue > 0);\n" + 

			  "if (sensorValue > 0\n" + 
			  "{\n" + 
			  "sensorValue--;\n" + 
			  "}\n" + 

			  "if (sensorValue > 0)\n" + 
			  "{\n" + 
			  "sensorValue--;\n" + 
			  "}\n" + 
			  "else if (sensorValue == 0)\n" + 
			  "{\n" + 
			  "sensorValue++;\n" + 
			  "}\n" + 

			  "if (sensorValue > 0)\n" + 
			  "{\n" + 
			  "sensorValue--;\n" + 
			  "}\n" + 
			  "else if (sensorValue == 0)\n" + 
			  "{\n" + 
			  "sensorValue++;\n" + 
			  "}\n" + 
			  "else\n" + 
			  "{\n" + 
			  "sensorValue = 0;\n" + 
			  "}\n" + 

			  "switch (sensorValue)\n" + 
			  "{\n" + 
			  "case 0:\n" + 
			  "{\n" + 
			  "sensorValue = 0;\n" + 
			  "break;\n" + 
			  "}\n" + 
			  "case 1:\n" + 
			  "{\n" + 
			  "sensorValue = 1;\n" + 
			  "break;\n" + 
			  "}\n" + 
			  "default:\n" + 
			  "{\n" + 
			  "sensorValue = -1;\n" + 
			  "break;\n" + 
			  "}\n" +
			  "}\n" + 

			  "// Convert the analog reading (which goes from 0 - 1023) to a voltage (0 - 5V):\n" + 
			  "voltage = sensorValue * (5.0 / 1023.0);\n" + 
			  "// print out the value you read:\n" + 
			  "Serial.println(voltage);\n" + 

			  "}\n";
	
	
	
	
	return g_strCode;
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

var	g_strRawCode = doGetCode("\n", " ");
var	g_strNoComments = doRemoveComments(g_strRawCode);
var	g_strNoNewLines = doRemoveNewLines(g_strNoComments);
var	g_strNoSpaces = doRemoveSpaces(g_strNoNewLines);
var	g_strCode = g_strNoSpaces;

g_arrayTokens = doParse(g_strCode);
/*
alert("\n\n============================================\n\nRAW CODE\n\n" + g_strRawCode + 
		"\n\n============================================\n\nCOMMENTS REMOVED\n\n" + g_strNoComments + 
		"\n\n============================================\n\NEW LINES REMOVED\n\n" + g_strNoNewLines + 
		"\n\n============================================\n\SPACES REMOVED\n\n" + g_strNoSpaces + 
		"\n\n============================================\n\nRE-CREATED CODE\n\n" + doReproduceCode() + "\n\n");
*/