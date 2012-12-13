#target aftereffects-9.0
if ( app.project.selection.length < 0 || app.project.selection[0] instanceof CompItem )
{
  reSizeSample(this);
}
else
{
	alert("ERROR");
}

function reSizeSample ( thisObj )
{
	#include "./makeWindow.jsxinc";
	#include "./makeLayerUI.jsxinc";

	var uiObj       = new Object();
	uiObj.version   = "1.0";
	uiObj.Name      = "Sequence Viewer";
	uiObj.winSize   = [ 320, 240 ];
	uiObj.menuSize  = 40;
	uiObj.sbSize    = 16
	uiObj.Size      = 10;
	uiObj.selItem   = app.project.selection[0];
	uiObj.fDuration = uiObj.selItem.frameDuration;
	uiObj.Duration  = ( uiObj.selItem.duration / uiObj.fDuration );
	uiObj.displayStartFrame = ( app.project.displayStartFrame
				+ ( uiObj.selItem.displayStartTime / uiObj.fDuration ) );
	uiObj.Start = ( uiObj.selItem.workAreaStart / uiObj.fDuration );
	uiObj.End   = ( uiObj.selItem.workAreaDuration / uiObj.fDuration );
	// パネル背景色 ------------------------------------------------------------------
	uiObj.BGColor = [ [ 168, 150, 119 ], [ 181,  56,  56 ], [ 228, 216,  76 ],
			  [ 232, 146,  13 ], [ 103, 125, 224 ], [ 142,  44, 154 ],
			  [  74, 164,  76 ], [ 127,  69, 42 ] ];

	// Main Windowの設置 -------------------------------------------------------------
	var uiWin = buildWin ( thisObj );
	//getSize ( uiWin.uiGrp );
	function test3 ()
	{
		uiObj.selItem.workAreaStart    = ( uiObj.Start * uiObj.fDuration );
		uiObj.selItem.workAreaDuration = ( uiObj.End * uiObj.fDuration );
	}
	function test ( Obj, Layers )
	{
		var last = 0;
		for ( var i in Obj.uiBase )
		{
			var uiBase = Obj.uiBase[i];
			var Enabled = uiBase.enabled;
			for ( var pn in uiBase.uiPnl )
			{
				var uiPnl = uiBase.uiPnl[pn];
				var id = uiPnl.index;
				//if ( uiPnl[pn].out ) alert("AHO");;
				//var tmpLast = ( uiPnl[pn].out * uiObj.fDuration );
				Layers[id].enabled = Enabled;
				if ( uiPnl.enabled && uiPnl.uiGrp )
					test ( uiPnl.uiGrp, Layers[id].source.layers );
			}
			//alert(tmpLast);
		}
	}
	function test2 ()
	{
		// ワークエリアの設定 ----------------------------------------------------
		var uiMenu  = this.parent;
		uiObj.selItem.workAreaStart = ( ( uiMenu.uiStart.text -
					uiObj.displayStartFrame ) * uiObj.fDuration );
		uiObj.selItem.workAreaDuration = ( ( uiMenu.uiEnd.text -
						uiMenu.uiStart.text ) * uiObj.fDuration );
		// 階層の再構築 ----------------------------------------------------------
		var uiWin = uiMenu.parent;
		test ( uiWin.uiGrp, uiObj.selItem.layers );
	}
}
