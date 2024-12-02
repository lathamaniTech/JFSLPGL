var exec = require('cordova/exec');

var EsysRDService = {
	
 /** Result Constants   */
	 SUCCESS : 0,
	 PAPER_OUT : -2,
	 PLATEN_OPEN : -3,
	 FAILURE : -1,
	 HIGH_HEADTEMP : -4,
	 BMP_FILE_ERROR	: -9,
	 LOW_HEADTEMP : -5,
	 IMPROPER_VOLTAGE : -7,
	 NO_DATA : -8,
	 PARAM_ERROR : -10,
	 NO_RESPONSE : -11,
	 FONT_ORIENTATION_MISMATCH : -12,
	 LIMIT_EXCEEDED	: -13,
	 CHARACTER_NOT_SUPPORTED : -14,
	 
	 /* * Font Type. */
	 FONT_LARGE_NORMAL : 0x01,
	 FONT_LARGE_BOLD : 0x02,
	 FONT_SMALL_NORMAL : 0x03,
	 FONT_SMALL_BOLD : 0x04,
	 FONT_UL_LARGE_NORMAL : 0x05,
	 FONT_UL_LARGE_BOLD : 0x06,
	 FONT_UL_SMALL_NORMAL : 0x07,
	 FONT_UL_SMALL_BOLD : 0x08,
	 FONT_180_LARGE_NORMAL : 0x09,
	 FONT_180_LARGE_BOLD : 0x0A,
	 FONT_180_SMALL_NORMAL  : 0x0B,
	 FONT_180_SMALL_BOLD : 0x0C,
	 FONT_180_UL_LARGE_NORMAL : 0x0D,
	 FONT_180_UL_LARGE_BOLD : 0x0E,
	 FONT_180_UL_SMALL_NORMAL : 0x0F,
	 FONT_180_UL_SMALL_BOLD : 0x10,
		 
	 BARCODE_2OF5_COMPRESSED : 0x01,
	 BARCODE_2OF5_UNCOMPRESSED : 0x02,
	 BARCODE_3OF9_COMPRESSED : 0x03,
	 BARCODE_3OF9_UNCOMPRESSED : 0x04,
     BARCODE_EAN_13_STANDARD : 0x05,
	 
	  /** Javascript Constants  */
	  PARAM_MISSING : -81,
	  NO_DEVICE_IN_PAIRED_LIST : -82,
	  NO_BT_AVAILABLE : -83,
	  EXCEPTION_OCCURED : -84,
	  PRINTER_NOT_INITIALIZED :-80,
	  RDSERVICE_NOT_AVAILABLE:-85,
	
        // Intialize Printer
        vDeviceInitialization: function(fnSuccess, fnError,retainConn){
		  exec(fnSuccess, fnError, "EsysRDService", "vDeviceInitialization", [retainConn]);
        },
   	
   
        // ListBTName
		vListDevBTName: function(fnSuccess, fnError){
		  exec(fnSuccess, fnError, "EsysRDService", "vListDevBTName", []);
	    },
   
       // ListDMAC
        vListDevBTMAC: function(fnSuccess, fnError){
          exec(fnSuccess, fnError, "EsysRDService", "vListDevBTMAC", []);
        },
		
		// GetMACFromDeviceName
        vGetBTName: function(fnSuccess, fnError,dmac){
          exec(fnSuccess, fnError, "EsysRDService", "vGetBTName", [dmac]);
        },
		
		// GetBTNameFromDeviceMAC
        vGetBTMAC: function(fnSuccess, fnError,btname){
          exec(fnSuccess, fnError, "EsysRDService", "vGetBTMAC", [btname]);
        },
   
        // FlushBuffer
        vFlushBuf: function(fnSuccess, fnError){
         exec(fnSuccess, fnError, "EsysRDService", "vFlushBuf", []);
        },
		 
       // TestPrint
		vTestPrint: function(fnSuccess, fnError,txn,btname,dmac){
		  exec(fnSuccess, fnError, "EsysRDService", "vTestPrint", [txn,btname,dmac]);
        },
		
       // AddData
       vAddData: function(fnSuccess, fnError, font, sInData){
		  exec(fnSuccess, fnError, "EsysRDService", "vAddData",[font, sInData]);
        },
   
      /*//AddLine
        vAddLine: function(fnSuccess, fnError, font, chSymbol){
		  exec(fnSuccess, fnError, "EsysRDService", "vAddLine", [font, chSymbol]);
        },*/
   
		// vGetTextPrintXML 
	    vGetTextPrintXML : function(fnSuccess, fnError,txn,btname,dmac){
		  exec(fnSuccess, fnError, "EsysRDService", "vGetTextPrintXML", [txn,btname,dmac]);
	   },
   
		// vGetBarcodePrintXML
		vGetBarcodePrintXML: function(fnSuccess, fnError,type,data,txn,btname,dmac){
		  exec(fnSuccess, fnError, "EsysRDService", "vGetBarcodePrintXML", [type,data,txn,btname,dmac]);
	   },
   
	   // vGetBMP_FilePath_XML
	   vGetBMP_FilePath_XML: function(fnSuccess, fnError,filepath,txn,btname,dmac){
		  exec(fnSuccess, fnError, "EsysRDService", "vGetBMP_FilePath_XML",[filepath,txn,btname,dmac]);
	   },
   
	   // vGetBMP_Base64_XML
	   vGetBMP_Base64_XML: function(fnSuccess, fnError,imageData,txn,btname,dmac){
		  exec(fnSuccess, fnError, "EsysRDService", "vGetBMP_Base64_XML",[imageData,txn,btname,dmac]);
	   },
   
	   // vGetGrayScale_FilePath_XML
	   vGetGreyScale_FilePath_XML: function(fnSuccess, fnError,filepath,txn,btname,dmac){
		  exec(fnSuccess, fnError, "EsysRDService", "vGetGrayScale_FilePath_XML",[filepath,txn,btname,dmac]);
	   },
   
	   // vGetGrayScale_Base64_XML
	   vGetGreyScale_Base64_XML: function(fnSuccess, fnError,imageData,txn,btname,dmac){
		  exec(fnSuccess, fnError, "EsysRDService", "vGetGrayScale_Base64_XML",[imageData,txn,btname,dmac]);
	   },
   
	   // Read MAGCard
	   /*vMAGCard: function(fnSuccess, fnError,timeout,txn,btname,dmac){
		  exec(fnSuccess, fnError, "EsysRDService", "vMAGCard",[timeout,txn,btname,dmac]);
	   },*/
   
		// CombinedXML
		vGetCombinedXML: function(fnSuccess, fnError,xml_one,xml_two){
		  exec(fnSuccess, fnError, "EsysRDService", "vGetCombinedXML",[xml_one,xml_two]);
	   },
   
	   // PaperFeed
		vPaperFeed: function(fnSuccess, fnError,txn,btname,dmac){
		  exec(fnSuccess, fnError, "EsysRDService", "vPaperFeed",[txn,btname,dmac]);
	   },
   
	   // Diagnostics
		vDiagnostics: function(fnSuccess, fnError,txn,btname,dmac){
		  exec(fnSuccess, fnError, "EsysRDService", "vDiagnostics",[txn,btname,dmac]);
	   },
   
	   // IdentifyPeripherals
		vIdentifyPeripherals: function(fnSuccess, fnError,txn,btname,dmac){
		  exec(fnSuccess, fnError, "EsysRDService", "vIdentifyPeripherals",[txn,btname,dmac]);
	   },
   
       // Disconnect BT
	   vDisconnect: function(fnSuccess, fnError,txn,btname,dmac){
		  exec(fnSuccess, fnError, "EsysRDService", "vDisconnect",[txn,btname,dmac]);
	   },
	   
	   // BatteryStatus
		vBatteryStatus: function(fnSuccess, fnError,txn,btname,dmac){
		  exec(fnSuccess, fnError, "EsysRDService", "vBatteryStatus",[txn,btname,dmac]);
	   },
   
		// SerialNumber
		vSerialNumber: function(fnSuccess, fnError,txn,btname,dmac){
		  exec(fnSuccess, fnError, "EsysRDService", "vSerialNumber",[txn,btname,dmac]);
	   },
   
	   // FirmwareVersion
		vFirmwareVersion: function(fnSuccess, fnError,txn,btname,dmac){
		  exec(fnSuccess, fnError, "EsysRDService", "vFirmwareVersion",[txn,btname,dmac]);
	   },
   
        // StartPrint
		vStartPrint: function(fnSuccess, fnError,inxml){
		  exec(fnSuccess, fnError, "EsysRDService", "vStartPrint",[inxml]);
	   },
   
	   // Capture
		vCapture: function(fnSuccess, fnError,pid_option){
		  exec(fnSuccess, fnError, "EsysRDService", "vCapture",[pid_option]);
	   },
	   
	    // GetCaptureXml
		vGetPidOptionXML: function(fnSuccess, fnError,timeout,pidver,format,ftype,fcount,env,demotag,btconval,btname,dmac,wadh,otp){
		  exec(fnSuccess, fnError, "EsysRDService", "vGetPidOptionXML",[timeout,pidver,format,ftype,fcount,env,demotag,btconval,btname,dmac,wadh,otp]);
	    },
   
	   // Device_Info
		vDevice_Info: function(fnSuccess, fnError){
		  exec(fnSuccess, fnError, "EsysRDService", "vDevice_Info", []);
	   },
   
	   // RDService_Info
		vRDService_Info: function(fnSuccess, fnError){
		  exec(fnSuccess, fnError, "EsysRDService", "vRDService_Info", []);
	   }, 
};

module.exports = EsysRDService;


