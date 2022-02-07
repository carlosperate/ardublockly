//*************************************************************************
//*
//* 0.25W RESISTOR
//*
//*************************************************************************

function doChangeResistance(strDeviceName, fResistance)
{
	if ((strDeviceName != null) && (strDeviceName != "") && (g_mapPlacedComponents.get(strDeviceName) != null) &&
		(g_mapPlacedComponents.get(strDeviceName).getType() == "RESISTOR"))
	{
		g_mapPlacedComponents.get(strDeviceName).doSetResistance(fResistance);
		doDisplayAllComponents();
	}
}

function doGetResistance()
{
	var ResistenceSel = document.getElementById("resistance");
	var ResistanceMultSel = document.getElementById("resistance_multiplier");
	var fResistance = 0;
	
	if (ResistenceSel && ResistanceMultSel)
	{
		fResistance = ResistenceSel.options[ResistenceSel.selectedIndex].value;
		fResistance *= ResistanceMultSel.options[ResistanceMultSel.selectedIndex].value;
	}
	return fResistance;
}

class CResistor extends CComponentBase
{
	static m_ImageObjectBlown_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\RBlown.png");
	static m_ImageObjectBlown_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\RBlown_90.png");
	static m_ImageObjectBlown_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\RBlown_180.png");
	static m_ImageObjectBlown_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\RBlown_270.png");

	static m_ImageObject1_0_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_0.png");
	static m_ImageObject1_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_90.png");
	static m_ImageObject1_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_180.png");
	static m_ImageObject1_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_270.png");
	
	static m_ImageObject1_2_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_2.png");
	static m_ImageObject1_2_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_2_90.png");
	static m_ImageObject1_2_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_2_180.png");
	static m_ImageObject1_2_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_2_270.png");
	
	static m_ImageObject1_5_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_5.png");
	static m_ImageObject1_5_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_5_90.png");
	static m_ImageObject1_5_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_5_180.png");
	static m_ImageObject1_5_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_5_270.png");
	
	static m_ImageObject1_8_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_8.png");
	static m_ImageObject1_8_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_8_90.png");
	static m_ImageObject1_8_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_8_180.png");
	static m_ImageObject1_8_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_8_270.png");
	
	static m_ImageObject2_2_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_2.png");
	static m_ImageObject2_2_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_2_90.png");
	static m_ImageObject2_2_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_2_180.png");
	static m_ImageObject2_2_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_2_270.png");
	
	static m_ImageObject2_7_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_7.png");
	static m_ImageObject2_7_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_7_90.png");
	static m_ImageObject2_7_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_7_180.png");
	static m_ImageObject2_7_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_7_270.png");
	
	static m_ImageObject3_3_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_3.png");
	static m_ImageObject3_3_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_3_90.png");
	static m_ImageObject3_3_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_3_180.png");
	static m_ImageObject3_3_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_3_270.png");
	
	static m_ImageObject3_9_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_9.png");
	static m_ImageObject3_9_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_9_90.png");
	static m_ImageObject3_9_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_9_180.png");
	static m_ImageObject3_9_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_9_270.png");
	
	static m_ImageObject4_7_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R4_7.png");
	static m_ImageObject4_7_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R4_7_90.png");
	static m_ImageObject4_7_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R4_7_180.png");
	static m_ImageObject4_7_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R4_7_270.png");
	
	static m_ImageObject5_6_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R5_6.png");
	static m_ImageObject5_6_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R5_6_90.png");
	static m_ImageObject5_6_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R5_6_180.png");
	static m_ImageObject5_6_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R5_6_270.png");
	
	static m_ImageObject6_8_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R6_8.png");
	static m_ImageObject6_8_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R6_8_90.png");
	static m_ImageObject6_8_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R6_8_180.png");
	static m_ImageObject6_8_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R6_8_270.png");
	
	static m_ImageObject8_2_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R8_2.png");
	static m_ImageObject8_2_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R8_2_90.png");
	static m_ImageObject8_2_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R8_2_180.png");
	static m_ImageObject8_2_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R8_2_270.png");
	
	static m_ImageObject10_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R10.png");
	static m_ImageObject10_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R10_90.png");
	static m_ImageObject10_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R10_180.png");
	static m_ImageObject10_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R10_270.png");
	
	static m_ImageObject12_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R12.png");
	static m_ImageObject12_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R12_90.png");
	static m_ImageObject12_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R12_180.png");
	static m_ImageObject12_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R12_270.png");
	
	static m_ImageObject15_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R15.png");
	static m_ImageObject15_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R15_90.png");
	static m_ImageObject15_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R15_180.png");
	static m_ImageObject15_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R15_270.png");
	
	static m_ImageObject18_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R18.png");
	static m_ImageObject18_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R18_90.png");
	static m_ImageObject18_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R18_180.png");
	static m_ImageObject18_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R18_270.png");
	
	static m_ImageObject22_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R22.png");
	static m_ImageObject22_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R22_90.png");
	static m_ImageObject22_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R22_180.png");
	static m_ImageObject22_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R22_270.png");
	
	static m_ImageObject27_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R27.png");
	static m_ImageObject27_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R27_90.png");
	static m_ImageObject27_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R27_180.png");
	static m_ImageObject27_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R27_270.png");
	
	static m_ImageObject33_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R33.png");
	static m_ImageObject33_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R33_90.png");
	static m_ImageObject33_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R33_180.png");
	static m_ImageObject33_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R33_270.png");
	
	static m_ImageObject39_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R39.png");
	static m_ImageObject39_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R39_90.png");
	static m_ImageObject39_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R39_180.png");
	static m_ImageObject39_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R39_270.png");
	
	static m_ImageObject47_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R47.png");
	static m_ImageObject47_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R47_90.png");
	static m_ImageObject47_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R47_180.png");
	static m_ImageObject47_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R47_270.png");
	
	static m_ImageObject56_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R56.png");
	static m_ImageObject56_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R56_90.png");
	static m_ImageObject56_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R56_180.png");
	static m_ImageObject56_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R56_270.png");
	
	static m_ImageObject68_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R68.png");
	static m_ImageObject68_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R68_90.png");
	static m_ImageObject68_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R68_180.png");
	static m_ImageObject68_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R68_270.png");
	
	static m_ImageObject82_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R82.png");
	static m_ImageObject82_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R82_90.png");
	static m_ImageObject82_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R82_180.png");
	static m_ImageObject82_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R82_270.png");
	
	static m_ImageObject100_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R100.png");
	static m_ImageObject100_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R100_90.png");
	static m_ImageObject100_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R100_180.png");
	static m_ImageObject100_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R100_270.png");

	static m_ImageObject120_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R120.png");
	static m_ImageObject120_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R120_90.png");
	static m_ImageObject120_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R120_180.png");
	static m_ImageObject120_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R120_270.png");
	
	static m_ImageObject150_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R150.png");
	static m_ImageObject150_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R150_90.png");
	static m_ImageObject150_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R150_180.png");
	static m_ImageObject150_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R150_270.png");
	
	static m_ImageObject180_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R180.png");
	static m_ImageObject180_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R180_90.png");
	static m_ImageObject180_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R180_180.png");
	static m_ImageObject180_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R180_270.png");
	
	static m_ImageObject220_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R220.png");
	static m_ImageObject220_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R220_90.png");
	static m_ImageObject220_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R220_180.png");
	static m_ImageObject220_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R220_270.png");
	
	static m_ImageObject270_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R270.png");
	static m_ImageObject270_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R270_90.png");
	static m_ImageObject270_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R270_180.png");
	static m_ImageObject270_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R270_270.png");
	
	static m_ImageObject330_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R330.png");
	static m_ImageObject330_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R330_90.png");
	static m_ImageObject330_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R330_180.png");
	static m_ImageObject330_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R330_270.png");
	
	static m_ImageObject390_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R390.png");
	static m_ImageObject390_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R390_90.png");
	static m_ImageObject390_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R390_180.png");
	static m_ImageObject390_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R390_270.png");
	
