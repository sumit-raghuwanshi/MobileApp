package com.roofgravymobile;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactlibrary.RNReactNativeDocViewerPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.imagepicker.ImagePickerPackage;
import com.reactnativenavigation.NavigationApplication;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
      new ImagePickerPackage(),
      new ReactNativeDocumentPicker(),
      new RNReactNativeDocViewerPackage()
    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }
}
