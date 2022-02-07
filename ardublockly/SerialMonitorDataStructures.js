//*************************************************************************
//*
//* SERIAL MONITOR
//*
//*************************************************************************

class CSerialMonitor
{
	constructor()
	{
		this.m_nSelectedBaudRate = 0;
		this.m_nBeginBaudRate = 0;
		this.m_strTextWaiting = "";
		this.m_bAutoScroll = true;
	}
	
	begin(nBaudRate)
	{
		this.m_nBeginBaudRate = nBaudRate;
	}
	
	select(nBaudRate)
	{
		this.m_nSelectedBaudRate = nBaudRate;
	}
	
	setTextWaiting(strTextWaiting)
	{
		var bResult = false;
		
		if ((this.m_nSelectedBaudRate > 0) && (this.m_nBeginBaudRate > 0) && (this.m_nSelectedBaudRate == this.m_nBeginBaudRate))
		{
			this.m_strTextWaiting = strTextWaiting;
			bResult = true;
		}
		else
			doErrorMessage(g_strErrorMessage + "begin(...) and selected baud rates don't match!");
			
		return bResult;
	}
	
	printText(strText)
	{
		var bResult = false;
		var SerialMonitorDiv = getElement("content_serial_monitor");
		
		if (SerialMonitorDiv != null)
		{
			if ((this.m_nSelectedBaudRate > 0) && (this.m_nBeginBaudRate > 0) && (this.m_nSelectedBaudRate == this.m_nBeginBaudRate))
			{
				if (SerialMonitorDiv.innerText.length > 1000)
					SerialMonitorDiv.innerText = strText;
				else
					SerialMonitorDiv.innerText += strText;
				
				if (this.m_bAutoScroll)
					SerialMonitorDiv.scrollTop = 10000;
				else
					SerialMonitorDiv.scrollTop = 0;
				bResult = true;
			}
			else
				doErrorMessage(g_strErrorMessage + "begin(...) and selected baud rates don't match!");
		}
		return bResult;
	}
	
	printlnText(strText)
	{
		var bResult = printText(strText);
		
		if (bResult)
			printText("\n");
		
		return bResult;
	}

	printInt(nVal, strBase)
	{
		var strText = "";
		
		if ((strBase == null) || (strBase == "DEC"))
			strText = nVal.toString(10);
		else if (strBase == "HEX")
			strText = nVal.toString(16);
		else if (strBase == "OCT")
			strText = nVal.toString(8);
		else if (strBase == "BIN")
			strText = nVal.toString(2);

		return print(strText);
	}
	
	printlnInt(nVal, strBase)
	{
		var bResult = printInt(nVal, strBase);
		
		if (bResult)
			printText("\n");
		
		return bResult;
	}
	
	setAutoScroll(bAutoScroll)
	{
		this.m_bAutoScroll = bAutoScroll;
	}

}

//*************************************************************************
//*
//* GLOBAL VARIBALES
//*
//*************************************************************************

var g_SerialMonitor = new CSerialMonitor();