	static m_ImageObject470_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R470.png");
	static m_ImageObject470_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R470_90.png");
	static m_ImageObject470_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R470_180.png");
	static m_ImageObject470_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R470_270.png");
	
	static m_ImageObject560_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R560.png");
	static m_ImageObject560_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R560_90.png");
	static m_ImageObject560_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R560_180.png");
	static m_ImageObject560_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R560_270.png");
	
	static m_ImageObject680_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R680.png");
	static m_ImageObject680_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R680_90.png");
	static m_ImageObject680_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R680_180.png");
	static m_ImageObject680_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R680_270.png");
	
	static m_ImageObject820_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R820.png");
	static m_ImageObject820_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R820_90.png");
	static m_ImageObject820_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R820_180.png");
	static m_ImageObject820_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R820_270.png");
	
	static m_ImageObject1k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1k.png");
	static m_ImageObject1k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1k_90.png");
	static m_ImageObject1k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1k_180.png");
	static m_ImageObject1k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1k_270.png");

	static m_ImageObject1_2k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_2k.png");
	static m_ImageObject1_2k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_2k_90.png");
	static m_ImageObject1_2k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_2k_180.png");
	static m_ImageObject1_2k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_2k_270.png");

	static m_ImageObject1_5k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_5k.png");
	static m_ImageObject1_5k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_5k_90.png");
	static m_ImageObject1_5k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_5k_180.png");
	static m_ImageObject1_5k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_5k_270.png");

	static m_ImageObject1_8_k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_8k.png");
	static m_ImageObject1_8k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_8k_90.png");
	static m_ImageObject1_8k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_8k_180.png");
	static m_ImageObject1_8k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_8k_270.png");

	static m_ImageObject2_2k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_2k.png");
	static m_ImageObject2_2k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_2k_90.png");
	static m_ImageObject2_2k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_2k_180.png");
	static m_ImageObject2_2k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_2k_270.png");

	static m_ImageObject2_7k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_7k.png");
	static m_ImageObject2_7k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_7k_90.png");
	static m_ImageObject2_7k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_7k_180.png");
	static m_ImageObject2_7k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_7k_270.png");

	static m_ImageObject3_3k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_3k.png");
	static m_ImageObject3_3k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_3k_90.png");
	static m_ImageObject3_3k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_3k_180.png");
	static m_ImageObject3_3k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_3k_270.png");

	static m_ImageObject3_9k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_9k.png");
	static m_ImageObject3_9k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_9k_90.png");
	static m_ImageObject3_9k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_9k_180.png");
	static m_ImageObject3_9k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_9k_270.png");

	static m_ImageObject4_7k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R4_7k.png");
	static m_ImageObject4_7k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R4_7k_90.png");
	static m_ImageObject4_7k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R4_7k_180.png");
	static m_ImageObject4_7k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R4_7k_270.png");

	static m_ImageObject5_6k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R5_6k.png");
	static m_ImageObject5_6k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R5_6k_90.png");
	static m_ImageObject5_6k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R5_6k_180.png");
	static m_ImageObject5_6k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R5_6k_270.png");

	static m_ImageObject6_8k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R6_8k.png");
	static m_ImageObject6_8k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R6_8k_90.png");
	static m_ImageObject6_8k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R6_8k_180.png");
	static m_ImageObject6_8k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R6_8k_270.png");

	static m_ImageObject8_2k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R8_2k.png");
	static m_ImageObject8_2k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R8_2k_90.png");
	static m_ImageObject8_2k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R8_2k_180.png");
	static m_ImageObject8_2k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R8_2k_270.png");

	static m_ImageObject10k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R10k.png");
	static m_ImageObject10k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R10k_90.png");
	static m_ImageObject10k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R10k_180.png");
	static m_ImageObject10k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R10k_270.png");

	static m_ImageObject12k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R12k.png");
	static m_ImageObject12k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R12k_90.png");
	static m_ImageObject12k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R12k_180.png");
	static m_ImageObject12k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R12k_270.png");

	static m_ImageObject15k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R15k.png");
	static m_ImageObject15k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R15k_90.png");
	static m_ImageObject15k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R15k_180.png");
	static m_ImageObject15k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R15k_270.png");

	static m_ImageObject22k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R22k.png");
	static m_ImageObject22k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R22k_90.png");
	static m_ImageObject22k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R22k_180.png");
	static m_ImageObject22k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R22k_270.png");

	static m_ImageObject27k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R27k.png");
	static m_ImageObject27k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R27k_90.png");
	static m_ImageObject27k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R27k_180.png");
	static m_ImageObject27k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R27k_270.png");

	static m_ImageObject33k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R33k.png");
	static m_ImageObject33k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R33k_90.png");
	static m_ImageObject33k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R33k_180.png");
	static m_ImageObject33k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R33k_270.png");

	static m_ImageObject39k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R39k.png");
	static m_ImageObject39k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R39k_90.png");
	static m_ImageObject39k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R39k_180.png");
	static m_ImageObject39k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R39k_270.png");

	static m_ImageObject47k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R47k.png");
	static m_ImageObject47k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R47k_90.png");
	static m_ImageObject47k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R47k_180.png");
	static m_ImageObject47k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R47k_270.png");

	static m_ImageObject56k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R56k.png");
	static m_ImageObject56k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R56k_90.png");
	static m_ImageObject56k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R56k_180.png");
	static m_ImageObject56k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R56k_270.png");

	static m_ImageObject68k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R68k.png");
	static m_ImageObject68k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R68k_90.png");
	static m_ImageObject68k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R68k_180.png");
	static m_ImageObject68k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R68k_270.png");

	static m_ImageObject82k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R82k.png");
	static m_ImageObject82k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R82k_90.png");
	static m_ImageObject82k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R82k_180.png");
	static m_ImageObject82k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R82k_270.png");

	static m_ImageObject100k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R100k.png");
	static m_ImageObject100k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R100k_90.png");
	static m_ImageObject100k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R100k_180.png");
	static m_ImageObject100k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R100k_270.png");

	static m_ImageObject120k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R120k.png");
	static m_ImageObject120k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R120k_90.png");
	static m_ImageObject120k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R120k_180.png");
	static m_ImageObject120k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R120k_270.png");

	static m_ImageObject150k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R150k.png");
	static m_ImageObject150k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R150k_90.png");
	static m_ImageObject150k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R150k_180.png");
	static m_ImageObject150k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R150k_270.png");

	static m_ImageObject180k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R180k.png");
	static m_ImageObject180k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R180k_90.png");
	static m_ImageObject180k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R180k_180.png");
	static m_ImageObject180k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R180k_270.png");

	static m_ImageObject220k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R220k.png");
	static m_ImageObject220k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R220k_90.png");
	static m_ImageObject220k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R220k_180.png");
	static m_ImageObject220k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R220k_270.png");

	static m_ImageObject330k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R30k.png");
	static m_ImageObject330k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R330k_90.png");
	static m_ImageObject330k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R330k_180.png");
	static m_ImageObject330k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R330k_270.png");

	static m_ImageObject390k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R390k.png");
	static m_ImageObject390k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R390k_90.png");
	static m_ImageObject390k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R390k_180.png");
	static m_ImageObject390k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R390k_270.png");

	static m_ImageObject470k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R470k.png");
	static m_ImageObject470k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R470k_90.png");
	static m_ImageObject470k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R470k_180.png");
	static m_ImageObject470k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R470k_270.png");

	static m_ImageObject560k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R560k.png");
	static m_ImageObject560k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R560k_90.png");
	static m_ImageObject560k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R560k_180.png");
	static m_ImageObject560k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R560k_270.png");

	static m_ImageObject680k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R680k.png");
	static m_ImageObject680k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R680k_90.png");
	static m_ImageObject680k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R680k_180.png");
	static m_ImageObject680k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R680k_270.png");

	static m_ImageObject820k_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R820k.png");
	static m_ImageObject820k_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R820k_90.png");
	static m_ImageObject820k_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R820k_180.png");
	static m_ImageObject820k_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R820k_270.png");

	static m_ImageObject1M_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1M.png");
	static m_ImageObject1M_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1M_90.png");
	static m_ImageObject1M_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1M_180.png");
	static m_ImageObject1M_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1M_270.png");

