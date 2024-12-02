package com.evolute.esysrdservice;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.io.File;
import java.io.ByteArrayOutputStream;
import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Collections;
import java.util.Hashtable;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.Set;
import java.util.Properties;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.ResolveInfo;
import android.util.Log;
import android.os.Handler;
import android.app.Activity;
import android.content.ComponentName ;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.Bitmap.Config;
import android.util.Xml.Encoding;
import android.util.Base64;
import android.net.Uri;
import android.widget.ArrayAdapter;
import android.widget.Toast;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.rdservice.helper.CombinedXML;
import com.rdservice.helper.ByteBuffer;
import com.rdservice.helper.HexString;
import com.rdservice.helper.Printer;
import com.rdservice.helper.BitmapGenerator;

public class EsysRDService extends CordovaPlugin {
	private static final String TAG = "EsysRDService";
	BluetoothAdapter mBluetoothAdapter;
	BluetoothDevice mmDevice;
	static Printer prn = null;
    CallbackContext onNewIntentCallbackContext=null;
	public EsysRDService() {
	}

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		if (action.equals("vDeviceInitialization")) {
			vDeviceInitialization(args,callbackContext);
			return true;
		}else if (action.equals("vListDevBTName")) {
			vListDevBTName(callbackContext);
			return true;
		}else if (action.equals("vListDevBTMAC")) {
			vListDevBTMAC(callbackContext);
			return true;
		}else if (action.equals("vGetBTName")) {
			vGetBTName(args,callbackContext);
			return true;
		}else if (action.equals("vGetBTMAC")) {
			vGetBTMAC(args,callbackContext);
			return true;
		}else if(action.equals("vFlushBuf")){
			vFlushBuf(callbackContext);
			return true;
		}else if(action.equals("vTestPrint")){
			vTestPrint(args,callbackContext);
			return true;
		}else if(action.equals("vAddData")){
			vAddData(args,callbackContext);
			return true;
		}/*else if(action.equals("vAddLine")){
			vAddLine(args,callbackContext);
			return true;
		}*/else if(action.equals("vGetTextPrintXML")){
			vGetTextPrintXML(args,callbackContext);
			return true;
		}else if(action.equals("vGetBarcodePrintXML")){
			vGetBarcodePrintXML(args,callbackContext);
			return true;
		}else if(action.equals("vGetBMP_FilePath_XML")){
			vGetBMP_FilePath_XML(args,callbackContext);
			return true;
		}else if(action.equals("vGetBMP_Base64_XML")){
			vGetBMP_Base64_XML(args,callbackContext);
			return true;
		}else if(action.equals("vGetGrayScale_FilePath_XML")){
			vGetGrayScale_FilePath_XML(args,callbackContext);
			return true;
		}else if(action.equals("vGetGrayScale_Base64_XML")){
			vGetGrayScale_Base64_XML(args,callbackContext);
			return true;
		}/*else if(action.equals("vMAGCard")){
				vMAGCard(args,callbackContext);
			return true;
		}*/else if(action.equals("vGetCombinedXML")){
				vGetCombinedXML(args,callbackContext);
			return true;
		}else if(action.equals("vPaperFeed")){
				vPaperFeed(args,callbackContext);
			return true;
		}else if(action.equals("vDiagnostics")){
				vDiagnostics(args,callbackContext);
			return true;
		}else if (action.equals("vIdentifyPeripherals")) {
				vIdentifyPeripherals(args,callbackContext);
			return true;
		}else if (action.equals("vDisconnect")) {
				vDisconnect(args,callbackContext);
			return true;
		}else if (action.equals("vBatteryStatus")) {
				vBatteryStatus(args,callbackContext);
			return true;
		}else if (action.equals("vSerialNumber")) {
				vSerialNumber(args,callbackContext);
			return true;
		}else if (action.equals("vFirmwareVersion")) {
				vFirmwareVersion(args,callbackContext);
			return true;
		}else if (action.equals("vStartPrint")) {
				vStartPrint(args,callbackContext);
			return true;
		}else if (action.equals("vCapture")) {
				vCapture(args,callbackContext);
			return true;
		}else if (action.equals("vGetPidOptionXML")) {
				vGetPidOptionXML(args,callbackContext);
			return true;
		}else if (action.equals("vDevice_Info")) {
				vDevice_Info(callbackContext);
			return true;
		}else if (action.equals("vRDService_Info")) {
				vRDService_Info(callbackContext);
			return true;
		}
		return false;
	}

	//This will return the array list of paired bluetooth printers
	public void vListDevBTName(CallbackContext callbackContext) {
		BluetoothAdapter mBluetoothAdapter = null;
		String errMsg = null;
		try {
			mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
			if (mBluetoothAdapter == null) {
				errMsg = "No bluetooth adapter available";
				Log.e(TAG, errMsg);
				callbackContext.error(createJSONArray(-83,errMsg).toString());
				return;
			}
			if (!mBluetoothAdapter.isEnabled()) {
				Intent enableBluetooth = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
				this.cordova.getActivity().startActivityForResult(enableBluetooth, 0);
			}
			Set<BluetoothDevice> pairedDevices = mBluetoothAdapter.getBondedDevices();
			if (pairedDevices.size() > 0) {
				JSONArray json = new JSONArray();
				for (BluetoothDevice device : pairedDevices) {
					json.put(device.getName());
				}
				callbackContext.success(createJSONArray(0,json.toString()));
			} else {
				callbackContext.error(createJSONArray(-82,"No Bluetooth Device in Paired List").toString());
			}
			//Log.d(TAG, "Bluetooth Device Found: " + mmDevice.getName());
		} catch (Exception e) {
			errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			e.printStackTrace();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
	}
	
	//This will return the array list of paired bluetooth printers
	public void vListDevBTMAC(CallbackContext callbackContext) {
		BluetoothAdapter mBluetoothAdapter = null;
		String errMsg = null;
		try {
			mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
			if (mBluetoothAdapter == null) {
				errMsg = "No bluetooth adapter available";
				Log.e(TAG, errMsg);
				callbackContext.error(createJSONArray(-83,errMsg).toString());
				return;
			}
			if (!mBluetoothAdapter.isEnabled()) {
				Intent enableBluetooth = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
				this.cordova.getActivity().startActivityForResult(enableBluetooth, 0);
			}
			Set<BluetoothDevice> pairedDevices = mBluetoothAdapter.getBondedDevices();
			if (pairedDevices.size() > 0) {
				JSONArray json = new JSONArray();
				for (BluetoothDevice device : pairedDevices) {
					json.put(device.getAddress());
				}
				callbackContext.success(createJSONArray(0,json.toString()));
			} else {
				callbackContext.error(createJSONArray(-82,"No Bluetooth Device in Paired List").toString());
			}
			//Log.d(TAG, "Bluetooth Device Found: " + mmDevice.getAddress());
		} catch (Exception e) {
			errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			e.printStackTrace();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
	}
	
	/// GetDeviceBTName
	public String vGetBTName(JSONArray args,CallbackContext callbackContext){
		Log.d(TAG, "vGetBTName"+args);
		String btmac = "",getbtname="";
		try{
			BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
			BluetoothDevice matched_device = mBluetoothAdapter.getRemoteDevice("00:00:00:00:00:00");
			if (mBluetoothAdapter == null) {
				String errMsg = "No bluetooth adapter available";
				Log.e(TAG, errMsg);
				callbackContext.error(createJSONArray(-83,errMsg).toString());
			}
			if(args.length()== 0||args.get(0).equals(null)||args.get(0).equals("")){
				Log.e(TAG, "btmac is  missing");
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}else{
				btmac = args.getString(0);
				Set<BluetoothDevice> pairedDevices = mBluetoothAdapter.getBondedDevices();
				ArrayList<String> arr = new ArrayList<String>();
				if (pairedDevices.size() > 0) {
					for (BluetoothDevice device : pairedDevices) {
						if (btmac.equalsIgnoreCase(device.getAddress())){
						    Log.d(TAG, "data matched" + btmac);
						    matched_device = device;	
							
						}
					}
					if(btmac.equalsIgnoreCase(matched_device.getAddress())){
					    try {
							getbtname = matched_device.getName();
							callbackContext.success(createJSONArray(0,getbtname));								
						} catch (Exception e) {
							String errMsg = e.getMessage();
							Log.e(TAG, errMsg);
							e.printStackTrace();
							callbackContext.error(createJSONArray(-84,errMsg).toString());
						}	
					}else{
						Log.e(TAG, "btmac is not present in paired list");
						callbackContext.error(createJSONArray(-84,"btmac is not present in paired list").toString());
					}
				} else {
					callbackContext.error(createJSONArray(-82,"No Bluetooth Device in Paired List").toString());
				}	
			}
		}catch(Exception e){
			String errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			e.printStackTrace();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
		return getbtname;	
	}
	
	/// GetDeviceBTMAC
	public String vGetBTMAC(JSONArray args,CallbackContext callbackContext){
		Log.d(TAG, "vGetBTMAC"+args);
		String btname = "",getmac="";
		try{
			BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
			BluetoothDevice matched_device = mBluetoothAdapter.getRemoteDevice("00:00:00:00:00:00");
			if (mBluetoothAdapter == null) {
				String errMsg = "No bluetooth adapter available";
				Log.e(TAG, errMsg);
				callbackContext.error(createJSONArray(-83,errMsg).toString());
			}
			if(args.length()== 0||args.get(0).equals(null)||args.get(0).equals("")){
				Log.e(TAG, "btname is  missing");
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}else{
				btname = args.getString(0);
				Set<BluetoothDevice> pairedDevices = mBluetoothAdapter.getBondedDevices();
				if (pairedDevices.size() > 0) {
					for (BluetoothDevice device : pairedDevices) {
						if (btname.equalsIgnoreCase(device.getName())) {
						Log.d(TAG, "data matched" + btname);
						    matched_device = device;	
						}
					}
					if(btname.equalsIgnoreCase(matched_device.getName())){
					    try {
							getmac = matched_device.getAddress();
							callbackContext.success(createJSONArray(0,getmac));										
						} catch (Exception e) {
							String errMsg = e.getMessage();
							Log.e(TAG, errMsg);
							e.printStackTrace();
							callbackContext.error(createJSONArray(-84,errMsg).toString());
					    }		
					}else{
						   Log.e(TAG, "btname is not present in paired list");
						   callbackContext.error(createJSONArray(-84,"btname is not present in paired list").toString());
					}
				} else {
					callbackContext.error(createJSONArray(-82,"No Bluetooth Device in Paired List").toString());
				}
			}
		}catch(Exception e){
			String errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			e.printStackTrace();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
		return getmac;
	}
	
	/// Printer Intialization
	public void vDeviceInitialization(JSONArray args,CallbackContext callbackContext)throws JSONException{
		// Intialization-----------------------------------------------------//
		boolean retainConn=false;
		Log.d(TAG, "PrinterInitialization args"+args);
		if(args.length()== 0||args.get(0).equals(null)||args.get(0).equals("")){
			Log.e(TAG, "param missing");
			callbackContext.error(createJSONArray(-81,"Param Missing").toString());
		}else{
			try {
				retainConn = args.getBoolean(0);
				prn = new Printer(retainConn);
				Log.d(TAG, "Printer is Initialized");
				callbackContext.success(createJSONArray(0,"Printer is Initialized"));
            } catch (Exception e) {
				e.printStackTrace();
				Log.e(TAG, "Printer Has Not Intialized");
			    callbackContext.error(createJSONArray(-80,"Printer Has Not Intialized").toString());
			}
		}
        //------------------------------------------------------------------------------------------//
	}
	
	/// flush buff
	public int vFlushBuf(CallbackContext callbackContext) {
		if(prn == null) {
			callbackContext.error(createJSONArray(-80,"Printer Has Not Intialized").toString());
			Log.e(TAG, "Printer Has Not Intialized");
		}
		int iReturnValue = prn.iFlushBuf();
		callbackContext.success(createJSONArray(iReturnValue,gotError(iReturnValue)));
        return iReturnValue;
	}
	
	/// vTestPrint
	public String vTestPrint(JSONArray args, final CallbackContext callbackContext){
		Log.d(TAG, "vTestPrint"+args);
		Log.d(TAG, "vTestPrint"+args.length());
		if(prn == null) {
			callbackContext.error(createJSONArray(-80,"Printer Has Not Intialized").toString());
			Log.e(TAG, "Printer Has Not Intialized");
		}
		String dname = "", btmac = "",txn = "", xml ="";
		try{
			if(args.length()== 0||args.get(0).equals(null)||args.get(0).equals("")){
				Log.e(TAG, "param missing");
			    callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}else{
				txn = args.getString(0);
				 //dname = args.getString(1);
				if(args.getString(1).equalsIgnoreCase(null)||args.getString(1).equalsIgnoreCase("")  || args.getString(1).equalsIgnoreCase("null")){
					dname = "";
				} else {
					dname = args.getString(1);
				}
				
				//btmac = args.getString(2); 
				if(args.getString(2).equalsIgnoreCase(null)||args.getString(2).equalsIgnoreCase("")  || args.getString(2).equalsIgnoreCase("null")){
					btmac = "";
				} else {
					btmac = args.getString(2);
				}	
			}
			Log.d(TAG, "txn"+txn+" dname"+dname+" btmac"+btmac);
			if(txn != null && !txn.isEmpty()){
				xml = prn.sTestPrint(txn, dname, btmac);
				if(xml == null){
					int err = prn.iGetReturnCode();
					String xml_error = gotError(err);
					Log.e(TAG,"getting err while genrating xml "+err);
					callbackContext.error(createJSONArray(err,xml_error).toString());
				}else{
					connectRDService(xml,callbackContext);
					Log.d(TAG,"xml "+xml);
				}
			}else{
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}
		}catch(Exception e){
			String errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			e.printStackTrace();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
		return xml;
	}
	
	/// vAddData
	public int vAddData(JSONArray args, final CallbackContext callbackContext){
		Log.d(TAG, "vAddData"+args);
		if(prn == null) {
			callbackContext.error(createJSONArray(-80,"Printer Has Not Intialized").toString());
			Log.e(TAG, "Printer Has Not Intialized");
		}
		String font = "", in_data = "";
		int iReturnValue = -1;
		try {
			if(args.length()==0||args.get(0).equals(null)||args.get(0).equals("")||args.get(1).equals(null)||args.get(1).equals(null)){
				callbackContext.error(createJSONArray(-81,"Param Missing").toString()); 
			}else{
				font = args.getString(0);
				in_data = args.getString(1);
			}
			if(font != null && !font.isEmpty()&& in_data != null && !in_data.isEmpty()){
				byte inFont = Byte.valueOf(font);
			    iReturnValue = prn.iPrinterAddData(inFont,in_data);
		        callbackContext.success(createJSONArray(iReturnValue,gotError(iReturnValue)));
			}else{
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}	
	    } catch (Exception e) {
			String errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			e.printStackTrace();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
		return iReturnValue;
	}
	
	/*// vAddLine
	public int vAddLine(JSONArray args, final CallbackContext callbackContext){
		Log.d(TAG, "vAddLine"+args);
		if(prn == null) {
			callbackContext.error(createJSONArray(-80,"Printer Has Not Intialized").toString());
			Log.e(TAG, "Printer Has Not Intialized");
		}
		String font = "", ch_symbol = "";
		int iReturnValue = -1;
		try {
			if(args.length()==0||args.get(0).equals(null)||args.get(0).equals("")||args.get(1).equals(null)||args.get(1).equals(null)){
				callbackContext.error(createJSONArray(-81,"Param Missing").toString()); 
			}else{
				font = args.getString(0);
				ch_symbol = args.getString(1);
			}if(font != null && !font.isEmpty()&& ch_symbol != null && !ch_symbol.isEmpty()){
				byte inFont = Byte.valueOf(font);
			    Character ch = ch_symbol.charAt(0);
			    iReturnValue = prn.iPrinterAddLine(inFont,ch);
		        callbackContext.success(createJSONArray(iReturnValue,gotError(iReturnValue));
			}else{
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}	
	    } catch (Exception e) {
			String errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			e.printStackTrace();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
		return iReturnValue;
	}*/
	
	//vGetTextPrintXML
	public String vGetTextPrintXML(JSONArray args, final CallbackContext callbackContext){
		Log.d(TAG, "vGetTextPrintXML"+args);
		if(prn == null) {
			callbackContext.error(createJSONArray(-80,"Printer Has Not Intialized").toString());
			Log.e(TAG, "Printer Has Not Intialized");
		}
		String dname = "", btmac = "",txn = "", xml ="";
		try {
			if(args.length()== 0||args.get(0).equals(null)||args.get(0).equals("")){
				Log.e(TAG, "param missing");
			    callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}else{
				txn = args.getString(0);
			    //dname = args.getString(1);
				if(args.getString(1).equalsIgnoreCase(null)||args.getString(1).equalsIgnoreCase("")  || args.getString(1).equalsIgnoreCase("null")){
					dname = "";
				} else {
					dname = args.getString(1);
				}
				
				//btmac = args.getString(2); 
				if(args.getString(2).equalsIgnoreCase(null)||args.getString(2).equalsIgnoreCase("")  || args.getString(2).equalsIgnoreCase("null")){
					btmac = "";
				} else {
					btmac = args.getString(2);
				}	
			}if(txn != null && !txn.isEmpty()){
				xml = prn.sStartPrinting(txn,dname,btmac);
				if(xml == null){
					int err = prn.iGetReturnCode();
					String xml_error = gotError(err);
					Log.e(TAG,"getting err while genrating xml "+err);
					callbackContext.error(createJSONArray(err,xml_error).toString());
				}else{
					callbackContext.success(createJSONArray(0,xml));		
					Log.d(TAG,"xml "+xml);
				}
			}else{
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}		
		} catch (Exception e) {
			String errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			e.printStackTrace();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
	    }
		return xml;
	}
	
	//vGetBarcodePrintXML
	public String vGetBarcodePrintXML(JSONArray args, final CallbackContext callbackContext){
		Log.d(TAG, "vGetBarcodePrintXML"+args);
		if(prn == null) {
			callbackContext.error(createJSONArray(-80,"Printer Has Not Intialized").toString());
			Log.e(TAG, "Printer Has Not Intialized");
		}
		String dname = "", btmac = "",txn = "", xml ="", type="",in_data="";
		try {
			if(args.length()==0||args.get(0).equals(null)||args.get(0).equals("")||args.get(1).equals(null)||args.get(1).equals(null)||args.get(2).equals(null)||args.get(2).equals(null)){
				callbackContext.error(createJSONArray(-81,"Param Missing").toString()); 
			}else{
				type = args.getString(0);
				in_data = args.getString(1);
				txn = args.getString(2);
				 //dname = args.getString(3);
				if(args.getString(3).equalsIgnoreCase(null)||args.getString(3).equalsIgnoreCase("")  || args.getString(3).equalsIgnoreCase("null")){
					dname = "";
				} else {
					dname = args.getString(3);
				}
				
				//btmac = args.getString(4); 
				if(args.getString(4).equalsIgnoreCase(null)||args.getString(4).equalsIgnoreCase("")  || args.getString(4).equalsIgnoreCase("null")){
					btmac = "";
				} else {
					btmac = args.getString(4);
				}	
			}if(type != null && !type.isEmpty()&& txn != null && !txn.isEmpty()&& in_data != null && !in_data.isEmpty()){
				byte inType = Byte.valueOf(type);
				xml = prn.sPrintBarcode(inType,in_data,txn, dname, btmac);
				if(xml == null){
					int err = prn.iGetReturnCode();
					String xml_error = gotError(err);
					Log.e(TAG,"getting err while genrating xml "+err);
					callbackContext.error(createJSONArray(err,xml_error).toString());
				}else{
					callbackContext.success(createJSONArray(0,xml));	
					Log.d(TAG,"xml "+xml);	
				}
			}else{
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}			
		} catch (Exception e) {
			String errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			e.printStackTrace();
			callbackContext.error(createJSONArray (-84,errMsg).toString());
		}
		return xml;
	}
	
	//vGetBMP_FilePath_XML
	public String vGetBMP_FilePath_XML(JSONArray args,CallbackContext callbackContext) {
		Log.d(TAG, "vGetBMP_FilePath_XML"+args);
		if(prn == null) {
			callbackContext.error(createJSONArray(-80,"Printer Has Not Intialized").toString());
			Log.e(TAG, "Printer Has Not Intialized");
		}
		String dname = "", btmac = "",txn = "", xml ="",imageData="";
		try {
			if(args.length()==0||args.get(0).equals(null)||args.get(0).equals("")||args.get(1).equals(null)||args.get(1).equals(null)){
				callbackContext.error(createJSONArray(-81,"Param Missing").toString()); 
			}else{
				imageData = args.getString(0);
				Log.d(TAG, "imageData"+imageData);
				txn = args.getString(1);
				 //dname = args.getString(2);
				if(args.getString(2).equalsIgnoreCase(null)||args.getString(2).equalsIgnoreCase("")  || args.getString(2).equalsIgnoreCase("null")){
					dname = "";
				} else {
					dname = args.getString(2);
				}
				
				//btmac = args.getString(3); 
				if(args.getString(3).equalsIgnoreCase(null)||args.getString(3).equalsIgnoreCase("")  || args.getString(3).equalsIgnoreCase("null")){
					btmac = "";
				} else {
					btmac = args.getString(3);
				}	
			}if(txn != null && !txn.isEmpty()&& imageData != null && !imageData.isEmpty()){
				Bitmap bitmap = BitmapFactory.decodeFile(imageData);
				Bitmap bb= BitmapGenerator.scaleBitmap(bitmap);
				byte[]	bOut = BitmapGenerator.bGetBmpFileData(bb);
				ByteArrayInputStream bbx = new ByteArrayInputStream(bOut);
				xml= prn.sGetBmpPackets(bbx,txn,dname,btmac);
				if(xml == null){
					int err = prn.iGetReturnCode();
					String xml_error = gotError(err);
					Log.e(TAG,"getting err while genrating xml "+err);
					callbackContext.error(createJSONArray(err,xml_error).toString());
				}else{  
					callbackContext.success(createJSONArray(0,xml));	
					Log.d(TAG,"xml "+xml);
				}
			}else{
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}		
		} catch (Exception e) {
			String errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			e.printStackTrace();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
		return xml;
	}
	
	//vGetBMP_Base64_XML
	public String vGetBMP_Base64_XML(JSONArray args,CallbackContext callbackContext){
		Log.d(TAG, "vGetBMP_Base64_XML"+args);
		if(prn == null) {
			callbackContext.error(createJSONArray(-80,"Printer Has Not Intialized").toString());
			Log.e(TAG, "Printer Has Not Intialized");
		}
		String dname = "", btmac = "",txn = "", xml ="",imageData="";
		try {
			if(args.length()==0||args.get(0).equals(null)||args.get(0).equals("")||args.get(1).equals(null)||args.get(1).equals(null)){
				callbackContext.error(createJSONArray(-81,"Param Missing").toString()); 
			}else{
				imageData = args.getString(0);
				txn = args.getString(1);
				 //dname = args.getString(2);
				if(args.getString(2).equalsIgnoreCase(null)||args.getString(2).equalsIgnoreCase("")  || args.getString(2).equalsIgnoreCase("null")){
					dname = "";
				} else {
					dname = args.getString(2);
				}
				
				//btmac = args.getString(3); 
				if(args.getString(3).equalsIgnoreCase(null)||args.getString(3).equalsIgnoreCase("")  || args.getString(3).equalsIgnoreCase("null")){
					btmac = "";
				} else {
					btmac = args.getString(3);
				}	 
			}if(txn != null && !txn.isEmpty()&& imageData != null && !imageData.isEmpty()){
				byte[] data = Base64.decode(imageData, Base64.DEFAULT);
				Bitmap bb= BitmapGenerator.scaleBitmap(data);
				byte[] bOut = BitmapGenerator.bGetBmpFileData(bb);
				ByteArrayInputStream bbx = new ByteArrayInputStream(bOut);
				xml= prn.sGetBmpPackets(bbx,txn,dname,btmac);
				if(xml == null){
					int err = prn.iGetReturnCode();
					String xml_error = gotError(err);
					Log.e(TAG,"getting err while genrating xml "+err);
					callbackContext.error(createJSONArray(err,xml_error).toString());
				}else{
					callbackContext.success(createJSONArray(0,xml));	
					Log.d(TAG,"xml "+xml);		
				}
			}else{
					callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
			String errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
		return xml;
	}
	
	//vGetGrayScale_FilePath_XML
	public String vGetGrayScale_FilePath_XML(JSONArray args ,CallbackContext callbackContext){
		Log.d(TAG, "vGetGrayScale_FilePath_XML"+args);
		if(prn == null) {
			callbackContext.error(createJSONArray(-80,"Printer Has Not Intialized").toString());
			Log.e(TAG, "Printer Has Not Intialized");
		}
		String dname = "", btmac = "",txn = "", xml ="",imageData="";
		try {
			if(args.length()==0||args.get(0).equals(null)||args.get(0).equals("")||args.get(1).equals(null)||args.get(1).equals(null)){
				callbackContext.error(createJSONArray(-81,"Param Missing").toString()); 
			}else{
				imageData = args.getString(0);
				txn = args.getString(1);
				 //dname = args.getString(2);
				if(args.getString(2).equalsIgnoreCase(null)||args.getString(2).equalsIgnoreCase("")  || args.getString(2).equalsIgnoreCase("null")){
					dname = "";
				} else {
					dname = args.getString(2);
				}
				
				//btmac = args.getString(3); 
				if(args.getString(3).equalsIgnoreCase(null)||args.getString(3).equalsIgnoreCase("")  || args.getString(3).equalsIgnoreCase("null")){
					btmac = "";
				} else {
					btmac = args.getString(3);
				}	 
			}if(txn != null && !txn.isEmpty()&& imageData != null && !imageData.isEmpty()){
				Bitmap bitmap = BitmapFactory.decodeFile(imageData);
				Bitmap bb= BitmapGenerator.scaleBitmap(bitmap);
				byte[]	bOut = BitmapGenerator.bGetBmpFileData(bb);
				ByteArrayInputStream bbx = new ByteArrayInputStream(bOut);
				xml= prn.sGreyscalePrint(bbx,txn,dname,btmac);
				if(xml == null){
					int err = prn.iGetReturnCode();
					String xml_error = gotError(err);
					Log.e(TAG,"getting err while genrating xml "+err);
					callbackContext.error(createJSONArray(err,xml_error).toString());
				}else{
					callbackContext.success(createJSONArray(0,xml));	
					Log.d(TAG,"xml "+xml);
				}
			}else{
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
			String errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
		return xml;
	}
	
	//vGetGrayScale_Base64_XML
	public String vGetGrayScale_Base64_XML(JSONArray args,CallbackContext callbackContext) {
		Log.d(TAG, "vGetGrayScale_Base64_XML"+args);
		if(prn == null) {
			callbackContext.error(createJSONArray(-80,"Printer Has Not Intialized").toString());
			Log.e(TAG, "Printer Has Not Intialized");
		}
		String dname = "", btmac = "",txn = "", xml ="",imageData="";
		try {
			if(args.length()==0||args.get(0).equals(null)||args.get(0).equals("")||args.get(1).equals(null)||args.get(1).equals(null)){
				callbackContext.error(createJSONArray(-81,"Param Missing").toString()); 
			}else{
				imageData = args.getString(0);
				txn = args.getString(1);
                //dname = args.getString(2);
				if(args.getString(2).equalsIgnoreCase(null)||args.getString(2).equalsIgnoreCase("")  || args.getString(2).equalsIgnoreCase("null")){
					dname = "";
				} else {
					dname = args.getString(2);
				}
				
				//btmac = args.getString(3); 
				if(args.getString(3).equalsIgnoreCase(null)||args.getString(3).equalsIgnoreCase("")  || args.getString(3).equalsIgnoreCase("null")){
					btmac = "";
				} else {
					btmac = args.getString(3);
				}					
			}if(txn != null && !txn.isEmpty()&& imageData != null && !imageData.isEmpty()){
				byte[] data = Base64.decode(imageData, Base64.DEFAULT);
				Bitmap bb= BitmapGenerator.scaleBitmap(data);
				byte[] bOut = BitmapGenerator.bGetBmpFileData(bb);
				ByteArrayInputStream bbx = new ByteArrayInputStream(bOut);
				xml= prn.sGreyscalePrint(bbx,txn,dname,btmac);
				if(xml == null){
					int err = prn.iGetReturnCode();
					String xml_error = gotError(err);
					Log.e(TAG,"getting err while genrating xml "+err);
					callbackContext.error(createJSONArray(err,xml_error).toString());
				}else{
					callbackContext.success(createJSONArray(0,xml));	
					Log.d(TAG,"xml "+xml);
				}	 
			}else{
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}
		} catch (Exception e) {
			String errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			e.printStackTrace();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
		return xml;
	}
	
	//vGetMAGCardXML
	/*public String vMAGCard(JSONArray args, final CallbackContext callbackContext){
		Log.d(TAG, "vGetMAGCardXML"+args);
		if(prn == null) {
			callbackContext.error(createJSONArray(-80,"Printer Has Not Intialized").toString());
			Log.e(TAG, "Printer Has Not Intialized");
		}
		String dname = "", btmac = "",txn = "", xml ="";
		int timeout=0;
		try {
			if(args.length()==0||args.get(0).equals(null)||args.get(0).equals("")||args.get(1).equals(null)||args.get(1).equals(null)){
				callbackContext.error(createJSONArray(-81,"Param Missing").toString()); 
			}else{
				timeout = args.getInt(0);
				txn = args.getString(1);
				 //dname = args.getString(2);
				if(args.getString(2).equalsIgnoreCase(null)||args.getString(2).equalsIgnoreCase("")  || args.getString(2).equalsIgnoreCase("null")){
					dname = "";
				} else {
					dname = args.getString(2);
				}
				
				//btmac = args.getString(3); 
				if(args.getString(3).equalsIgnoreCase(null)||args.getString(3).equalsIgnoreCase("")  || args.getString(3).equalsIgnoreCase("null")){
					btmac = "";
				} else {
					btmac = args.getString(3);
				}	
			}if(txn != null && !txn.isEmpty()&& timeout != 0){
				xml = prn.sGetMagneticData(txn, dname, btmac, timeout);
				if(xml == null){
					int err = prn.iGetReturnCode();
					String xml_error = gotError(err);
					Log.e(TAG,"getting err while genrating xml "+err);
					callbackContext.error(createJSONArray(err,xml_error).toString());
				}else{
					connectRDService(xml,callbackContext);	
					Log.d(TAG,"xml "+xml);
				}
			}else{
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}
		} catch (Exception e) {
			String errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			e.printStackTrace();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
		return xml;
	}*/
	
	//vGetCombinedXML
	public String vGetCombinedXML(JSONArray args, final CallbackContext callbackContext){
		Log.d(TAG, "vGetCombinedXML"+args);
		if(prn == null) {
			callbackContext.error(createJSONArray(-80,"Printer Has Not Intialized").toString());
			Log.e(TAG, "Printer Has Not Intialized");
		}
		String xml_one="",xml_two="",xml="";
		try {
			if(args.length()==0||args.get(0).equals(null)||args.get(0).equals("")||args.get(1).equals(null)||args.get(1).equals(null)){
				callbackContext.error(createJSONArray(-81,"Param Missing").toString()); 
			}else{
				xml_one = args.getString(0);
				xml_two = args.getString(1);
			}if(xml_one != null && !xml_one.isEmpty()&& xml_two != null && !xml_two.isEmpty()){
				CombinedXML comboxml= new CombinedXML();
				xml = comboxml.getCombinedXMl(xml_one,xml_two);
				if(xml == null){
					int err = prn.iGetReturnCode();
					String xml_error = gotError(err);
					Log.e(TAG,"getting err while genrating xml "+err);
					callbackContext.error(createJSONArray(err,xml_error).toString());
				}else{
					callbackContext.success(createJSONArray(0,xml));	
					Log.d(TAG,"xml "+xml);	
				}
			}else{
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}	
		} catch (Exception e) {
			String errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			e.printStackTrace();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
		return xml;
	}
	
	// iPaperFeed
	public String vPaperFeed(JSONArray args,CallbackContext callbackContext){
		Log.d(TAG, "vGetPaperFeedXML"+args);
		if(prn == null) {
			callbackContext.error(createJSONArray(-80,"Printer Has Not Intialized").toString());
			Log.e(TAG, "Printer Has Not Intialized");
		}
		String dname = "", btmac = "",txn = "", xml ="";
		try{
			if(args.length()== 0||args.get(0).equals(null)||args.get(0).equals("")){
				Log.e(TAG, "param missing");
			    callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}else{
				txn = args.getString(0);
			     //dname = args.getString(1);
				if(args.getString(1).equalsIgnoreCase(null)||args.getString(1).equalsIgnoreCase("")  || args.getString(1).equalsIgnoreCase("null")){
					dname = "";
				} else {
					dname = args.getString(1);
				}
				
				//btmac = args.getString(2); 
				if(args.getString(2).equalsIgnoreCase(null)||args.getString(2).equalsIgnoreCase("")  || args.getString(2).equalsIgnoreCase("null")){
					btmac = "";
				} else {
					btmac = args.getString(2);
				}	
			}
			Log.d(TAG, "txn"+txn+" dname"+dname+" btmac"+btmac);
			if(txn != null && !txn.isEmpty()){
				xml = prn.sPaperFeed(txn, dname, btmac);
				if(xml == null){
					int err = prn.iGetReturnCode();
					String xml_error = gotError(err);
					Log.e(TAG,"getting err while genrating xml "+err);
					callbackContext.error(createJSONArray(err,xml_error).toString());
				}else{
					connectRDService(xml,callbackContext);
					Log.d(TAG,"xml "+xml);
				}
			}else{
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}
		}catch(Exception e){
			String errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			e.printStackTrace();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
		return xml;
	}
	
	// vGetDiagnosticsXML
	public String vDiagnostics(JSONArray args,CallbackContext callbackContext){
	    Log.d(TAG, "vGetDiagnosticsXML"+args);
		if(prn == null) {
			callbackContext.error(createJSONArray(-80,"Printer Has Not Intialized").toString());
			Log.e(TAG, "Printer Has Not Intialized");
		}
		String dname = "", btmac = "",txn = "", xml ="";
		try{
			if(args.length()== 0||args.get(0).equals(null)||args.get(0).equals("")){
				Log.e(TAG, "param missing");
			    callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}else{
				txn = args.getString(0);
			    //dname = args.getString(1);
				if(args.getString(1).equalsIgnoreCase(null)||args.getString(1).equalsIgnoreCase("")  || args.getString(1).equalsIgnoreCase("null")){
					dname = "";
				} else {
					dname = args.getString(1);
				}
				
				//btmac = args.getString(2); 
				if(args.getString(2).equalsIgnoreCase(null)||args.getString(2).equalsIgnoreCase("")  || args.getString(2).equalsIgnoreCase("null")){
					btmac = "";
				} else {
					btmac = args.getString(2);
				}	
			}
			Log.d(TAG, "txn"+txn+" dname"+dname+" btmac"+btmac);
			if(txn != null && !txn.isEmpty()){
				xml = prn.sPrinterDiagnostics(txn, dname, btmac);
				if(xml == null){
					int err = prn.iGetReturnCode();
					String xml_error = gotError(err);
					Log.e(TAG,"getting err while genrating xml "+err);
					callbackContext.error(createJSONArray(err,xml_error).toString());
				}else{
					connectRDService(xml,callbackContext);
					Log.d(TAG,"xml "+xml);
				}
			}else{
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}
		}catch(Exception e){
			String errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			e.printStackTrace();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
		return xml;
	}
	
	// vGetIdentifyPeripheralsXML
	public String vIdentifyPeripherals(JSONArray args,CallbackContext callbackContext){
		Log.d(TAG, "vIdentifyPeripherals"+args);
		if(prn == null) {
			callbackContext.error(createJSONArray(-80,"Printer Has Not Intialized").toString());
			Log.e(TAG, "Printer Has Not Intialized");
		}
		String dname = "", btmac = "",txn = "", xml ="";
		try{
			if(args.length()== 0||args.get(0).equals(null)||args.get(0).equals("")){
				Log.e(TAG, "param missing");
			    callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}else{
				txn = args.getString(0);
			     //dname = args.getString(1);
				if(args.getString(1).equalsIgnoreCase(null)||args.getString(1).equalsIgnoreCase("")  || args.getString(1).equalsIgnoreCase("null")){
					dname = "";
				} else {
					dname = args.getString(1);
				}
				
				//btmac = args.getString(2); 
				if(args.getString(2).equalsIgnoreCase(null)||args.getString(2).equalsIgnoreCase("")  || args.getString(2).equalsIgnoreCase("null")){
					btmac = "";
				} else {
					btmac = args.getString(2);
				}	
			}
			Log.d(TAG, "txn"+txn+" dname"+dname+" btmac"+btmac);
			if(txn != null && !txn.isEmpty()){
				xml = prn.sIdentifyPeripherals(txn, dname, btmac);
				if(xml == null){
					int err = prn.iGetReturnCode();
					String xml_error = gotError(err);
					Log.e(TAG,"getting err while genrating xml "+err);
					callbackContext.error(createJSONArray(err,xml_error).toString());
				}else{
					connectRDService(xml,callbackContext);
					Log.d(TAG,"xml "+xml);
				}
			}else{
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}
		}catch(Exception e){
			String errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			e.printStackTrace();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
		return xml;
	}
	
	// vGetDisconnectXML
	public String vDisconnect(JSONArray args,CallbackContext callbackContext){
		Log.d(TAG, "vDisconnect"+args);
		if(prn == null) {
			callbackContext.error(createJSONArray(-80,"Printer Has Not Intialized").toString());
			Log.e(TAG, "Printer Has Not Intialized");
		}
		String dname = "", btmac = "",txn = "", xml ="";
		try{
			if(args.length()== 0||args.get(0).equals(null)||args.get(0).equals("")){
				Log.e(TAG, "param missing");
			    callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}else{
				txn = args.getString(0);
			     //dname = args.getString(1);
				if(args.getString(1).equalsIgnoreCase(null)||args.getString(1).equalsIgnoreCase("")  || args.getString(1).equalsIgnoreCase("null")){
					dname = "";
				} else {
					dname = args.getString(1);
				}
				
				//btmac = args.getString(2); 
				if(args.getString(2).equalsIgnoreCase(null)||args.getString(2).equalsIgnoreCase("")  || args.getString(2).equalsIgnoreCase("null")){
					btmac = "";
				} else {
					btmac = args.getString(2);
				}	
			}
			Log.d(TAG, "txn"+txn+" dname"+dname+" btmac"+btmac);
			if(txn != null && !txn.isEmpty()){
				xml = prn.sDisconnect(txn, dname, btmac);
				if(xml == null){
					int err = prn.iGetReturnCode();
					String xml_error = gotError(err);
					Log.e(TAG,"getting err while genrating xml "+err);
					callbackContext.error(createJSONArray(err,xml_error).toString());
				}else{
					connectRDService(xml,callbackContext);
					Log.d(TAG,"xml "+xml);
				}
			}else{
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}
		}catch(Exception e){
			String errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			e.printStackTrace();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
		return xml;
	}
	
	//vGetBatteryStatusXML
	public String vBatteryStatus(JSONArray args,CallbackContext callbackContext){
		Log.d(TAG, "vBatteryStatus"+args);
		if(prn == null) {
			callbackContext.error(createJSONArray(-80,"Printer Has Not Intialized").toString());
			Log.e(TAG, "Printer Has Not Intialized");
		}
		String dname = "", btmac = "",txn = "", xml ="";
		try{
			if(args.length()== 0||args.get(0).equals(null)||args.get(0).equals("")){
				Log.e(TAG, "param missing");
			    callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}else{
				txn = args.getString(0);
			    //dname = args.getString(1);
				if(args.getString(1).equalsIgnoreCase(null)||args.getString(1).equalsIgnoreCase("")  || args.getString(1).equalsIgnoreCase("null")){
					dname = "";
				} else {
					dname = args.getString(1);
				}
				
				//btmac = args.getString(2); 
				if(args.getString(2).equalsIgnoreCase(null)||args.getString(2).equalsIgnoreCase("")  || args.getString(2).equalsIgnoreCase("null")){
					btmac = "";
				} else {
					btmac = args.getString(2);
				}	
			}
			Log.d(TAG, "txn"+txn+" dname"+dname+" btmac"+btmac);
			if(txn != null && !txn.isEmpty()){
				xml = prn.sGetBatteryStatus(txn, dname, btmac);
				if(xml == null){
					int err = prn.iGetReturnCode();
					String xml_error = gotError(err);
					Log.e(TAG,"getting err while genrating xml "+err);
					callbackContext.error(createJSONArray(err,xml_error).toString());
				}else{
					connectRDService(xml,callbackContext);
					Log.d(TAG,"xml "+xml);
				}
			}else{
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}
		}catch(Exception e){
			String errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			e.printStackTrace();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
		return xml;
	}
	
	//vGetSerialNumberXML
	public String vSerialNumber(JSONArray args,CallbackContext callbackContext){
		Log.d(TAG, "vSerialNumber"+args);
		if(prn == null) {
			callbackContext.error(createJSONArray(-80,"Printer Has Not Intialized").toString());
			Log.e(TAG, "Printer Has Not Intialized");
		}
		String dname = "", btmac = "",txn = "", xml ="";
		try{
			if(args.length()== 0||args.get(0).equals(null)||args.get(0).equals("")){
				Log.e(TAG, "param missing");
			    callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}else{
				txn = args.getString(0);
			     //dname = args.getString(1);
				if(args.getString(1).equalsIgnoreCase(null)||args.getString(1).equalsIgnoreCase("")  || args.getString(1).equalsIgnoreCase("null")){
					dname = "";
				} else {
					dname = args.getString(1);
				}
				
				//btmac = args.getString(2); 
				if(args.getString(2).equalsIgnoreCase(null)||args.getString(2).equalsIgnoreCase("")  || args.getString(2).equalsIgnoreCase("null")){
					btmac = "";
				} else {
					btmac = args.getString(2);
				}	
			}
			Log.d(TAG, "txn"+txn+" dname"+dname+" btmac"+btmac);
			if(txn != null && !txn.isEmpty()){
				xml = prn.sGetSerialNumber(txn, dname, btmac);
				if(xml == null){
					int err = prn.iGetReturnCode();
					String xml_error = gotError(err);
					Log.e(TAG,"getting err while genrating xml "+err);
					callbackContext.error(createJSONArray(err,xml_error).toString());
				}else{
					connectRDService(xml,callbackContext);
					Log.d(TAG,"xml "+xml);
				}
			}else{
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}
		}catch(Exception e){
			String errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			e.printStackTrace();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
		return xml;
	}
	
	// vGetFirmwareVersionXML
	public String vFirmwareVersion(JSONArray args,CallbackContext callbackContext){
		Log.d(TAG, "vFirmwareVersion"+args);
		if(prn == null) {
			callbackContext.error(createJSONArray(-80,"Printer Has Not Intialized").toString());
			Log.e(TAG, "Printer Has Not Intialized");
		}
		String dname = "", btmac = "",txn = "", xml ="";
		try{
			if(args.length()== 0||args.get(0).equals(null)||args.get(0).equals("")){
				Log.e(TAG, "param missing");
			    callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}else{
				txn = args.getString(0);
			    //dname = args.getString(1);
				if(args.getString(1).equalsIgnoreCase(null)||args.getString(1).equalsIgnoreCase("")  || args.getString(1).equalsIgnoreCase("null")){
					dname = "";
				} else {
					dname = args.getString(1);
				}
				
				//btmac = args.getString(2); 
				if(args.getString(2).equalsIgnoreCase(null)||args.getString(2).equalsIgnoreCase("")  || args.getString(2).equalsIgnoreCase("null")){
					btmac = "";
				} else {
					btmac = args.getString(2);
				}	
			}
			Log.d(TAG, "txn"+txn+" dname"+dname+" btmac"+btmac);
			if(txn != null && !txn.isEmpty()){
				xml = prn.sGetFirmwareVersion(txn, dname, btmac);
				if(xml == null){
					int err = prn.iGetReturnCode();
					String xml_error = gotError(err);
					Log.e(TAG,"getting err while genrating xml "+err);
					callbackContext.error(createJSONArray(err,xml_error).toString());
				}else{
					connectRDService(xml,callbackContext);
					Log.d(TAG,"xml "+xml);
				}
			}else{
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}
		}catch(Exception e){
			String errMsg = e.getMessage();
			Log.e(TAG, errMsg);
			e.printStackTrace();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
		return xml;
	}
	
	private void connectRDService(String xml,CallbackContext callbackContext)throws JSONException{
		onNewIntentCallbackContext = callbackContext;
        cordova.setActivityResultCallback(this);
		Log.d(TAG,TAG +"inxml is :"+xml);
		try {
			boolean isAppInstalled = appInstalledOrNot("com.idemia.l1rdservice"); 
			if (!isAppInstalled) {
				callbackContext.error(createJSONArray(-85,"Evolute RDService App Has Not Installed").toString());
				Log.e(TAG,"Evolute RDService App Has Not Installed");
			}
			Intent act = new Intent(Printer.URI);
			act.setPackage("com.idemia.l1rdservice");
			act.putExtra(Printer.DataTAG,xml);
			Log.d(TAG,TAG +"Intent has sent to rdservice");
			this.cordova.getActivity().startActivityForResult(act,1);
		} catch (Exception e) {
			Log.e(TAG,"Error while connecting to RDService");
			e.printStackTrace();
			String errMsg = e.getMessage();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
	}
	
	
	//StartPrint
    public void vStartPrint(JSONArray args,CallbackContext callbackContext)throws JSONException {
		Log.d(TAG,"vStartPrint");
		onNewIntentCallbackContext = callbackContext;
        cordova.setActivityResultCallback(this);
		try{
			if(args.length()== 0||args.get(0).equals(null)||args.get(0).equals("")){
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}else{
				String inXML =args.getString(0);
				Log.d(TAG,TAG +"inxml is :"+inXML);
				try {
					boolean isAppInstalled = appInstalledOrNot("com.idemia.l1rdservice"); 
					if (!isAppInstalled) {
						callbackContext.error(createJSONArray(-85,"Evolute RDService App Has Not Installed").toString());
						Log.e(TAG,"Evolute RDService App Has Not Installed");
					}
					Intent act = new Intent(Printer.URI);
					act.setPackage("com.idemia.l1rdservice");
					act.putExtra(Printer.DataTAG,inXML);
					Log.d(TAG,TAG +"Intent has sent to rdservice");
					this.cordova.getActivity().startActivityForResult(act,1);
				} catch (Exception e) {
					Log.e(TAG,"Error while connecting to RDService");
					e.printStackTrace();
					String errMsg = e.getMessage();
					callbackContext.error(createJSONArray(-84,errMsg).toString());
				}	
			}
		}catch (Exception e) {
			Log.e(TAG,"Error while connecting to RDService");
			e.printStackTrace();
			String errMsg = e.getMessage();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
	}
	
	//Capture
    public void vCapture(JSONArray args,CallbackContext callbackContext)throws JSONException {
		Log.d(TAG, "vCapture"+args);
		onNewIntentCallbackContext = callbackContext;
        cordova.setActivityResultCallback(this);
		try{
			if(args.length()== 0||args.get(0).equals(null)||args.get(0).equals("")){
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}else{
				String pid_option =args.getString(0);
				Log.d(TAG,TAG +"inxml is :"+pid_option);
				try {
					boolean isAppInstalled = appInstalledOrNot("com.idemia.l1rdservice"); 
					if (!isAppInstalled) {
						callbackContext.error(createJSONArray(-85,"Evolute RDService App Has Not Installed").toString());
					}
					Intent act = new Intent("in.gov.uidai.rdservice.fp.CAPTURE");
					act.setPackage("com.idemia.l1rdservice");
					act.putExtra("PID_OPTIONS",pid_option);
					Log.d(TAG,TAG +"Intent has sent to rdservice");
					this.cordova.getActivity().startActivityForResult(act,2);
				} catch (Exception e) {
					Log.e(TAG,"Error while connecting to RDService");
					e.printStackTrace();
					String errMsg = e.getMessage();
					callbackContext.error(createJSONArray(-84,errMsg).toString());
				}
			}
		}catch (Exception e) {
			Log.e(TAG,"Error while connecting to RDService");
			e.printStackTrace();
			String errMsg = e.getMessage();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
	}
    
	public void vGetPidOptionXML(JSONArray args,CallbackContext callbackContext)throws JSONException {
		Log.d(TAG, "vCapture"+args);
		onNewIntentCallbackContext = callbackContext;
        cordova.setActivityResultCallback(this);
		try{
		String wadh=" wadh = ",otp=" otp = ",env = "env = ", btconval="N", btname="",dmac="",demotag = "", pid_option="" ,pidver ="";
			int timeout = 0,format=0,ftype=0,fcount=0;
			//float pidver =2.0f;
			if(args.length()== 0||args.get(0).equals(null)||args.get(0).equals("")||args.get(1).equals(null)||args.get(1).equals("")||args.get(2).equals(null)||args.get(2).equals("")||args.get(3).equals(null)||args.get(3).equals("")||args.get(4).equals(null)||args.get(4).equals("")){
				callbackContext.error(createJSONArray(-81,"Param Missing").toString());
			}else{
				timeout = args.getInt(0); 
				//pidver = Float.parseFloat(args.getString(1)); 
				pidver = args.getString(1);
				format = args.getInt(2); 
				ftype = args.getInt(3); 
				fcount = args.getInt(4); 
				//env = args.getString(5);
				if(args.getString(5).equalsIgnoreCase(null)||args.getString(5).equalsIgnoreCase("")  || args.getString(5).equalsIgnoreCase("null")){
					env = " env = \"P\" ";
					Log.d(TAG,"env2 "+env);
				} else {
					String tmp = args.getString(5);
					env = " env = \""+tmp+"\" ";
				}
				
				//demotag = args.getString(6);
				if(args.getString(6).equalsIgnoreCase(null)||args.getString(6).equalsIgnoreCase("")  || args.getString(6).equalsIgnoreCase("null")){
					demotag = "<Demo></Demo>";
				} else {
					demotag = args.getString(6);
				}
				
				//btconval = args.getString(7);
				if(args.getString(7).equalsIgnoreCase(null)||args.getString(7).equalsIgnoreCase("")  || args.getString(7).equalsIgnoreCase("null")){
					btconval = "N";
				} else {
					btconval = args.getString(7);
				}
				
				//btname = args.getString(8);
				if(args.getString(8).equalsIgnoreCase(null)||args.getString(8).equalsIgnoreCase("")  || args.getString(8).equalsIgnoreCase("null")){
					btname = "";
				} else {
					btname = args.getString(8);
				}
				
				//dmac = args.getString(9);
				if(args.getString(9).equalsIgnoreCase(null)||args.getString(9).equalsIgnoreCase("")  || args.getString(9).equalsIgnoreCase("null")){
					dmac = "";
				} else {
					dmac = args.getString(9);
				}
				
				//wadh = args.getString(10);
				if(args.getString(10).equalsIgnoreCase(null)||args.getString(10).equalsIgnoreCase("")  || args.getString(10).equalsIgnoreCase("null")){
					wadh = "";//" wadh = \"P\" ";
					Log.d(TAG,"env2 "+wadh);
				} else {
					String tmp = args.getString(10);
					wadh = " wadh = \""+tmp+"\" ";
				}
				
			    //otp = args.getString(11);
			    if(args.getString(11).equalsIgnoreCase(null)||args.getString(11).equalsIgnoreCase("")  || args.getString(11).equalsIgnoreCase("null")){
			    	otp = "";//" otp = \"P\" ";
					Log.d(TAG,"otp "+otp);
				} else {
					String tmp = args.getString(11);
					otp = " otp = \""+tmp+"\" ";
				}
				Log.d(TAG,TAG +"timeout "+timeout+" pidver"+pidver+" format"+format+" ftype"+ftype+" fcount"+fcount+" env "+env+" btconval "+btconval+" btname "+btname+" dmac "+dmac+" wadh "+wadh+" otp "+otp);
			}
		    try {
					pid_option = String.format("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
                          + "<PidOptions ver =\"1.0\">"
						  + "<Opts "
						  + env	//  + "env=\""+ env + "\" "
                          + "fCount=\""+ fcount + "\" "
                          + "fType=\""+ ftype + "\" "
						  + "iCount=\""+ "+" + "\" "
			              + "iType=\""+ "+" + "\" "
						//   + "pCount=\""+ "1" + "\" "
						//   + "pType=\""+ "0" + "\" "
						  + "format=\""+ format + "\" "
			              + "pidVer=\""+ pidver + "\" "
			              + "timeout=\""+ timeout + "\" "
                          + otp // + "otp=\""+ otp + "\" "
                          + wadh //+ "wadh=\""+ wadh + "\" "
                          + "posh=\""+ "UNKNOWN"+ "\"/>"
						//   + demotag
                          + "<CustOpts>"
						//   + "<Param " + "name=\"" + btname + "\" " + "value=\"" + dmac + "\"/>"
						//   + "<Param " + "name=\"" + "Connection" + "\" " + "value=\"" + btconval + "\"/>"
						  + "<Param " + "name=\"" + "bt_capture" + "\" " + "value=\"" + "Y" + "\"/>"
						  + "<Param " + "name=\"" + "mode_before_capture" + "\" " + "value=\"" + "2" + "\"/>"
						  + "<Param " + "name=\"" + "mode_after_capture" + "\" " + "value=\""+ "1" + "\"/>"
                          + "</CustOpts>" 
                          + "</PidOptions>"); 
					
				    Log.d(TAG,TAG +"PID_OPTIONS"+pid_option);
					if(pid_option == null){
						String err = "Getting error while generating pid_option";
						Log.e(TAG,"getting err while genrating xml for capture ");
						callbackContext.error(createJSONArray(-84,err).toString());
					}else{
						callbackContext.success(createJSONArray(0,pid_option));	
						Log.d(TAG,"pid_option "+pid_option);
					}	 
				} catch (Exception e) {
					Log.e(TAG,"Getting error while generating pid_option");
					e.printStackTrace();
					String errMsg = e.getMessage();
					callbackContext.error(createJSONArray(-84,errMsg).toString());
				}
		}catch (Exception e) {
			Log.e(TAG,"Error while getting data");
			e.printStackTrace();
			String errMsg = e.getMessage();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
	}

	//Device_Info
	public void vDevice_Info(CallbackContext callbackContext){
		Log.d(TAG, "vDevice_Info");
		onNewIntentCallbackContext = callbackContext;
        cordova.setActivityResultCallback(this);
		try {
			boolean isAppInstalled = appInstalledOrNot("com.idemia.l1rdservice"); 
			if (!isAppInstalled) {
				callbackContext.error(createJSONArray(-85,"Evolute RDService App Has Not Installed").toString());
			}
			Intent act = new Intent("in.gov.uidai.rdservice.fp.INFO");
			act.setPackage("com.idemia.l1rdservice");
		    Log.d(TAG,TAG +"Intent has sent to rdservice");
			this.cordova.getActivity().startActivityForResult(act,3);
		} catch (Exception e) {
			Log.e(TAG,"Error while connecting to RDService");
			e.printStackTrace();
			String errMsg = e.getMessage();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
	}

	//RDService_Info
	public void vRDService_Info(CallbackContext callbackContext){
		Log.d(TAG,"RDService_Info");
		onNewIntentCallbackContext = callbackContext;
        cordova.setActivityResultCallback(this);
		try {
			boolean isAppInstalled = appInstalledOrNot("com.idemia.l1rdservice"); 
			if (!isAppInstalled) {
				callbackContext.error(createJSONArray(-85,"Evolute RDService App Has Not Installed").toString());
			}
			Intent act = new Intent("in.gov.uidai.rdservice.fp.INFO");
			act.setPackage("com.idemia.l1rdservice");
			Log.d(TAG,TAG +"Intent has sent to rdservice");
			this.cordova.getActivity().startActivityForResult(act,4);
		} catch (Exception e) {
			Log.e(TAG,"Error while connecting to RDService");
			e.printStackTrace();
			String errMsg = e.getMessage();
			callbackContext.error(createJSONArray(-84,errMsg).toString());
		}
	}

	private boolean appInstalledOrNot(String uri) {
		try {
			PackageManager pm = this.cordova.getActivity().getPackageManager();
			pm.getPackageInfo(uri, PackageManager.GET_ACTIVITIES);
			PackageInfo pkgInfo = pm.getPackageInfo(uri, PackageManager.GET_ACTIVITIES);

			return true;
		} catch (PackageManager.NameNotFoundException e) {
			e.printStackTrace();
		}
		return false;
	}
	
    private JSONArray createJSONArray(int code,String info){
	  JSONArray resultInArray = new JSONArray();
	  try {
		  JSONObject jObj = new JSONObject();
          jObj.put("res_info",info);
          jObj.put("res_code",code);
		  resultInArray.put(jObj);
	    } catch (JSONException e) {
		  e.printStackTrace();
	    }

	  return resultInArray;
    }

	private String gotError(int err) {
        if(err==Printer.PR_FAIL)
            return "FAIL";
		if(err==Printer.PR_SUCCESS)
            return "Success";
        else if(err ==Printer.PR_PARAM_ERROR)
            return "Passed invalid parameter";
        else if(err ==Printer.PR_NO_DATA)
            return "NO DATA";
        else if(err == Printer.PR_BMP_FILE_NOT_FOUND)
            return "BMP File Not Found";
        else if(err == Printer.PR_FONT_ORIENTATION_MISMATCH)
            return  "Font Orientation Mismatch";
        else if(err == Printer.PR_LIMIT_EXCEEDED)
            return  "Data Limit Exceeded";
        else if(err == Printer.PR_CHARACTER_NOT_SUPPORTED);
        return  "Character Not Supported";
    }
	
	public void onActivityResult(int requestCode, int resultCode, Intent data)  { 
	super.onActivityResult(requestCode, resultCode, data); 
	Log.d(TAG, "inside onActivityResult"+"requestCode is "+requestCode+" result code is "+resultCode+" data is "+data);
	switch(requestCode) {
		case (1) :
			if (resultCode == Activity.RESULT_OK){
				try {
					String postAuth= data.getStringExtra(Printer.ResponseDataTAG);
					Log.d(TAG, "postAuth data:"+postAuth);
					if(postAuth == null){
						PluginResult result = new PluginResult(PluginResult.Status.OK,createJSONArray(-84,"postAuth is null"));
						result.setKeepCallback(true);
						onNewIntentCallbackContext.sendPluginResult(result);
					}else{
						getResult(postAuth);	
					}		
				}catch (Exception e) {
					e.printStackTrace();
					Log.e(TAG, "error while getting postAuth result in onActivityResult:"+e);	
				}
			}

		break;
		case (2) :
			if (resultCode == Activity.RESULT_OK) {
				try {
					String piddata = data.getStringExtra("PID_DATA");
					Log.d(TAG, "capture data:"+piddata);
					if(piddata == null){
						PluginResult result = new PluginResult(PluginResult.Status.OK,createJSONArray(-84,"piddata is null"));
						result.setKeepCallback(true);
						onNewIntentCallbackContext.sendPluginResult(result);
					}else{
						PluginResult result = new PluginResult(PluginResult.Status.OK,createJSONArray(0,piddata));
					    result.setKeepCallback(true);
					    onNewIntentCallbackContext.sendPluginResult(result);
					}	
				}catch (Exception e) {
					e.printStackTrace();
					Log.e(TAG, "error while getting Pid_Option result in onActivityResult:"+e);
				}
			}
		break;
		case (3) : 
			if (resultCode == Activity.RESULT_OK){
				try {
					String DeviceInfodata = data.getStringExtra("DEVICE_INFO");
					Log.d(TAG, "Device Info data:"+DeviceInfodata);		
                   if(DeviceInfodata==null){
						PluginResult result = new PluginResult(PluginResult.Status.OK,createJSONArray(-84,"DeviceInfodata is null"));
						result.setKeepCallback(true);
						onNewIntentCallbackContext.sendPluginResult(result);
					}else{
						PluginResult result = new PluginResult(PluginResult.Status.OK,createJSONArray(0,DeviceInfodata));
					    result.setKeepCallback(true);
					    onNewIntentCallbackContext.sendPluginResult(result);
					}						
				}catch (Exception e) {
					e.printStackTrace();
					Log.e(TAG, "error while getting DeviceInfo result in onActivityResult:"+e);
				}
			}
		break;
		case (4) : 
			if (resultCode == Activity.RESULT_OK){
				try {
					String rd_service_infodata = data.getStringExtra("RD_SERVICE_INFO");
					Log.d(TAG, "RD service Info data:"+rd_service_infodata);
					if(rd_service_infodata==null){
						PluginResult result = new PluginResult(PluginResult.Status.OK,createJSONArray(-84,"rd_service_infodata is null"));
						result.setKeepCallback(true);
						onNewIntentCallbackContext.sendPluginResult(result);
					}else{
						PluginResult result = new PluginResult(PluginResult.Status.OK,createJSONArray(0,rd_service_infodata));
					    result.setKeepCallback(true);
					    onNewIntentCallbackContext.sendPluginResult(result);
					}	
				}catch (Exception e) {
					e.printStackTrace();
					Log.e(TAG, "error while getting rd_service_info result in onActivityResult:"+e);
				}
			}
		break;
		}	
	}
	
    private void getResult(String PostAuth){
		int resultintValue=0;
        String resultData="";
		String Tracknameone="",track_one_data="",Tracknametwo="",track_two_data="",Tracknamethree="",track_three_data="";
        try{
            Log.d(TAG, " Test XML parsing start and fetching BTmac ");
            InputStream is = new ByteArrayInputStream(PostAuth.getBytes());
            DocumentBuilderFactory domFactory = DocumentBuilderFactory.newInstance();
            domFactory.setIgnoringComments(true);
            DocumentBuilder builder = domFactory.newDocumentBuilder();
            Document doc = builder.parse(is);
            NodeList nodeList = doc.getElementsByTagName("*");
            ArrayList<String> elmntarrayList = new ArrayList<String>();
            for (int i = 0; i < nodeList.getLength(); i++) {
                Element element = (Element) nodeList.item(i);
                String postAuth = element.getNodeName();
                Log.d(TAG, "PostAuthElement = " + postAuth);
                elmntarrayList.add(postAuth);
                Log.d(TAG, "elmntarrayList = " + elmntarrayList);
                Log.d(TAG, "elmntarrayList = " + elmntarrayList.size());
            }
            ArrayList<String> custarrayList = new ArrayList<String>();
            NodeList custElmntLst = doc.getElementsByTagName("CustOpts");
            Element baseElmntcust = (Element) custElmntLst.item(0);
            if (baseElmntcust == null) {
                Log.e(TAG, "baseElmntcust = " + baseElmntcust);
            } else {
                NamedNodeMap custElmnattrattr = baseElmntcust.getAttributes();
                for (int i = 0; i < custElmnattrattr.getLength(); ++i) {
                    Node attr = custElmnattrattr.item(i);
                    String demoattributes = attr.getNodeName();
                    custarrayList.add(demoattributes);
                    Log.d(TAG, "custarrayList = " + custarrayList);
                }
                Log.d(TAG, "custarrayList = " + custarrayList.size());
            }

            ArrayList<String> paramarrayList = new ArrayList<String>();
            NodeList paramElmntLst = doc.getElementsByTagName("Param");
            Element baseElmntparam = (Element) paramElmntLst.item(0);
            if (baseElmntparam == null) {
                Log.e(TAG, "baseElmntparam = " + baseElmntparam);
            } else {
                NamedNodeMap paramElmnattrattr = baseElmntparam.getAttributes();
                for (int i = 0; i < paramElmnattrattr.getLength(); ++i) {
                    Node attr = paramElmnattrattr.item(i);
                    String paramattributes = attr.getNodeName();
                    paramarrayList.add(paramattributes);
                }
            }
            if (elmntarrayList.contains("PostAuth")) {
                Log.d(TAG, "PostAuth present");
            } else {
                Log.e(TAG, "PostAuth notpresent");
            }
            if (elmntarrayList.contains("CustOpts")) {
                Log.d(TAG, "CustOpts present");
                if (paramarrayList.contains("name")) {
                    String resultValueName = doc.getElementsByTagName("Param").item(0).getAttributes().getNamedItem("name").getTextContent();
                    Log.d(TAG, "resultValueName = " + resultValueName);

                }
                if (paramarrayList.contains("value")) {
                    String resultIntValue = doc.getElementsByTagName("Param").item(0).getAttributes().getNamedItem("value").
					getTextContent();
					resultintValue = Integer.parseInt(resultIntValue);
                    Log.d(TAG, "resultIntValue = " + resultIntValue);
                }
                if (paramarrayList.contains("name")) {
                    String resultDataName = doc.getElementsByTagName("Param").item(1).getAttributes().getNamedItem("name").getTextContent();
                    Log.d(TAG, " resultDataName = " + resultDataName);

                }
                if (paramarrayList.contains("value")) {
                    resultData = doc.getElementsByTagName("Param").item(1).getAttributes().getNamedItem("value").getTextContent();
                    Log.d(TAG, "resultData = " + resultData);
					
                }
				if(elmntarrayList.size()>4){
					try {
                        if (paramarrayList.contains("name")) {
                            Tracknameone = doc.getElementsByTagName("Param").item(2).getAttributes().getNamedItem("name").getTextContent();
                            Log.d(TAG, " Trackname = " +Tracknameone);
                        }
						if (paramarrayList.contains("value")) {
							track_one_data = doc.getElementsByTagName("Param").item(2).getAttributes().getNamedItem("value").getTextContent();
							Log.d(TAG, "Trackdata = " + track_one_data);
						}
						if (paramarrayList.contains("name")) {
							Tracknametwo = doc.getElementsByTagName("Param").item(3).getAttributes().getNamedItem("name").getTextContent();
							Log.d(TAG, " Trackname = " + Tracknametwo);
						}
						if (paramarrayList.contains("value")) {
							track_two_data= doc.getElementsByTagName("Param").item(3).getAttributes().getNamedItem("value").getTextContent();
							Log.d(TAG, "Trackdata = " + track_two_data);	
						}
						if (paramarrayList.contains("name")) {
							Tracknamethree = doc.getElementsByTagName("Param").item(4).getAttributes().getNamedItem("name").getTextContent();
							Log.d(TAG, " Trackname  = " + Tracknamethree);
						}
						if (paramarrayList.contains("value")) {
							track_three_data= doc.getElementsByTagName("Param").item(4).getAttributes().getNamedItem("value").getTextContent();
							Log.d(TAG, "Trackdata " + track_three_data);
						}
						JSONArray resultInArray = new JSONArray();
					    JSONObject jObj = new JSONObject();
					    jObj.put("res_info",resultData);
						jObj.put("res_code",resultintValue);
						jObj.put(Tracknamethree,track_three_data);	
						jObj.put(Tracknametwo,track_two_data);	
						jObj.put(Tracknameone,track_one_data);
		                resultInArray.put(jObj);
					    PluginResult result = new PluginResult(PluginResult.Status.OK,resultInArray);
				        result.setKeepCallback(true);
				        onNewIntentCallbackContext.sendPluginResult(result);
					} catch (JSONException e) {
		                e.printStackTrace();
			            Log.e(TAG,"Error while fetching Magnetic card data from postauth result");
	                }
                }else{
				PluginResult result = new PluginResult(PluginResult.Status.OK,createJSONArray(resultintValue,resultData));
				result.setKeepCallback(true);
				onNewIntentCallbackContext.sendPluginResult(result);
				}
            } else {
                Log.e(TAG, "CustOpts notpresent");
            }
        }catch (Exception e) {
            e.printStackTrace();
			Log.e(TAG,"Error while fetching data from postauth result");
        }

    }
}
