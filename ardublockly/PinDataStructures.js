//*************************************************************************
//*
//* PIN WITH CONNECTED COMPONENT
//*
//*************************************************************************

class CPin
{
	constructor(nPinNum, bIsPWM, bIsAnalog, strPinID, strParentDeviceName)
	{
		this.m_nPinNum = nPinNum;
		this.m_nState = 0;
		this.m_strMode = INPUT;
		this.m_bIsPWM = bIsPWM;
		this.m_bIsAnalog = bIsAnalog;
		this.m_sizeOffsetFromTL = new CSize(0, 0);
		this.m_strParentDeviceName = strParentDeviceName;
		this.m_strPinID = strPinID;
		this.m_strWireName = "";
		
		var point = new CPoint(0, 0);
		var size = new CSize(4, 4);
		this.m_rectangle = new CRectangle(point, size);
	}

	canAcceptConection()
	{
		return this.m_strWireName == "";
	}
	
	doSetDeviceName(strParentDeviceName)
	{
		this.m_strParentDeviceName = strParentDeviceName;
	}
	
	isDataPin()
	{
		return true;
	}
	
	getType()
	{
		return "PIN";
	}
	
	getPinID()
	{
		return this.m_strPinID;
	}
	
	getWire()
	{
		return this.m_strWireName;
	}
	
	setWire(strWireName)
	{
		this.m_strWireName = strWireName;
	}
	
	doDeleteWire(strWireName)
	{
		if (this.m_strWireName == strWireName)
			this.m_strWireName = "";
	}
	
	set(pointParentTL, sizeOffsetFromTL)
	{
		this.m_sizeOffsetFromTL = new CSize(sizeOffsetFromTL.m_nWidth, sizeOffsetFromTL.m_nHeight);
		this.doMove(pointParentTL);
	}
	
	getPosition()
	{
		return this.m_rectangle.getCenter();
	}
	
	doConnectedMove(strParentDeviceName)
	{
		if ((this.m_strWireName != "") && (g_mapPlacedComponents.get(this.m_strWireName) != null))
			g_mapPlacedComponents.get(this.m_strWireName).doConnectedMove(this.m_rectangle.getCenter(), strParentDeviceName, this.m_strPinID);
	}
	
	doMove(pointParentTL)
	{
		this.m_rectangle.setPosition(new CPoint(pointParentTL.m_nX + this.m_sizeOffsetFromTL.m_nWidth, pointParentTL.m_nY + this.m_sizeOffsetFromTL.m_nHeight));
	}
	
	doGetZoomFactor()
	{
		var nZoom = g_mapPlacedComponents.get(this.m_strParentDeviceName).getZoom();
		var nFudge = 1.06;
		
		if (nZoom == 0)
			nZoom = 1;
		else if (nZoom < 0)
			nZoom = 1 / (Math.abs(nZoom) * nFudge);
		else if (nZoom > 0)
			nZoom *= nFudge;
		
		return nZoom;
	}
		
	doDisplay(bFill)
	{
		var rect = this.m_rectangle;
		var nZoomFactor = this.doGetZoomFactor();
		
		g_CanvasContext.beginPath();
		g_CanvasContext.strokeStyle = "blue";
		g_CanvasContext.lineWidth  = "1";
		if (bFill)
		{
			g_CanvasContext.fillStyle = "blue";
			g_CanvasContext.fillRect(rect.m_pointTL.m_nX * nZoomFactor, rect.m_pointTL.m_nY * nZoomFactor, rect.m_size.m_nWidth, rect.m_size.m_nHeight);
			doDisplayHint("PIN ID", this.m_strPinID);
		}
		else
		{
			g_CanvasContext.rect(rect.m_pointTL.m_nX * nZoomFactor, rect.m_pointTL.m_nY * nZoomFactor, rect.m_size.m_nWidth, rect.m_size.m_nHeight);
		}
		g_CanvasContext.stroke();
		
		if ((this.m_strWireName != "") && (g_mapPlacedComponents.get(this.m_strWireName) != null))
			g_mapPlacedComponents.get(this.m_strWireName).doDisplay();
	}
	
	isMouseIn(pointMousePos)
	{
		return this.m_rectangle.isMouseIn(pointMousePos);
	}
	
	doMouseOver(pointMousePos)
	{
		var bResult = false;
		var rect = new CRectangle(this.m_rectangle.m_pointTL, this.m_rectangle.m_size);
		var pointCenter = rect.getCenter();
			
		 
		if (rect.isMouseIn(pointMousePos))
		{
			doDisplayAllComponents();
			
			this.doDisplay(true);
			this.m_bImageDrawn = true;
			
			bResult = true;
		}
		else
		{
			this.doDisplay(false);
			doDisplayHint("", "");
		}
		return bResult;
	}
	
	pinMode(strMode)
	{
		if ((strMode != INPUT_HIGH) && (strMode != INPUT) && (strMode != OUTPUT))
			doErrorMessage(g_strErrorMessage + "unexpected pin mode '" + strMode + "' for pin '" + this.m_nPinNum + "'!");
		else
			this.m_strMode = strMode;
	}
	
