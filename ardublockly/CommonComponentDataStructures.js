//*************************************************************************
//*
//* GLOBAL VARIBALES FOR COMPONENTS
//*
//*************************************************************************

var g_mapPlacedComponents = new Map();
var INPUT = "INPUT", INPUT_HIGH = "INPUT_HIGH", OUTPUT = "OUTPUT", HIGH = "HIGH", LOW = "LOW";
var g_strErrorMessage = "ERROR: ";
var g_BUILT_IN_LED = 13;
var g_nMCUCount = 0;
var g_strSelectedComponentName = "", g_strMCUName = "";

function isArduinoConstant(strVal)
{
	return (strVal == INPUT) || (strVal == INPUT_HIGH) || (strVal == OUTPUT) || (strVal == HIGH) || (strVal == LOW) || (strVal == "true") || (strVal == "false");
}

function doCreateComponent(strComponentType)
{
	var strComponentName = doGetUniqueName(strComponentType);
	var Component = null;

	if (strComponentType == "UNO")
	{
		if (g_nMCUCount == 0)
		{
			Component = new CArduinoUno();
			g_nMCUCount++;
		}
		else
			doErrorMessage(g_strErrorMessage + " only one MCU is permitted!");
	}
	else if (strComponentType == "MEGA")
	{
		if (g_nMCUCount == 0)
		{
			Component = new CArduinoMega();
			g_nMCUCount++;
		}
		else
			doErrorMessage(g_strErrorMessage + " only one MCU is permitted!");
	}
	else if (strComponentType == "MICROBIT")
	{
		if (g_nMCUCount == 0)
		{
			Component = new CMicrobit();
			g_nMCUCount++;
		}
		else
			doErrorMessage(g_strErrorMessage + " only one MCU is permitted!");
	}
	else if (strComponentType == "MICROBIT_BREAKOUT")
	{
		if (g_nMCUCount == 0)
		{
			Component = new CMicrobit(true);
			g_nMCUCount++;
		}
		else
			doErrorMessage(g_strErrorMessage + " only one MCU is permitted!");
	}
	else if (strComponentType == "LED")
		Component = new CLED();
	else if (strComponentType == "RESISTOR")
		Component = new CResistor();
	else
		alert(strComponentType);
		
	// *******************************
	// *******************************
	// *******************************
	// TO DO
	// *******************************
	// *******************************
	// *******************************
	
	if (Component != null)
	{
		Component.setDeviceName(strComponentName);
		Component.doSelect();
		g_mapPlacedComponents.set(strComponentName, Component);
	}
	return Component;
}

function doGetUniqueName(strName)
{
	var strFind = "";
	
	for (let nI = 1; nI <= 1000; nI++)
	{
		strFind = strName + nI;
		if (!g_mapPlacedComponents.has(strFind))
		{
			break;
		}
	}
	return strFind;
}

function doCreateMCU(strMCUType)
{
	if ((strMCUType != "UNO") && (strMCUType != "MEGA"))
	{
		alert("'" + strMCUType + "' is not supported at this time!");
		strMCUType = "UNO";
	}
	var Component = doCreateComponent(strMCUType);
	var strMCUName = Component.getDeviceName();
	g_mapPlacedComponents.set(strMCUName, Component);
	doDisplayAllComponents();
	return strMCUName;
}

function doShowEditFields(strHTMLEditField)
{
	var ComponentEdit = document.getElementById("component_edit");
	
	if (ComponentEdit != null)
	{
		ComponentEdit.innerHTML = strHTMLEditField;
	}
}

function doErrorMessage(strErrorMessage)
{
	doDisplayInfo(strErrorMessage);
}

function doDisplayInfo(strMessage)
{
	var LargeMessageDiv = document.getElementById("large_message_area");
	
	if (LargeMessageDiv != null)
	{
		LargeMessageDiv.innerHTML = strMessage;
	}
}

function doDisplayHint(strHeading, strInfo)
{
	var Info = getElement("info");
	var InfoHeading = getElement("info_heading");

	if (Info && InfoHeading)
	{
		InfoHeading.innerText = strHeading;
		Info.innerText = strInfo;
	}
}




