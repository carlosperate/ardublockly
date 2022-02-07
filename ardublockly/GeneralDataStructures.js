//*************************************************************************
//*
//* POSITION
//*
//*************************************************************************

class CPoint
{
	constructor(nX, nY)
	{
		if (typeof(nX) === "undefined")
			this.m_nX = 0;
		else
			this.m_nX = nX;

		if (typeof(nY) === "undefined")
			this.m_nY = 0;
		else
			this.m_nY = nY;
	}
	
	initEvent(Event)
	{
		this.m_nX = Event.clientX;
		this.m_nY = Event.clientY;
	}
	
	relativeToID(strElementID)
	{
		relativeTo(document.getElementById(strElementID));
	}
	
	relativeTo(Element)
	{
		var rect = null;
		
		if (Element != null)
		{
			rect = Element.getBoundingClientRect();
			this.m_nX = event.clientX - rect.left + g_pointCanvasScrollPos.m_nX;
			this.m_nY = event.clientY - rect.top + g_pointCanvasScrollPos.m_nY;
		}
	}
	
	isEmpty()
	{
		return (this.m_nX == 0) && (this.m_nY == 0);
	}
	
	isGreater(pointOther)
	{
		return (this.m_nX > pointOther.m_nX) || (this.m_nY > pointOther.m_nY);
	}

	isLesser(pointOther)
	{
		return (this.m_nX < pointOther.m_nX) || (this.m_nY < pointOther.m_nY);
	}

	isEqual(pointOther)
	{
		return (this.m_nX == pointOther.m_nX) && (this.m_nY == pointOther.m_nY);
	}
	
	isGreaterOrEqual()
	{
		return isGreater(pointOther) || isEqual(pointOther);
	}

	isLesserOrEqual()
	{
		return isLesser(pointOther) || isEqual(pointOther);
	}

}




//*************************************************************************
//*
//* SIZE
//*
//*************************************************************************

class CSize
{
	constructor(nWidth, nHeight)
	{
		if (typeof(nWidth) === "undefined")
			this.m_nWidth = 0;
		else
			this.m_nWidth = nWidth;
		
		if (typeof(nHeight) === "undefined")
			this.m_nHeight = 0;
		else
			this.m_nHeight = nHeight;
	}
	
	isEmpty()
	{
		return (this.m_nWidth == 0) && (this.m_nHeight == 0);
	}
	
}





//*************************************************************************
//*
//* RECTANGLE
//*
//*************************************************************************

class CRectangle
{
	constructor(pointTL, size)
	{
		if (typeof(pointTL) === "undefined")
			this.m_pointTL = new CPoint(0, 0);
		else
			this.m_pointTL = new CPoint(pointTL.m_nX, pointTL.m_nY);
		
		if (typeof(size) === "undefined")
			this.m_size = new CSize(0, 0);
		else
			this.m_size = new CSize(size.m_nWidth, size.m_nHeight);
	}
	
	set(pointTL, size)
	{
		this.m_size = new CSize(size.m_nWidth, size.m_nHeight);
		this.m_pointTL = new CPoint(pointTL.m_nX, pointTL.m_nY);
	}
	
	setPosition(pointTL)
	{
		this.m_pointTL = new CPoint(pointTL.m_nX, pointTL.m_nY);
	}
	
	setSize(size)
	{
		this.m_size = new CSize(size.m_nWidth, size.m_nHeight);
	}
	
	relativeToID(strElementID)
	{
		relativeTo(document.getElementById(strElementID));
	}
	
	relativeTo(Element)
	{
		var rect = null;
		
		if (Element != null)
		{
			rect = Element.getBoundingClientRect();
			this.m_pointTL.m_nX = event.clientX - rect.left + g_pointCanvasScrollPos.m_nX;
			this.m_pointTL.m_nY = event.clientY - rect.top + g_pointCanvasScrollPos.m_nY;
		}
	}
	
	addOffset(sizeOffset)
	{
		this.m_pointTL.m_nX += sizeOffset.m_nWidth;
		this.m_pointTL.m_nY += sizeOffset.m_nHeight;
	}
	
	isMouseIn(RelativeMousePos)
	{
		var nMaxX = this.m_pointTL.m_nX + this.m_size.m_nWidth;
		var nMaxY = this.m_pointTL.m_nY + this.m_size.m_nHeight;
		var bResult = (RelativeMousePos.m_nX >= this.m_pointTL.m_nX) && (RelativeMousePos.m_nX <= nMaxX) &&
						(RelativeMousePos.m_nY >= this.m_pointTL.m_nY) && (RelativeMousePos.m_nY <= nMaxY);
		
		//console.log("#####" + RelativeMousePos.m_nX + ", " + RelativeMousePos.m_nY + "####" + this.m_pointTL.m_nX + ", " + this.m_pointTL.m_nY + "####" + nMaxX + ", " + nMaxY + "####" + (RelativeMousePos.m_nX >= this.m_pointTL.m_nX) + ", " + (RelativeMousePos.m_nX <= nMaxX) + "####" + (RelativeMousePos.m_nY >= this.m_pointTL.m_nY) + ", " + (RelativeMousePos.m_nY <= nMaxY) + "####" + bResult);

		return bResult;
	}
	
	getCenter()
	{
		var pointCenter = new CPoint(this.m_pointTL.m_nX + (this.m_size.m_nWidth / 2), this.m_pointTL.m_nY + (this.m_size.m_nHeight / 2));
		
		return pointCenter;
	}
	
	isEmpty()
	{
		return this.m_pointTL.isEmpty() && this.m_size.isEmpty();
	}
	
}

