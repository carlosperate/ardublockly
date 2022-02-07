//*************************************************************************
//*
//* ARDUINO MEGA
//*
//*************************************************************************



class CArduinoMega extends CMCUBase
{
	static m_ImageObject0 = CComponentBase.doGetImageObject("img\\Components\\MCUs\\ArduinoMega.png");
	static m_ImageObject90 = CComponentBase.doGetImageObject("img\\Components\\MCUs\\ArduinoMega90.png");
	static m_ImageObject180 = CComponentBase.doGetImageObject("img\\Components\\MCUs\\ArduinoMega180.png");
	static m_ImageObject270 = CComponentBase.doGetImageObject("img\\Components\\MCUs\\ArduinoMega270.png");

	constructor()
	{
		var strName = "";
		
		super("MEGA");
		this.m_fScale = 1.9;
		this.m_strDeviceName = "MEGA1";
		this.m_ImageObject0 = CArduinoMega.m_ImageObject0;
		this.m_ImageObject90 = CArduinoMega.m_ImageObject90;
		this.m_ImageObject180 = CArduinoMega.m_ImageObject180;
		this.m_ImageObject270 = CArduinoMega.m_ImageObject270;
		
		for (var nI = 0, bIsPWM = false, bIsAnalog = false; nI <= 69; nI++)
		{
			bIsPWM = ((nI >= 2) && (nI <= 13)) || ((nI >= 44) && (nI <= 46));
			bIsAnalog = (nI >= 54) && (nI <= 69);
			
			if (nI == 0)
				strName = "Rx";
			else if (nI == 1)
				strName = "Tx";
			else if (nI == 14)
				strName = "Tx1";
			else if (nI == 15)
				strName = "Rx1";
			else if (nI == 16)
				strName = "Tx2";
			else if (nI == 17)
				strName = "Rx2";
			else if (nI == 18)
				strName = "Tx3";
			else if (nI == 19)
				strName = "Rx3";
			else if (nI == 20)
				strName = "SDA";
			else if (nI == 21)
				strName = "SCL";
			else if (bIsAnalog)
				strName = "A" + (nI - 54).toString()
			else
				strName = nI.toString();
			
			this.m_arrayPins.add(new CPin(nI, bIsPWM, bIsAnalog, strName, this.getDeviceName()));
		}
		this.m_nMaxPin = 70;
	
		this.m_arrayPins.add(new CResetPin(nI++, this.getDeviceName()));
		this.m_arrayPins.add(new C3_3VPin(nI++, this.getDeviceName()));
		this.m_arrayPins.add(new C5VPin(nI++, this.getDeviceName()));
		this.m_arrayPins.add(new CGNDPin(nI++, this.getDeviceName()));
		this.m_arrayPins.add(new CGNDPin(nI++, this.getDeviceName()));
		this.m_arrayPins.add(new CGNDPin(nI++, this.getDeviceName()));

		this.m_arrayPins.add(new C5VPin(nI++, this.getDeviceName()));
		this.m_arrayPins.add(new C5VPin(nI++, this.getDeviceName()));
		this.m_arrayPins.add(new CGNDPin(nI++, this.getDeviceName()));
		this.m_arrayPins.add(new CGNDPin(nI++, this.getDeviceName()));
		this.doRotate(0);

		this.m_SPI = new CSPIPort(51, 50, 52, this.getDeviceName());
		this.m_I2C = new CI2CPort(21, 20, this.getDeviceName());
		this.m_Serial = new CSerialPort(1, 0, this.getDeviceName());
		this.m_Serial1 = new CSerialPort(14, 15, this.getDeviceName());
		this.m_Serial2 = new CSerialPort(16, 17, this.getDeviceName());
		this.m_Serial3 = new CSerialPort(18, 19, this.getDeviceName());
		this.setDeviceName(this.m_strDeviceName);
		
		this.m_mapAnalogPins.set("A0", 54);
		this.m_mapAnalogPins.set("A1", 55);
		this.m_mapAnalogPins.set("A2", 56);
		this.m_mapAnalogPins.set("A3", 57);
		this.m_mapAnalogPins.set("A4", 58);
		this.m_mapAnalogPins.set("A5", 59);
		this.m_mapAnalogPins.set("A6", 60);
		this.m_mapAnalogPins.set("A7", 61);
		this.m_mapAnalogPins.set("A8", 62);
		this.m_mapAnalogPins.set("A9", 63);
		this.m_mapAnalogPins.set("A10", 64);
		this.m_mapAnalogPins.set("A11", 65);
		this.m_mapAnalogPins.set("A12", 66);
		this.m_mapAnalogPins.set("A13", 67);
		this.m_mapAnalogPins.set("A14", 68);
		this.m_mapAnalogPins.set("A15", 69);

		this.m_mapAnalogPins.set("Tx3", 14);
		this.m_mapAnalogPins.set("Rx3", 15);
		this.m_mapAnalogPins.set("Tx2", 16);
		this.m_mapAnalogPins.set("Rx2", 17);
		this.m_mapAnalogPins.set("Tx1", 18);
		this.m_mapAnalogPins.set("Rx1", 19);
		this.m_mapAnalogPins.set("SDA", 20);
		this.m_mapAnalogPins.set("SCL", 21);
	}

