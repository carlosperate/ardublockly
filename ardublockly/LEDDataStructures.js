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
	
	constructor(bBreakout)
	{
		super("LED");		
		this.m_bIsBlown = false;
		this.m_bIsOn = false;
		this.setDeviceName("LED1");	
		this.m_ImageObject0 = CLED.m_ImageObjectOff0;
		this.m_ImageObject90 = CLED.m_ImageObjectOff90;
		this.m_ImageObject180 = CLED.m_ImageObjectOff180;
		this.m_ImageObject270 = CLED.m_ImageObjectOff270;
		this.m_fScale = 8.2;

		this.m_arrayPins.add(new CPin(0, false, false, "anode", this.getDeviceName()));
		this.m_arrayPins.add(new CPin(1, false, false, "cathode", this.getDeviceName()));
		this.doRotate(0);

		this.m_strEditHTML += "&nbsp;&nbsp;<div style=\"" + g_strSecondDivDisplayStyle + "\" id=\"fix\"><input type=\"button\" style=\"" + 
								g_strButtonStyle + "\" value=\"REPLACE\" onclick=\"doClick('YYYY')\"></div>";
	}

	doWrite()
	{
		var strFileContents = super.doWrite();
		
		strFileContents += this.m_bIsBlown + "\r\n";
		
		return strFileContents;
	}
	
	doRotate(nAngleAdd)
	{
		super.doRotate(nAngleAdd);
		this.doSetPinPositions();
	}
	
	doMove(pointMousePos)
	{
		super.doMove(pointMousePos);
		this.doSetPinPositions();
	}
	
	doSetPinPositions()
	{
		if (this.m_nRotationAngle == 0)
		{
			this.m_arrayPins.get(0).set(this.m_rectangle.m_pointTL, new CSize(13, 32));
			this.m_arrayPins.get(1).set(this.m_rectangle.m_pointTL, new CSize(2, 32));
		}
		else if (this.m_nRotationAngle == 90)
		{
			this.m_arrayPins.get(0).set(this.m_rectangle.m_pointTL, new CSize(2, 13));
			this.m_arrayPins.get(1).set(this.m_rectangle.m_pointTL, new CSize(2, 2));
		}
		else if (this.m_nRotationAngle == 180)
		{
			this.m_arrayPins.get(0).set(this.m_rectangle.m_pointTL, new CSize(2, 2));
			this.m_arrayPins.get(1).set(this.m_rectangle.m_pointTL, new CSize(13, 2));
		}
		else if (this.m_nRotationAngle == 270)
		{
			this.m_arrayPins.get(0).set(this.m_rectangle.m_pointTL, new CSize(32, 2));
			this.m_arrayPins.get(1).set(this.m_rectangle.m_pointTL, new CSize(32, 13));
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
}

