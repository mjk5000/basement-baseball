# How to Update the PWA on Your Phone

When you have Basement Baseball installed on your home screen (as a PWA), here's how updates work:

## Automatic Updates (v1.18.40+)
Starting with version 1.18.40, the app now has a **Service Worker** that automatically checks for updates:

1. **Open the app** from your home screen
2. The app will check for new versions automatically
3. If a new version is found, **the app will reload automatically** after 1 second
4. You'll see the new version number at the bottom of the screen

## If Updates Don't Apply
If you're still not seeing the latest version after opening the app:

### Option 1: Clear App Data (Recommended)
**iOS (iPhone/iPad):**
1. Long-press the app icon on your home screen
2. Tap "Remove App"
3. Choose "Delete App"
4. Visit https://mjk5000.github.io/basement-baseball/ in Safari
5. Tap the Share button
6. Tap "Add to Home Screen"

**Android:**
1. Long-press the app icon
2. Tap "App info" or the (i) icon
3. Tap "Storage"
4. Tap "Clear Storage" or "Clear Data"
5. Open the app again - it will download the latest version

### Option 2: Force Refresh in Browser
**If installed from browser:**
1. Open the app
2. Pull down from the top to refresh
3. Or close and reopen the app

## Version History
- **v1.18.40** - Added automatic update system with Service Worker
- Check the version number at the bottom of the game screen
- Latest version is always at: https://mjk5000.github.io/basement-baseball/

## Technical Details
The Service Worker caches files for offline use and checks for updates every time you open the app. When a new version is detected, it will:
1. Download the new files in the background
2. Automatically reload the page to apply updates
3. Clean up old cached files

This ensures you always have the latest features and bug fixes!
