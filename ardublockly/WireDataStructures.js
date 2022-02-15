//*************************************************************************
//*
//* CONNECTED COMPONENT DETAILS
//*
//*************************************************************************

class CConnectedDevice
{
	constructor(strDeviceName, strPinID, strType, nNodeIndex)
	{
		this.m_strDeviceName = strDeviceName;
		this.m_strPinID = strPinID;
		this.m_strType = strType;
		this.m_nNodeIndex = nNodeIndex;
	}
	
	getDeviceName()
	{
		return this.m_strDeviceName;
	}
	
	getPinID()
	{
		return this.m_strPinID;
	}
	
	getType()
	{
		return this.m_strType;
	}
	
	getNodeIndex()
	{
		return this.m_nNodeIndex;
	}
	
	setDeviceName(strDeviceName)
	{
		this.m_strDeviceName = strDeviceName;
	}
	
	setPinID(strPinID)
	{
		this.m_strPinID = strPinID;
	}
	
	setType(strType)
	{
		this.m_strType = strType;
	}
	
	setNodeIndex(nNodeIndex)
	{
		this.m_nNodeIndex = nNodeIndex;
	}
	
	isEmpty()
	{
		return (this.m_strDeviceName == "") && (this.m_strPinID == "");
	}
	
}




//*************************************************************************
//*
//* WIRE
//*
//*************************************************************************

function doChangeWireColor(strNewColor)
{
	var strName = doFindSelectedComponentNoMouse();
	
	if ((strName != "") && (g_mapPlacedComponents.get(strName) != null) && (g_mapPlacedComponents.get(strName).getType() == "WIRE"))
	{
		g_mapPlacedComponents.get(strName).doSetColor(strNewColor);
		doDisplayAllComponents();
	}	
}

class CWire
{
	static m_nWireCount = 1;
	static m_nNodeRadius = 4;
	
	constructor(strColor)
	{
		CWire.m_nWireCount++;
		this.m_arrayPoints = [];
		this.m_strColor = strColor;
		this.m_strType = "WIRE";
		this.m_strDeviceName = this.m_strType + CWire.m_nWireCount;
		this.m_nWidth = 3;
		this.m_bSelected = false;
		this.m_pointTemp = new CPoint(0, 0);
		this.m_nIndexGrabbedPoint = -1;
		this.m_arrayConnectedDevices = [];
		this.m_bHighlight = false;
		this.m_pointLastMousePos = new CPoint(0, 0);
		this.m_TempConnectedDevice = new CConnectedDevice("", "", "", -1);
		this.m_nZoom = 0;
		
		this.m_strHTML = "&nbsp;&nbsp;<div style=\"display:inline-block;position:relative;top:2Px;\">WIRE COLORS: </div><div style=\"" + g_strSecondDivDisplayStyle + "position:relative;top:4Px;\" id=\"fix\">" + 

		"<div onclick=\"doChangeWireColor(document.getElementById('red_wire').style.backgroundColor)\" id=\"red_wire\" class=\"change_wire_color\" style=\"background-color:#DD0000\"></div>" +
		"<div onclick=\"doChangeWireColor(document.getElementById('orange_wire').style.backgroundColor)\" id=\"orange_wire\" class=\"change_wire_color\" style=\"background-color:#CA6000\"></div>" +
		"<div onclick=\"doChangeWireColor(document.getElementById('yellow_wire').style.backgroundColor)\" id=\"yellow_wire\" class=\"change_wire_color\" style=\"background-color:#FFFF00\"></div>" +
		"<div onclick=\"doChangeWireColor(document.getElementById('green_wire').style.backgroundColor)\" id=\"green_wire\" class=\"change_wire_color\" style=\"background-color:#008000\"></div>" +
		"<div onclick=\"doChangeWireColor(document.getElementById('purple_wire').style.backgroundColor)\" id=\"purple_wire\" class=\"change_wire_color\" style=\"background-color:#800080\"></div>" +
		"<div onclick=\"doChangeWireColor(document.getElementById('brown_wire').style.backgroundColor)\" id=\"brown_wire\" class=\"change_wire_color\" style=\"background-color:#A52A2A\"></div>" +
		"<div onclick=\"doChangeWireColor(document.getElementById('blue_wire').style.backgroundColor)\" id=\"blue_wire\" class=\"change_wire_color\" style=\"background-color:#000080\"></div>" +
		"<div onclick=\"doChangeWireColor(document.getElementById('grey_wire').style.backgroundColor)\" id=\"grey_wire\" class=\"change_wire_color\" style=\"background-color:#606060\"></div>" +
		"<div onclick=\"doChangeWireColor(document.getElementById('black_wire').style.backgroundColor)\" id=\"black_wire\" class=\"change_wire_color\" style=\"background-color:#000000\"></div>" +
		
		"</div>";
	}
	
