package com.alockwallet;

import com.facebook.react.ReactActivity;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  @Override
  public void onCreate(Bundle savedInstanceState){
    setTheme(R.style.AppTheme);
    super.onCreate(savedInstanceState);
  }
  
  @Override
  protected String getMainComponentName() {
    return "AlockWallet";
  }
}