//*************************************************************************
//*
//* PLACED COMPONENTS MAP FUNCTIONS
//*
//*************************************************************************

function doStopRunAllComponents()
{
	var arrayDeviceName = [];
	var strDeviceName = "", strSelectedDeviceName = "";
	
	g_mapPlacedComponents.forEach(function(strValue, strKey, map){arrayDeviceName.push(strKey)});
	
	for (let nI = 0; nI < arrayDeviceName.length; nI++)
	{
		if (g_mapPlacedComponents.get(arrayDeviceName[nI]))
			g_mapPlacedComponents.get(arrayDeviceName[nI]).doStopRun();
	}
}

function doZoomAllDrawingObjects(strInOut)
{
	var arrayDeviceName = [];
	var strDeviceName = "", strSelectedDeviceName = "";
	
	g_mapPlacedComponents.forEach(function(strValue, strKey, map){arrayDeviceName.push(strKey)});
	
	for (let nI = 0; nI < arrayDeviceName.length; nI++)
	{
		strDeviceName = arrayDeviceName[nI];
		if (strInOut == "+")
			g_mapPlacedComponents.get(strDeviceName).doZoomIn();
		else if (strInOut == "-")
			g_mapPlacedComponents.get(strDeviceName).doZoomOut();
		else if (strInOut == "100")
			g_mapPlacedComponents.get(strDeviceName).doDefaultZoom();
		g_mapPlacedComponents.get(strDeviceName).doRotate(0);
	}
	doDisplayAllComponents();
}

function doFindSelectedComponent(pointMousePos)
{
	var arrayDeviceName = [];
	var strDeviceName = "", strSelectedDeviceName = "";
	
	g_mapPlacedComponents.forEach(function(strValue, strKey, map){arrayDeviceName.push(strKey)});
	
	for (let nI = 0; nI < arrayDeviceName.length; nI++)
	{
		strDeviceName = arrayDeviceName[nI];
		if (g_mapPlacedComponents.get(strDeviceName).isMouseIn(pointMousePos))
		{
			strSelectedDeviceName = strDeviceName;
			break;
		}
	}
	return strSelectedDeviceName;
}

function doFindSelectedComponentNoMouse()
{
	var arrayDeviceName = [];
	var strDeviceName = "", strSelectedDeviceName = "";
	
	g_mapPlacedComponents.forEach(function(strValue, strKey, map){arrayDeviceName.push(strKey)});
	
	for (let nI = 0; nI < arrayDeviceName.length; nI++)
	{
		strDeviceName = arrayDeviceName[nI];
		if (g_mapPlacedComponents.get(strDeviceName).isSelected())
		{
			strSelectedDeviceName = strDeviceName;
			break;
		}
	}
	return strSelectedDeviceName;
}

function doUnselectAllComponents()
{
	var arrayDeviceName = [];
	var strDeviceName = "";
	
	g_mapPlacedComponents.forEach(function(strValue, strKey, map){arrayDeviceName.push(strKey)});
	
	for (let nI = 0; nI < arrayDeviceName.length; nI++)
	{
		strDeviceName = arrayDeviceName[nI];
		g_mapPlacedComponents.get(strDeviceName).doUnselect();
	}
}

function doDisplayAllComponents()
{
	var arrayDeviceName = [];
	var strDeviceName = "";
	
	g_mapPlacedComponents.forEach(function(strValue, strKey, map){arrayDeviceName.push(strKey)});
	
	doEraseCanvas();
	for (let nI = 0; nI < arrayDeviceName.length; nI++)
	{
		strDeviceName = arrayDeviceName[nI];
		g_mapPlacedComponents.get(strDeviceName).doDisplay();
	}
}

function doMouseOverAllComponents(pointMousePos)
{
	var arrayDeviceName = [];
	var strDeviceName = "";
	var nI = 0;
	
	g_mapPlacedComponents.forEach(function(strValue, strKey, map){arrayDeviceName.push(strKey)});
	g_Canvas.style.cursor = "default";
	
	for (nI = 0; nI < arrayDeviceName.length; nI++)
	{
		strDeviceName = arrayDeviceName[nI];
		if (g_mapPlacedComponents.get(strDeviceName).doMouseOver(pointMousePos))
			break;
	}
}