	doRun()
	{
	}
	
	getVoltage(strDeviceNameIn, strPinIDIn)
	{
		var strDeviceNameOut = "", strPinIDOut = "";
		var fVoltage = 0;
		
		if ((this.m_arrayConnectedDevices.length > 0) && (this.m_arrayConnectedDevices[0].getDeviceName() != strDeviceNameIn) && (this.m_arrayConnectedDevices[0].getPinID() != strPinIDIn))
		{
			strDeviceNameOut = this.m_arrayConnectedDevices[0].getDeviceName();
			strPinIDOut = this.m_arrayConnectedDevices[0].getPinID();
		}
		else if ((this.m_arrayConnectedDevices.length > 1) && (this.m_arrayConnectedDevices[1].getDeviceName() != strDeviceNameIn) && (this.m_arrayConnectedDevices[1].getPinID() != strPinIDIn))
		{	
			strDeviceNameOut = this.m_arrayConnectedDevices[1].getDeviceName();
			strPinIDOut = this.m_arrayConnectedDevices[1].getPinID();
		}
		if ((strDeviceNameOut != "") && g_mapPlacedComponents.get(strDeviceNameOut))
			fVoltage = g_mapPlacedComponents.get(strDeviceNameOut).getVoltage(strDeviceNameOut, strPinIDOut);
		
		return fVoltage;
	}
	
	getResistance(strDeviceNameIn, strPinIDIn)
	{
		var strDeviceNameOut = "", strPinIDOut = "";
		var fResistance = 0;
		
		if ((this.m_arrayConnectedDevices.length > 0) && (this.m_arrayConnectedDevices[0].getDeviceName() != strDeviceNameIn) && (this.m_arrayConnectedDevices[0].getPinID() != strPinIDIn))
		{
			strDeviceNameOut = this.m_arrayConnectedDevices[0].getDeviceName();
			strPinIDOut = this.m_arrayConnectedDevices[0].getPinID();
		}
		else if ((this.m_arrayConnectedDevices.length > 1) && (this.m_arrayConnectedDevices[1].getDeviceName() != strDeviceNameIn) && (this.m_arrayConnectedDevices[1].getPinID() != strPinIDIn))
		{	
			strDeviceNameOut = this.m_arrayConnectedDevices[1].getDeviceName();
			strPinIDOut = this.m_arrayConnectedDevices[1].getPinID();
		}
		if ((strDeviceNameOut != "") && g_mapPlacedComponents.get(strDeviceNameOut))
			fResistance += g_mapPlacedComponents.get(strDeviceNameOut).getResistance(strDeviceNameOut, strPinIDOut);
		
		return fResistance;
	}
	
	isConnected()
	{
		return this.m_arrayConnectedDevices.length > 0;
	}
	
	getNumConnections()
	{
		return this.m_arrayConnectedDevices.length;
	}
	
	getConnectionName(nIndex)
	{
		var strName = "";
		
		if ((nIndex >= 0) && (nIndex < this.m_arrayConnectedDevices.length))
			strName = this.m_arrayConnectedDevices[nIndex].getDeviceName();
		
		return strName;
	}
	
	getType()
	{
		return "WIRE";
	}
	
	getColor()
	{
		return this.m_strColor;
	}
	
	setColor(strNewColor)
	{
		this.m_strColor = strNewColor;
	}
	
