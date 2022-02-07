//*************************************************************************
//*
//* PIN WITH CONNECTED COMPONENT
//*
//*************************************************************************

class CPin
{
	constructor(nPinNum, bIsPWM, bIsAnalog, strName, strParentName)
	{
		this.m_nPinNum = nPinNum;
		this.m_nState = 0;
		this.m_strMode = INPUT;
		this.m_arrayConnectedComponents = new CConnectedComponentArray();
		this.m_bIsPWM = bIsPWM;
		this.m_bIsAnalog = bIsAnalog;
		this.m_strParentName = strParentName;
		this.m_sizeOffsetFromTL = new CSize(0, 0);
		this.m_strName = strName;
		
		var point = new CPoint(0, 0);
		var size = new CSize(4, 4);
		this.m_rectangle = new CRectangle(point, size);
	}
	
	set(pointParentTL, sizeOffsetFromTL)
	{
		this.m_sizeOffsetFromTL = new CSize(sizeOffsetFromTL.m_nWidth, sizeOffsetFromTL.m_nHeight);
		this.doMove(pointParentTL);
	}
	
	doMove(pointParentTL)
	{
		this.m_rectangle.setPosition(new CPoint(pointParentTL.m_nX + this.m_sizeOffsetFromTL.m_nWidth, pointParentTL.m_nY + this.m_sizeOffsetFromTL.m_nHeight));
	}
		
	doDisplay(bFill)
	{
		g_CanvasContext.beginPath();
		g_CanvasContext.strokeStyle = "blue";
		g_CanvasContext.lineWidth  = "1";
		if (bFill)
		{
			g_CanvasContext.fillStyle = "blue";
			g_CanvasContext.fillRect(this.m_rectangle.m_pointTL.m_nX, this.m_rectangle.m_pointTL.m_nY, this.m_rectangle.m_size.m_nWidth, this.m_rectangle.m_size.m_nHeight);
			doShowInfo("PIN ID", this.m_strName);
		}
		else
		{
			g_CanvasContext.rect(this.m_rectangle.m_pointTL.m_nX, this.m_rectangle.m_pointTL.m_nY, this.m_rectangle.m_size.m_nWidth, this.m_rectangle.m_size.m_nHeight);
		}
		g_CanvasContext.stroke();
	}
	
