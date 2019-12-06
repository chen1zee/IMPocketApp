package com.myredpocketapp.nativemodules.toastexample;

import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class ToastExample extends ReactContextBaseJavaModule {
    private static ReactApplicationContext mContext;
    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";


    public ToastExample(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    /** 定义 模块 名称 */
    @Nonnull
    @Override
    public String getName() {
        return "ToastExample";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }
    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }
    /** 回调方式 */
    @ReactMethod
    public void showCb(String message, int duration, Callback cb) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
        cb.invoke("toast success", message);
    }
    /** Promise */
    @ReactMethod
    public void showPromise(String message, int duration, Promise promise) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
        WritableMap map = Arguments.createMap();
        map.putDouble("code", 200);
        map.putString("res", "toast success");
        map.putString("msg", message);
        promise.resolve(map);
        delaySendToJS();
    }
    private void delaySendToJS() {
        WritableMap map = Arguments.createMap();
        map.putString("native", "aaa");
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit("Test_native_emit", map);
    }
}