//*************************************************************************
//*
//* STYLES - BECAUSE HTML CLASS PROPERTIES WON'T WORK
//*
//*************************************************************************

var g_strTextStyle = "background-color:white;border-style:solid;border-width:2Px;border-radius:5Px;border-top-color:#799B8A;border-left-color:#79B98A;border-right-color:#B9DBCA;border-bottom-color:#B9DBCA;width:120Px;height:30Px;";
var g_strButtonStyle = "color:#006468;height:30px;border-radius: 5Px;background-color: #99BBAA;border-left-color:#B9DBCA;border-top-color:#B9DBCA;border-right-color:#799B8A;border-bottom-color:#79B98A;"
var g_strLabelStyle = "display:inline-block;color:#006468;";
var g_strSelectStyle = "display:inline;height:30Px;background-color:white;border-style:solid;border-width:2Px;border-radius:5Px;border-top-color:#799B8A;border-left-color:#79B98A;border-right-color:#B9DBCA;border-bottom-color:#B9DBCA;";
var g_strSecondDivDisplayStyle = "display:inline-block;height:100%;vertical-align:middle;border-style:none;border-thickness:3Px;border-color:blue;";




//*************************************************************************
//*
//* INPUT FIELDS
//*
//*************************************************************************

//var g_strRename = "<div style=\"" + g_strLabelStyle + "\">NEW NAME</div><div><input id=\"TextRenameMCU\" maxlength=\"16\" type=\"text\" style=\"" + g_strTextStyle + "\" />&nbsp;<input id=\"ButtonRenameMCU\" type=\"button\" value=\"RENAME\" style=\"" + g_strButtonStyle + "\" onclick=\"doRename(document.getElementById('TextRenameMCU').value)\"/></div>";
var g_strRename = "<div style=\"display:inline-block;\"><div style=\"" + g_strLabelStyle + "\">NEW NAME&nbsp;</div><div style=\"display:inline-block;\"><input value=\"XXXX\" id=\"TextRenameMCU\" maxlength=\"16\" type=\"text\" style=\"" + g_strTextStyle + "\" />&nbsp;<input id=\"ButtonRenameMCU\" type=\"button\" value=\"RENAME\" style=\"" + g_strButtonStyle + "position:relative;top:2Px;\" onclick=\"doRename(document.getElementById('TextRenameMCU').value)\"/></div></div>";




//*************************************************************************
//*
//* BASE COMPONENT
//*
//*************************************************************************

function doRename(strNewName)
{
	var strDeviceName = doFindSelectedComponentNoMouse();
	
	if (g_mapPlacedComponents.get(strDeviceName) != null)
	{
		g_mapPlacedComponents.get(strDeviceName).setDeviceName(strNewName);
		doDisplayAllComponents();
	}
}	




class CComponentBase
{
	constructor(strType)
	{
		this.m_ImageObject0 = null;
		this.m_ImageObject90 = null;
		this.m_ImageObject180 = null;
		this.m_ImageObject270 = null;
		this.m_arrayPins = [];
		this.m_strDeviceName = "";
		this.m_rectangle = new CRectangle(new CPoint(g_pointCanvasScrollPos.m_nX + 50, g_pointCanvasScrollPos.m_nY + 50), new CSize(0, 0));
		this.m_fScale = this.m_fDefaultScale = 1;
		this.m_nRotationAngle = 0;
		this.m_bSelected = false;
		this.m_pointLastMousePos = new CPoint(0, 0);
		this.m_strEditHTML = "";
		this.m_strType = strType;
		this.m_strEditHTML = g_strRename;
		this.m_nZoom = 0;
	}

	getZoom()
	{
		return this.m_nZoom;
	}
	
	getZoomScaledValue(nValue)
	{
		return (this.m_fDefaultScale / this.m_fScale) * nValue;
	}
	