	digitalread()
	{
		var nState = 0;
		
		if ((this.m_nState == INPUT) || (this.m_nState == INPUT_HIGH))
			nState = this.m_nState;
		else
			doErrorMessage(g_strErrorMessage + "attempting to read from pin '" + this.m_nPinNum + "' which is in '" + this.m_strMode + "' mode!");
		
		return nState;
	}
	
	digitalWrite(nState)
	{
		if (nState > HIGH)
			nState = HIGH;
		else if (nState < LOW)
			nState = LOW;
		else if (NaN(nState))
			doErrorMessage(g_strErrorMessage + "attempting to write to pin '" + this.m_nPinNum + "' a non numeric value '" + this.nState + "'!");

		if (this.m_strMode == OUTPUT)
			this.m_nState = nState;
		else
			doErrorMessage(g_strErrorMessage + "attempting to write to pin '" + this.m_nPinNum + "' which is in '" + this.m_strMode + "' mode!");
	}
	
	analogWrite(nPWMVal)
	{
		if (this.m_strMode != OUTPUT)
			doErrorMessage(g_strErrorMessage + "attempting to analog write to pin '" + this.m_nPinNum + "' which is in '" + this.m_strMode + "' mode!");
		else if (!this.m_bIsPWM)
			doErrorMessage(g_strErrorMessage + "attempting to analog write to pin '" + this.m_nPinNum + "' which is not a PWM pin!");
		else
			this.m_nState = nPWMVal
	}
	
	analogRead()
	{
		var nVal = 0;
		
		if (this.m_strMode == OUTPUT)
			doErrorMessage(g_strErrorMessage + "attempting to analog read from pin '" + this.m_nPinNum + "' which is in '" + this.m_strMode + "' mode!");
		else
			nVal = this.m_nState;
		
		return nVal;
	}
	
	doUpdate()
	{
		var strName = "";
		var Wire = g_mapPlacedComponents.get(this.m_strWireName);
		
		if (Wire != null)
		{
			for (let nI = 0; nI < Wire.doGetNumConnections(); nI++)
			{
				strName = Wire.doGetConnectionName(nI);
				if ((strName != "") && (g_mapPlacedComponents.get(strName) != null))
				{
					g_mapPlacedComponents.get(strName).doUpdate(this.m_nState);
				}
			}
		}
	}
	
	doRun()
	{
	}

	doDeleteWire(strWireName)
	{
		if (this.m_strWireName == strWireName)
			this.m_strWireName = "";
	}
	
	getVoltage()
	{
		var fVoltage = 0;
		
		fVoltage = g_mapPlacedComponents.get(this.m_strWireName).getVoltage(this.m_strParentDeviceName, this.m_strPinID);
		
		return fVoltage;
	}
	
	getResistance()
	{
		var fResistance = 0;
		
		fResistance += g_mapPlacedComponents.get(this.m_strWireName).getResistance(this.m_strParentDeviceName, this.m_strPinID);
		
		return fResistance;
	}
	
}




//*************************************************************************
//*
//* 5V PIN WITH CONNECTED COMPONENTS
//*
//*************************************************************************

class C5VPin extends CPin
{
	static m_nPinIDCounter = 1;
	
	constructor(nPinNum, strParentDeviceName)
	{
		super(nPinNum, false, false, "5V_" + C5VPin.m_nPinIDCounter, strParentDeviceName);
		C5VPin.m_nPinIDCounter++;
		this.m_nState = HIGH;
		this.m_strMode = OUTPUT;
	}

	isDataPin()
	{
		return false;
	}
	
	getState()
	{
		return HIGH;
	}
	
}




//*************************************************************************
//*
//* 3.3V PIN WITH CONNECTED COMPONENTS
//*
//*************************************************************************

class C3_3VPin extends CPin
{
	static m_nPinIDCounter = 1;
	
	constructor(nPinNum, strParentDeviceName)
	{
		super(nPinNum, false, false, "3.3V_" + C3_3VPin.m_nPinIDCounter, strParentDeviceName);
		C3_3VPin.m_nPinIDCounter++;
		this.m_nState = HIGH;
		this.m_strMode = OUTPUT;
	}
	
	isDataPin()
	{
		return false;
	}
	
	getState()
	{
		return HIGH;
	}
	
}




//*************************************************************************
//*
//* GND PIN WITH CONNECTED COMPONENTS
//*
//*************************************************************************

class CGNDPin extends CPin
{
	static m_nPinIDCounter = 1;
	
	constructor(nPinNum, strParentDeviceName)
	{
		super(nPinNum, false, false, "GND_" + CGNDPin.m_nPinIDCounter, strParentDeviceName);
		CGNDPin.m_nPinIDCounter++;
		this.m_nState = LOW;
		this.m_strMode = OUTPUT;
	}

	isDataPin()
	{
		return false;
	}
	
	getState()
	{
		return LOW;
	}
	
}




//*************************************************************************
//*
//* RESET PIN WITH CONNECTED COMPONENT
//*
//*************************************************************************

class CResetPin extends CPin
{
	constructor(nPinNum, strParentDeviceName)
	{
		super(nPinNum, false, false, "RESET", strParentDeviceName);
		this.m_nState = 0;
		this.m_strMode = INPUT;
	}

	isDataPin()
	{
		return false;
	}
	
}