	static m_ImageObject1_2M_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_2M.png");
	static m_ImageObject1_2M_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_2M_90.png");
	static m_ImageObject1_2M_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_2M_180.png");
	static m_ImageObject1_2M_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_2M_270.png");

	static m_ImageObject1_5M_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_5M.png");
	static m_ImageObject1_5M_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_5M_90.png");
	static m_ImageObject1_5M_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_5M_180.png");
	static m_ImageObject1_5M_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_5M_270.png");

	static m_ImageObject1_8M_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_8M.png");
	static m_ImageObject1_8M_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_8M_90.png");
	static m_ImageObject1_8M_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_8M_180.png");
	static m_ImageObject1_8M_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R1_8M_270.png");

	static m_ImageObject2_2M_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_2M.png");
	static m_ImageObject2_2M_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_2M_90.png");
	static m_ImageObject2_2M_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_2M_180.png");
	static m_ImageObject2_2M_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_2M_270.png");

	static m_ImageObject2_7M_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_7M.png");
	static m_ImageObject2_7M_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_7M_90.png");
	static m_ImageObject2_7M_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_7M_180.png");
	static m_ImageObject2_7M_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R2_7M_270.png");

	static m_ImageObject3_3M_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_3M.png");
	static m_ImageObject3_3M_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_3M_90.png");
	static m_ImageObject3_3M_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_3M_180.png");
	static m_ImageObject3_3M_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_3M_270.png");

	static m_ImageObject3_9M_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_9M.png");
	static m_ImageObject3_9M_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_9M_90.png");
	static m_ImageObject3_9M_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_9M_180.png");
	static m_ImageObject3_9M_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R3_9M_270.png");

	static m_ImageObject4_7M_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R4_7M.png");
	static m_ImageObject4_7M_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R4_7M_90.png");
	static m_ImageObject4_7M_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R4_7M_180.png");
	static m_ImageObject4_7M_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R4_7M_270.png");

	static m_ImageObject5_6M_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R5_6M.png");
	static m_ImageObject5_6M_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R5_6M_90.png");
	static m_ImageObject5_6M_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R5_6M_180.png");
	static m_ImageObject5_6M_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R5_6M_270.png");

	static m_ImageObject6_8M_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R6_8M.png");
	static m_ImageObject6_8M_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R6_8M_90.png");
	static m_ImageObject6_8M_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R6_8M_180.png");
	static m_ImageObject6_8M_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R6_8M_270.png");

	static m_ImageObject8_2M_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R8_2M.png");
	static m_ImageObject8_2M_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R8_2M_90.png");
	static m_ImageObject8_2M_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R8_2M_180.png");
	static m_ImageObject8_2M_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R8_2M_270.png");

	static m_ImageObject10M_0 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R10M.png");
	static m_ImageObject10M_90 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R10M_90.png");
	static m_ImageObject10M_180 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R10M_180.png");
	static m_ImageObject10M_270 = CComponentBase.doGetImageObject("img\\Components\\Resistors\\R10M_270.png");
	
	static m_mapImageObjects = new Map();

