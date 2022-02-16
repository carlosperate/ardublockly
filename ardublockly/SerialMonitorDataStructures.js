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
		this.m_bIsOpen = false;
	}
	
	begin(nBaudRate)
	{
		this.m_nBeginBaudRate = nBaudRate;
	}
	
	setOpen()
	{
		this.m_bIsOpen = true;
	}
	
	setClose()
	{
		this.m_bIsOpen = false;
	}
	
	select(nBaudRate)
	{
		this.m_nSelectedBaudRate = nBaudRate;
	}
	
	doBaudRatesMatch()
	{
		var bMatch = false;
		
		if (this.m_nSelectedBaudRate != this.m_nBeginBaudRate)
			doErrorMessage("Selected baud rate (" + this.m_nSelectedBaudRate + ") and programatic baud rate (" + this.m_nBeginBaudRate + ") do not match!")
		else
			bMatch = true;
		
		return bMatch;
	}
	
	setTextWaiting(strTextWaiting)
	{
		var bResult = false;
		
		if (this.doBaudRatesMatch())
		{
			this.m_strTextWaiting = strTextWaiting;
			bResult = true;
		}			
		return bResult;
	}
	
	printText(strText)
	{
		var bResult = false;
		var SerialMonitorDiv = getElement("content_serial_monitor");
		
		if ((SerialMonitorDiv != null) && this.m_bIsOpen)
		{
			if (this.doBaudRatesMatch())
			{
				if ((strText[0] == "\"") || (strText[0] == "'"))
					strText = strText.substring(1, strText.length - 1);
				
				if (SerialMonitorDiv.innerText.length > 10000)
					SerialMonitorDiv.innerText = strText;
				else
					SerialMonitorDiv.innerText += strText;
				
				if (!this.m_bAutoScroll)
					SerialMonitorDiv.scrollTop = 0;
				else 
					SerialMonitorDiv.scrollTop = SerialMonitorDiv.scrollHeight;
			
				bResult = true;
			}
		}
		return bResult;
	}
	
	printlnText(strText)
	{
		var bResult = this.printText(strText);
		
		if (bResult)
			this.printText("\n");
		
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

		return this.print(strText);
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

function setSerialMonitorBaudRate()
{
	var SelectBaudRate = document.getElementById("Baud");
	SelectBaudRate.selectedIndex = 12;
	var nBaud = SelectBaudRate.options[SelectBaudRate.selectedIndex].value;
	
	g_SerialMonitor.select(nBaud);
}

setSerialMonitorBaudRate();