	doDefaultZoom()
	{
		this.m_fScale = this.m_fDefaultScale;
		this.m_nZoom = 1;
	}
	
	doZoomIn()
	{
		if (this.m_nZoom < 10)
		{
			this.m_nZoom++;
			this.m_fScale -= 0.1;
		}
	}
	
	doZoomOut()
	{
		if (this.m_nZoom > -10)
		{
			this.m_nZoom--;
			this.m_fScale += 0.1;
		}
	}
	
	doAddPin(Pin)
	{
		this.m_arrayPins[this.m_arrayPins.length] = Pin;
	}
	
	doSetPinPos(nIndex, pointPos, sizeDimen)
	{
		if ((nIndex >= 0) && (nIndex < this.m_arrayPins.length))
			this.m_arrayPins[nIndex].set(pointPos, sizeDimen);
	}
	
	doRead(strFileContents)
	{
		var strTemp = "";
		
		this.m_strDeviceName = doReadNextToken(strFileContents);
		strFileContents = doDeleteToken(strFileContents, this.m_strDeviceName);
		
		strTemp = doReadNextToken(strFileContents);
		strFileContents = doDeleteToken(strFileContents, strTemp);
		this.m_nRotationAngle = parseInt(strTemp);
		
		strTemp = doReadNextToken(strFileContents);
		strFileContents = doDeleteToken(strFileContents, strTemp);
		this.m_rectangle.m_pointTL.m_nX = parseInt(strTemp);
		
		strTemp = doReadNextToken(strFileContents);
		strFileContents = doDeleteToken(strFileContents, strTemp);
		this.m_rectangle.m_pointTL.m_nY = parseInt(strTemp);
		
		for (let nI = 0; nI < this.m_arrayPins.length; nI++)
			strFileContents = this.m_arrayPins[nI].doRead(strFileContents);
		
		this.doMove(this.m_rectangle.m_pointTL);
		this.doRotate(this.m_rectangle.m_nRotationAngle);
		
		return strFileContents;
	}
	
	doWrite(strFileContents)
	{	
		strFileContents = this.m_strType + "\r\n";
		strFileContents += this.m_strDeviceName + "\r\n";
		strFileContents += this.m_nRotationAngle + "\r\n";
		strFileContents += this.m_rectangle.m_pointTL.m_nX + "\r\n";
		strFileContents += this.m_rectangle.m_pointTL.m_nY + "\r\n";
		for (let nI = 0; nI < this.m_arrayPins.length; nI++)
			strFileContents = this.m_arrayPins[nI].doWrite(strFileContents);
		
		return strFileContents;
	}
	
	getType()
	{
		return this.m_strType;
	}
	
	doRotate(nAddAngle)
	{
		this.m_nRotationAngle += nAddAngle;
		
		if (this.m_nRotationAngle >= 360)
			this.m_nRotationAngle -= 360;
		else if (this.m_nRotationAngle < 0)
			this.m_nRotationAngle += 360;

		if (this.m_nRotationAngle == 0)
		{
			this.m_rectangle.m_size.m_nWidth = this.m_ImageObject0.naturalWidth / this.m_fScale;
			this.m_rectangle.m_size.m_nHeight = this.m_ImageObject0.naturalHeight / this.m_fScale;
		}
		else if (this.m_nRotationAngle == 90)
		{
			this.m_rectangle.m_size.m_nWidth = this.m_ImageObject90.naturalWidth / this.m_fScale;
			this.m_rectangle.m_size.m_nHeight = this.m_ImageObject90.naturalHeight / this.m_fScale;
		}
		else if (this.m_nRotationAngle == 180)
		{
			this.m_rectangle.m_size.m_nWidth = this.m_ImageObject180.naturalWidth / this.m_fScale;
			this.m_rectangle.m_size.m_nHeight = this.m_ImageObject180.naturalHeight / this.m_fScale;
		}
		else if (this.m_nRotationAngle == 270)
		{
			this.m_rectangle.m_size.m_nWidth = this.m_ImageObject270.naturalWidth / this.m_fScale;
			this.m_rectangle.m_size.m_nHeight = this.m_ImageObject270.naturalHeight / this.m_fScale;
		}
		this.doSetPinPositions();
	}