	static doCreateImageObjectMap()
	{
		if (CResistor.m_mapImageObjects.size == 0)
		{
			CResistor.m_mapImageObjects.set("1_0_0", CResistor.m_ImageObject1_0_0);
			CResistor.m_mapImageObjects.set("1_0_90", CResistor.m_ImageObject1_0_90);
			CResistor.m_mapImageObjects.set("1_0_180", CResistor.m_ImageObject1_0_180);
			CResistor.m_mapImageObjects.set("1_0_270", CResistor.m_ImageObject1_0_270);
			
			CResistor.m_mapImageObjects.set("1_2_0", CResistor.m_ImageObject1_2_0);
			CResistor.m_mapImageObjects.set("1_2_90", CResistor.m_ImageObject1_2_90);
			CResistor.m_mapImageObjects.set("1_2_180", CResistor.m_ImageObject1_2_180);
			CResistor.m_mapImageObjects.set("1_2_270", CResistor.m_ImageObject1_2_270);
				
			CResistor.m_mapImageObjects.set("1_5_0", CResistor.m_ImageObject1_5_0);
			CResistor.m_mapImageObjects.set("1_5_90", CResistor.m_ImageObject1_5_90);
			CResistor.m_mapImageObjects.set("1_5_180", CResistor.m_ImageObject1_5_180);
			CResistor.m_mapImageObjects.set("1_5_270", CResistor.m_ImageObject1_5_270);
				
			CResistor.m_mapImageObjects.set("1_8_0", CResistor.m_ImageObject1_8_0);
			CResistor.m_mapImageObjects.set("1_8_90", CResistor.m_ImageObject1_8_90);
			CResistor.m_mapImageObjects.set("1_8_180", CResistor.m_ImageObject1_8_180);
			CResistor.m_mapImageObjects.set("1_8_270", CResistor.m_ImageObject1_8_270);
				
			CResistor.m_mapImageObjects.set("2_2_0", CResistor.m_ImageObject2_2_0);
			CResistor.m_mapImageObjects.set("2_2_90", CResistor.m_ImageObject2_2_90);
			CResistor.m_mapImageObjects.set("2_2_180", CResistor.m_ImageObject2_2_180);
			CResistor.m_mapImageObjects.set("2_2_270", CResistor.m_ImageObject2_2_270);
				
			CResistor.m_mapImageObjects.set("2_7_0", CResistor.m_ImageObject2_7_0);
			CResistor.m_mapImageObjects.set("2_7_90", CResistor.m_ImageObject2_7_90);
			CResistor.m_mapImageObjects.set("2_7_180", CResistor.m_ImageObject2_7_180);
			CResistor.m_mapImageObjects.set("2_7_270", CResistor.m_ImageObject2_7_270);
				
			CResistor.m_mapImageObjects.set("3_3_0", CResistor.m_ImageObject3_3_0);
			CResistor.m_mapImageObjects.set("3_3_90", CResistor.m_ImageObject3_3_90);
			CResistor.m_mapImageObjects.set("3_3_180", CResistor.m_ImageObject3_3_180);
			CResistor.m_mapImageObjects.set("3_3_270", CResistor.m_ImageObject3_3_270);
				
			CResistor.m_mapImageObjects.set("3_9_0", CResistor.m_ImageObject3_9_0);
			CResistor.m_mapImageObjects.set("3_9_90", CResistor.m_ImageObject3_9_90);
			CResistor.m_mapImageObjects.set("3_9_180", CResistor.m_ImageObject3_9_180);
			CResistor.m_mapImageObjects.set("3_9_270", CResistor.m_ImageObject3_9_270);
				
			CResistor.m_mapImageObjects.set("4_7_0", CResistor.m_ImageObject4_7_0);
			CResistor.m_mapImageObjects.set("4_7_90", CResistor.m_ImageObject4_7_90);
			CResistor.m_mapImageObjects.set("4_7_180", CResistor.m_ImageObject4_7_180);
			CResistor.m_mapImageObjects.set("4_7_270", CResistor.m_ImageObject4_7_270);
				
			CResistor.m_mapImageObjects.set("5_6_0", CResistor.m_ImageObject5_6_0);
			CResistor.m_mapImageObjects.set("5_6_90", CResistor.m_ImageObject5_6_90);
			CResistor.m_mapImageObjects.set("5_6_180", CResistor.m_ImageObject5_6_180);
			CResistor.m_mapImageObjects.set("5_6_270", CResistor.m_ImageObject5_6_270);
				
			CResistor.m_mapImageObjects.set("6_8_0", CResistor.m_ImageObject6_8_0);
			CResistor.m_mapImageObjects.set("6_8_90", CResistor.m_ImageObject6_8_90);
			CResistor.m_mapImageObjects.set("6_8_180", CResistor.m_ImageObject6_8_180);
			CResistor.m_mapImageObjects.set("6_8_270", CResistor.m_ImageObject6_8_270);
				
			CResistor.m_mapImageObjects.set("8_2_0", CResistor.m_ImageObject8_2_0);
			CResistor.m_mapImageObjects.set("8_2_90", CResistor.m_ImageObject8_2_90);
			CResistor.m_mapImageObjects.set("8_2_180", CResistor.m_ImageObject8_2_180);
			CResistor.m_mapImageObjects.set("8_2_270", CResistor.m_ImageObject8_2_270);
				
			CResistor.m_mapImageObjects.set("10_0", CResistor.m_ImageObject10_0);
			CResistor.m_mapImageObjects.set("10_90", CResistor.m_ImageObject10_90);
			CResistor.m_mapImageObjects.set("10_180", CResistor.m_ImageObject10_180);
			CResistor.m_mapImageObjects.set("10_270", CResistor.m_ImageObject10_270);
			
			CResistor.m_mapImageObjects.set("12_0", CResistor.m_ImageObject12_0);
			CResistor.m_mapImageObjects.set("12_90", CResistor.m_ImageObject12_90);
			CResistor.m_mapImageObjects.set("12_180", CResistor.m_ImageObject12_180);
			CResistor.m_mapImageObjects.set("12_270", CResistor.m_ImageObject12_270);
				
			CResistor.m_mapImageObjects.set("15_0", CResistor.m_ImageObject15_0);
			CResistor.m_mapImageObjects.set("15_90", CResistor.m_ImageObject15_90);
			CResistor.m_mapImageObjects.set("15_180", CResistor.m_ImageObject15_180);
			CResistor.m_mapImageObjects.set("15_270", CResistor.m_ImageObject15_270);
				
			CResistor.m_mapImageObjects.set("18_0", CResistor.m_ImageObject18_0);
			CResistor.m_mapImageObjects.set("18_90", CResistor.m_ImageObject18_90);
			CResistor.m_mapImageObjects.set("18_180", CResistor.m_ImageObject18_180);
			CResistor.m_mapImageObjects.set("18_270", CResistor.m_ImageObject18_270);
				
			CResistor.m_mapImageObjects.set("22_0", CResistor.m_ImageObject22_0);
			CResistor.m_mapImageObjects.set("22_90", CResistor.m_ImageObject22_90);
			CResistor.m_mapImageObjects.set("22_180", CResistor.m_ImageObject22_180);
			CResistor.m_mapImageObjects.set("22_270", CResistor.m_ImageObject22_270);
				
			CResistor.m_mapImageObjects.set("27_0", CResistor.m_ImageObject27_0);
			CResistor.m_mapImageObjects.set("27_90", CResistor.m_ImageObject27_90);
			CResistor.m_mapImageObjects.set("27_180", CResistor.m_ImageObject27_180);
			CResistor.m_mapImageObjects.set("27_270", CResistor.m_ImageObject27_270);
				
			CResistor.m_mapImageObjects.set("33_0", CResistor.m_ImageObject33_0);
			CResistor.m_mapImageObjects.set("33_90", CResistor.m_ImageObject33_90);
			CResistor.m_mapImageObjects.set("33_180", CResistor.m_ImageObject33_180);
			CResistor.m_mapImageObjects.set("33_270", CResistor.m_ImageObject33_270);
				
			CResistor.m_mapImageObjects.set("39_0", CResistor.m_ImageObject39_0);
			CResistor.m_mapImageObjects.set("39_90", CResistor.m_ImageObject39_90);
			CResistor.m_mapImageObjects.set("39_180", CResistor.m_ImageObject39_180);
			CResistor.m_mapImageObjects.set("39_270", CResistor.m_ImageObject39_270);
				
			CResistor.m_mapImageObjects.set("47_0", CResistor.m_ImageObject47_0);
			CResistor.m_mapImageObjects.set("47_90", CResistor.m_ImageObject47_90);
			CResistor.m_mapImageObjects.set("47_180", CResistor.m_ImageObject47_180);
			CResistor.m_mapImageObjects.set("47_270", CResistor.m_ImageObject47_270);
				
			CResistor.m_mapImageObjects.set("56_0", CResistor.m_ImageObject56_0);
			CResistor.m_mapImageObjects.set("56_90", CResistor.m_ImageObject56_90);
			CResistor.m_mapImageObjects.set("56_180", CResistor.m_ImageObject56_180);
			CResistor.m_mapImageObjects.set("56_270", CResistor.m_ImageObject56_270);
				
			CResistor.m_mapImageObjects.set("68_0", CResistor.m_ImageObject68_0);
			CResistor.m_mapImageObjects.set("68_90", CResistor.m_ImageObject68_90);
			CResistor.m_mapImageObjects.set("68_180", CResistor.m_ImageObject68_180);
			CResistor.m_mapImageObjects.set("68_270", CResistor.m_ImageObject68_270);
				
			CResistor.m_mapImageObjects.set("82_0", CResistor.m_ImageObject82_0);
			CResistor.m_mapImageObjects.set("82_90", CResistor.m_ImageObject82_90);
			CResistor.m_mapImageObjects.set("82_180", CResistor.m_ImageObject82_180);
			CResistor.m_mapImageObjects.set("82_270", CResistor.m_ImageObject82_270);
				
			CResistor.m_mapImageObjects.set("100_0", CResistor.m_ImageObject100_0);
			CResistor.m_mapImageObjects.set("100_90", CResistor.m_ImageObject100_90);
			CResistor.m_mapImageObjects.set("100_180", CResistor.m_ImageObject100_180);
			CResistor.m_mapImageObjects.set("100_270", CResistor.m_ImageObject100_270);

			CResistor.m_mapImageObjects.set("120_0", CResistor.m_ImageObject120_0);
			CResistor.m_mapImageObjects.set("120_90", CResistor.m_ImageObject120_90);
			CResistor.m_mapImageObjects.set("120_180", CResistor.m_ImageObject120_0_180);
			CResistor.m_mapImageObjects.set("120_270", CResistor.m_ImageObject120_0_270);
				
			CResistor.m_mapImageObjects.set("150_0", CResistor.m_ImageObject150_0);
			CResistor.m_mapImageObjects.set("150_90", CResistor.m_ImageObject150_90);
			CResistor.m_mapImageObjects.set("150_180", CResistor.m_ImageObject150_0_180);
			CResistor.m_mapImageObjects.set("150_270", CResistor.m_ImageObject150_0_270);
				
			CResistor.m_mapImageObjects.set("180_0", CResistor.m_ImageObject180_0);
			CResistor.m_mapImageObjects.set("180_90", CResistor.m_ImageObject180_90);
			CResistor.m_mapImageObjects.set("180_180", CResistor.m_ImageObject180_0_180);
			CResistor.m_mapImageObjects.set("180_270", CResistor.m_ImageObject180_0_270);
				
			CResistor.m_mapImageObjects.set("220_0", CResistor.m_ImageObject220_0);
			CResistor.m_mapImageObjects.set("220_90", CResistor.m_ImageObject220_90);
			CResistor.m_mapImageObjects.set("220_180", CResistor.m_ImageObject220_180);
			CResistor.m_mapImageObjects.set("220_270", CResistor.m_ImageObject220_270);
				
			CResistor.m_mapImageObjects.set("270_0", CResistor.m_ImageObject270_0);
			CResistor.m_mapImageObjects.set("270_90", CResistor.m_ImageObject270_90);
			CResistor.m_mapImageObjects.set("270_180", CResistor.m_ImageObject270_180);
			CResistor.m_mapImageObjects.set("270_270", CResistor.m_ImageObject270_270);
				
			CResistor.m_mapImageObjects.set("330_0", CResistor.m_ImageObject330_0);
			CResistor.m_mapImageObjects.set("330_90", CResistor.m_ImageObject330_90);
			CResistor.m_mapImageObjects.set("330_180", CResistor.m_ImageObject330_180);
			CResistor.m_mapImageObjects.set("330_270", CResistor.m_ImageObject330_270);
				
			CResistor.m_mapImageObjects.set("390_0", CResistor.m_ImageObject390_0);
			CResistor.m_mapImageObjects.set("390_90", CResistor.m_ImageObject390_90);
			CResistor.m_mapImageObjects.set("390_180", CResistor.m_ImageObject390_180);
			CResistor.m_mapImageObjects.set("390_270", CResistor.m_ImageObject390_270);
				
			CResistor.m_mapImageObjects.set("470_0", CResistor.m_ImageObject470_0);
			CResistor.m_mapImageObjects.set("470_90", CResistor.m_ImageObject470_90);
			CResistor.m_mapImageObjects.set("470_180", CResistor.m_ImageObject470_180);
			CResistor.m_mapImageObjects.set("470_270", CResistor.m_ImageObject470_270);
				
			CResistor.m_mapImageObjects.set("560_0", CResistor.m_ImageObject560_0);
			CResistor.m_mapImageObjects.set("560_90", CResistor.m_ImageObject560_90);
			CResistor.m_mapImageObjects.set("560_180", CResistor.m_ImageObject560_180);
			CResistor.m_mapImageObjects.set("560_270", CResistor.m_ImageObject560_270);
				
			CResistor.m_mapImageObjects.set("680_0", CResistor.m_ImageObject680_0);
			CResistor.m_mapImageObjects.set("680_90", CResistor.m_ImageObject680_90);
			CResistor.m_mapImageObjects.set("680_180", CResistor.m_ImageObject680_180);
			CResistor.m_mapImageObjects.set("680_270", CResistor.m_ImageObject680_270);
				
			CResistor.m_mapImageObjects.set("820_0", CResistor.m_ImageObject820_0);
			CResistor.m_mapImageObjects.set("820_90", CResistor.m_ImageObject820_90);
			CResistor.m_mapImageObjects.set("820_180", CResistor.m_ImageObject820_180);
			CResistor.m_mapImageObjects.set("820_270", CResistor.m_ImageObject820_270);
				
			CResistor.m_mapImageObjects.set("1000_0", CResistor.m_ImageObject1k_0);
			CResistor.m_mapImageObjects.set("1000_90", CResistor.m_ImageObject1k_90);
			CResistor.m_mapImageObjects.set("1000_180", CResistor.m_ImageObject1k_180);
			CResistor.m_mapImageObjects.set("1000_270", CResistor.m_ImageObject1k_270);

			CResistor.m_mapImageObjects.set("1200_0", CResistor.m_ImageObject1_2k_0);
			CResistor.m_mapImageObjects.set("1200_90", CResistor.m_ImageObject1_2k_90);
			CResistor.m_mapImageObjects.set("1200_180", CResistor.m_ImageObject1_2k_180);
			CResistor.m_mapImageObjects.set("1200_270", CResistor.m_ImageObject1_2k_270);

			CResistor.m_mapImageObjects.set("1500_0", CResistor.m_ImageObject1_5k_0);
			CResistor.m_mapImageObjects.set("1500_90", CResistor.m_ImageObject1_5k_90);
			CResistor.m_mapImageObjects.set("1500_180", CResistor.m_ImageObject1_5k_180);
			CResistor.m_mapImageObjects.set("1500_270", CResistor.m_ImageObject1_5k_270);

			CResistor.m_mapImageObjects.set("1800_0", CResistor.m_ImageObject1_8k_0);
			CResistor.m_mapImageObjects.set("1800_90", CResistor.m_ImageObject1_8k_90);
			CResistor.m_mapImageObjects.set("1800_180", CResistor.m_ImageObject1_8k_180);
			CResistor.m_mapImageObjects.set("1800_270", CResistor.m_ImageObject1_8k_270);

			CResistor.m_mapImageObjects.set("2200_0", CResistor.m_ImageObject2_2k_0);
			CResistor.m_mapImageObjects.set("2200_90", CResistor.m_ImageObject2_2k_90);
			CResistor.m_mapImageObjects.set("2200_180", CResistor.m_ImageObject2_2k_180);
			CResistor.m_mapImageObjects.set("2200_270", CResistor.m_ImageObject2_2k_270);

			CResistor.m_mapImageObjects.set("2700_0", CResistor.m_ImageObject2_7k_0);
			CResistor.m_mapImageObjects.set("2700_90", CResistor.m_ImageObject2_7k_90);
			CResistor.m_mapImageObjects.set("2700_180", CResistor.m_ImageObject2_7k_180);
			CResistor.m_mapImageObjects.set("2700_270", CResistor.m_ImageObject2_7k_270);

			CResistor.m_mapImageObjects.set("3300_0", CResistor.m_ImageObject3_3k_0);
			CResistor.m_mapImageObjects.set("3300_90", CResistor.m_ImageObject3_3k_90);
			CResistor.m_mapImageObjects.set("3300_180", CResistor.m_ImageObject3_3k_180);
			CResistor.m_mapImageObjects.set("3300_270", CResistor.m_ImageObject3_3k_270);

			CResistor.m_mapImageObjects.set("3900_0", CResistor.m_ImageObject3_9k_0);
			CResistor.m_mapImageObjects.set("3900_90", CResistor.m_ImageObject3_9k_90);
			CResistor.m_mapImageObjects.set("3900_180", CResistor.m_ImageObject3_9k_180);
			CResistor.m_mapImageObjects.set("3900_270", CResistor.m_ImageObject3_9k_270);

			CResistor.m_mapImageObjects.set("4700_0", CResistor.m_ImageObject4_7k_0);
			CResistor.m_mapImageObjects.set("4700_90", CResistor.m_ImageObject4_7k_90);
			CResistor.m_mapImageObjects.set("4700_180", CResistor.m_ImageObject4_7k_180);
			CResistor.m_mapImageObjects.set("4700_270", CResistor.m_ImageObject4_7k_270);

			CResistor.m_mapImageObjects.set("5600_0", CResistor.m_ImageObject5_6k_0);
			CResistor.m_mapImageObjects.set("5600_90", CResistor.m_ImageObject5_6k_90);
			CResistor.m_mapImageObjects.set("5600_180", CResistor.m_ImageObject5_6k_180);
			CResistor.m_mapImageObjects.set("5600_270", CResistor.m_ImageObject5_6k_270);

			CResistor.m_mapImageObjects.set("6800_0", CResistor.m_ImageObject6_8k_0);
			CResistor.m_mapImageObjects.set("6800_90", CResistor.m_ImageObject6_8k_90);
			CResistor.m_mapImageObjects.set("6800_180", CResistor.m_ImageObject6_8k_180);
			CResistor.m_mapImageObjects.set("6800_270", CResistor.m_ImageObject6_8k_270);

			CResistor.m_mapImageObjects.set("8200_0", CResistor.m_ImageObject8_2k_0);
			CResistor.m_mapImageObjects.set("8200_90", CResistor.m_ImageObject8_2k_90);
			CResistor.m_mapImageObjects.set("8200_180", CResistor.m_ImageObject8_2_k180);
			CResistor.m_mapImageObjects.set("8200_270", CResistor.m_ImageObject8_2k_270);

			CResistor.m_mapImageObjects.set("10000_0", CResistor.m_ImageObject10k_0);
			CResistor.m_mapImageObjects.set("10000_90", CResistor.m_ImageObject10k_90);
			CResistor.m_mapImageObjects.set("10000_180", CResistor.m_ImageObject10k_180);
			CResistor.m_mapImageObjects.set("10000_270", CResistor.m_ImageObject10k_270);

			CResistor.m_mapImageObjects.set("12000_0", CResistor.m_ImageObject12k_0);
			CResistor.m_mapImageObjects.set("12000_90", CResistor.m_ImageObject12k_90);
			CResistor.m_mapImageObjects.set("12000_180", CResistor.m_ImageObject12k_180);
			CResistor.m_mapImageObjects.set("12000_270", CResistor.m_ImageObject12k_270);

			CResistor.m_mapImageObjects.set("15000_0", CResistor.m_ImageObject15k_0);
			CResistor.m_mapImageObjects.set("15000_90", CResistor.m_ImageObject15k_90);
			CResistor.m_mapImageObjects.set("15000_180", CResistor.m_ImageObject15k_180);
			CResistor.m_mapImageObjects.set("15000_270", CResistor.m_ImageObject15k_270);

			CResistor.m_mapImageObjects.set("22000_0", CResistor.m_ImageObject22k_0);
			CResistor.m_mapImageObjects.set("22000_90", CResistor.m_ImageObject22k_90);
			CResistor.m_mapImageObjects.set("22000_180", CResistor.m_ImageObject22k_180);
			CResistor.m_mapImageObjects.set("22000_270", CResistor.m_ImageObject22k_270);

			CResistor.m_mapImageObjects.set("27000_0", CResistor.m_ImageObject27k_0);
			CResistor.m_mapImageObjects.set("27000_90", CResistor.m_ImageObject27k_90);
			CResistor.m_mapImageObjects.set("27000_180", CResistor.m_ImageObject27k_180);
			CResistor.m_mapImageObjects.set("27000_270", CResistor.m_ImageObject27k_270);

			CResistor.m_mapImageObjects.set("33000_0", CResistor.m_ImageObject33k_0);
			CResistor.m_mapImageObjects.set("33000_90", CResistor.m_ImageObject33k_90);
			CResistor.m_mapImageObjects.set("33000_180", CResistor.m_ImageObject33k_180);
			CResistor.m_mapImageObjects.set("33000_270", CResistor.m_ImageObject33k_270);

			CResistor.m_mapImageObjects.set("39000_0", CResistor.m_ImageObject39k_0);
			CResistor.m_mapImageObjects.set("39000_90", CResistor.m_ImageObject39k_90);
			CResistor.m_mapImageObjects.set("39000_180", CResistor.m_ImageObject39k_180);
			CResistor.m_mapImageObjects.set("39000_270", CResistor.m_ImageObject39k_270);

			CResistor.m_mapImageObjects.set("47000_0", CResistor.m_ImageObject47k_0);
			CResistor.m_mapImageObjects.set("47000_90", CResistor.m_ImageObject47k_90);
			CResistor.m_mapImageObjects.set("47000_180", CResistor.m_ImageObject47k_180);
			CResistor.m_mapImageObjects.set("47000_270", CResistor.m_ImageObject47k_270);

			CResistor.m_mapImageObjects.set("56000_0", CResistor.m_ImageObject56k_0);
			CResistor.m_mapImageObjects.set("56000_90", CResistor.m_ImageObject56k_90);
			CResistor.m_mapImageObjects.set("56000_180", CResistor.m_ImageObject56k_180);
			CResistor.m_mapImageObjects.set("56000_270", CResistor.m_ImageObject56k_270);

			CResistor.m_mapImageObjects.set("68000_0", CResistor.m_ImageObject68k_0);
			CResistor.m_mapImageObjects.set("68000_90", CResistor.m_ImageObject68k_90);
			CResistor.m_mapImageObjects.set("68000_180", CResistor.m_ImageObject68k_180);
			CResistor.m_mapImageObjects.set("68000_270", CResistor.m_ImageObject68k_270);

			CResistor.m_mapImageObjects.set("82000_0", CResistor.m_ImageObject82k_0);
			CResistor.m_mapImageObjects.set("82000_90", CResistor.m_ImageObject82k_90);
			CResistor.m_mapImageObjects.set("82000_180", CResistor.m_ImageObject82k_180);
			CResistor.m_mapImageObjects.set("82000_270", CResistor.m_ImageObject82k_270);

			CResistor.m_mapImageObjects.set("100000_0", CResistor.m_ImageObject100k_0);
			CResistor.m_mapImageObjects.set("100000_90", CResistor.m_ImageObject100k_90);
			CResistor.m_mapImageObjects.set("100000_180", CResistor.m_ImageObject100k_180);
			CResistor.m_mapImageObjects.set("100000_270", CResistor.m_ImageObject100k_270);

			CResistor.m_mapImageObjects.set("120000_0", CResistor.m_ImageObject120k_0);
			CResistor.m_mapImageObjects.set("120000_90", CResistor.m_ImageObject120k_90);
			CResistor.m_mapImageObjects.set("120000_180", CResistor.m_ImageObject120k_180);
			CResistor.m_mapImageObjects.set("120000_270", CResistor.m_ImageObject120k_270);

			CResistor.m_mapImageObjects.set("150000_0", CResistor.m_ImageObject150k_0);
			CResistor.m_mapImageObjects.set("150000_90", CResistor.m_ImageObject150k_90);
			CResistor.m_mapImageObjects.set("150000_180", CResistor.m_ImageObject150k_180);
			CResistor.m_mapImageObjects.set("150000_270", CResistor.m_ImageObject150k_270);

			CResistor.m_mapImageObjects.set("180000_0", CResistor.m_ImageObject180k_0);
			CResistor.m_mapImageObjects.set("180000_90", CResistor.m_ImageObject180k_90);
			CResistor.m_mapImageObjects.set("180000_180", CResistor.m_ImageObject180k_180);
			CResistor.m_mapImageObjects.set("180000_270", CResistor.m_ImageObject180k_270);

			CResistor.m_mapImageObjects.set("220000_0", CResistor.m_ImageObject220k_0);
			CResistor.m_mapImageObjects.set("220000_90", CResistor.m_ImageObject220k_90);
			CResistor.m_mapImageObjects.set("220000_180", CResistor.m_ImageObject220k_180);
			CResistor.m_mapImageObjects.set("220000_270", CResistor.m_ImageObject220k_270);

			CResistor.m_mapImageObjects.set("330000_0", CResistor.m_ImageObject330k_0);
			CResistor.m_mapImageObjects.set("330000_90", CResistor.m_ImageObject330k_90);
			CResistor.m_mapImageObjects.set("330000_180", CResistor.m_ImageObject330k_180);
			CResistor.m_mapImageObjects.set("330000_270", CResistor.m_ImageObject330k_270);

			CResistor.m_mapImageObjects.set("390000_0", CResistor.m_ImageObject390k_0);
			CResistor.m_mapImageObjects.set("390000_90", CResistor.m_ImageObject3990);
			CResistor.m_mapImageObjects.set("390000_180", CResistor.m_ImageObject390_180);
			CResistor.m_mapImageObjects.set("390000_270", CResistor.m_ImageObject390_270);

			CResistor.m_mapImageObjects.set("470000_0", CResistor.m_ImageObject470k_0);
			CResistor.m_mapImageObjects.set("470000_90", CResistor.m_ImageObject470k_90);
			CResistor.m_mapImageObjects.set("470000_180", CResistor.m_ImageObject470k_180);
			CResistor.m_mapImageObjects.set("470000_270", CResistor.m_ImageObject470k_270);

			CResistor.m_mapImageObjects.set("560000_0", CResistor.m_ImageObject560k_0);
			CResistor.m_mapImageObjects.set("560000_90", CResistor.m_ImageObject560k_90);
			CResistor.m_mapImageObjects.set("560000_180", CResistor.m_ImageObject560k_180);
			CResistor.m_mapImageObjects.set("560000_270", CResistor.m_ImageObject560k_270);

			CResistor.m_mapImageObjects.set("680000_0", CResistor.m_ImageObject680k_0);
			CResistor.m_mapImageObjects.set("680000_90", CResistor.m_ImageObject680k_90);
			CResistor.m_mapImageObjects.set("680000_180", CResistor.m_ImageObject680k_180);
			CResistor.m_mapImageObjects.set("680000_270", CResistor.m_ImageObject680k_270);

			CResistor.m_mapImageObjects.set("820000_0", CResistor.m_ImageObject820k_0);
			CResistor.m_mapImageObjects.set("820000_90", CResistor.m_ImageObject820k_90);
			CResistor.m_mapImageObjects.set("820000_180", CResistor.m_ImageObject820k_180);
			CResistor.m_mapImageObjects.set("820000_270", CResistor.m_ImageObject820k_270);

			CResistor.m_mapImageObjects.set("1000000_0", CResistor.m_ImageObject1M_0);
			CResistor.m_mapImageObjects.set("1000000_90", CResistor.m_ImageObject1M_90);
			CResistor.m_mapImageObjects.set("1000000_180", CResistor.m_ImageObject1M_0_180);
			CResistor.m_mapImageObjects.set("1000000_270", CResistor.m_ImageObject1M_0_270);

			CResistor.m_mapImageObjects.set("1200000_0", CResistor.m_ImageObject1_2M_0);
			CResistor.m_mapImageObjects.set("1200000_90", CResistor.m_ImageObject1_2M_90);
			CResistor.m_mapImageObjects.set("1200000_180", CResistor.m_ImageObject1_2M_0_180);
			CResistor.m_mapImageObjects.set("1200000_270", CResistor.m_ImageObject1_2M_0_270);

			CResistor.m_mapImageObjects.set("1500000_0", CResistor.m_ImageObject1_5M_0);
			CResistor.m_mapImageObjects.set("1500000_90", CResistor.m_ImageObject1_5M_90);
			CResistor.m_mapImageObjects.set("1500000_180", CResistor.m_ImageObject1_5M_0_180);
			CResistor.m_mapImageObjects.set("1500000_270", CResistor.m_ImageObject1_5M_0_270);

			CResistor.m_mapImageObjects.set("1800000_0", CResistor.m_ImageObject1_8M_0);
			CResistor.m_mapImageObjects.set("1800000_90", CResistor.m_ImageObject1_8M_90);
			CResistor.m_mapImageObjects.set("1800000_180", CResistor.m_ImageObject1_8M_0_180);
			CResistor.m_mapImageObjects.set("1800000_270", CResistor.m_ImageObject1_8M_0_270);

			CResistor.m_mapImageObjects.set("2200000_0", CResistor.m_ImageObject2_2M_0);
			CResistor.m_mapImageObjects.set("2200000_90", CResistor.m_ImageObject2_2M_90);
			CResistor.m_mapImageObjects.set("2200000_180", CResistor.m_ImageObject2_2M_0_180);
			CResistor.m_mapImageObjects.set("2200000_270", CResistor.m_ImageObject2_2M_0_270);

			CResistor.m_mapImageObjects.set("2700000_0", CResistor.m_ImageObject2_7M_0);
			CResistor.m_mapImageObjects.set("2700000_90", CResistor.m_ImageObject2_7M_90);
			CResistor.m_mapImageObjects.set("2700000_180", CResistor.m_ImageObject2_7M_0_180);
			CResistor.m_mapImageObjects.set("2700000_270", CResistor.m_ImageObject2_7M_0_270);

			CResistor.m_mapImageObjects.set("3300000_0", CResistor.m_ImageObject3_3M_0);
			CResistor.m_mapImageObjects.set("3300000_90", CResistor.m_ImageObject3_3M_90);
			CResistor.m_mapImageObjects.set("3300000_180", CResistor.m_ImageObject3_3M_0_180);
			CResistor.m_mapImageObjects.set("3300000_270", CResistor.m_ImageObject3_3M_0_270);

			CResistor.m_mapImageObjects.set("3900000_0", CResistor.m_ImageObject3_9M_0);
			CResistor.m_mapImageObjects.set("3900000_90", CResistor.m_ImageObject3_9M_90);
			CResistor.m_mapImageObjects.set("3900000_180", CResistor.m_ImageObject3_9M_0_180);
			CResistor.m_mapImageObjects.set("3900000_270", CResistor.m_ImageObject3_9M_0_270);

			CResistor.m_mapImageObjects.set("4700000_0", CResistor.m_ImageObject4_7M_0);
			CResistor.m_mapImageObjects.set("4700000_90", CResistor.m_ImageObject4_7M_90);
			CResistor.m_mapImageObjects.set("4700000_180", CResistor.m_ImageObject4_7M_0_180);
			CResistor.m_mapImageObjects.set("4700000_270", CResistor.m_ImageObject4_7M_0_270);

			CResistor.m_mapImageObjects.set("5600000_0", CResistor.m_ImageObject5_6M_0);
			CResistor.m_mapImageObjects.set("5600000_90", CResistor.m_ImageObject5_6M_90);
			CResistor.m_mapImageObjects.set("5600000_180", CResistor.m_ImageObject5_6M_0_180);
			CResistor.m_mapImageObjects.set("5600000_270", CResistor.m_ImageObject5_6M_0_270);

			CResistor.m_mapImageObjects.set("6800000_0", CResistor.m_ImageObject6_8M_0);
			CResistor.m_mapImageObjects.set("6800000_90", CResistor.m_ImageObject6_8M_90);
			CResistor.m_mapImageObjects.set("6800000_180", CResistor.m_ImageObject6_8M_0_180);
			CResistor.m_mapImageObjects.set("6800000_270", CResistor.m_ImageObject6_8M_0_270);

			CResistor.m_mapImageObjects.set("8200000_0", CResistor.m_ImageObject8_2M_0);
			CResistor.m_mapImageObjects.set("8200000_90", CResistor.m_ImageObject8_2M_90);
			CResistor.m_mapImageObjects.set("8200000_180", CResistor.m_ImageObject8_2M_0_180);
			CResistor.m_mapImageObjects.set("8200000_270", CResistor.m_ImageObject8_2M_0_270);

			CResistor.m_mapImageObjects.set("10000000_0", CResistor.m_ImageObject10M_0);
			CResistor.m_mapImageObjects.set("10000000_90", CResistor.m_ImageObject10M_90);
			CResistor.m_mapImageObjects.set("10000000_180", CResistor.m_ImageObject10M_0_180);
			CResistor.m_mapImageObjects.set("10000000_270", CResistor.m_ImageObject10M_0_270);
		}
	}

