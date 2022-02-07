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
var g_strSelectedComponentName = "";




//*************************************************************************
//*
//* PLACED COMPONENTS MAP FUNCTIONS
//*
//*************************************************************************

function doFindSelectedComponent(pointMousePos)
{
	var arrayComponentName = [];
	var strDeviceName = "", strSelectedDeviceName = "";
	
	g_mapPlacedComponents.forEach(function(strValue, strKey, map){arrayComponentName.push(strKey)});
	
	for (let nI = 0; nI < arrayComponentName.length; nI++)
	{
		strDeviceName = arrayComponentName[nI];
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
	var arrayComponentName = [];
	var strDeviceName = "", strSelectedDeviceName = "";
	
	g_mapPlacedComponents.forEach(function(strValue, strKey, map){arrayComponentName.push(strKey)});
	
	for (let nI = 0; nI < arrayComponentName.length; nI++)
	{
		strDeviceName = arrayComponentName[nI];
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
	var arrayComponentName = [];
	var strDeviceName = "";
	
	g_mapPlacedComponents.forEach(function(strValue, strKey, map){arrayComponentName.push(strKey)});
	
	for (let nI = 0; nI < arrayComponentName.length; nI++)
	{
		strDeviceName = arrayComponentName[nI];
		g_mapPlacedComponents.get(strDeviceName).doUnselect();
	}
}

function doDisplayAllComponents()
{
	var arrayComponentName = [];
	var strDeviceName = "";
	
	g_mapPlacedComponents.forEach(function(strValue, strKey, map){arrayComponentName.push(strKey)});
	
	doEraseCanvas();
	for (let nI = 0; nI < arrayComponentName.length; nI++)
	{
		strDeviceName = arrayComponentName[nI];
		g_mapPlacedComponents.get(strDeviceName).doDisplay();
	}
}

function doMouseOverAllComponents(pointMousePos)
{
	var arrayComponentName = [];
	var strDeviceName = "";
	var nI = 0;
	
	g_mapPlacedComponents.forEach(function(strValue, strKey, map){arrayComponentName.push(strKey)});
	
	for (nI = 0; nI < arrayComponentName.length; nI++)
	{
		strDeviceName = arrayComponentName[nI];
		if (g_mapPlacedComponents.get(strDeviceName).doMouseOver(pointMousePos))
			break;
	}
}




//*************************************************************************
//*
//* CONNECTED COMPONENT DETAILS
//*
//*************************************************************************

class CConnectedComponent
{
	constructor(strComponentName, strPinID)
	{
		this.m_strComponentName = strComponentName;
		this.m_strPinID = strPinID;
	}
	
	getComponentName()
	{
		return this.m_strComponentName;
	}
	
	getPinID()
	{
		return this.m_strPinID;
	}
	
}




//*************************************************************************
//*
//* CONNECTED COMPONENT ARRAY
//*
//*************************************************************************

class CConnectedComponentArray
{
	constructor(strParentComponent)
	{
		this.m_arrayConnectedComponents = [];
		this.m_strParentComponent = strParentComponent;
	}
	
	getLength()
	{
		return this.m_arrayConnectedComponents.length;
	}
	
	add(strComponentName, strPinID)
	{
		var ConnectedComponent = new CConnectedComponent(strComponentName, strPinID);
		this.m_arrayConnectedComponents.push(ConnectedComponent);
	}
	
	get(nIndex)
	{
		var ConnectedComponent = null;
		
		if ((nIndex >= 0) && (nIndex < this.m_arrayConnectedComponents.lengthdi))
		if ((nIndex >= 0) && (nIndex < this.m_arrayConnectedComponents.length))
		{
			ConnectedComponent = this.m_arrayConnectedComponents[nIndex];
		}
		else
		{
			doErrorMessage(g_strErrorMessage + "index '" + nIndex + "' for '" + this.m_strParentComponent + " pin array is invalid for length '" + getLength() + "'!");
		}
		return ConnectedComponent;
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
var g_strRename = "<div style=\"display:inline-block;\"><div style=\"" + g_strLabelStyle + "\">NEW NAME&nbsp;</div><div style=\"display:inline-block;\"><input value=\"XXXX\" id=\"TextRenameMCU\" maxlength=\"16\" type=\"text\" style=\"" + g_strTextStyle + "\" />&nbsp;<input id=\"ButtonRenameMCU\" type=\"button\" value=\"RENAME\" style=\"" + g_strButtonStyle + "\" onclick=\"doRename(document.getElementById('TextRenameMCU').value)\"/></div></div>";




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
		this.m_arrayPins = new CPinArray();
		this.m_strDeviceName = "";
		this.m_rectangle = new CRectangle(new CPoint(g_pointCanvasScrollPos.m_nX + 50, g_pointCanvasScrollPos.m_nY + 50), new CSize(0, 0));
		this.m_fScale = 1;
		this.m_nRotationAngle = 0;
		this.m_bSelected = false;
		this.m_pointLastMousePos = new CPoint(0, 0);
		this.m_strEditHTML = "";
		this.m_strType = strType;
		this.m_strEditHTML = g_strRename;
	}
	
	doWrite()
	{
		var strFileContents = "";
		
		strFileContents = this.m_strType + "\r\n";
		strFileContents += this.m_strDeviceName + "\r\n";
		strFileContents += this.m_nRotationAngle + "\r\n";
		strFileContents += this.m_rectangle.m_pointTL.m_nX + "\r\n";
		strFileContents += this.m_rectangle.m_pointTL.m_nY + "\r\n";
		
		return strFileContents;
	}
	
	getType()
	{
		return this.m_strType;
	}
	
	isMCU()
	{
		return this.m_strType == "MCU";
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
		this.m_arrayPins.doDisplay();
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
		
		if (this.isMouseIn(pointMousePos))
			g_Canvas.style.cursor = "pointer";
		else
			g_Canvas.style.cursor = "default";

		if (this.isMouseIn(pointMousePos))
		{
			bResult = true;
			for (var nI = 0; nI < this.m_arrayPins.getLength(); nI++)
			{
				if (this.m_arrayPins.get(nI).doMouseOver(pointMousePos))
				{
					break;
				}
			}
			if (nI >= this.m_arrayPins.getLength())
				this.doDisplay();
		}
		else
		{
			doShowInfo("", "");
			doDisplayAllComponents();
		}
		return bResult;
	}
	
	isMouseIn(pointMousePos)
	{	
		return this.m_rectangle.isMouseIn(pointMousePos);
	}

	doDeleteAllConnections()
	{
		this.m_arrayPins.doDeleteAllConnections();
	}
	
	doDeleteConnection(strPinID)
	{
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
		super("MCU");
		this.m_mapAnalogPins = new Map();
		this.m_arrayPins = new CPinArray();
		this.m_nMaxPin = 0;
		this.m_strMCUType = strType;
	}
	
	doWrite()
	{
		var strFileContents = super.doWrite();
		strFileContents += this.m_strMCUType + "\r\n";
		return strFileContents;
	}
	
	setDeviceName(strDeviceName)
	{
		super.setDeviceName(strDeviceName);
		this.m_arrayPins.setDeviceName(strDeviceName);
	}

	getImageFileName()
	{
		return super.getImageFileName();
	}
	
	getPin(PinID)
	{
		var nPinNum = -1;
		var mapAnalogPins = null;
		
		mapAnalogPins = MCU.getAnalogPinMap();
		if (mapAnalogPins != null)
		{
			if (NaN(PinID))
			{
				if (mapAnalogPins.has(PinID))
					nPinNum = mapAnalogPins[PinID];
				else
					doErrorMessage(g_strErrorMessage + "'" + strDeviceName + "' does not have pin '" + PinID + "'!");
			}	
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
		}
		return nPinNum;
	}
	
	digitalRead(PinID)
	{
		var nPinNum = getPin(PinID, this);
		var nState = 0;
		
		if (nPinNum != -1)
			nState = m_arrayPins.digitRead(nPinNum);

		return nState;
	}
	
	digitalWrite(PinID, nState)
	{
		var nPinNum = getPin(PinID, this);
		
		if (nPinNum != -1)
			m_arrayPins.digitWrite(nPinNum, nState);
	}
	
	analogRead(nPinNum)
	{
		var nPinNum = getPin(PinID, this);
		var nState = 0;
		
		if (nPinNum != -1)
			nState = m_arrayPins.analogRead(nPinNum);

		return nState;
	}
	
	analogWrite(nPinNum, nPWMVal)
	{
		var nPinNum = getPin(PinID, this);
		
		if (nPinNum != -1)
			m_arrayPins.analogWrite(nPinNum, nPWMVal);
	}
	
	doDisplay()
	{
		super.doDisplay();
	}

	doDeleteAllConnections()
	{
		super.doDeleteAllConnections();
	}
	
	doRotate(nAngleAdd)
	{
		super.doRotate(nAngleAdd);
	}
}

