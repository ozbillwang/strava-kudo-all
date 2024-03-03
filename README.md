# Strava Kudo All WebExtension

build for google chrome extension and firefax extension

### Build

```bash
make build
```

Archives output dir is `build/artefacts`.

You need follow Google develop document and register your application as Google Extensions, if you want to share it to others. 

I did that, but wait for 6 months, no update. So I have to give it up.

### Install in your google chrome

Since you hold the codes already, you can directly install the extension directly in your google chome

* Go to the Extensions page by entering `chrome://extensions` in a new tab. (By design chrome:// URLs are not linkable.)
* Enable Developer Mode by clicking the toggle switch next to Developer mode.
* Click the `Load unpacked` button and select the extension directory `src` folder in this repostory, you will get the `Strava Kudo All` installed
  
![image](https://github.com/ozbillwang/strava-kudo-all/assets/8954908/2bd26c62-faf1-402d-b1ad-a6d23905cf06)

Now you access Strava website https://strava.com/, login

In the dashbard, you can switch to different groups you followed. 

The top right, an extra button appeared (sometimes, you need refresh several times)

![image](https://github.com/ozbillwang/strava-kudo-all/assets/8954908/f6b06085-e744-45a7-b40e-10d9e26ebcf0)

Click "Kudo All", it will apply the `kudo` to top 20 updates.

### Reference

https://developer.chrome.com/docs/extensions/get-started
