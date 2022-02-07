//*************************************************************************
//*
//* BASE PORT
//*
//*************************************************************************

class CBasePort
{
	constructor(strDeviceName)
	{
		this.m_mapConnectedDevices = new Map();
		this.m_strDeviceName = strDeviceName;
	}
	
	addDevice(strHexAddress, strComponentName)
	{
		this.m_mapConnectedDevices.set(strHexAddress, strComponentName);
	}
	
	removeDevice(strComponentName)
	{
		var mapDeviceNames = new Map();
		var strDeviceName = "", strSelectedDeviceName = "";
	
		g_mapPlacedComponents.forEach(function(strValue, strKey, map){mapDeviceNames.set([strValue, strKey])});
		this.m_mapConnectedDevices.delete(mapDeviceNames.get(strComponentName));
	}
	
	doDeleteAllDevices()
	{
		this.m_mapConnectedDevices.clear();
	}
	
	setDeviceName(strNewDeviceName)
	{
		this.m_strDeviceName = strNewDeviceName;
	}
	
	getDeviceName()
	{
		return this.m_strDeviceName;
	}
}




//*************************************************************************
//*
//* I2C PORT
//*
//*************************************************************************

class CI2CPort extends CBasePort
{
	constructor(nClockPin, nDataPin, strDeviceName)
	{
		super(strDeviceName);
		this.m_nClockPin = nClockPin;
		this.m_nDataPin = nDataPin;
	}
	
	send(strHexAddress, Data)
	{
		var strComponentName = m_mapConnectedDevices.get(strHexAddress);
		var Component = g_mapPlacedComponents[strComponentName];
		
		if (Component == null)
			Data = g_strErrorMessage + "I2C device with hex address '" + strHexAddress + "' not found!";
		else if (!checkConnection(Component))
			Data = this.m_strErrorMessage;
		else
			Data = Component.send(Data);
	
		return Data;
	}

	receive(strHexAddress)
	{
		var Data = null;
		var strComponentName = m_mapConnectedDevices.get(strHexAddress);
		var Component = g_mapPlacedComponents[strComponentName];
		
		if (Component == null)
			Data = g_strErrorMessage + "I2C device with hex address '" + strHexAddress + "' not found!";
		else if (!checkConnection(Component))
			Data = this.m_strErrorMessage;
		else
			Data = Component.receive();
		
		return Data;
	}
	
	checkConnection(Component)
	{
		var bIsCorrect = false;
		var strDeviceName = this.m_mapConnectedDevices[strHexAddress];
		var Component = g_mapPlacedComponents[strDeviceName];
		
		if (Component.isI2CDevice())
		{
			if (Component.getI2CDataPin() != this.m_nDataPin)
				doErrorMessage(g_strErrorMessage + "I2C data pin mismatch, '" + strDeviceName + "': " + Component.getI2CDataPin() + ", '" + 
											this.m_strDeviceName + "', " + this.m_nDataPin + "!");									
			else if (Component.getI2CDataPin() != this.m_nDataPin)
				doErrorMessage(g_strErrorMessage + "I2C clock pin mismatch, '" + strDeviceName + "': " + Component.getI2CClockPin() + ", '" + 
											this.m_strDeviceName + "', " + this.m_nClockPin + "!");
			else
				bIsCorrect = true;
		}
		else
			doErrorMessage(g_strErrorMessage + "device '" + strDeviceName + "', is not an I2C device!");
		
		return bIsCorrect;
	}
}




//*************************************************************************
//*
//* SPI PORT
//*
//*************************************************************************

class CSPIPort extends CBasePort
{
	constructor(nMOSIPin, nMISOPin, nCLKPin, strDeviceName)
	{
		super(strDeviceName);
		this.m_nMOSIPin = nMOSIPin;
		this.m_nMISOPin = nMISOPin;
		this.m_nCLKPin = nCLKPin;
	}
	
	send(nCSPin, Data)
	{
		var strComponentName = m_mapConnectedDevices.get(nCSPin);
		var Component = g_mapPlacedComponents[strComponentName];
		
		if (Component == null)
			Data = g_strErrorMessage + "SPI device using CS pin '" + nCSPin + "' not found!";
		else if (!checkConnection(Component))
			Data = this.m_strErrorMessage;
		else
			 Data = Component.send(Data);
		
		return Data;
	}