	doWrite()
	{
		return super.doWrite();
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
			// Standard D0 -> D13
			this.m_arrayPins.get(0).set(this.m_rectangle.m_pointTL, new CSize(378, 8));
			this.m_arrayPins.get(1).set(this.m_rectangle.m_pointTL, new CSize(369, 8));
			this.m_arrayPins.get(2).set(this.m_rectangle.m_pointTL, new CSize(360, 8));
			this.m_arrayPins.get(3).set(this.m_rectangle.m_pointTL, new CSize(351, 8));
			this.m_arrayPins.get(4).set(this.m_rectangle.m_pointTL, new CSize(342, 8));
			this.m_arrayPins.get(5).set(this.m_rectangle.m_pointTL, new CSize(333, 8));
			this.m_arrayPins.get(6).set(this.m_rectangle.m_pointTL, new CSize(324, 8));
			this.m_arrayPins.get(7).set(this.m_rectangle.m_pointTL, new CSize(315, 8));
			this.m_arrayPins.get(8).set(this.m_rectangle.m_pointTL, new CSize(298, 8));
			this.m_arrayPins.get(9).set(this.m_rectangle.m_pointTL, new CSize(289, 8));
			this.m_arrayPins.get(10).set(this.m_rectangle.m_pointTL, new CSize(280, 8));
			this.m_arrayPins.get(11).set(this.m_rectangle.m_pointTL, new CSize(271, 8));
			this.m_arrayPins.get(12).set(this.m_rectangle.m_pointTL, new CSize(262, 8));
			this.m_arrayPins.get(13).set(this.m_rectangle.m_pointTL, new CSize(253, 8));
			
			// Serial1, Serial2, Serial3 & I2C
			this.m_arrayPins.get(14).set(this.m_rectangle.m_pointTL, new CSize(435, 8)); // Tx1
			this.m_arrayPins.get(15).set(this.m_rectangle.m_pointTL, new CSize(444, 8)); // Rx1
			this.m_arrayPins.get(16).set(this.m_rectangle.m_pointTL, new CSize(416, 8)); // Tx2
			this.m_arrayPins.get(17).set(this.m_rectangle.m_pointTL, new CSize(425, 8)); // Rx2
			this.m_arrayPins.get(18).set(this.m_rectangle.m_pointTL, new CSize(398, 8)); // Tx3
			this.m_arrayPins.get(19).set(this.m_rectangle.m_pointTL, new CSize(407, 8)); // Rx3
			this.m_arrayPins.get(20).set(this.m_rectangle.m_pointTL, new CSize(453, 8)); // SDA
			this.m_arrayPins.get(21).set(this.m_rectangle.m_pointTL, new CSize(462, 8)); // SCL

			// D22 -> D54
			this.m_arrayPins.get(22).set(this.m_rectangle.m_pointTL, new CSize(490, 17));	
			this.m_arrayPins.get(23).set(this.m_rectangle.m_pointTL, new CSize(499, 17));	
			this.m_arrayPins.get(24).set(this.m_rectangle.m_pointTL, new CSize(490, 27));	
			this.m_arrayPins.get(25).set(this.m_rectangle.m_pointTL, new CSize(499, 27));	
			this.m_arrayPins.get(26).set(this.m_rectangle.m_pointTL, new CSize(490, 36));	
			this.m_arrayPins.get(27).set(this.m_rectangle.m_pointTL, new CSize(499, 36));	
			this.m_arrayPins.get(28).set(this.m_rectangle.m_pointTL, new CSize(490, 45));	
			this.m_arrayPins.get(29).set(this.m_rectangle.m_pointTL, new CSize(499, 45));	
			this.m_arrayPins.get(30).set(this.m_rectangle.m_pointTL, new CSize(490, 55));	
			this.m_arrayPins.get(31).set(this.m_rectangle.m_pointTL, new CSize(499, 55));	
			this.m_arrayPins.get(32).set(this.m_rectangle.m_pointTL, new CSize(490, 64));	
			this.m_arrayPins.get(33).set(this.m_rectangle.m_pointTL, new CSize(499, 64));	
			this.m_arrayPins.get(34).set(this.m_rectangle.m_pointTL, new CSize(490, 73));	
			this.m_arrayPins.get(35).set(this.m_rectangle.m_pointTL, new CSize(499, 73));	
			this.m_arrayPins.get(36).set(this.m_rectangle.m_pointTL, new CSize(490, 82));	
			this.m_arrayPins.get(37).set(this.m_rectangle.m_pointTL, new CSize(499, 82));	
			this.m_arrayPins.get(38).set(this.m_rectangle.m_pointTL, new CSize(490, 92));	
			this.m_arrayPins.get(39).set(this.m_rectangle.m_pointTL, new CSize(499, 92));	
			this.m_arrayPins.get(40).set(this.m_rectangle.m_pointTL, new CSize(490, 101));	
			this.m_arrayPins.get(41).set(this.m_rectangle.m_pointTL, new CSize(499, 101));	
			this.m_arrayPins.get(42).set(this.m_rectangle.m_pointTL, new CSize(490, 110));	
			this.m_arrayPins.get(43).set(this.m_rectangle.m_pointTL, new CSize(499, 110));	
			this.m_arrayPins.get(44).set(this.m_rectangle.m_pointTL, new CSize(490, 120));	
			this.m_arrayPins.get(45).set(this.m_rectangle.m_pointTL, new CSize(499, 120));	
			this.m_arrayPins.get(46).set(this.m_rectangle.m_pointTL, new CSize(490, 129));	
			this.m_arrayPins.get(47).set(this.m_rectangle.m_pointTL, new CSize(499, 129));	
			this.m_arrayPins.get(48).set(this.m_rectangle.m_pointTL, new CSize(490, 138));	
			this.m_arrayPins.get(49).set(this.m_rectangle.m_pointTL, new CSize(499, 138));	
			this.m_arrayPins.get(50).set(this.m_rectangle.m_pointTL, new CSize(490, 148));	
			this.m_arrayPins.get(51).set(this.m_rectangle.m_pointTL, new CSize(499, 148));	
			this.m_arrayPins.get(52).set(this.m_rectangle.m_pointTL, new CSize(490, 157));	
			this.m_arrayPins.get(53).set(this.m_rectangle.m_pointTL, new CSize(499, 157));	

			// A0 -> A15
			this.m_arrayPins.get(54).set(this.m_rectangle.m_pointTL, new CSize(332, 184));
			this.m_arrayPins.get(55).set(this.m_rectangle.m_pointTL, new CSize(341, 184));
			this.m_arrayPins.get(56).set(this.m_rectangle.m_pointTL, new CSize(350, 184));
			this.m_arrayPins.get(57).set(this.m_rectangle.m_pointTL, new CSize(359, 184));
			this.m_arrayPins.get(58).set(this.m_rectangle.m_pointTL, new CSize(369, 184));
			this.m_arrayPins.get(59).set(this.m_rectangle.m_pointTL, new CSize(378, 184));	
			this.m_arrayPins.get(60).set(this.m_rectangle.m_pointTL, new CSize(388, 184));	
			this.m_arrayPins.get(61).set(this.m_rectangle.m_pointTL, new CSize(398, 184));	
			this.m_arrayPins.get(62).set(this.m_rectangle.m_pointTL, new CSize(416, 184));	
			this.m_arrayPins.get(63).set(this.m_rectangle.m_pointTL, new CSize(425, 184));	
			this.m_arrayPins.get(64).set(this.m_rectangle.m_pointTL, new CSize(433, 184));	
			this.m_arrayPins.get(65).set(this.m_rectangle.m_pointTL, new CSize(443, 184));	
			this.m_arrayPins.get(66).set(this.m_rectangle.m_pointTL, new CSize(453, 184));	
			this.m_arrayPins.get(67).set(this.m_rectangle.m_pointTL, new CSize(461, 184));	
			this.m_arrayPins.get(68).set(this.m_rectangle.m_pointTL, new CSize(471, 184));	
			this.m_arrayPins.get(69).set(this.m_rectangle.m_pointTL, new CSize(480, 184));

			this.m_arrayPins.get(70).set(this.m_rectangle.m_pointTL, new CSize(266, 184)); // RESET	
			this.m_arrayPins.get(71).set(this.m_rectangle.m_pointTL, new CSize(276, 184)); // 3.3V	
			this.m_arrayPins.get(72).set(this.m_rectangle.m_pointTL, new CSize(285, 184)); // 5V
			this.m_arrayPins.get(73).set(this.m_rectangle.m_pointTL, new CSize(294, 184)); // GND		
			this.m_arrayPins.get(74).set(this.m_rectangle.m_pointTL, new CSize(303, 184)); // GND	
			this.m_arrayPins.get(75).set(this.m_rectangle.m_pointTL, new CSize(243, 8)); // GND near AREF	
			
			this.m_arrayPins.get(76).set(this.m_rectangle.m_pointTL, new CSize(490, 8)); // 5V
			this.m_arrayPins.get(77).set(this.m_rectangle.m_pointTL, new CSize(499, 8)); // 5V
			this.m_arrayPins.get(78).set(this.m_rectangle.m_pointTL, new CSize(490, 166)); // GND		
			this.m_arrayPins.get(79).set(this.m_rectangle.m_pointTL, new CSize(499, 166)); // GND	
		}
		else if (this.m_nRotationAngle == 90)
		{
			// Standard D0 -> D13
			this.m_arrayPins.get(0).set(this.m_rectangle.m_pointTL, new CSize(185, 379));
			this.m_arrayPins.get(1).set(this.m_rectangle.m_pointTL, new CSize(185, 370));
			this.m_arrayPins.get(2).set(this.m_rectangle.m_pointTL, new CSize(185, 361));
			this.m_arrayPins.get(3).set(this.m_rectangle.m_pointTL, new CSize(185, 352));
			this.m_arrayPins.get(4).set(this.m_rectangle.m_pointTL, new CSize(185, 343));
			this.m_arrayPins.get(5).set(this.m_rectangle.m_pointTL, new CSize(185, 333));
			this.m_arrayPins.get(6).set(this.m_rectangle.m_pointTL, new CSize(185, 324));
			this.m_arrayPins.get(7).set(this.m_rectangle.m_pointTL, new CSize(185, 315));
			this.m_arrayPins.get(8).set(this.m_rectangle.m_pointTL, new CSize(185, 296));
			this.m_arrayPins.get(9).set(this.m_rectangle.m_pointTL, new CSize(185, 287));
			this.m_arrayPins.get(10).set(this.m_rectangle.m_pointTL, new CSize(185, 278));
			this.m_arrayPins.get(11).set(this.m_rectangle.m_pointTL, new CSize(185, 269));
			this.m_arrayPins.get(12).set(this.m_rectangle.m_pointTL, new CSize(185, 260));
			this.m_arrayPins.get(13).set(this.m_rectangle.m_pointTL, new CSize(185, 251));
			
			// Serial1, Serial2, Serial3 & I2C
			this.m_arrayPins.get(14).set(this.m_rectangle.m_pointTL, new CSize(185, 434)); // Tx1
			this.m_arrayPins.get(15).set(this.m_rectangle.m_pointTL, new CSize(185, 443)); // Rx1
			this.m_arrayPins.get(16).set(this.m_rectangle.m_pointTL, new CSize(185, 416)); // Tx2
			this.m_arrayPins.get(17).set(this.m_rectangle.m_pointTL, new CSize(185, 425)); // Rx2
			this.m_arrayPins.get(18).set(this.m_rectangle.m_pointTL, new CSize(185, 398)); // Tx3
			this.m_arrayPins.get(19).set(this.m_rectangle.m_pointTL, new CSize(185, 407)); // Rx3
			this.m_arrayPins.get(20).set(this.m_rectangle.m_pointTL, new CSize(185, 452)); // SDA
			this.m_arrayPins.get(21).set(this.m_rectangle.m_pointTL, new CSize(185, 461)); // SCL

			// D22 -> D54
			this.m_arrayPins.get(22).set(this.m_rectangle.m_pointTL, new CSize(173, 491));	
			this.m_arrayPins.get(23).set(this.m_rectangle.m_pointTL, new CSize(173, 500));	
			this.m_arrayPins.get(24).set(this.m_rectangle.m_pointTL, new CSize(164, 491));	
			this.m_arrayPins.get(25).set(this.m_rectangle.m_pointTL, new CSize(164, 500));	
			this.m_arrayPins.get(26).set(this.m_rectangle.m_pointTL, new CSize(155, 491));	
			this.m_arrayPins.get(27).set(this.m_rectangle.m_pointTL, new CSize(155, 500));	
			this.m_arrayPins.get(28).set(this.m_rectangle.m_pointTL, new CSize(146, 491));	
			this.m_arrayPins.get(29).set(this.m_rectangle.m_pointTL, new CSize(146, 500));	
			this.m_arrayPins.get(30).set(this.m_rectangle.m_pointTL, new CSize(137, 491));	
			this.m_arrayPins.get(31).set(this.m_rectangle.m_pointTL, new CSize(137, 500));	
			this.m_arrayPins.get(32).set(this.m_rectangle.m_pointTL, new CSize(128, 491));	
			this.m_arrayPins.get(33).set(this.m_rectangle.m_pointTL, new CSize(128, 500));	
			this.m_arrayPins.get(34).set(this.m_rectangle.m_pointTL, new CSize(118, 491));	
			this.m_arrayPins.get(35).set(this.m_rectangle.m_pointTL, new CSize(118, 500));	
			this.m_arrayPins.get(36).set(this.m_rectangle.m_pointTL, new CSize(109, 491));	
			this.m_arrayPins.get(37).set(this.m_rectangle.m_pointTL, new CSize(109, 500));	
			this.m_arrayPins.get(38).set(this.m_rectangle.m_pointTL, new CSize(100, 491));	
			this.m_arrayPins.get(39).set(this.m_rectangle.m_pointTL, new CSize(100, 500));	
			this.m_arrayPins.get(40).set(this.m_rectangle.m_pointTL, new CSize(90, 491));	
			this.m_arrayPins.get(41).set(this.m_rectangle.m_pointTL, new CSize(90, 500));	
			this.m_arrayPins.get(42).set(this.m_rectangle.m_pointTL, new CSize(81, 491));	
			this.m_arrayPins.get(43).set(this.m_rectangle.m_pointTL, new CSize(81, 500));	
			this.m_arrayPins.get(44).set(this.m_rectangle.m_pointTL, new CSize(72, 491));	
			this.m_arrayPins.get(45).set(this.m_rectangle.m_pointTL, new CSize(72, 500));	
			this.m_arrayPins.get(46).set(this.m_rectangle.m_pointTL, new CSize(63, 491));	
			this.m_arrayPins.get(47).set(this.m_rectangle.m_pointTL, new CSize(63, 500));	
			this.m_arrayPins.get(48).set(this.m_rectangle.m_pointTL, new CSize(54, 491));	
			this.m_arrayPins.get(49).set(this.m_rectangle.m_pointTL, new CSize(54, 500));	
			this.m_arrayPins.get(50).set(this.m_rectangle.m_pointTL, new CSize(45, 491));	
			this.m_arrayPins.get(51).set(this.m_rectangle.m_pointTL, new CSize(45, 500));	
			this.m_arrayPins.get(52).set(this.m_rectangle.m_pointTL, new CSize(36, 491));	
			this.m_arrayPins.get(53).set(this.m_rectangle.m_pointTL, new CSize(36, 500));	

			// A0 -> A15
			this.m_arrayPins.get(54).set(this.m_rectangle.m_pointTL, new CSize(8, 333));
			this.m_arrayPins.get(55).set(this.m_rectangle.m_pointTL, new CSize(8, 342));
			this.m_arrayPins.get(56).set(this.m_rectangle.m_pointTL, new CSize(8, 351));
			this.m_arrayPins.get(57).set(this.m_rectangle.m_pointTL, new CSize(8, 361));
			this.m_arrayPins.get(58).set(this.m_rectangle.m_pointTL, new CSize(8, 370));
			this.m_arrayPins.get(59).set(this.m_rectangle.m_pointTL, new CSize(8, 379));	
			this.m_arrayPins.get(60).set(this.m_rectangle.m_pointTL, new CSize(8, 388));	
			this.m_arrayPins.get(61).set(this.m_rectangle.m_pointTL, new CSize(8, 397));	
			this.m_arrayPins.get(62).set(this.m_rectangle.m_pointTL, new CSize(8, 417));	
			this.m_arrayPins.get(63).set(this.m_rectangle.m_pointTL, new CSize(8, 426));	
			this.m_arrayPins.get(64).set(this.m_rectangle.m_pointTL, new CSize(8, 435));	
			this.m_arrayPins.get(65).set(this.m_rectangle.m_pointTL, new CSize(8, 444));	
			this.m_arrayPins.get(66).set(this.m_rectangle.m_pointTL, new CSize(8, 453));	
			this.m_arrayPins.get(67).set(this.m_rectangle.m_pointTL, new CSize(8, 462));	
			this.m_arrayPins.get(68).set(this.m_rectangle.m_pointTL, new CSize(8, 471));	
			this.m_arrayPins.get(69).set(this.m_rectangle.m_pointTL, new CSize(8, 480));

			this.m_arrayPins.get(70).set(this.m_rectangle.m_pointTL, new CSize(8, 267)); // RESET	
			this.m_arrayPins.get(71).set(this.m_rectangle.m_pointTL, new CSize(8, 276)); // 3.3V	
			this.m_arrayPins.get(72).set(this.m_rectangle.m_pointTL, new CSize(8, 285)); // 5V
			this.m_arrayPins.get(73).set(this.m_rectangle.m_pointTL, new CSize(8, 294)); // GND		
			this.m_arrayPins.get(74).set(this.m_rectangle.m_pointTL, new CSize(8, 303)); // GND	
			this.m_arrayPins.get(75).set(this.m_rectangle.m_pointTL, new CSize(185, 242)); // GND near AREF	

			this.m_arrayPins.get(76).set(this.m_rectangle.m_pointTL, new CSize(182, 491)); // 5V
			this.m_arrayPins.get(77).set(this.m_rectangle.m_pointTL, new CSize(182, 500)); // 5V
			this.m_arrayPins.get(78).set(this.m_rectangle.m_pointTL, new CSize(27, 491)); // GND		
			this.m_arrayPins.get(79).set(this.m_rectangle.m_pointTL, new CSize(27, 500)); // GND	
		}
		else if (this.m_nRotationAngle == 180)
		{
			// Standard D0 -> D13
			this.m_arrayPins.get(0).set(this.m_rectangle.m_pointTL, new CSize(138, 184));
			this.m_arrayPins.get(1).set(this.m_rectangle.m_pointTL, new CSize(147, 184));
			this.m_arrayPins.get(2).set(this.m_rectangle.m_pointTL, new CSize(156, 184));
			this.m_arrayPins.get(3).set(this.m_rectangle.m_pointTL, new CSize(164, 184));
			this.m_arrayPins.get(4).set(this.m_rectangle.m_pointTL, new CSize(173, 184));
			this.m_arrayPins.get(5).set(this.m_rectangle.m_pointTL, new CSize(183, 184));
			this.m_arrayPins.get(6).set(this.m_rectangle.m_pointTL, new CSize(192, 184));
			this.m_arrayPins.get(7).set(this.m_rectangle.m_pointTL, new CSize(201, 184));
			this.m_arrayPins.get(8).set(this.m_rectangle.m_pointTL, new CSize(217, 184));
			this.m_arrayPins.get(9).set(this.m_rectangle.m_pointTL, new CSize(226, 184));
			this.m_arrayPins.get(10).set(this.m_rectangle.m_pointTL, new CSize(236, 184));
			this.m_arrayPins.get(11).set(this.m_rectangle.m_pointTL, new CSize(245, 184));
			this.m_arrayPins.get(12).set(this.m_rectangle.m_pointTL, new CSize(254, 184));
			this.m_arrayPins.get(13).set(this.m_rectangle.m_pointTL, new CSize(263, 184));
			
			// Serial1, Serial2, Serial3 & I2C
			this.m_arrayPins.get(14).set(this.m_rectangle.m_pointTL, new CSize(81, 184)); // Tx1
			this.m_arrayPins.get(15).set(this.m_rectangle.m_pointTL, new CSize(72, 184)); // Rx1
			this.m_arrayPins.get(16).set(this.m_rectangle.m_pointTL, new CSize(99, 184)); // Tx2
			this.m_arrayPins.get(17).set(this.m_rectangle.m_pointTL, new CSize(90, 184)); // Rx2
			this.m_arrayPins.get(18).set(this.m_rectangle.m_pointTL, new CSize(117, 184)); // Tx3
			this.m_arrayPins.get(19).set(this.m_rectangle.m_pointTL, new CSize(108, 184)); // Rx3
			this.m_arrayPins.get(20).set(this.m_rectangle.m_pointTL, new CSize(62, 184)); // SDA
			this.m_arrayPins.get(21).set(this.m_rectangle.m_pointTL, new CSize(53, 184)); // SCL

			// D22 -> D54
			this.m_arrayPins.get(22).set(this.m_rectangle.m_pointTL, new CSize(25, 173));	
			this.m_arrayPins.get(23).set(this.m_rectangle.m_pointTL, new CSize(16, 173));	
			this.m_arrayPins.get(24).set(this.m_rectangle.m_pointTL, new CSize(25, 164));	
			this.m_arrayPins.get(25).set(this.m_rectangle.m_pointTL, new CSize(16, 164));	
			this.m_arrayPins.get(26).set(this.m_rectangle.m_pointTL, new CSize(25, 154));	
			this.m_arrayPins.get(27).set(this.m_rectangle.m_pointTL, new CSize(16, 154));	
			this.m_arrayPins.get(28).set(this.m_rectangle.m_pointTL, new CSize(25, 145));	
			this.m_arrayPins.get(29).set(this.m_rectangle.m_pointTL, new CSize(16, 145));	
			this.m_arrayPins.get(30).set(this.m_rectangle.m_pointTL, new CSize(25, 136));	
			this.m_arrayPins.get(31).set(this.m_rectangle.m_pointTL, new CSize(16, 136));	
			this.m_arrayPins.get(32).set(this.m_rectangle.m_pointTL, new CSize(25, 127));	
			this.m_arrayPins.get(33).set(this.m_rectangle.m_pointTL, new CSize(16, 127));	
			this.m_arrayPins.get(34).set(this.m_rectangle.m_pointTL, new CSize(25, 118));	
			this.m_arrayPins.get(35).set(this.m_rectangle.m_pointTL, new CSize(16, 118));	
			this.m_arrayPins.get(36).set(this.m_rectangle.m_pointTL, new CSize(25, 109));	
			this.m_arrayPins.get(37).set(this.m_rectangle.m_pointTL, new CSize(16, 109));	
			this.m_arrayPins.get(38).set(this.m_rectangle.m_pointTL, new CSize(25, 100));	
			this.m_arrayPins.get(39).set(this.m_rectangle.m_pointTL, new CSize(16, 100));	
			this.m_arrayPins.get(40).set(this.m_rectangle.m_pointTL, new CSize(25, 91));	
			this.m_arrayPins.get(41).set(this.m_rectangle.m_pointTL, new CSize(16, 91));	
			this.m_arrayPins.get(42).set(this.m_rectangle.m_pointTL, new CSize(25, 81));	
			this.m_arrayPins.get(43).set(this.m_rectangle.m_pointTL, new CSize(16, 81));	
			this.m_arrayPins.get(44).set(this.m_rectangle.m_pointTL, new CSize(25, 72));	
			this.m_arrayPins.get(45).set(this.m_rectangle.m_pointTL, new CSize(16, 72));	
			this.m_arrayPins.get(46).set(this.m_rectangle.m_pointTL, new CSize(25, 62));	
			this.m_arrayPins.get(47).set(this.m_rectangle.m_pointTL, new CSize(16, 62));	
			this.m_arrayPins.get(48).set(this.m_rectangle.m_pointTL, new CSize(25, 53));	
			this.m_arrayPins.get(49).set(this.m_rectangle.m_pointTL, new CSize(16, 53));	
			this.m_arrayPins.get(50).set(this.m_rectangle.m_pointTL, new CSize(25, 44));	
			this.m_arrayPins.get(51).set(this.m_rectangle.m_pointTL, new CSize(16, 44));	
			this.m_arrayPins.get(52).set(this.m_rectangle.m_pointTL, new CSize(25, 35));	
			this.m_arrayPins.get(53).set(this.m_rectangle.m_pointTL, new CSize(16, 35));	

			// A0 -> A15
			this.m_arrayPins.get(54).set(this.m_rectangle.m_pointTL, new CSize(183, 7));
			this.m_arrayPins.get(55).set(this.m_rectangle.m_pointTL, new CSize(174, 7));
			this.m_arrayPins.get(56).set(this.m_rectangle.m_pointTL, new CSize(165, 7));
			this.m_arrayPins.get(57).set(this.m_rectangle.m_pointTL, new CSize(156, 7));
			this.m_arrayPins.get(58).set(this.m_rectangle.m_pointTL, new CSize(147, 7));
			this.m_arrayPins.get(59).set(this.m_rectangle.m_pointTL, new CSize(138, 7));	
			this.m_arrayPins.get(60).set(this.m_rectangle.m_pointTL, new CSize(129, 7));	
			this.m_arrayPins.get(61).set(this.m_rectangle.m_pointTL, new CSize(120, 7));	
			this.m_arrayPins.get(62).set(this.m_rectangle.m_pointTL, new CSize(99, 7));	
			this.m_arrayPins.get(63).set(this.m_rectangle.m_pointTL, new CSize(90, 7));	
			this.m_arrayPins.get(64).set(this.m_rectangle.m_pointTL, new CSize(81, 7));	
			this.m_arrayPins.get(65).set(this.m_rectangle.m_pointTL, new CSize(72, 7));	
			this.m_arrayPins.get(66).set(this.m_rectangle.m_pointTL, new CSize(63, 7));	
			this.m_arrayPins.get(67).set(this.m_rectangle.m_pointTL, new CSize(54, 7));	
			this.m_arrayPins.get(68).set(this.m_rectangle.m_pointTL, new CSize(45, 7));	
			this.m_arrayPins.get(69).set(this.m_rectangle.m_pointTL, new CSize(36, 7));

			this.m_arrayPins.get(70).set(this.m_rectangle.m_pointTL, new CSize(249, 7)); // RESET	
			this.m_arrayPins.get(71).set(this.m_rectangle.m_pointTL, new CSize(240, 7)); // 3.3V	
			this.m_arrayPins.get(72).set(this.m_rectangle.m_pointTL, new CSize(231, 7)); // 5V
			this.m_arrayPins.get(73).set(this.m_rectangle.m_pointTL, new CSize(222, 7)); // GND		
			this.m_arrayPins.get(74).set(this.m_rectangle.m_pointTL, new CSize(213, 7)); // GND	
			this.m_arrayPins.get(75).set(this.m_rectangle.m_pointTL, new CSize(273, 184)); // GND near AREF	

			this.m_arrayPins.get(76).set(this.m_rectangle.m_pointTL, new CSize(16, 25)); // 5V
			this.m_arrayPins.get(77).set(this.m_rectangle.m_pointTL, new CSize(25, 25)); // 5V
			this.m_arrayPins.get(78).set(this.m_rectangle.m_pointTL, new CSize(16, 183)); // GND		
			this.m_arrayPins.get(79).set(this.m_rectangle.m_pointTL, new CSize(25, 183)); // GND	
		}
		else if (this.m_nRotationAngle == 270)
		{
			// Standard D0 -> D13
			this.m_arrayPins.get(0).set(this.m_rectangle.m_pointTL, new CSize(9, 137));
			this.m_arrayPins.get(1).set(this.m_rectangle.m_pointTL, new CSize(9, 146));
			this.m_arrayPins.get(2).set(this.m_rectangle.m_pointTL, new CSize(9, 155));
			this.m_arrayPins.get(3).set(this.m_rectangle.m_pointTL, new CSize(9, 164));
			this.m_arrayPins.get(4).set(this.m_rectangle.m_pointTL, new CSize(9, 173));
			this.m_arrayPins.get(5).set(this.m_rectangle.m_pointTL, new CSize(9, 182));
			this.m_arrayPins.get(6).set(this.m_rectangle.m_pointTL, new CSize(9, 191));
			this.m_arrayPins.get(7).set(this.m_rectangle.m_pointTL, new CSize(9, 200));
			this.m_arrayPins.get(8).set(this.m_rectangle.m_pointTL, new CSize(9, 217));
			this.m_arrayPins.get(9).set(this.m_rectangle.m_pointTL, new CSize(9, 226));
			this.m_arrayPins.get(10).set(this.m_rectangle.m_pointTL, new CSize(9, 235));
			this.m_arrayPins.get(11).set(this.m_rectangle.m_pointTL, new CSize(9, 244));
			this.m_arrayPins.get(12).set(this.m_rectangle.m_pointTL, new CSize(9, 253));
			this.m_arrayPins.get(13).set(this.m_rectangle.m_pointTL, new CSize(9, 262));
			
			// Serial1, Serial2, Serial3 & I2C
			this.m_arrayPins.get(14).set(this.m_rectangle.m_pointTL, new CSize(9, 81)); // Tx1
			this.m_arrayPins.get(15).set(this.m_rectangle.m_pointTL, new CSize(9, 72)); // Rx1
			this.m_arrayPins.get(16).set(this.m_rectangle.m_pointTL, new CSize(9, 99)); // Tx2
			this.m_arrayPins.get(17).set(this.m_rectangle.m_pointTL, new CSize(9, 90)); // Rx2
			this.m_arrayPins.get(18).set(this.m_rectangle.m_pointTL, new CSize(9, 117)); // Tx3
			this.m_arrayPins.get(19).set(this.m_rectangle.m_pointTL, new CSize(9, 108)); // Rx3
			this.m_arrayPins.get(20).set(this.m_rectangle.m_pointTL, new CSize(9, 62)); // SDA
			this.m_arrayPins.get(21).set(this.m_rectangle.m_pointTL, new CSize(9, 53)); // SCL

			// D22 -> D54
			this.m_arrayPins.get(22).set(this.m_rectangle.m_pointTL, new CSize(19, 15));	
			this.m_arrayPins.get(23).set(this.m_rectangle.m_pointTL, new CSize(19, 24));	
			this.m_arrayPins.get(24).set(this.m_rectangle.m_pointTL, new CSize(28, 15));	
			this.m_arrayPins.get(25).set(this.m_rectangle.m_pointTL, new CSize(28, 24));	
			this.m_arrayPins.get(26).set(this.m_rectangle.m_pointTL, new CSize(37, 15));	
			this.m_arrayPins.get(27).set(this.m_rectangle.m_pointTL, new CSize(37, 24));	
			this.m_arrayPins.get(28).set(this.m_rectangle.m_pointTL, new CSize(46, 15));	
			this.m_arrayPins.get(29).set(this.m_rectangle.m_pointTL, new CSize(46, 24));	
			this.m_arrayPins.get(30).set(this.m_rectangle.m_pointTL, new CSize(56, 15));	
			this.m_arrayPins.get(31).set(this.m_rectangle.m_pointTL, new CSize(56, 24));	
			this.m_arrayPins.get(32).set(this.m_rectangle.m_pointTL, new CSize(65, 15));	
			this.m_arrayPins.get(33).set(this.m_rectangle.m_pointTL, new CSize(65, 24));	
			this.m_arrayPins.get(34).set(this.m_rectangle.m_pointTL, new CSize(74, 15));	
			this.m_arrayPins.get(35).set(this.m_rectangle.m_pointTL, new CSize(74, 24));	
			this.m_arrayPins.get(36).set(this.m_rectangle.m_pointTL, new CSize(83, 15));	
			this.m_arrayPins.get(37).set(this.m_rectangle.m_pointTL, new CSize(83, 24));	
			this.m_arrayPins.get(38).set(this.m_rectangle.m_pointTL, new CSize(92, 15));	
			this.m_arrayPins.get(39).set(this.m_rectangle.m_pointTL, new CSize(92, 24));	
			this.m_arrayPins.get(40).set(this.m_rectangle.m_pointTL, new CSize(101, 15));	
			this.m_arrayPins.get(41).set(this.m_rectangle.m_pointTL, new CSize(101, 24));	
			this.m_arrayPins.get(42).set(this.m_rectangle.m_pointTL, new CSize(111, 15));	
			this.m_arrayPins.get(43).set(this.m_rectangle.m_pointTL, new CSize(111, 24));	
			this.m_arrayPins.get(44).set(this.m_rectangle.m_pointTL, new CSize(120, 15));	
			this.m_arrayPins.get(45).set(this.m_rectangle.m_pointTL, new CSize(120, 24));	
			this.m_arrayPins.get(46).set(this.m_rectangle.m_pointTL, new CSize(129, 15));	
			this.m_arrayPins.get(47).set(this.m_rectangle.m_pointTL, new CSize(129, 24));	
			this.m_arrayPins.get(48).set(this.m_rectangle.m_pointTL, new CSize(139, 15));	
			this.m_arrayPins.get(49).set(this.m_rectangle.m_pointTL, new CSize(139, 24));	
			this.m_arrayPins.get(50).set(this.m_rectangle.m_pointTL, new CSize(148, 15));	
			this.m_arrayPins.get(51).set(this.m_rectangle.m_pointTL, new CSize(148, 24));	
			this.m_arrayPins.get(52).set(this.m_rectangle.m_pointTL, new CSize(157, 15));	
			this.m_arrayPins.get(53).set(this.m_rectangle.m_pointTL, new CSize(157, 24));	

			// A0 -> A15
			this.m_arrayPins.get(54).set(this.m_rectangle.m_pointTL, new CSize(185, 182));
			this.m_arrayPins.get(55).set(this.m_rectangle.m_pointTL, new CSize(185, 173));
			this.m_arrayPins.get(56).set(this.m_rectangle.m_pointTL, new CSize(185, 164));
			this.m_arrayPins.get(57).set(this.m_rectangle.m_pointTL, new CSize(185, 155));
			this.m_arrayPins.get(58).set(this.m_rectangle.m_pointTL, new CSize(185, 146));
			this.m_arrayPins.get(59).set(this.m_rectangle.m_pointTL, new CSize(185, 137));	
			this.m_arrayPins.get(60).set(this.m_rectangle.m_pointTL, new CSize(185, 128));	
			this.m_arrayPins.get(61).set(this.m_rectangle.m_pointTL, new CSize(185, 119));	
			this.m_arrayPins.get(62).set(this.m_rectangle.m_pointTL, new CSize(185, 99));	
			this.m_arrayPins.get(63).set(this.m_rectangle.m_pointTL, new CSize(185, 90));	
			this.m_arrayPins.get(64).set(this.m_rectangle.m_pointTL, new CSize(185, 81));	
			this.m_arrayPins.get(65).set(this.m_rectangle.m_pointTL, new CSize(185, 72));	
			this.m_arrayPins.get(66).set(this.m_rectangle.m_pointTL, new CSize(185, 62));	
			this.m_arrayPins.get(67).set(this.m_rectangle.m_pointTL, new CSize(185, 53));	
			this.m_arrayPins.get(68).set(this.m_rectangle.m_pointTL, new CSize(185, 44));	
			this.m_arrayPins.get(69).set(this.m_rectangle.m_pointTL, new CSize(185, 35));

			this.m_arrayPins.get(70).set(this.m_rectangle.m_pointTL, new CSize(185, 249)); // RESET	
			this.m_arrayPins.get(71).set(this.m_rectangle.m_pointTL, new CSize(185, 240)); // 3.3V	
			this.m_arrayPins.get(72).set(this.m_rectangle.m_pointTL, new CSize(185, 231)); // 5V
			this.m_arrayPins.get(73).set(this.m_rectangle.m_pointTL, new CSize(185, 221)); // GND		
			this.m_arrayPins.get(74).set(this.m_rectangle.m_pointTL, new CSize(185, 212)); // GND	
			this.m_arrayPins.get(75).set(this.m_rectangle.m_pointTL, new CSize(9, 272)); // GND near AREF	

			this.m_arrayPins.get(76).set(this.m_rectangle.m_pointTL, new CSize(9, 15)); // 5V
			this.m_arrayPins.get(77).set(this.m_rectangle.m_pointTL, new CSize(9, 24)); // 5V
			this.m_arrayPins.get(78).set(this.m_rectangle.m_pointTL, new CSize(167, 15)); // GND		
			this.m_arrayPins.get(79).set(this.m_rectangle.m_pointTL, new CSize(167, 24)); // GND	
		}
	}

	setDeviceName(strDeviceName)
	{
		super.setDeviceName(strDeviceName);
		this.m_SPI.setDeviceName(strDeviceName);
		this.m_I2C .setDeviceName(strDeviceName);
		this.m_Serial.setDeviceName(strDeviceName);
		this.m_Serial1.setDeviceName(strDeviceName);
		this.m_Serial2.setDeviceName(strDeviceName);
		this.m_Serial3.setDeviceName(strDeviceName);
	}

	doDeleteAllConnections()
	{
		super.doDeleteAllConnections();
		this.m_SPI.doDeleteAllDevices();
		this.m_I2C.doDeleteAllDevices();
		this.m_Serial.doDeleteAllDevices();
		this.m_Serial1.doDeleteAllDevices();
		this.m_Serial2.doDeleteAllDevices();
		this.m_Serial3.doDeleteAllDevices();
	}
}