	getDeviceName()
	{
		return this.m_strDeviceName;
	}
	
	doAppendNode(pointNew)
	{
		pointNew.m_nX -= (pointNew.m_nX % g_nGridSize);
		pointNew.m_nY -= (pointNew.m_nY % g_nGridSize);
		this.m_arrayPoints[this.m_arrayPoints.length] = pointNew;
		this.m_arrayPoints[this.m_arrayPoints.length] = new CPoint(pointNew.m_nX + 10, pointNew.m_nY + 10);
		this.m_nIndexGrabbedPoint = this.m_arrayPoints.length - 1;
	}
	
	doDeleteNode(nIndex)
	{
		var arrayNew = [];
		
		for (let nI = 0; nI < nIndex; nI++)
			arrayNew[arrayNew.length] = this.m_arrayPoints[nI];
			
		for (let nI = nIndex + 1; nI < this.m_arrayPoints.length; nI++)
			arrayNew[arrayNew.length] = this.m_arrayPoints[nI];
			
		this.m_arrayPoints = arrayNew;
	}
	
	doInsertNode(pointNew)
	{
		var arrayNew = [];
	
		pointNew.m_nX -= (pointNew.m_nX % g_nGridSize);
		pointNew.m_nY -= (pointNew.m_nY % g_nGridSize);
		
		if (this.m_arrayPoints.length == 2)
		{
			if (this.doesLineContain(this.m_arrayPoints[0], this.m_arrayPoints[1], pointNew, this.m_nWidth))
			{
				arrayNew[arrayNew.length] = this.m_arrayPoints[0];
				arrayNew[arrayNew.length] = pointNew;
				arrayNew[arrayNew.length] = this.m_arrayPoints[1];
				this.m_arrayPoints = arrayNew;
				this.doDisplay();
			}
		}
		else
		{
			for (var nI = 1; nI < this.m_arrayPoints.length; nI++)
			{
				if (this.doesLineContain(this.m_arrayPoints[nI - 1], this.m_arrayPoints[nI], pointNew, this.m_nWidth))
				{
					for (let nJ = 0; nJ < nI; nJ++)
						arrayNew[arrayNew.length] = this.m_arrayPoints[nJ];
						
					arrayNew[arrayNew.length] = pointNew;
					
					for (let nJ = nI; nJ < this.m_arrayPoints.length; nJ++)
						arrayNew[arrayNew.length] = this.m_arrayPoints[nJ];
					this.m_arrayPoints = arrayNew;
					this.doDisplay();
					break;
				}
			}
		}
	}

	doesNodeContain(pointMouse, pointNode, nRadius) 
	{
		var nDistancePoints = (pointMouse.m_nX - pointNode.m_nX) * (pointMouse.m_nX - pointNode.m_nX) + 
								(pointMouse.m_nY - pointNode.m_nY) * (pointMouse.m_nY - pointNode.m_nY);
		var bContains = false;
		
		nRadius *= nRadius;
		if (nDistancePoints < nRadius) 
			bContains = true;

		return bContains;
	}

	doesLineContain(pointStart, pointEnd, pointMouse, nLineWidth)
	{
		var pointTemp = new CPoint(0, 0);
		var bContains = false;
		var nTolerance = nLineWidth * 2;

		// Normalize start/end to left right to make the nOffset calc simpler.
		if (pointStart.m_nX > pointEnd.m_nX)
		{
			pointTemp = pointStart;
			pointStart = pointEnd;
			pointEnd  = pointTemp;
		}

		// If pointMouse is out of bounds, no need to do further checks.                  
		if (pointMouse.m_nX + nLineWidth < pointStart.m_nX || pointEnd.m_nX < pointMouse.m_nX - nLineWidth)
			bContains = false;
		else if (pointMouse.m_nY + nLineWidth < Math.min(pointStart.m_nY, pointEnd.m_nY) || Math.max(pointStart.m_nY, pointEnd.m_nY) < pointMouse.m_nY - nLineWidth)
			bContains = false;
		else
		{
			var nDeltaX = pointEnd.m_nX - pointStart.m_nX;
			var nDeltaY = pointEnd.m_nY - pointStart.m_nY;

			// If the line is straight, the earlier boundary check is enough to determine that the pointMouse is on the line.
			// Also prevents division by zero exceptions.
			if ((nDeltaX == 0) || (nDeltaY == 0)) 
				bContains = true;
			else
			{
				var nSlope = nDeltaY / nDeltaX;
				var nOffset = pointStart.m_nY - pointStart.m_nX * nSlope;
				var nCalculatedY  = pointMouse.m_nX * nSlope + nOffset;

				// Check calculated Y matches the points Y coord with some easing.
				bContains = ((pointMouse.m_nY - nTolerance) <= nCalculatedY) && (nCalculatedY <= (pointMouse.m_nY + nTolerance));
			}
		}
		return bContains;            
	}
	
