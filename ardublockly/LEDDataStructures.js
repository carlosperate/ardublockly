//*************************************************************************
//*
//* STANDARD LED
//*
//*************************************************************************

function doClick(strDeviceName)
{
	var Component = g_mapPlacedComponents.get(strDeviceName);
	
	if ((Component != null) && (Component.getType() == "LED"))
	{
		if (Component.getBlown())
			Component.doUnblown();
		else
			Component.doBlown();
		doDisplayAllComponents();
	}
}




class CLED extends CComponentBase
{
	static m_ImageObjectOff0 = CComponentBase.doGetImageObject("img\\Components\\LEDs\\LED_OFF.png");
	static m_ImageObjectOff90 = CComponentBase.doGetImageObject("img\\Components\\LEDs\\LED_OFF90.png");
	static m_ImageObjectOff180 = CComponentBase.doGetImageObject("img\\Components\\LEDs\\LED_OFF180.png");
	static m_ImageObjectOff270 = CComponentBase.doGetImageObject("img\\Components\\LEDs\\LED_OFF270.png");

	static m_ImageObjectOn0 = CComponentBase.doGetImageObject("img\\Components\\LEDs\\LED_ON.png");
	static m_ImageObjectOn90 = CComponentBase.doGetImageObject("img\\Components\\LEDs\\LED_ON90.png");
	static m_ImageObjectOn180 = CComponentBase.doGetImageObject("img\\Components\\LEDs\\LED_ON180.png");
	static m_ImageObjectOn270 = CComponentBase.doGetImageObject("img\\Components\\LEDs\\LED_ON270.png");

	static m_ImageObjectBlown0 = CComponentBase.doGetImageObject("img\\Components\\LEDs\\LED_BLOWN.png");
	static m_ImageObjectBlown90 = CComponentBase.doGetImageObject("img\\Components\\LEDs\\LED_BLOWN90.png");
	static m_ImageObjectBlown180 = CComponentBase.doGetImageObject("img\\Components\\LEDs\\LED_BLOWN180.png");
	static m_ImageObjectBlown270 = CComponentBase.doGetImageObject("img\\Components\\LEDs\\LED_BLOWN270.png");
	
	constructor()
	{
		super("LED");		
		this.m_bIsBlown = false;
		this.m_bIsOn = false;
		this.setDeviceName("LED1");	
		this.m_ImageObject0 = CLED.m_ImageObjectOff0;
		this.m_ImageObject90 = CLED.m_ImageObjectOff90;
		this.m_ImageObject180 = CLED.m_ImageObjectOff180;
		this.m_ImageObject270 = CLED.m_ImageObjectOff270;
		this.m_fScale = this.m_fDefaultScale = 8.2;
		this.m_fLEDVoltage = 2.4;
		
		this.doAddPin(new CPin(0, false, false, "anode", this.getDeviceName()));
		this.doAddPin(new CPin(1, false, false, "cathode", this.getDeviceName()));
		this.doRotate(0);

		this.m_strEditHTML += "&nbsp;&nbsp;<div style=\"" + g_strSecondDivDisplayStyle + "\" id=\"fix\"><input type=\"button\" style=\"" + 
								g_strButtonStyle + "position:relative;top:6Px;\" value=\"REPLACE\" onclick=\"doClick('YYYY')\"></div>";
	}

	getVoltage(strDeviceNameIn, strPinIDIn)
	{
		return -this.m_fLEDVoltage;
	}
	
	getResistance(strDeviceNameIn, strPinIDIn)
	{
		return 0;
	}
	
	doRead(strFileContents)
	{
		strFileContents = super.doRead(strFileContents);
		
		return strFileContents;
	}
	
	doWrite()
	{
		var strFileContents = super.doWrite();
		
		return strFileContents;
	}
	
	doSetPinPositions()
	{
		if (this.m_nRotationAngle == 0)
		{
			this.m_arrayPins[0].set(this.m_rectangle.m_pointTL, new CSize(13, 32));
			this.m_arrayPins[1].set(this.m_rectangle.m_pointTL, new CSize(2, 32));
		}
		else if (this.m_nRotationAngle == 90)
		{
			this.m_arrayPins[0].set(this.m_rectangle.m_pointTL, new CSize(2, 13));
			this.m_arrayPins[1].set(this.m_rectangle.m_pointTL, new CSize(2, 2));
		}
		else if (this.m_nRotationAngle == 180)
		{
			this.m_arrayPins[0].set(this.m_rectangle.m_pointTL, new CSize(2, 2));
			this.m_arrayPins[1].set(this.m_rectangle.m_pointTL, new CSize(13, 2));
		}
		else if (this.m_nRotationAngle == 270)
		{
			this.m_arrayPins[0].set(this.m_rectangle.m_pointTL, new CSize(32, 2));
			this.m_arrayPins[1].set(this.m_rectangle.m_pointTL, new CSize(32, 13));
		}
	}
	
	doSelect()
	{
		this.m_bSelected = true;
		var strHTML = this.m_strEditHTML;
		strHTML = strHTML.replace("XXXX", this.m_strDeviceName);
		strHTML = strHTML.replace("YYYY", this.m_strDeviceName);
		doShowEditFields(strHTML);
	}