//*************************************************************************
//*
//* ARDUINO UNO
//*
//*************************************************************************

class CArduinoUno extends CMCUBase
{
	static m_ImageObject0 = CComponentBase.doGetImageObject("img\\Components\\MCUs\\ArduinoUno.png");
	static m_ImageObject90 = CComponentBase.doGetImageObject("img\\Components\\MCUs\\ArduinoUno90.png");
	static m_ImageObject180 = CComponentBase.doGetImageObject("img\\Components\\MCUs\\ArduinoUno180.png");
	static m_ImageObject270 = CComponentBase.doGetImageObject("img\\Components\\MCUs\\ArduinoUno270.png");

	constructor()
	{
		var strName = "";
		
		super("UNO");
		this.m_fScale = 1.75;
		this.m_ImageObject0 = CArduinoUno.m_ImageObject0;
		this.m_ImageObject90 = CArduinoUno.m_ImageObject90;
		this.m_ImageObject180 = CArduinoUno.m_ImageObject180;
		this.m_ImageObject270 = CArduinoUno.m_ImageObject270;
		this.m_strDeviceName = "UNO1";

		for (var nI = 0, bIsPWM = false, bIsAnalog = false; nI <= 19; nI++)
		{
			bIsPWM = (nI == 3) || (nI == 5) || (nI == 6) || (nI == 9) || (nI == 11);
			bIsAnalog = (nI >= 14) && (nI <= 19);
			
			if (nI == 0)
				strName = "Rx";
			else if (nI == 1)
				strName = "Tx";
			else if (bIsAnalog)
				strName = "A" + (nI - 14).toString();
			else
				strName = nI.toString();
			
			this.m_arrayPins.add(new CPin(nI, bIsPWM, bIsAnalog, strName, this.getDeviceName()));
		}
		this.m_nMaxPin = 19;

		this.m_arrayPins.add(new CResetPin(nI++, this.getDeviceName()));
		this.m_arrayPins.add(new C3_3VPin(nI++, this.getDeviceName()));
		this.m_arrayPins.add(new C5VPin(nI++, this.getDeviceName()));
		this.m_arrayPins.add(new CGNDPin(nI++, this.getDeviceName()));
		this.m_arrayPins.add(new CGNDPin(nI++, this.getDeviceName()));
		this.m_arrayPins.add(new CGNDPin(nI++, this.getDeviceName()));
		this.doRotate(0);

		this.m_SPI = new CSPIPort(11, 12, 13, this.getDeviceName());
		this.m_I2C = new CI2CPort(19, 18, this.getDeviceName());
		this.m_Serial = new CSerialPort(1, 0, this.getDeviceName());
		this.setDeviceName(this.m_strDeviceName);
		
		this.m_mapAnalogPins.set("A0", 14);
		this.m_mapAnalogPins.set("A1", 15);
		this.m_mapAnalogPins.set("A2", 16);
		this.m_mapAnalogPins.set("A3", 17);
		this.m_mapAnalogPins.set("A4", 18);
		this.m_mapAnalogPins.set("A5", 19);
	}
	