	receive(nCSPin)
	{
		var Data = null;
		var strComponentName = m_mapConnectedDevices.get(nCSPin);
		var Component = g_mapPlacedComponents[strComponentName];
		
		if (Component == null)
			Data = g_strErrorMessage + "SPI device using CS pin '" + nCSPin  + "' not found!";
		else if (!checkConnection(Component))
			Data = this.m_strErrorMessage;
		else
			Data = Component.receive();
		
		return Data;
	}
	
	checkConnection(Component)
	{
		var bIsCorrect = false;
		var strDeviceName = this.m_mapConnectedDevices[Component.getCSPin()];
		var Component = g_mapPlacedComponents[strDeviceName];
		
		if (Component.isSPIDevice())
		{
			if (Component.getMOSIPin() != this.m_nMOSIPin)
				doErrorMessage(g_strErrorMessage + "SPI MOSI mismatch, '" + strDeviceName + "': " + Component.getMOSIPin() + ", '" + 
											this.m_strDeviceName + "', " + this.m_nMOSIPin + "!");									
			else if (Component.getMISOPin() != this.m_nMISOPin)
				doErrorMessage(g_strErrorMessage + "SPI MISO mismatch, '" + strDeviceName + "': " + Component.getMISOPin() + ", '" + 
											this.m_strDeviceName + "', " + this.m_nMISOPin + "!");
			else if (Component.getCLKPin() != this.m_nCLKPin)
				doErrorMessage(g_strErrorMessage + "SPI CLK mismatch, '" + strDeviceName + "': " + Component.getCLKPin() + ", '" + 
											this.m_strDeviceName + "', " + this.m_nCLKPin + "!");
			else
				bIsCorrect = true;
		}
		else
			doErrorMessage(g_strErrorMessage + "device '" + strDeviceName + "', is not an SPI device!");
		
		return bIsCorrect;
	}

}




//*************************************************************************
//*
//* SERIAL PORT
//*
//*************************************************************************

class CSerialPort extends CBasePort
{
	constructor(nTxPin, nRxPin, strDeviceName)
	{
		super(strDeviceName);
		this.m_nTxPin = nTxPin;
		this.m_nRxPin = nRxPin;
	}

	send(Data)
	{
		var Component = g_mapPlacedComponents[this.m_strConnectedDeviceName];
		
		if (Component == null)
			Data = g_strErrorMessage + "serial device '" + this.m_strConnectedDeviceName + "' not found!";
		else if (!checkConnection(Component))
			Data = this.m_strErrorMessage;
		else
			 Data = Component.send(Data);
		
		return Data;
	}
	
	receive()
	{
		var Data = null;
		var Component = g_mapPlacedComponents[this.m_strConnectedDeviceName];
		
		if (Component == null)
			Data = g_strErrorMessage + "serial device with name '" + this.m_strConnectedDeviceName + "' not found!";
		else if (!checkConnection(Component))
			Data = this.m_strErrorMessage;
		else
			Data = Component.receive();

		return Data;
	}

	checkConnection(Component)
	{
		var bIsCorrect = false;
		var Component = g_mapPlacedComponents[this.m_strConnectedDeviceName];
	
		if (Component.isSerialDevice())
		{
			if (Component.getSerialTxPin() == this.m_nTxPin)
				doErrorMessage(g_strErrorMessage + "'" + strDeviceName + "' Tx pin should be connected to Rx pin of '" + this.m_strDeviceName + "'!");
			else if (Component.getSerialRxPin() == this.m_nRxPin)
				doErrorMessage(g_strErrorMessage + "'" + strDeviceName + "' Rx pin should be connected to Tx pin of '" + this.m_strDeviceName +
											"' (" + this.m_strTxPin + ")!");
			else
				bIsCorrect = true;
		}
		else
			doErrorMessage(g_strErrorMessage + "device '" + this.m_strConnectedDeviceName + "', is not an serial device!");
	
		return bIsCorrect;
	}
}