	static doGetImageObject(strImageFileName)
	{
		var ImageObject = new Image();
		
		ImageObject.onload = function(){};
		ImageObject.src = strImageFileName;
		
		return ImageObject;
	}

	setDeviceName(strDeviceName)
	{
		this.m_strDeviceName = strDeviceName;
	}
	
	getDeviceName()
	{
		return this.m_strDeviceName;
	}
	
	isSelected()
	{
		return this.m_bSelected;
	}
	
	doSelect()
	{
		this.m_bSelected = true;
		
		var strHTML = this.m_strEditHTML;
		strHTML = strHTML.replace("XXXX", this.m_strDeviceName);
		doShowEditFields(strHTML);
	}
	
	doUnselect()
	{
		this.m_bSelected = false;
	}
	
	doDelete()
	{
	}
	
	doDeleteWire(strWireName)
	{
		for (let nI = 0; nI < this.m_arrayPins.length; nI++)
			this.m_arrayPins[nI].doDeleteWire(strWireName);
	}

	doDrawBorder()
	{
		g_CanvasContext.beginPath();
		g_CanvasContext.strokeStyle = "red";
		g_CanvasContext.lineWidth  = "2";
		g_CanvasContext.rect(this.m_rectangle.m_pointTL.m_nX, this.m_rectangle.m_pointTL.m_nY, this.m_rectangle.m_size.m_nWidth,  this.m_rectangle.m_size.m_nHeight);
		g_CanvasContext.stroke();
	}
	
	doDisplayName()
	{
		g_CanvasContext.font = "bold 20px Arial"; 
		g_CanvasContext.fillStyle = "#000000";	
		g_CanvasContext.fillText(this.m_strDeviceName, this.m_rectangle.m_pointTL.m_nX, this.m_rectangle.m_pointTL.m_nY - 2);
	}
	
	doDisplayPins()
	{
		for (let nI = 0; nI < this.m_arrayPins.length; nI++)
			this.m_arrayPins[nI].doDisplay();
	}
	
	doDisplay()
	{
		if ((this.m_nRotationAngle == 0) && (this.m_ImageObject0 != null))
			g_CanvasContext.drawImage(this.m_ImageObject0, this.m_rectangle.m_pointTL.m_nX, this.m_rectangle.m_pointTL.m_nY, this.m_rectangle.m_size.m_nWidth, this.m_rectangle.m_size.m_nHeight);
		else if ((this.m_nRotationAngle == 90) && (this.m_ImageObject90 != null))
			g_CanvasContext.drawImage(this.m_ImageObject90, this.m_rectangle.m_pointTL.m_nX, this.m_rectangle.m_pointTL.m_nY, this.m_rectangle.m_size.m_nWidth, this.m_rectangle.m_size.m_nHeight);
		else if ((this.m_nRotationAngle == 180) && (this.m_ImageObject180 != null))
			g_CanvasContext.drawImage(this.m_ImageObject180, this.m_rectangle.m_pointTL.m_nX, this.m_rectangle.m_pointTL.m_nY, this.m_rectangle.m_size.m_nWidth, this.m_rectangle.m_size.m_nHeight);
		else if ((this.m_nRotationAngle == 270) && (this.m_ImageObject270 != null))
			g_CanvasContext.drawImage(this.m_ImageObject270, this.m_rectangle.m_pointTL.m_nX, this.m_rectangle.m_pointTL.m_nY, this.m_rectangle.m_size.m_nWidth, this.m_rectangle.m_size.m_nHeight);

		if (this.m_bSelected)
			this.doDrawBorder();
		
		this.doDisplayName();
		this.doDisplayPins();
	}
	
	doGrab(pointMousePos)
	{
		this.doSelect();
		this.m_pointLastMousePos.m_nX = pointMousePos.m_nX;
		this.m_pointLastMousePos.m_nY = pointMousePos.m_nY;
		g_Canvas.style.cursor = "grabbing";
	}
	
