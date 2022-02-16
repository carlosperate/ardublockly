//*************************************************************************
//*
//* GLOBAL VARIBALES FOR COMPONENTS
//*
//*************************************************************************

var g_arrayGrid = [];
var g_Canvas = document.getElementById("canvas"), g_BlankCanvasClone = document.createElement('canvas');
var g_CanvasContext = null, g_BlankCanvasCloneContext = null;
var g_DrawSpace = document.getElementById("draw_space");
var g_pointCanvasScrollPos = new CPoint(0, 0);
var g_nGridSize = 10;

if (g_Canvas != null)
{
	g_CanvasContext = g_Canvas.getContext("2d");
	if (g_CanvasContext == null)	
		alert("Could not get canvas context object for 'canvas'!");
}
else
	alert("Could not get canvas object for 'canvas'!");

if (g_BlankCanvasClone != null)
{
    g_BlankCanvasClone.width = g_Canvas.width;
    g_BlankCanvasClone.height = g_Canvas.height;
	g_BlankCanvasCloneContext = g_BlankCanvasClone.getContext("2d");
	if (g_BlankCanvasCloneContext == null)	
		alert("Could not get canvas context object for 'clone canvas'!");
}
else
	alert("Could not get canvas object for 'canvas'!");

if (g_DrawSpace == null)
	alert("Could not get div object for 'draw_space'!");




//*************************************************************************
//*
//* SCROLL TO MIDDLE OF CANVAS ON START UP
//*
//*************************************************************************

function doScrollToMiddle()
{
	if (g_DrawSpace)
	{
		g_DrawSpace.scrollTop = g_Canvas.height / 2;
		g_pointCanvasScrollPos = new CPoint(0, g_Canvas.height / 2);
	}
}





//*************************************************************************
//*
//* ERASE THE CANVAS AND CREATE THE GRID
//*
//*************************************************************************

function doCreateGrid()
{
	var nX = 0, nY = 0;

	if (g_Canvas != null)
	{				
		for (nY = 0; nY < g_Canvas.offsetHeight; nY += g_nGridSize)
		{
			for (nX = 0; nX < g_Canvas.offsetWidth; nX += g_nGridSize)
				g_arrayGrid.push(new CPoint(nX, nY));
		}
	}	
}

function doDrawCanvasGrid(Context, nWidth, nHeight)
{
	if (g_arrayGrid.length == 0)
		doCreateGrid()
	if (Context != null)
	{
		Context.clearRect(0, 0, nWidth, nHeight); 
		Context.fillStyle = "#000000";	
		Context.beginPath();
		for (let nI = 0; nI < g_arrayGrid.length; nI++)
			Context.fillRect(g_arrayGrid[nI].m_nX, g_arrayGrid[nI].m_nY, 1, 1);
	}
}

function doEraseCanvas()
{
	g_CanvasContext.clearRect(0, 0, g_Canvas.offsetWidth, g_Canvas.offsetHeight);
	g_CanvasContext.drawImage(g_BlankCanvasClone, 0, 0);
}