	doTurnOn()
	{
		this.m_bIsOn = true;
		this.m_ImageObject0 = CLED.m_ImageObjectOn0;
		this.m_ImageObject90 = CLED.m_ImageObjectOn90;
		this.m_ImageObject180 = CLED.m_ImageObjectOn180;
		this.m_ImageObject270 = CLED.m_ImageObjectOn270;
	}
	
	doTurnOff()
	{
		this.m_bIsOn = false;
		this.m_ImageObject0 = CLED.m_ImageObjectOff0;
		this.m_ImageObject90 = CLED.m_ImageObjectOff90;
		this.m_ImageObject180 = CLED.m_ImageObjectOff180;
		this.m_ImageObject270 = CLED.m_ImageObjectOff270;
	}
	
	doBlown()
	{
		this.m_bIsBlown = true;
		this.m_ImageObject0 = CLED.m_ImageObjectBlown0;
		this.m_ImageObject90 = CLED.m_ImageObjectBlown90;
		this.m_ImageObject180 = CLED.m_ImageObjectBlown180;
		this.m_ImageObject270 = CLED.m_ImageObjectBlown270;
	}
	
	doUnblown()
	{
		this.m_bIsBlown = false;
		this.m_bIsOn = false;
		this.m_ImageObject0 = CLED.m_ImageObjectOff0;
		this.m_ImageObject90 = CLED.m_ImageObjectOff90;
		this.m_ImageObject180 = CLED.m_ImageObjectOff180;
		this.m_ImageObject270 = CLED.m_ImageObjectOff270;
	}
	
	getBlown()
	{
		return this.m_bIsBlown;
	}

	doStopRun()
	{
		doTurnOff();
	}
	
	doRun()
	{
		if (!this.m_bIsBlown)
		{
			var fAnodeVoltage = this.m_arrayPins[0].getVoltage();
			var fCathodVoltage = this.m_arrayPins[1].getVoltage();
			var fAnodeVoltage = this.m_arrayPins[0].getVoltage();
			var fCathodeResistance = 0;
			var fCurrent = 0;
			
			if (!this.m_bIsBlown && ((fAnodeVoltage - fCathodVoltage) >= 2.4))
			{
				fAnodeResistance = this.m_arrayPins[0].getResistance();
				fCathodeResistance = this.m_arrayPins[1].getResistance();
				fCurrent = (fAnodeVoltage - this.m_fLEDVoltage)  / (fAnodeResistance + fCathodeResistance);
				if (fCurrent > 0.035)
					this.doBlown();
				else if (fCurrent >= 0.01)
					this.doTurnOn();
				else
					this.doTurnOff();
			}
			else
				this.doTurnOff();
		}
	}
	
	doDisplay()
	{
		var fAnodeVoltage = 4.5;//this.m_arrayPins[0].getVoltage();
		var fMaxVoltage = g_mapPlacedComponents.get(g_strMCUName).getLogicVoltage();
		
		if (fAnodeVoltage == fMaxVoltage)
		{
			this.doTurnOn();
			super.doDisplay();
		}
		else
		{
			this.doTurnOff();
			super.doDisplay();
			
			var point = new CPoint(this.m_rectangle.m_pointTL.m_nX, this.m_rectangle.m_pointTL.m_nY);
			var nRadius = 8;
			var strColor = "";
			
			if (fAnodeVoltage < 1)
				strColor = "#802020";
			else if ((fAnodeVoltage >= 1) && (fAnodeVoltage <= 1.5))
				strColor = "#8D2323";
			else if ((fAnodeVoltage >= 1.5) && (fAnodeVoltage < 2))
				strColor = "#9A2626";
			else if ((fAnodeVoltage >= 2) && (fAnodeVoltage < 2.5))
				strColor = "#A72929";
			else if ((fAnodeVoltage >= 2.5) && (fAnodeVoltage < 3))
				strColor = "#B42D2D";
			else if ((fAnodeVoltage >= 3) && (fAnodeVoltage < 3.5))
				strColor = "#C13030";
			else if ((fAnodeVoltage >= 3.5) && (fAnodeVoltage < 4))
				strColor = "#CE3333";
			else if ((fAnodeVoltage >= 4.5) && (fAnodeVoltage < 5))
				strColor = "#D83636";
			else
				strColor = "#E83A3A";

			if (this.m_nRotationAngle == 0)
				point.move(9, 8);
			else if (this.m_nRotationAngle == 90)
				point.move(0, 0);
			else if (this.m_nRotationAngle == 180)
				point.move(0, 0);
			else if (this.m_nRotationAngle == 270)
				point.move(0, 0);

			g_CanvasContext.fillStyle = strColor;
			g_CanvasContext.strokeStyle = strColor;
			g_CanvasContext.beginPath();
			g_CanvasContext.arc(point.m_nX, point.m_nY, nRadius, 0, 2 * Math.PI);
			g_CanvasContext.fillRect(point.m_nX - 8, point.m_nY + 3, 16, 11);
			g_CanvasContext.stroke();
			g_CanvasContext.fill();
		}
	}
	
}