	doMove(pointMousePos)
	{
		this.m_rectangle.m_pointTL.m_nX = pointMousePos.m_nX;
		this.m_rectangle.m_pointTL.m_nY = pointMousePos.m_nY;
		this.m_bSelected = true;
		this.doSetPinPositions();
		for (let nI = 0; nI < this.m_arrayPins.length; nI++)
		{
			this.m_arrayPins[nI].doConnectedMove(this.m_strDeviceName);
		}
	}

	hasMouseMoved(pointMousePos)
	{
		var bResult = (pointMousePos.m_nX != this.m_pointLastMousePos.m_nX) || (pointMousePos.m_nY != this.m_pointLastMousePos.m_nY);
		
		return bResult;
	}
	
	doDrop(pointMousePos)
	{
		var nFinalX = 0, nFinalY = 0;
		
		if (this.hasMouseMoved(pointMousePos))
		{
			pointMousePos.m_nX -= (pointMousePos.m_nX % g_nGridSize);
			pointMousePos.m_nY -= (pointMousePos.m_nY % g_nGridSize);
			this.doMove(pointMousePos);
		}
		g_Canvas.style.cursor = "pointer";
	}
	
	doMouseOver(pointMousePos)
	{	
		var bResult = false;
		var OldCursor = g_Canvas.style.cursor;
		
		if (this.isMouseIn(pointMousePos))
		{
			g_Canvas.style.cursor = "pointer";
			bResult = true;
			
			for (var nI = 0; nI < this.m_arrayPins.length; nI++)
			{
				if (this.m_arrayPins[nI].doMouseOver(pointMousePos))
					break;
			}
			if (nI >= this.m_arrayPins.length)
				this.doDisplay();
		}
		else
		{
			doDisplayHint("", "");
			doDisplayAllComponents();
		}
		return bResult;
	}
	
	isMouseIn(pointMousePos)
	{	
		return this.m_rectangle.isMouseIn(pointMousePos);
	}
	
	isMouseInPin(pointMousePos)
	{
		var nPinNum = -1;
		
		for (let nI = 0; nI < this.m_arrayPins.length; nI++)
		{
			if (this.m_arrayPins[nI].canAcceptConection() && this.m_arrayPins[nI].isMouseIn(pointMousePos))
			{
				nPinNum = nI;
				break;
			}
		}
		return nPinNum;
	}
	
	getPinID(nPinNum)
	{
		var strPindID = "";
		
		if ((nPinNum >= 0) && (nPinNum < this.m_arrayPins.length))
		{
			strPindID = this.m_arrayPins[nPinNum].getPinID();
		}
		return strPindID;
	}
	
	getPinPos(strPinID)
	{
		var point = new CPoint(0, 0);
		
		for (let nI = 0; nI < this.m_arrayPins.length; nI++)
		{
			if (this.m_arrayPins[nI].getPinID() == strPinID)
			{
				point = this.m_arrayPins[nI].getPosition();
			}
		}
		return point;
	}
	
	getPinState(strPinID)
	{
		var nState = LOW;
		
		for (let nI = 0; nI < this.m_arrayPins.length; nI++)
		{
			if (this.m_arrayPins[nI].getPinID() == strPinID)
			{
				nState = this.m_arrayPins[nI].getState();
			}
		}
		return nState;
	}
	
	setWire(strPinID, strWireName)
	{
		for (let nI = 0; nI < this.m_arrayPins.length; nI++)
		{
			if (this.m_arrayPins[nI].getPinID() == strPinID)
			{
				this.m_arrayPins[nI].setWire(strWireName);
			}
		}
	}

	doRun()
	{
	}
	
	doStopRun()
	{
	}
	
	getVoltage()
	{
		return 0;
	}
	
	getResistance()
	{
		return 0;
	}
	
}




//*************************************************************************
//*
//* BASE MCU
//*
//*************************************************************************

class CMCUBase extends CComponentBase
{
	constructor(strType)
	{
		super("MCU " + strType);
		this.m_mapAnalogPins = new Map();
		this.m_nMaxPin = 0;
		this.m_fVoltage = 0;
	}
	