	doMouseOver(RelativeMousePos)
	{
		var bResult = false;
		var rect = new CRectangle(this.m_rectangle.m_pointTL, this.m_rectangle.m_size);
		var pointCenter = rect.getCenter();
			
		 
		if (rect.isMouseIn(RelativeMousePos))
		{
			//if (g_mapPlacedComponents.get(this.m_strParentName) != null)
			//	g_mapPlacedComponents.get(this.m_strParentName).doDisplay();
			doDisplayAllComponents();
			
			this.doDisplay(true);
			this.m_bImageDrawn = true;
			
			bResult = true;
		}
		else
		{
			this.doDisplay(false);
			doShowInfo("", "");
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
	
	doConnection(strComponentName, strPindID)
	{
		var ConnectedComponent = new CConnectedComponent(strComponentName, strPindID);
		this.m_arrayConnectedComponents.add(ConnectedComponent);
	}
	
	doUpdate()
	{
		var strComponentName = "";
		
		for (let nI = 0; nI < this.m_arrayConnectedComponents.getLength(); nI++)
		{
			if (this.m_arrayConnectedComponents[nI] != null)
			{
				strComponentName = this.m_arrayConnectedComponents[nI].getName();
			
				if (g_mapPlacedComponents.has(strComponentName))
				{
					if ((this.m_strMode == "INPUT") || (this.m_strMode == "INPUT_HIGH"))
					{
						this.m_strState = g_mapPlacedComponents[strComponentName].getUpdate(this.m_arrayConnectedComponent[nI].getPinID(), this.m_nState);
					
						if (g_mapPlacedComponents.has(this.m_strParentName))
						{
							g_mapPlacedComponents[this.m_strParentName].doUpdate(this.m_nPinNum);
						}
					}
					else if (this.m_strMode == "OUTPUT")
					{
						g_mapPlacedComponents[strComponentName].doUpdate(this.m_arrayConnectedComponent[nI].getPinID(), this.m_nState);
					}
				}
			}
		}
	}
	
	doDeleteAllConnections()
	{
		var strDeviceName = "", strPinID = "";
		
		for (let nI = 0; nI < this.m_arrayConnectedComponents.getLength(); nI++)
		{
			strDeviceName = arrayDeviceName[nI].getDeviceName();
			strPinID = arrayDeviceName[nI].getPinID();
			if (g_mapPlacedComponents.get(strDeviceName) != null)
				g_mapPlacedComponents.get(strDeviceName).doDeleteConnection(strPinID);
		}
		this.m_arrayConnectedComponents = new CConnectedComponentArray();
	}
		
}




//*************************************************************************
//*
//* 5V PIN WITH CONNECTED COMPONENTS
//*
//*************************************************************************

class C5VPin extends CPin
{
	constructor(nPinNum, strParentName)
	{
		super(nPinNum, false, false, "5V", strParentName);
		this.m_nState = 5;
		this.m_strMode = OUTPUT;
	}
}




//*************************************************************************
//*
//* 3.3V PIN WITH CONNECTED COMPONENTS
//*
//*************************************************************************

class C3_3VPin extends CPin
{
	constructor(nPinNum, strParentName)
	{
		super(nPinNum, false, false, "3.3V", strParentName);
		this.m_nState = 3.3;
		this.m_strMode = OUTPUT;
	}
}




//*************************************************************************
//*
//* GND PIN WITH CONNECTED COMPONENTS
//*
//*************************************************************************

class CGNDPin extends CPin
{
	constructor(nPinNum, strParentName)
	{
		super(nPinNum, false, false, "GND", strParentName);
		this.m_nState = 0;
		this.m_strMode = OUTPUT;
	}
}




//*************************************************************************
//*
//* RESET PIN WITH CONNECTED COMPONENT
//*
//*************************************************************************

class CResetPin extends CPin
{
	constructor(nPinNum, strParentName)
	{
		super(nPinNum, false, false, "RESET", strParentName);
		this.m_nState = 0;
		this.m_strMode = INPUT;
	}
}




//*************************************************************************
//*
//* ARRAY OF PINS
//*
//*************************************************************************

class CPinArray
{
	constructor()
	{
		this.m_arrayPins = [];
		this.m_strDeviceName = "";
	}
	
	setDeviceName(strDeviceName)
	{
		this.m_strDeviceName = strDeviceName;
	}
	
	getLength()
	{
		return this.m_arrayPins.length;
	}
	
	add(Pin)
	{
		this.m_arrayPins.push(Pin);
	}
	
	get(nPinNum)
	{
		var Pin = null;
		
		if ((nPinNum >= 0) && (nPinNum < this.m_arrayPins.length))
			Pin = this.m_arrayPins[nPinNum];
		else
			doErrorMessage(g_strErrorMessage + "'" + this.m_strDeviceName + "' does not have a pin '" + nPinNum + "'!");
		
		return Pin;
	}
	
	doDisplay()
	{
		for (let nI = 0; nI < this.m_arrayPins.length; nI++)
			this.m_arrayPins[nI].doDisplay(false);
	}
	
	digitalRead(nPinNum)
	{
		var nState = 0;
		
		if ((nPinNum >= 0) && (nPinNum < m_arrayPins.length))
			nState = this.m_arrayPins[nPinNum].digitalRead();
		else
			doErrorMessage(g_strErrorMessage + "'" + this.m_strDeviceName + "' does not have a pin '" + nPinNum + "'!");
		
		return nState;
	}
	
	digitalWrite(nPinNum, nState)
	{	
		if ((nPinNum >= 0) && (nPinNum < m_arrayPins.length))
			this.m_arrayPins[nPinNum].digitalWrite(nState);
		else
			doErrorMessage(g_strErrorMessage + "'" + this.m_strDeviceName + "' does not have a pin '" + nPinNum + "'!");
	}

	analogRead(nPinNum)
	{
		var nValue = 0;
		
		if ((nPinNum >= 0) && (nPinNum < m_arrayPins.length))
			nValue = this.m_arrayPins[nPinNum].analogRead();
		else
			doErrorMessage(g_strErrorMessage + "'" + this.m_strDeviceName + "' does not have a pin '" + nPinNum + "'!");
		
		return nValue;
	}
	
	analogWrite(nPinNum, nPWMVal)
	{
		if ((nPinNum >= 0) && (nPinNum < m_arrayPins.length))
			this.m_arrayPins[nPinNum].analogWrite(nPWMVal);
		else
			doErrorMessage(g_strErrorMessage + "'" + this.m_strDeviceName + "' does not have a pin '" + nPinNum + "'!");
	}
	
	doMove(pointParentTL)
	{
		for (let nI = 0; nI < this.m_arrayPins.length; nI++)
			this.m_arrayPins[nI].doMove(pointParentTL);
	}
	
	doDeleteAllConnections()
	{
		for (let nI = 0; nI < this.m_arrayPins.length; nI++)
			this.m_arrayPins[nI].doDeleteAllConnections();
	}

}