	isMouseInNode(pointMousePos)
	{
		for (var nI = 0; nI < this.m_arrayPoints.length; nI++)
		{
			if (this.doesNodeContain(pointMousePos, this.m_arrayPoints[nI], CWire.m_nNodeRadius))
				break;
		}
		if (nI >= this.m_arrayPoints.length)
			nI = -1;
			
		return nI;
	}

	isMouseIn(pointMousePos)
	{
		var bResult = false;
		
		if (this.m_arrayPoints.length == 2)
		{
			bResult = this.doesLineContain(this.m_arrayPoints[0], this.m_arrayPoints[1], pointMousePos, this.m_nWidth);
		}
		else
		{
			for (let nI = 1; nI < this.m_arrayPoints.length; nI++)
			{
				bResult = this.doesLineContain(this.m_arrayPoints[nI - 1], this.m_arrayPoints[nI], pointMousePos, this.m_nWidth);
				if (bResult)
					break;
			}
		}
		return bResult;
	}
	
	isMouseInPin(pointMousePos)
	{
		return false;
	}
	
	isEmpty()
	{
		return this.m_arrayPoints.length < 2;
	}
	
	isSelected()
	{
		return this.m_bSelected;
	}
	
	doSelect()
	{
		this.m_bSelected = true;
		doDisplayInfo("Click the right mouse button on the wire to add or remove nodes & hold the left mouse button on a node or the wire to drag them...");
		doShowEditFields(this.m_strHTML);
	}
	
	doUnselect()
	{
		this.m_bSelected = false;
	}
	
	doConnectedMove(pointMousePos, strConnectedDeviceName, strPinID)
	{
		for (let nI = 0; nI < this.m_arrayConnectedDevices.length; nI++)
		{
			if (this.m_arrayConnectedDevices[nI].getDeviceName() == strConnectedDeviceName)
			{
				this.m_arrayPoints[this.m_arrayConnectedDevices[nI].getNodeIndex()] = new CPoint(pointMousePos.m_nX, pointMousePos.m_nY);
			}
		}
	}
	
	findConnectedDevice(strDeviceName)
	{
		var nIndex = -1;
		
		for (let nI = 0; nI < this.m_arrayConnectedDevices.length; nI++)
		{
			if (this.m_arrayConnectedDevices[nI].getDeviceName() == strDeviceName)
			{
				nIndex = nI;
				break;
			}
		}
		return nIndex;
	}
	