	doWrite()
	{
		return super.doWrite();
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
			this.m_arrayPins.get(0).set(this.m_rectangle.m_pointTL, new CSize(394, 10));
			this.m_arrayPins.get(1).set(this.m_rectangle.m_pointTL, new CSize(385, 10));
			this.m_arrayPins.get(2).set(this.m_rectangle.m_pointTL, new CSize(376, 10));
			this.m_arrayPins.get(3).set(this.m_rectangle.m_pointTL, new CSize(367, 10));
			this.m_arrayPins.get(4).set(this.m_rectangle.m_pointTL, new CSize(357, 10));
			this.m_arrayPins.get(5).set(this.m_rectangle.m_pointTL, new CSize(347, 10));
			this.m_arrayPins.get(6).set(this.m_rectangle.m_pointTL, new CSize(338, 10));
			this.m_arrayPins.get(7).set(this.m_rectangle.m_pointTL, new CSize(329, 10));
			this.m_arrayPins.get(8).set(this.m_rectangle.m_pointTL, new CSize(314, 10));
			this.m_arrayPins.get(9).set(this.m_rectangle.m_pointTL, new CSize(305, 10));
			this.m_arrayPins.get(10).set(this.m_rectangle.m_pointTL, new CSize(295, 10));
			this.m_arrayPins.get(11).set(this.m_rectangle.m_pointTL, new CSize(285, 10));
			this.m_arrayPins.get(12).set(this.m_rectangle.m_pointTL, new CSize(275, 10));
			this.m_arrayPins.get(13).set(this.m_rectangle.m_pointTL, new CSize(267, 10));
			this.m_arrayPins.get(14).set(this.m_rectangle.m_pointTL, new CSize(348, 189));
			this.m_arrayPins.get(15).set(this.m_rectangle.m_pointTL, new CSize(358, 189));
			this.m_arrayPins.get(16).set(this.m_rectangle.m_pointTL, new CSize(367, 189));
			this.m_arrayPins.get(17).set(this.m_rectangle.m_pointTL, new CSize(376, 189));
			this.m_arrayPins.get(18).set(this.m_rectangle.m_pointTL, new CSize(385, 189));
			this.m_arrayPins.get(19).set(this.m_rectangle.m_pointTL, new CSize(395, 189));	

			this.m_arrayPins.get(20).set(this.m_rectangle.m_pointTL, new CSize(281, 189)); // RESET	
			this.m_arrayPins.get(21).set(this.m_rectangle.m_pointTL, new CSize(291, 189)); // 3.3V	
			this.m_arrayPins.get(22).set(this.m_rectangle.m_pointTL, new CSize(300, 189)); // 5V
			this.m_arrayPins.get(23).set(this.m_rectangle.m_pointTL, new CSize(310, 189)); // GND		
			this.m_arrayPins.get(24).set(this.m_rectangle.m_pointTL, new CSize(319, 189)); // GND	
			this.m_arrayPins.get(25).set(this.m_rectangle.m_pointTL, new CSize(257, 10)); // GND near AREF	
		}
		else if (this.m_nRotationAngle == 90)
		{
			this.m_arrayPins.get(0).set(this.m_rectangle.m_pointTL, new CSize(187, 394));
			this.m_arrayPins.get(1).set(this.m_rectangle.m_pointTL, new CSize(187, 384));
			this.m_arrayPins.get(2).set(this.m_rectangle.m_pointTL, new CSize(187, 374));
			this.m_arrayPins.get(3).set(this.m_rectangle.m_pointTL, new CSize(187, 365));
			this.m_arrayPins.get(4).set(this.m_rectangle.m_pointTL, new CSize(187, 356));
			this.m_arrayPins.get(5).set(this.m_rectangle.m_pointTL, new CSize(187, 347));
			this.m_arrayPins.get(6).set(this.m_rectangle.m_pointTL, new CSize(187, 338));
			this.m_arrayPins.get(7).set(this.m_rectangle.m_pointTL, new CSize(187, 329));
			this.m_arrayPins.get(8).set(this.m_rectangle.m_pointTL, new CSize(187, 314));
			this.m_arrayPins.get(9).set(this.m_rectangle.m_pointTL, new CSize(187, 305));
			this.m_arrayPins.get(10).set(this.m_rectangle.m_pointTL, new CSize(187, 296));
			this.m_arrayPins.get(11).set(this.m_rectangle.m_pointTL, new CSize(187, 287));
			this.m_arrayPins.get(12).set(this.m_rectangle.m_pointTL, new CSize(187, 278));
			this.m_arrayPins.get(13).set(this.m_rectangle.m_pointTL, new CSize(187, 269));
			this.m_arrayPins.get(14).set(this.m_rectangle.m_pointTL, new CSize(9, 347));
			this.m_arrayPins.get(15).set(this.m_rectangle.m_pointTL, new CSize(9, 356));
			this.m_arrayPins.get(16).set(this.m_rectangle.m_pointTL, new CSize(9, 366));
			this.m_arrayPins.get(17).set(this.m_rectangle.m_pointTL, new CSize(9, 375));
			this.m_arrayPins.get(18).set(this.m_rectangle.m_pointTL, new CSize(9, 384));
			this.m_arrayPins.get(19).set(this.m_rectangle.m_pointTL, new CSize(9, 394));	

			this.m_arrayPins.get(20).set(this.m_rectangle.m_pointTL, new CSize(9, 284)); // RESET	
			this.m_arrayPins.get(21).set(this.m_rectangle.m_pointTL, new CSize(9, 293)); // 3.3V	
			this.m_arrayPins.get(22).set(this.m_rectangle.m_pointTL, new CSize(9, 302)); // 5V
			this.m_arrayPins.get(23).set(this.m_rectangle.m_pointTL, new CSize(9, 311)); // GND		
			this.m_arrayPins.get(24).set(this.m_rectangle.m_pointTL, new CSize(9, 320)); // GND	
			this.m_arrayPins.get(25).set(this.m_rectangle.m_pointTL, new CSize(187, 260)); // GND near AREF	
		}
		else if (this.m_nRotationAngle == 180)
		{
			this.m_arrayPins.get(0).set(this.m_rectangle.m_pointTL, new CSize(19, 188));
			this.m_arrayPins.get(1).set(this.m_rectangle.m_pointTL, new CSize(28, 188));
			this.m_arrayPins.get(2).set(this.m_rectangle.m_pointTL, new CSize(37, 188));
			this.m_arrayPins.get(3).set(this.m_rectangle.m_pointTL, new CSize(47, 188));
			this.m_arrayPins.get(4).set(this.m_rectangle.m_pointTL, new CSize(56, 188));
			this.m_arrayPins.get(5).set(this.m_rectangle.m_pointTL, new CSize(66, 188));
			this.m_arrayPins.get(6).set(this.m_rectangle.m_pointTL, new CSize(75, 188));
			this.m_arrayPins.get(7).set(this.m_rectangle.m_pointTL, new CSize(84, 188));
			this.m_arrayPins.get(8).set(this.m_rectangle.m_pointTL, new CSize(99, 188));
			this.m_arrayPins.get(9).set(this.m_rectangle.m_pointTL, new CSize(109, 188));
			this.m_arrayPins.get(10).set(this.m_rectangle.m_pointTL, new CSize(119, 188));
			this.m_arrayPins.get(11).set(this.m_rectangle.m_pointTL, new CSize(128, 188));
			this.m_arrayPins.get(12).set(this.m_rectangle.m_pointTL, new CSize(138, 188));
			this.m_arrayPins.get(13).set(this.m_rectangle.m_pointTL, new CSize(147, 188));
			this.m_arrayPins.get(14).set(this.m_rectangle.m_pointTL, new CSize(66, 9));
			this.m_arrayPins.get(15).set(this.m_rectangle.m_pointTL, new CSize(55, 9));
			this.m_arrayPins.get(16).set(this.m_rectangle.m_pointTL, new CSize(45, 9));
			this.m_arrayPins.get(17).set(this.m_rectangle.m_pointTL, new CSize(36, 9));
			this.m_arrayPins.get(18).set(this.m_rectangle.m_pointTL, new CSize(27, 9));
			this.m_arrayPins.get(19).set(this.m_rectangle.m_pointTL, new CSize(18, 9));	

			this.m_arrayPins.get(20).set(this.m_rectangle.m_pointTL, new CSize(131, 9)); // RESET	
			this.m_arrayPins.get(21).set(this.m_rectangle.m_pointTL, new CSize(122, 9)); // 3.3V	
			this.m_arrayPins.get(22).set(this.m_rectangle.m_pointTL, new CSize(113, 9)); // 5V
			this.m_arrayPins.get(23).set(this.m_rectangle.m_pointTL, new CSize(104, 9)); // GND		
			this.m_arrayPins.get(24).set(this.m_rectangle.m_pointTL, new CSize(95, 9)); // GND	
			this.m_arrayPins.get(25).set(this.m_rectangle.m_pointTL, new CSize(156, 188)); // GND near AREF	
		}
		else if (this.m_nRotationAngle == 270)
		{
			this.m_arrayPins.get(0).set(this.m_rectangle.m_pointTL, new CSize(10, 17));
			this.m_arrayPins.get(1).set(this.m_rectangle.m_pointTL, new CSize(10, 26));
			this.m_arrayPins.get(2).set(this.m_rectangle.m_pointTL, new CSize(10, 36));
			this.m_arrayPins.get(3).set(this.m_rectangle.m_pointTL, new CSize(10, 45));
			this.m_arrayPins.get(4).set(this.m_rectangle.m_pointTL, new CSize(10, 55));
			this.m_arrayPins.get(5).set(this.m_rectangle.m_pointTL, new CSize(10, 64));
			this.m_arrayPins.get(6).set(this.m_rectangle.m_pointTL, new CSize(10, 74));
			this.m_arrayPins.get(7).set(this.m_rectangle.m_pointTL, new CSize(10, 83));
			this.m_arrayPins.get(8).set(this.m_rectangle.m_pointTL, new CSize(10, 99));
			this.m_arrayPins.get(9).set(this.m_rectangle.m_pointTL, new CSize(10, 108));
			this.m_arrayPins.get(10).set(this.m_rectangle.m_pointTL, new CSize(10, 117));
			this.m_arrayPins.get(11).set(this.m_rectangle.m_pointTL, new CSize(10, 126));
			this.m_arrayPins.get(12).set(this.m_rectangle.m_pointTL, new CSize(10, 136));
			this.m_arrayPins.get(13).set(this.m_rectangle.m_pointTL, new CSize(10, 145));
			this.m_arrayPins.get(14).set(this.m_rectangle.m_pointTL, new CSize(189, 65));
			this.m_arrayPins.get(15).set(this.m_rectangle.m_pointTL, new CSize(189, 56));
			this.m_arrayPins.get(16).set(this.m_rectangle.m_pointTL, new CSize(189, 46));
			this.m_arrayPins.get(17).set(this.m_rectangle.m_pointTL, new CSize(189, 36));
			this.m_arrayPins.get(18).set(this.m_rectangle.m_pointTL, new CSize(189, 27));
			this.m_arrayPins.get(19).set(this.m_rectangle.m_pointTL, new CSize(189, 18));	

			this.m_arrayPins.get(20).set(this.m_rectangle.m_pointTL, new CSize(189, 132)); // RESET			
			this.m_arrayPins.get(21).set(this.m_rectangle.m_pointTL, new CSize(189, 123)); // 3.3V	
			this.m_arrayPins.get(22).set(this.m_rectangle.m_pointTL, new CSize(189, 114)); // 5V
			this.m_arrayPins.get(23).set(this.m_rectangle.m_pointTL, new CSize(189, 105)); // GND		
			this.m_arrayPins.get(24).set(this.m_rectangle.m_pointTL, new CSize(189, 96)); // GND	
			this.m_arrayPins.get(25).set(this.m_rectangle.m_pointTL, new CSize(10, 155)); // GND near AREF	
		}
	}

	setDeviceName(strDeviceName)
	{
		super.setDeviceName(strDeviceName);
		this.m_SPI.setDeviceName(strDeviceName);
		this.m_I2C.setDeviceName(strDeviceName);
		this.m_Serial.setDeviceName(strDeviceName);
	}

	
	doDeleteAllConnections()
	{
		super.doDeleteAllConnections();
		this.m_SPI.doDeleteAllDevices();
		this.m_I2C.doDeleteAllDevices();
		this.m_Serial.doDeleteAllDevices();
	}
}




