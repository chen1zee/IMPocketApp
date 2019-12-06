package com.myredpocketapp.utils;

import android.util.Log;

public class LogDebug {
    public static final String DEBUG_TAG = "DEBUG_TAG";
    public static void log(Object msg) {
        Log.d(DEBUG_TAG, msg.toString());
    }
}