	doDrop(pointMousePos)
	{
		if (this.m_arrayPoints.length < 1)
			this.m_pointTemp = new CPoint(pointMousePos.m_nX - (pointMousePos.m_nX % 10), pointMousePos.m_nY - (pointMousePos.m_nY % 10));
		else if (this.m_nIndexGrabbedPoint > -1)
			this.m_arrayPoints[this.m_nIndexGrabbedPoint] = new CPoint(pointMousePos.m_nX - (pointMousePos.m_nX % 10), pointMousePos.m_nY - (pointMousePos.m_nY % 10));

		if (!this.m_TempConnectedDevice.isEmpty())
		{
			var nI = this.findConnectedDevice(this.m_TempConnectedDevice.getDeviceName());
			if (nI == -1)
				this.m_arrayConnectedDevices[this.m_arrayConnectedDevices.length] = 
									new CConnectedDevice(this.m_TempConnectedDevice.getDeviceName(), this.m_TempConnectedDevice.getPinID(), this.m_TempConnectedDevice.getType(), this.m_TempConnectedDevice.getNodeIndex());
			else
				this.m_arrayConnectedDevices[nI] = 
									new CConnectedDevice(this.m_TempConnectedDevice.getDeviceName(), this.m_TempConnectedDevice.getPinID(), this.m_TempConnectedDevice.getType(), this.m_TempConnectedDevice.getNodeIndex());
			
			let point = g_mapPlacedComponents.get(this.m_TempConnectedDevice.m_strDeviceName).getPinPos(this.m_TempConnectedDevice.m_strPinID);
			g_mapPlacedComponents.get(this.m_TempConnectedDevice.m_strDeviceName).setWire(this.m_TempConnectedDevice.m_strPinID, this.m_strDeviceName);
			if ((this.m_nIndexGrabbedPoint >= 0) && (this.m_nIndexGrabbedPoint < this.m_arrayPoints.length))
				this.m_arrayPoints[this.m_TempConnectedDevice.getNodeIndex()] = new CPoint(point.m_nX, point.m_nY);
								
		}
		this.m_nIndexGrabbedPoint = -1;
	}
	
	doGrab(pointMousePos)
	{
		this.doSelect();
		this.m_nIndexGrabbedPoint = this.isMouseInNode(pointMousePos);
		
		if (!this.isConnected() || (this.m_nIndexGrabbedPoint > -1))
			g_Canvas.style.cursor = "grabbing";
		else
			g_Canvas.style.cursor = "pointer";
	}

	doMove(pointMousePos)
	{
		if ((this.m_nIndexGrabbedPoint != -1) || (this.m_arrayPoints.length == 0))
		{
			if (this.m_arrayPoints.length < 1)
				this.m_pointTemp = new CPoint(pointMousePos.m_nX, pointMousePos.m_nY);
			else if (this.m_nIndexGrabbedPoint > -1)
				this.m_arrayPoints[this.m_nIndexGrabbedPoint] = new CPoint(pointMousePos.m_nX, pointMousePos.m_nY);

			var strDeviceName = doFindSelectedComponent(pointMousePos), strPinID = "";
			var Component = g_mapPlacedComponents.get(strDeviceName);
			var nPinNum = 0;
			
			this.m_bHighlight = false;
			this.m_TempConnectedDevice.setDeviceName("");
			this.m_TempConnectedDevice.setPinID("");
			this.m_TempConnectedDevice.setType("");
			this.m_TempConnectedDevice.setNodeIndex(-1);
			if (Component != null)
			{
				nPinNum = g_mapPlacedComponents.get(strDeviceName).isMouseInPin(pointMousePos);	
				if (nPinNum > -1)
				{
					if (g_mapPlacedComponents.get(strDeviceName).getType() != "WIRE")
					{
						if (this.isFirstOrLastPoint(this.m_nIndexGrabbedPoint))
						{
							strPinID = g_mapPlacedComponents.get(strDeviceName).getPinID(nPinNum);
							this.m_bHighlight = true;
							this.m_TempConnectedDevice.setDeviceName(strDeviceName);
							this.m_TempConnectedDevice.setPinID(strPinID);
							this.m_TempConnectedDevice.setType(g_mapPlacedComponents.get(strDeviceName).getType());
							this.m_TempConnectedDevice.setNodeIndex(this.m_nIndexGrabbedPoint);
						}
					}
				}
			}
		}
		else if (!this.isConnected())
		{
			if (!this.m_pointLastMousePos.isEmpty())
			{
				let nDeltaX = pointMousePos.m_nX - this.m_pointLastMousePos.m_nX,
					nDeltaY = pointMousePos.m_nY - this.m_pointLastMousePos.m_nY,
					pointCurrent = null;

				for (let nI = 0; nI < this.m_arrayPoints.length; nI++)
				{
					pointCurrent = this.m_arrayPoints[nI];
					pointCurrent.m_nX += nDeltaX;
					pointCurrent.m_nY += nDeltaY;
					this.m_arrayPoints[nI] = pointCurrent;
				}
			}
			this.m_pointLastMousePos = pointMousePos;
		}
		this.doDisplay();
	}