	constructor()
	{
		super("RESISTOR");
		CResistor.doCreateImageObjectMap();
		super.setDeviceName("RESISTOR1");		
		this.m_fScale = 8.2;
		this.m_bIsBlown = false;

		this.m_arrayPins.add(new CPin(0, false, false, "pin 1", this.getDeviceName()));
		this.m_arrayPins.add(new CPin(1, false, false, "pin 2", this.getDeviceName()));
		this.doSetResistance(10000);
		this.doRotate(0);

		this.m_strEditHTML += "&nbsp;&nbsp;<div style=\"" + g_strSecondDivDisplayStyle + "\" id=\"fix\"><input type=\"button\" style=\"" + 
								g_strButtonStyle + "\" value=\"REPLACE\" onclick=\"doClick('YYYY')\">&nbsp;&nbsp;" + 
								"<select id=\"resistance\" style=\"" + g_strSelectStyle + "width:60Px;\">" + 
									"<option value=\"1\">1.0</option>" + 
									"<option value=\"1.2\">1.2</option>" + 
									"<option value=\"1.5\">1.5</option>" + 
									"<option value=\"1.8\">1.8</option>" + 
									"<option value=\"2.2\">2.2</option>" + 
									"<option value=\"2.7\">2.7</option>" + 
									"<option value=\"3.3\">3.3</option>" + 
									"<option value=\"3.9\">3.9</option>" + 
									"<option value=\"4.7\">4.7</option>" + 
									"<option value=\"5.6\">5.6</option>" + 
									"<option value=\"6.8\">6.8</option>" + 
									"<option value=\"8.2\">8.2</option>" + 
									"<option value=\"10\">10</option>" + 
								"</select>&nbsp;" +
								"<select id=\"resistance_multiplier\" style=\"" + g_strSelectStyle + "width:100Px;\">" + 
									"<option value=\"1\">Ω</option>" + 
									"<option value=\"10\">x10 Ω</option>" + 
									"<option value=\"100\">x100 Ω</option>" + 
									"<option selected value=\"1000\">kΩ</option>" + 
									"<option value=\"1000000\">MΩ</option>" + 
								"</select></div>" + 
								"<input type=\"button\" style=\"" + g_strButtonStyle + "\" value=\"CHANGE\" onclick=\"doChangeResistance('ZZZZ', doGetResistance())\">";
	}