//*************************************************************************
//*
//* MICROBIT LED
//*
//*************************************************************************

class CMicrobitLED
{
	constructor()
	{
		this.m_rectangle = new CRectangle(new CPoint(0, 0), new CSize(4, 4));
		this.m_bOn = false;
	}
	
	doMove(pointNew)
	{
		this.m_rectangle.m_pointTL = new CPoint(pointNew.m_nX, pointNew.m_nY);
	}
	
	doTurnOn()
	{
		this.m_bOn = true;
	}
	
	doTurnOff()
	{
		this.m_bOn = false;
	}
	
	doDisplay()
	{
		if (this.m_bOn)
		{
			g_CanvasContext.strokeStyle = 'red';
			g_CanvasContext.fillStyle = 'red';
			g_CanvasContext.fillRect(this.m_rectangle.m_pointTL.m_nX, this.m_rectangle.m_pointTL.m_nY, this.m_rectangle.m_size.m_nWidth, this.m_rectangle.m_size.m_nHeight);
		}
	}
}




class CMicrobitLEDColumn
{
	constructor()
	{
		this.m_rectangle = new CRectangle(new CPoint(0, 0), new CSize(0, 0));
		this.m_bOn = false;
		this.m_arrayLEDs = [];
		for (let nI = 0; nI < 5; nI++)
			this.m_arrayLEDs[nI] = new CMicrobitLED();
		this.m_nGap = 15;
	}
	