	doMouseOver(pointMousePos)
	{
		var OldCursor = g_Canvas.style.cursor;
		
		if (this.isMouseInNode(pointMousePos) > -1)
			g_Canvas.style.cursor = "grab";
		else if (this.isMouseIn(pointMousePos))
		{
			if (!this.isConnected())
				g_Canvas.style.cursor = "grab";
			else
				g_Canvas.style.cursor = "pointer";
		}
		else 
			g_Canvas.style.cursor = "default";
		
		return g_Canvas.style.cursor != OldCursor;
	}

	doDefaultZoom()
	{
		this.m_nZoom = 0;
	}
	
	doZoomIn()
	{
		if (this.m_nZoom < 10)
		{
			this.m_nZoom++;
		}
	}
	
	doZoomOut()
	{
		if (this.m_nZoom > -10)
		{
			this.m_nZoom--;
		}
	}
	
	getZoomedValue(nValue)
	{
		var nValueNew = nValue;
		var nFudge = 0.2;
		
		nValueNew += nFudge * this.m_nZoom;

		return nValueNew;	
	}
	
	doRotate(nAngleAdd)
	{
	}
	
	doDelete()
	{
		var strName = "";
		
		for (let nI = 0; nI < this.m_arrayConnectedDevices.length; nI++)
		{
			strName = this.m_arrayConnectedDevices[nI].getDeviceName();
			g_mapPlacedComponents.get(strName).doDeleteWire(this.m_strDeviceName);
		}
	}
	
	doDisplayNode(pointMouse, strColor, bHighlight)
	{
		if (bHighlight)
		{
			g_CanvasContext.arc(pointMouse.m_nX, pointMouse.m_nY, this.getZoomedValue(CWire.m_nNodeRadius) * 2, 0, 2 * Math.PI);
			doDisplayHint("PIN ID", this.m_TempConnectedDevice.getPinID());
		}
		else
			g_CanvasContext.arc(pointMouse.m_nX, pointMouse.m_nY, this.getZoomedValue(CWire.m_nNodeRadius), 0, 2 * Math.PI);
	}

	isFirstOrLastPoint(nIndex)
	{
		return (nIndex == 0) || (nIndex == (this.m_arrayPoints.length - 1));
	}
	
	doDisplay()
	{
		var nX = 0, nY = 0;
				
		g_CanvasContext.strokeStyle = this.m_strColor;
		g_CanvasContext.lineWidth = this.getZoomedValue(this.m_nWidth);
		g_CanvasContext.fillStyle = this.m_strColor;
		
		if (this.m_arrayPoints.length < 1)
		{
			g_CanvasContext.beginPath();
			this.doDisplayNode(this.m_pointTemp, this.m_strColor, this.m_bHighlight);
			g_CanvasContext.stroke();	
			g_CanvasContext.fill();	
		}
		else
		{
			g_CanvasContext.beginPath();
			g_CanvasContext.moveTo(this.m_arrayPoints[0].m_nX, this.m_arrayPoints[0].m_nY);
			for (let nI = 1; nI < this.m_arrayPoints.length; nI++)
			{
				nX = this.m_arrayPoints[nI].m_nX;
				nY = this.m_arrayPoints[nI].m_nY;
				g_CanvasContext.lineTo(nX, nY);
			}
			g_CanvasContext.stroke();	
			
			if (this.m_bSelected)
			{
				for (let nI = 0; nI < this.m_arrayPoints.length; nI++)
				{
					g_CanvasContext.beginPath();
					this.doDisplayNode(this.m_arrayPoints[nI], this.m_strColor, 
											this.m_bHighlight && (nI == this.m_nIndexGrabbedPoint) && this.isFirstOrLastPoint(this.m_nIndexGrabbedPoint));
					g_CanvasContext.stroke();
					g_CanvasContext.fill();
				}
			}
		}
	}

}