	doWrite()
	{
		var strFileContents = super.doWrite();
		
		strFileContents += this.m_bIsBlown + "\nRadius\n";
		strFileContents += this.m_fResistance + "\nRadius\n";
		
		return strFileContents;
	}
	
	getResistance()
	{
		return this.m_nResistance;
	}
	
	doSetResistance(fResistance)
	{
		var strKey = fResistance.toString()
		
		strKey.replace(".", "_");
		strKey += "_";
		
		this.m_ImageObject0 = CResistor.m_mapImageObjects.get(strKey + "0");
		this.m_ImageObject90 = CResistor.m_mapImageObjects.get(strKey + "90");
		this.m_ImageObject180 = CResistor.m_mapImageObjects.get(strKey + "180");
		this.m_ImageObject270 = CResistor.m_mapImageObjects.get(strKey + "270");
		
		this.m_fResistance = fResistance;
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
		}
		else if (this.m_nRotationAngle == 90)
		{
		}
		else if (this.m_nRotationAngle == 180)
		{
		}
		else if (this.m_nRotationAngle == 270)
		{
		}
	}
	
	doSelect()
	{
		this.m_bSelected = true;
		var strHTML = this.m_strEditHTML;
		strHTML = strHTML.replace("XXXX", this.m_strDeviceName);
		strHTML = strHTML.replace("YYYY", this.m_strDeviceName);
		strHTML = strHTML.replace("ZZZZ", this.m_strDeviceName);
		doShowEditFields(strHTML);
	}

	doBlown()
	{
		this.m_ImageObject0 = CResistor.m_ImageObjectBlown_0;
		this.m_ImageObject90 = CResistor.m_ImageObjectBlown_90;
		this.m_ImageObject180 = CResistor.m_ImageObjectBlown_180;
		this.m_ImageObject270 = CResistor.m_ImageObjectBlown_270;
		this.m_bIsBlown = true;
	}
	
	doUnblown()
	{
		this.doSetResistance(this.m_fResistance);
	}
	
	doDisplay()
	{
		super.doDisplay();
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
		this.m_arrayPoints = [];
		this.m_strColor = strColor;
		this.m_strType = "WIRE";
		this.m_strDeviceName = this.m_strType + CWire.m_nWireCount;
		this.m_nWidth = 3;
		this.m_bSelected = false;
		this.m_pointLastMousePos = new CPoint(0, 0);
		this.m_nIndexGrabbedPoint = 0;
		CWire.m_nWireCount++;
		this.doAppendNode(new CPoint(0, 0));
	}

	getType()
	{
		return "WIRE";
	}
	
	doGetColor()
	{
		return this.m_strColor;
	}
	
	doSetColor(strNewColor)
	{
		this.m_strColor = strNewColor;
	}
	
	doGetDeviceName()
	{
		return this.m_strDeviceName;
	}
	
	doAppendNode(pointNew)
	{
		pointNew.m_nX -= (pointNew.m_nX % g_nGridSize);
		pointNew.m_nY -= (pointNew.m_nY % g_nGridSize);
		this.m_arrayPoints[this.m_arrayPoints.length] = pointNew;
	}
	
	doDeleteNode(nIndex)
	{
		var arrayNew = [];
		
		for (let nI = 0; nI < nIndex; nI++)
			arrayNew.push(this.m_arrayPoints[nI]);
			
		for (let nI = nIndex + 1; nI < this.m_arrayPoints.length; nI++)
			arrayNew.push(this.m_arrayPoints[nI]);
			
		this.m_arrayPoints = arrayNew;
	}
	
	doInsertNode(pointNew)
	{
		var arrayNew = [];
		
		pointNew.m_nX -= (pointNew.m_nX % g_nGridSize);
		pointNew.m_nY -= (pointNew.m_nY % g_nGridSize);
		
		if (this.m_arrayPoints.length == 2)
		{
			if ((pointNew.isGreater(this.m_arrayPoints[0]) || pointNew.isLesser(this.m_arrayPoints[1])) ||
				 (pointNew.isGreater(this.m_arrayPoints[1]) || pointNew.isLesser(this.m_arrayPoints[0])))
			{
				//this.m_arrayPoints.splice(1, 0, pointNew);
				arrayNew.push(this.m_arrayPoints[0]);
				arrayNew.push(pointNew);
				arrayNew.push(this.m_arrayPoints[1]);
				this.m_arrayPoints = arrayNew;
			}
		}
		else
		{
			for (var nI = 0; nI <= (this.m_arrayPoints.length - 1); nI++)
			{
				if (pointNew.isGreater(this.m_arrayPoints[nI]))
				{
					for (let nJ = 0; nJ < nI; nJ++)
						arrayNew.push(this.m_arrayPoints[nJ]);
						
					arrayNew.push(pointNew);
					
					for (let nJ = nI; nJ < this.m_arrayPoints.length; nJ++)
						arrayNew.push(this.m_arrayPoints[nJ]);
					this.m_arrayPoints = arrayNew;
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
			if (nDeltaX == 0 || nDeltaY == 0) 
				bContains = true;
			else
			{
				var nSlope = nDeltaY / nDeltaX;
				var nOffset = pointStart.m_nY - pointStart.m_nX * nSlope;
				var nCalculatedY  = pointMouse.m_nX * nSlope + nOffset;

				// Check calculated Y matches the points Y coord with some easing.
				bContains = pointMouse.m_nY - nLineWidth <= nCalculatedY && nCalculatedY <= pointMouse.m_nY + nLineWidth;
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
		doDisplayInfo("Click the right mouse button on the wire to add or remove nodes & hold the left mouse button on a node to drag it...");
		var strHTML = "&nbsp;&nbsp;<div style=\"display:inline-block;position:relative;top:2Px;\">WIRE COLORS: </div><div style=\"" + g_strSecondDivDisplayStyle + "position:relative;top:4Px;\" id=\"fix\">" + 

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
		doShowEditFields(strHTML);
	}
	
	doUnselect()
	{
		this.m_bSelected = false;
	}
	
	doDrop(pointMousePos)
	{
		this.m_nIndexGrabbedPoint = -1;
	}
	
	doGrab(pointMousePos)
	{
		this.doSelect();
		this.m_pointLastMousePos.m_nX = pointMousePos.m_nX;
		this.m_pointLastMousePos.m_nY = pointMousePos.m_nY;
		this.m_nIndexGrabbedPoint = this.isMouseInNode(pointMousePos);
		g_Canvas.style.cursor = "grabbing";
	}
	
	doMove(pointMousePos)
	{
		if (this.m_nIndexGrabbedPoint > -1)
		{
			this.m_arrayPoints[this.m_nIndexGrabbedPoint] = new CPoint(pointMousePos.m_nX - (pointMousePos.m_nX % 10), pointMousePos.m_nY - (pointMousePos.m_nY % 10));
			doDisplayAllComponents();
		}
	}
	
	doMouseOver(pointMousePos)
	{
		if (this.isMouseInNode(pointMousePos) > -1)
			g_Canvas.style.cursor = "grab";
		else if (this.isMouseIn(pointMousePos))
			g_Canvas.style.cursor = "pointer";
		else 
			g_Canvas.style.cursor = "default";
	}
	
	doDisplayNode(pointMouse, strColor)
	{
		g_CanvasContext.fillStyle = this.m_strColor;
		g_CanvasContext.arc(pointMouse.m_nX, pointMouse.m_nY, CWire.m_nNodeRadius, 0, 2 * Math.PI);
	}

	doDisplay()
	{
		var nX = 0, nY = 0;
		
		g_CanvasContext.strokeStyle = this.m_strColor;
		g_CanvasContext.lineWidth = this.m_nWidth;
		
		g_CanvasContext.beginPath();
		if (this.m_bSelected)
		{
			for (let nI = 0; nI < this.m_arrayPoints.length; nI++)	
				this.doDisplayNode(this.m_arrayPoints[nI], this.m_strColor);
		}
		for (let nI = 0; nI < this.m_arrayPoints.length; nI++)
		{
			nX = this.m_arrayPoints[nI].m_nX - (CWire.m_nNodeRadius / 2);
			nY = this.m_arrayPoints[nI].m_nY;
			
			if (nI == 0)
				g_CanvasContext.moveTo(nX, nY);
			else 
				g_CanvasContext.lineTo(nX, nY);
		}
		g_CanvasContext.stroke();		
	}

}