	doMove(pointNew)
	{
		var point = new CPoint(pointNew.m_nX, pointNew.m_nY);
		
		for (let nI = 0; nI < 5; nI++)
		{
			this.m_arrayLEDs[nI].doMove(point);
			point.m_nY += this.m_nGap;
		}
	}
	
	doTurnOn(nLEDNum)
	{
		if ((nLEDNum >= 0) && (nLEDNum < 5))
			this.m_arrayLEDs[nLEDNum].doTurnOn();
	}
	
	doTurnOff(nLEDNum)
	{
		if ((nLEDNum >= 0) && (nLEDNum < 5))
			this.m_arrayLEDs[nLEDNum].doTurnOff();
	}
	
	doTurnOnAll()
	{
		for (let nI = 0; nI < 5; nI++)
			this.m_arrayLEDs[nI].doTurnOn(nI);
	}
	
	doTurnOffAll()
	{
		for (let nI = 0; nI < 5; nI++)
			this.m_arrayLEDs[nI].doTurnOff(nI);
	}
	
	doDisplay()
	{
		for (let nI = 0; nI < 5; nI++)
			this.m_arrayLEDs[nI].doDisplay();
	}

}




class CMicrobitLEDMatrix
{
	constructor()
	{
		this.m_rectangle = new CRectangle(new CPoint(0, 0), new CSize(0, 0));
		this.m_bOn = false;
		this.m_arrayLEDColumns = [];
		for (let nI = 0; nI < 5; nI++)
			this.m_arrayLEDColumns[nI] = new CMicrobitLEDColumn();
		this.m_nGap = 15;
		this.m_nRotationAngle = 0;
	}
	
	doRotate(nAngle)
	{
		this.m_nRotationAngle = nAngle;
	}
	
	doMove(pointNew)
	{
		var point = new CPoint(pointNew.m_nX, pointNew.m_nY);
		
		for (let nI = 0; nI < 5; nI++)
		{
			this.m_arrayLEDColumns[nI].doMove(point);
			point.m_nX += this.m_nGap;
		}
	}
	
	doGetXCoord(nX)
	{
		if (this.m_nRotationAngle == 0)
			nX = nX;
		else if (this.m_nRotationAngle == 90)
			nX = nX;
		else if (this.m_nRotationAngle == 180)
			nX = 4 - nX;
		else if (this.m_nRotationAngle == 270)
			nX = 4 - nX;

		return nX;
	}
	
	doGetYCoord(nY)
	{
		if (this.m_nRotationAngle == 0)
			nY = 4 - nY;
		else if (this.m_nRotationAngle == 90)
			nY = nY;
		else if (this.m_nRotationAngle == 180)
			nY = nY;
		else if (this.m_nRotationAngle == 270)
			nY = 4 - nY;

		return nY;
	}
	
	doTurnOn(nX, nY)
	{
		if ((nX >= 0) && (nX < 5))
			this.m_arrayLEDColumns[this.doGetXCoord(nX)].doTurnOn(this.doGetYCoord(nY));
	}
	
	doTurnOff(nX, nY)
	{
		if ((nX >= 0) && (nX < 5))
			this.m_arrayLEDColumns[this.doGetXCoord(nX)].doTurnOff(this.doGetYCoord(nY));
	}
	
	doTurnOnRow(nY)
	{
		for (let nI = 0; nI < 5; nI++)
			this.m_arrayLEDColumns[nI].doTurnOn(this.doGetYCoord(nY));
	}
	
	doTurnOffRow(nY)
	{
		for (let nI = 0; nI < 5; nI++)
			this.m_arrayLEDColumns[nI].doTurnOff(this.doGetYCoord(nY));
	}
	
	doTurnOnColumn(nX)
	{
		if ((nX >= 0) && (nX < 5))
			this.m_arrayLEDColumns[this.doGetXCoord(nX)].doTurnOnAll();
	}
	
	doTurnOffColumn(nX)
	{
		if ((nX >= 0) && (nX < 5))
			this.m_arrayLEDColumns[this.doGetXCoord(nX)].doTurnOffAll();
	}
	
	doTurnOnAll()
	{
		for (let nI = 0; nI < 5; nI++)
			this.m_arrayLEDColumns[nI].doTurnOnAll();
	}
	
	doTurnOffAll()
	{
		for (let nI = 0; nI < 5; nI++)
			this.m_arrayLEDColumns[nI].doTurnOffAll();
	}
	
	doDisplay()
	{
		for (let nI = 0; nI < 5; nI++)
			this.m_arrayLEDColumns[nI].doDisplay();
	}

}




//*************************************************************************
//*
//* MICROBIT
//*
//*************************************************************************

function doChangeSelectBreakout(strType)
{
	var strDeviceName = doFindSelectedComponentNoMouse();
	
	if ((strDeviceName != null) && (strDeviceName != ""))
	{
		g_mapPlacedComponents.get(strDeviceName).doSetBreakout(strType == "BREAKOUT");
		doDisplayAllComponents();
	}
}