	getVoltage(strDeviceName, strPinID)
	{
		var fVoltage = 0;
		
		for (let nI = 0; nI < this.m_arrayPins.length; nI++)
		{
			if (strPinID == this.m_arrayPins[nI].getPinID())
			{
				if (this.m_arrayPins[nI].getState() == 1)
					fVoltage = this.m_fVoltage;
				else
					fVoltage = 0;
				break;
			}
		}
		return fVoltage;
	}
	
	doWrite()
	{
		var strFileContents = super.doWrite();
		return strFileContents;
	}
	
	getType()
	{
		var strType = super.getType();
		strType = strType.substring(0, 3);
		
		return strType;
	}
	
	setDeviceName(strDeviceName)
	{
		super.setDeviceName(strDeviceName);
		for (let nI = 0; nI < this.m_arrayPins.length; nI++)
			this.m_arrayPins[nI].doSetDeviceName(strDeviceName);
	}

	getImageFileName()
	{
		return super.getImageFileName();
	}
	
	getPin(PinID)
	{
		var nPinNum = -1;
		
		if (isNaN(PinID))
		{
			if (this.m_mapAnalogPins.has(PinID))
				nPinNum = m_mapAnalogPins.get(PinID);
			else
				doErrorMessage(g_strErrorMessage + "'" + this.getDeviceName() + "' does not have pin '" + PinID + "'!");
		}
		else
			nPinNum = PinID;
		
		if (nPinNum == 0)
		{
			doErrorMessage(g_strErrorMessage + "shouldn't digital read from pin '0' as it belongs to Serial Monitor!");
			nPinNum = -1;
		}
		else if (nPinNum == 1)
		{
			doErrorMessage(g_strErrorMessage + "shouldn't digital read from pin '1' as it belongs to Serial Monitor!");
			nPinNum = -1;
		}
		else if (nPinNum > this.m_nMaxPin)
		{
			doErrorMessage(g_strErrorMessage + "no such pin '" + nPinNum + "'!");
			nPinNum = -1;
		}
		return nPinNum;
	}
	
	pinMode(PinID, strMode)
	{
		var nPinNum = this.getPin(PinID, this);
		
		if (nPinNum != -1)
			this.m_arrayPins[nPinNum].pinMode(strMode);

	}
	
	digitalRead(PinID)
	{
		var nPinNum = this.getPin(PinID, this);
		var strState = "";
		
		if (nPinNum != -1)
			strState = this.m_arrayPins[nPinNum].digitalRead();

		return strState;
	}
	
	digitalWrite(PinID, strState)
	{
		var nPinNum = this.getPin(PinID, this);
		
		if (nPinNum != -1)
			this.m_arrayPins[nPinNum].digitalWrite(strState);
	}
	
	analogRead(nPinNum)
	{
		var nPinNum = this.getPin(PinID, this);
		var strState = "";
		
		if (nPinNum != -1)
			strState = this.m_arrayPins[nPinNum].analogRead();

		return strState;
	}
	
	analogWrite(nPinNum, strPWMVal)
	{
		var nPinNum = this.getPin(PinID, this);
		
		if (nPinNum != -1)
			this.m_arrayPins[nPinNum].analogWrite(strPWMVal);
	}
	
	doDisplay()
	{
		super.doDisplay();
	}
	
	doRotate(nAngleAdd)
	{
		super.doRotate(nAngleAdd);
	}
}




//*************************************************************************
//*
//* DELAY CLASSES
//*
//*************************************************************************

class CDelay
{
	constructor(nMillisDelay)
	{
		this.set(nMillisDelay);
	}
	
	set(nMillisDelay)
	{
		this.m_timeStart = performance.now();
		this.m_millisDelay = nMillisDelay;
	}
	
	isExpired()
	{
		var bResult = false;
		var timeNow = performance.now();
		
		if ((timeNow - this.m_timeStart) >= this.m_millisDelay)
			bResult = true;

		return bResult;
	}
}