class CMicrobit extends CMCUBase
{
	static m_ImageObjectBreakout0 = CComponentBase.doGetImageObject("img\\Components\\MCUs\\MicrobitBreakout.png");
	static m_ImageObjectBreakout90 = CComponentBase.doGetImageObject("img\\Components\\MCUs\\MicrobitBreakout90.png");
	static m_ImageObjectBreakout180 = CComponentBase.doGetImageObject("img\\Components\\MCUs\\MicrobitBreakout180.png");
	static m_ImageObjectBreakout270 = CComponentBase.doGetImageObject("img\\Components\\MCUs\\MicrobitBreakout270.png");
	static m_ImageObjectNoBreakout0 = CComponentBase.doGetImageObject("img\\Components\\MCUs\\Microbit.png");
	static m_ImageObjectNoBreakout90 = CComponentBase.doGetImageObject("img\\Components\\MCUs\\Microbit90.png");
	static m_ImageObjectNoBreakout180 = CComponentBase.doGetImageObject("img\\Components\\MCUs\\Microbit180.png");
	static m_ImageObjectNoBreakout270 = CComponentBase.doGetImageObject("img\\Components\\MCUs\\Microbit270.png");

	constructor(bBreakout)
	{
		super("MICROBIT");
		this.m_bBreakout = bBreakout;
		this.m_fScale = 1.7;
		this.m_arrayLEDMatrix = new CMicrobitLEDMatrix();	
		this.m_strEditHTML += "&nbsp;&nbsp;<div style=\"" + g_strSecondDivDisplayStyle + "\"><div style=\"" + g_strLabelStyle + 
								"\" id=\"breakout\">BREAKOUT&nbsp;&nbsp;</div><div style=\"display:inline-block\"><select onchange=\"doChangeSelectBreakout(this.options[this.selectedIndex].text)\" style=\"" + g_strSelectStyle +
								"\" id=\"breakout\"><option selected>NO BREAKOUT</option><option>BREAKOUT</option></select></div>";
		this.doSetImages(bBreakout);
		this.m_strDeviceName = "MICROBIT1";
	
		for (var nI = 0, bIsAnalog = false; nI <= 20; nI++)
		{
			bIsAnalog = ((nI >= 0) && (nI <= 4)) || (nI == 10);
			this.m_arrayPins.add(new CPin(nI, true, bIsAnalog, "P" + nI.toString(), this.getDeviceName()));
		}
		this.m_nMaxPin = 20;

		this.m_arrayPins.add(new C3_3VPin(nI++, this.getDeviceName()));
		this.m_arrayPins.add(new C3_3VPin(nI++, this.getDeviceName()));
		this.m_arrayPins.add(new C3_3VPin(nI++, this.getDeviceName()));
		this.m_arrayPins.add(new CGNDPin(nI++, this.getDeviceName()));
		this.m_arrayPins.add(new CGNDPin(nI++, this.getDeviceName()));
		this.m_arrayPins.add(new CGNDPin(nI++, this.getDeviceName()));
		this.doRotate(0);
	
		this.m_SPI = new CSPIPort(15, 14, 13, this.getDeviceName());
		this.m_I2C = new CI2CPort(19, 20, this.getDeviceName());
		this.setDeviceName(this.m_strDeviceName);
		
		this.m_nButtonAPin = 5;
		this.m_nButtonBPin = 11;
	
		this.m_mapDigitalPinNames = new Map();
		this.m_mapDigitalPinNames.set("P0", 0);
		this.m_mapDigitalPinNames.set("P1", 1);
		this.m_mapDigitalPinNames.set("P2", 2);
		this.m_mapDigitalPinNames.set("P3", 3);
		this.m_mapDigitalPinNames.set("P4", 4);
		this.m_mapDigitalPinNames.set("P5", 5);
		this.m_mapDigitalPinNames.set("P6", 6);
		this.m_mapDigitalPinNames.set("P7", 7);
		this.m_mapDigitalPinNames.set("P8", 8);
		this.m_mapDigitalPinNames.set("P9", 9);
		this.m_mapDigitalPinNames.set("P10", 10);
		this.m_mapDigitalPinNames.set("P11", 11);
		this.m_mapDigitalPinNames.set("P13", 13);
		this.m_mapDigitalPinNames.set("P14", 14);
		this.m_mapDigitalPinNames.set("P15", 15);
		this.m_mapDigitalPinNames.set("P16", 16);
		this.m_mapDigitalPinNames.set("P19", 19);
		this.m_mapDigitalPinNames.set("P20", 20);
	}
	
	doWrite()
	{
		var strFileContents = super.doWrite();
		strFileContents += this.m_bBreakout + "\r\n";
		return strFileContents;
	}
	
	doSetImages(bBreakout)
	{
		if (bBreakout)
		{
			this.m_ImageObject0 = CMicrobit.m_ImageObjectBreakout0;
			this.m_ImageObject90 = CMicrobit.m_ImageObjectBreakout90;
			this.m_ImageObject180 = CMicrobit.m_ImageObjectBreakout180;
			this.m_ImageObject270 = CMicrobit.m_ImageObjectBreakout270;
		}
		else
		{
			this.m_ImageObject0 = CMicrobit.m_ImageObjectNoBreakout0;
			this.m_ImageObject90 = CMicrobit.m_ImageObjectNoBreakout90;
			this.m_ImageObject180 = CMicrobit.m_ImageObjectNoBreakout180;
			this.m_ImageObject270 = CMicrobit.m_ImageObjectNoBreakout270;
		}
	}
	
	doSetBreakout(bBreakout)
	{
		this.m_bBreakout = bBreakout;
		this.doSetImages(bBreakout);
		this.doRotate(0);
	}

	doTurnOnLED(nX, nY)
	{
		this.m_arrayLEDMatrix.turnOn(nX, nY);
	}
	
	doTurnOffLED(nX, nY)
	{
		this.m_arrayLEDMatrix.turnOff(nX, nY);
	}
	
	doTurnOnRow(nY)
	{
		this.m_arrayLEDMatrix.doTurnOnRow(nY);
	}
	
	doTurnOffRow(nY)
	{
		this.m_arrayLEDMatrix.doTurnOffRow(nY);
	}
	
	doTurnOnColumn(nX)
	{
		this.m_arrayLEDMatrix.doTurnOnColumn();
	}
	
	doTurnOffColumn(nX)
	{
		this.m_arrayLEDMatrix.doTurnOffColumn();
	}
	
	doTurnOnAll()
	{
		this.m_arrayLEDMatrix.doTurnOnAll();
	}
	
	doTurnOffAll()
	{
		this.m_arrayLEDMatrix.doTurnOffAll();
	}
	
	doRotate(nAngleAdd)
	{
		super.doRotate(nAngleAdd);
		this.m_arrayLEDMatrix.doRotate(this.m_nRotationAngle);
		this.m_arrayLEDMatrix.doTurnOffAll();
		this.doSetPinPositions();
	}
	
	doMove(pointMousePos)
	{
		super.doMove(pointMousePos);
		this.doSetPinPositions();
	}
	
	doSetPinPositions()
	{
		var pointCenter = this.m_rectangle.getCenter();
		
		if (this.m_bBreakout)
		{
			if (this.m_nRotationAngle == 0)
				this.m_arrayLEDMatrix.doMove(new CPoint(this.m_rectangle.m_pointTL.m_nX, this.m_rectangle.m_pointTL.m_nY));
			else if (this.m_nRotationAngle == 90)
				this.m_arrayLEDMatrix.doMove(new CPoint(this.m_rectangle.m_pointTL.m_nX, this.m_rectangle.m_pointTL.m_nY));
			else if (this.m_nRotationAngle == 180)
				this.m_arrayLEDMatrix.doMove(new CPoint(this.m_rectangle.m_pointTL.m_nX, this.m_rectangle.m_pointTL.m_nY));
			else if (this.m_nRotationAngle == 270)
				this.m_arrayLEDMatrix.doMove(new CPoint(this.m_rectangle.m_pointTL.m_nX, this.m_rectangle.m_pointTL.m_nY));
		}
		else
		{
			if (this.m_nRotationAngle == 0)
			{
				this.m_arrayPins.get(0).set(this.m_rectangle.m_pointTL, new CSize(268, 178)); // P0
				this.m_arrayPins.get(1).set(this.m_rectangle.m_pointTL, new CSize(268, 140)); // P1
				this.m_arrayPins.get(2).set(this.m_rectangle.m_pointTL, new CSize(268, 96)); // P2
				this.m_arrayPins.get(3).set(this.m_rectangle.m_pointTL, new CSize(268, 190)); // P3
				this.m_arrayPins.get(4).set(this.m_rectangle.m_pointTL, new CSize(268, 166)); // P4
				this.m_arrayPins.get(5).set(this.m_rectangle.m_pointTL, new CSize(268, 162)); // P5
				this.m_arrayPins.get(6).set(this.m_rectangle.m_pointTL, new CSize(268, 156)); // P6
				this.m_arrayPins.get(7).set(this.m_rectangle.m_pointTL, new CSize(268, 152)); // P7
				this.m_arrayPins.get(8).set(this.m_rectangle.m_pointTL, new CSize(268, 127)); // P8
				this.m_arrayPins.get(9).set(this.m_rectangle.m_pointTL, new CSize(268, 122)); // P9
				this.m_arrayPins.get(10).set(this.m_rectangle.m_pointTL, new CSize(268, 117)); // P10
				this.m_arrayPins.get(11).set(this.m_rectangle.m_pointTL, new CSize(268, 112)); // P11
				this.m_arrayPins.get(12).set(this.m_rectangle.m_pointTL, new CSize(268, 107)); // P12
				this.m_arrayPins.get(13).set(this.m_rectangle.m_pointTL, new CSize(268, 84)); // P13
				this.m_arrayPins.get(14).set(this.m_rectangle.m_pointTL, new CSize(268, 79)); // P14
				this.m_arrayPins.get(15).set(this.m_rectangle.m_pointTL, new CSize(268, 74)); // P15
				this.m_arrayPins.get(16).set(this.m_rectangle.m_pointTL, new CSize(268, 69)); // P16
				this.m_arrayPins.get(19).set(this.m_rectangle.m_pointTL, new CSize(268, 35)); // P19
				this.m_arrayPins.get(20).set(this.m_rectangle.m_pointTL, new CSize(268, 30)); // P20
				this.m_arrayPins.get(21).set(this.m_rectangle.m_pointTL, new CSize(268, 40)); // 3.3V
				this.m_arrayPins.get(22).set(this.m_rectangle.m_pointTL, new CSize(268, 52)); // 3.3V
				this.m_arrayPins.get(23).set(this.m_rectangle.m_pointTL, new CSize(268, 64)); // 3.3V
				this.m_arrayPins.get(24).set(this.m_rectangle.m_pointTL, new CSize(268, 0)); // GND
				this.m_arrayPins.get(25).set(this.m_rectangle.m_pointTL, new CSize(268, 13)); // GND
				this.m_arrayPins.get(26).set(this.m_rectangle.m_pointTL, new CSize(268, 25)); // GND
				this.m_arrayLEDMatrix.doMove(new CPoint(this.m_rectangle.m_pointTL.m_nX + 175, this.m_rectangle.m_pointTL.m_nY + 66));
			}
			else if (this.m_nRotationAngle == 90)
			{
				this.m_arrayPins.get(0).set(this.m_rectangle.m_pointTL, new CSize(13, 268)); // P0
				this.m_arrayPins.get(1).set(this.m_rectangle.m_pointTL, new CSize(52, 268)); // P1
				this.m_arrayPins.get(2).set(this.m_rectangle.m_pointTL, new CSize(96, 268)); // P2
				this.m_arrayPins.get(3).set(this.m_rectangle.m_pointTL, new CSize(2, 268)); // P3
				this.m_arrayPins.get(4).set(this.m_rectangle.m_pointTL, new CSize(25, 268)); // P4
				this.m_arrayPins.get(5).set(this.m_rectangle.m_pointTL, new CSize(30, 268)); // P5
				this.m_arrayPins.get(6).set(this.m_rectangle.m_pointTL, new CSize(35, 268)); // P6
				this.m_arrayPins.get(7).set(this.m_rectangle.m_pointTL, new CSize(40, 268)); // P7
				this.m_arrayPins.get(8).set(this.m_rectangle.m_pointTL, new CSize(64, 268)); // P8
				this.m_arrayPins.get(9).set(this.m_rectangle.m_pointTL, new CSize(69, 268)); // P9
				this.m_arrayPins.get(10).set(this.m_rectangle.m_pointTL, new CSize(74, 268)); // P10
				this.m_arrayPins.get(11).set(this.m_rectangle.m_pointTL, new CSize(79, 268)); // P11
				this.m_arrayPins.get(12).set(this.m_rectangle.m_pointTL, new CSize(84, 268)); // P12
				this.m_arrayPins.get(13).set(this.m_rectangle.m_pointTL, new CSize(107, 268)); // P13
				this.m_arrayPins.get(14).set(this.m_rectangle.m_pointTL, new CSize(112, 268)); // P14
				this.m_arrayPins.get(15).set(this.m_rectangle.m_pointTL, new CSize(117, 268)); // P15
				this.m_arrayPins.get(16).set(this.m_rectangle.m_pointTL, new CSize(122, 268)); // P16
				this.m_arrayPins.get(19).set(this.m_rectangle.m_pointTL, new CSize(155, 268)); // P19
				this.m_arrayPins.get(20).set(this.m_rectangle.m_pointTL, new CSize(160, 268)); // P20
				this.m_arrayPins.get(21).set(this.m_rectangle.m_pointTL, new CSize(127, 268)); // 3.3V
				this.m_arrayPins.get(22).set(this.m_rectangle.m_pointTL, new CSize(139, 268)); // 3.3V
				this.m_arrayPins.get(23).set(this.m_rectangle.m_pointTL, new CSize(150, 268)); // 3.3V
				this.m_arrayPins.get(24).set(this.m_rectangle.m_pointTL, new CSize(166, 268)); // GND
				this.m_arrayPins.get(25).set(this.m_rectangle.m_pointTL, new CSize(178, 268)); // GND
				this.m_arrayPins.get(26).set(this.m_rectangle.m_pointTL, new CSize(190, 268)); // GND
				this.m_arrayLEDMatrix.doMove(new CPoint(this.m_rectangle.m_pointTL.m_nX + 66, this.m_rectangle.m_pointTL.m_nY + 175));
			}
			else if (this.m_nRotationAngle == 180)
			{
				this.m_arrayPins.get(0).set(this.m_rectangle.m_pointTL, new CSize(15, 14)); // P0
				this.m_arrayPins.get(1).set(this.m_rectangle.m_pointTL, new CSize(15, 52)); // P1
				this.m_arrayPins.get(2).set(this.m_rectangle.m_pointTL, new CSize(15, 95)); // P2
				this.m_arrayPins.get(3).set(this.m_rectangle.m_pointTL, new CSize(15, 2)); // P3
				this.m_arrayPins.get(4).set(this.m_rectangle.m_pointTL, new CSize(15, 26)); // P4
				this.m_arrayPins.get(5).set(this.m_rectangle.m_pointTL, new CSize(15, 31)); // P5
				this.m_arrayPins.get(6).set(this.m_rectangle.m_pointTL, new CSize(15, 36)); // P6
				this.m_arrayPins.get(7).set(this.m_rectangle.m_pointTL, new CSize(15, 41)); // P7
				this.m_arrayPins.get(8).set(this.m_rectangle.m_pointTL, new CSize(15, 64)); // P8
				this.m_arrayPins.get(9).set(this.m_rectangle.m_pointTL, new CSize(15, 69)); // P9
				this.m_arrayPins.get(10).set(this.m_rectangle.m_pointTL, new CSize(15, 74)); // P10
				this.m_arrayPins.get(11).set(this.m_rectangle.m_pointTL, new CSize(15, 79)); // P11
				this.m_arrayPins.get(12).set(this.m_rectangle.m_pointTL, new CSize(15, 84)); // P12
				this.m_arrayPins.get(13).set(this.m_rectangle.m_pointTL, new CSize(15, 107)); // P13
				this.m_arrayPins.get(14).set(this.m_rectangle.m_pointTL, new CSize(15, 112)); // P14
				this.m_arrayPins.get(15).set(this.m_rectangle.m_pointTL, new CSize(15, 117)); // P15
				this.m_arrayPins.get(16).set(this.m_rectangle.m_pointTL, new CSize(15, 122)); // P16
				this.m_arrayPins.get(19).set(this.m_rectangle.m_pointTL, new CSize(15, 155)); // P19
				this.m_arrayPins.get(20).set(this.m_rectangle.m_pointTL, new CSize(15, 160)); // P20
				this.m_arrayPins.get(21).set(this.m_rectangle.m_pointTL, new CSize(15, 128)); // 3.3V
				this.m_arrayPins.get(22).set(this.m_rectangle.m_pointTL, new CSize(15, 140)); // 3.3V
				this.m_arrayPins.get(23).set(this.m_rectangle.m_pointTL, new CSize(15, 151)); // 3.3V
				this.m_arrayPins.get(24).set(this.m_rectangle.m_pointTL, new CSize(15, 166)); // GND
				this.m_arrayPins.get(25).set(this.m_rectangle.m_pointTL, new CSize(15, 178)); // GND
				this.m_arrayPins.get(26).set(this.m_rectangle.m_pointTL, new CSize(15, 189)); // GND
				this.m_arrayLEDMatrix.doMove(new CPoint(this.m_rectangle.m_pointTL.m_nX + 49, this.m_rectangle.m_pointTL.m_nY + 66));
			}
			else if (this.m_nRotationAngle == 270)
			{
				this.m_arrayPins.get(0).set(this.m_rectangle.m_pointTL, new CSize(178, 16)); // P0
				this.m_arrayPins.get(1).set(this.m_rectangle.m_pointTL, new CSize(139, 16)); // P1
				this.m_arrayPins.get(2).set(this.m_rectangle.m_pointTL, new CSize(96, 16)); // P2
				this.m_arrayPins.get(3).set(this.m_rectangle.m_pointTL, new CSize(190, 16)); // P3
				this.m_arrayPins.get(4).set(this.m_rectangle.m_pointTL, new CSize(166, 16)); // P4
				this.m_arrayPins.get(5).set(this.m_rectangle.m_pointTL, new CSize(161, 16)); // P5
				this.m_arrayPins.get(6).set(this.m_rectangle.m_pointTL, new CSize(156, 16)); // P6
				this.m_arrayPins.get(7).set(this.m_rectangle.m_pointTL, new CSize(151, 16)); // P7
				this.m_arrayPins.get(8).set(this.m_rectangle.m_pointTL, new CSize(127, 16)); // P8
				this.m_arrayPins.get(9).set(this.m_rectangle.m_pointTL, new CSize(122, 16)); // P9
				this.m_arrayPins.get(10).set(this.m_rectangle.m_pointTL, new CSize(117, 16)); // P10
				this.m_arrayPins.get(11).set(this.m_rectangle.m_pointTL, new CSize(112, 16)); // P11
				this.m_arrayPins.get(12).set(this.m_rectangle.m_pointTL, new CSize(107, 16)); // P12
				this.m_arrayPins.get(13).set(this.m_rectangle.m_pointTL, new CSize(83, 16)); // P13
				this.m_arrayPins.get(14).set(this.m_rectangle.m_pointTL, new CSize(78, 16)); // P14
				this.m_arrayPins.get(15).set(this.m_rectangle.m_pointTL, new CSize(73, 16)); // P15
				this.m_arrayPins.get(16).set(this.m_rectangle.m_pointTL, new CSize(68, 16)); // P16
				this.m_arrayPins.get(19).set(this.m_rectangle.m_pointTL, new CSize(36, 16)); // P19
				this.m_arrayPins.get(20).set(this.m_rectangle.m_pointTL, new CSize(31, 16)); // P20
				this.m_arrayPins.get(21).set(this.m_rectangle.m_pointTL, new CSize(65, 16)); // 3.3V
				this.m_arrayPins.get(22).set(this.m_rectangle.m_pointTL, new CSize(52, 16)); // 3.3V
				this.m_arrayPins.get(23).set(this.m_rectangle.m_pointTL, new CSize(40, 16)); // 3.3V
				this.m_arrayPins.get(24).set(this.m_rectangle.m_pointTL, new CSize(26, 16)); // GND
				this.m_arrayPins.get(25).set(this.m_rectangle.m_pointTL, new CSize(13, 16)); // GND
				this.m_arrayPins.get(26).set(this.m_rectangle.m_pointTL, new CSize(1, 16)); // GND
				this.m_arrayLEDMatrix.doMove(new CPoint(this.m_rectangle.m_pointTL.m_nX + 66, this.m_rectangle.m_pointTL.m_nY + 49));
			}
		}
	}
	
	setDeviceName(strDeviceName)
	{
		super.setDeviceName(strDeviceName);
		this.m_SPI.setDeviceName(strDeviceName);
		this.m_I2C.setDeviceName(strDeviceName);
	}

	
	doDeleteAllConnections()
	{
		super.doDeleteAllConnections();
		this.m_SPI.doDeleteAllDevices();
		this.m_I2C.doDeleteAllDevices();
	}
	
	doDisplay()
	{
		super.doDisplay();
		this.m_arrayLEDMatrix.doDisplay();
	}
}

