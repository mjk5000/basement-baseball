# ⚾️ Basement Baseball

A fun, kid-friendly baseball simulation web app optimized for iPad, Kindle, and all devices - perfect for basement whiffle ball!

> **🔥 Kindle Fire Users**: See [KINDLE_SETUP.txt](KINDLE_SETUP.txt) for quick setup instructions!

## Features

- **MLB-Style Scoreboard**: Traditional 9-inning scoreboard with away/home teams
- **TV Broadcast Display**: Professional chiron-style outs, balls, strikes, and runner indicators
- **Inning Tracking**: Top and bottom halves with proper scoring by team
- **Interactive Gameplay**: Pitch-by-pitch tracking based on contact type and quality
- **Advanced Manual Controls**: Direct buttons for singles, doubles, triples, home runs, walks, balls, strikes
- **Realistic Outcomes**: Smart probability-based results for grounders, line drives, and pop-ups
- **Tablet Optimized**: Full-screen mode on iPad and Kindle for immersive gameplay
- **Touch-Friendly**: Large buttons and responsive touch controls
- **Responsive Design**: Works on iPad, tablet, phone, or desktop
- **No Installation**: Runs directly in any web browser

## 📱 Kindle Fire Setup (SharePoint Method)

### Step 1: Upload Files to SharePoint (From PC)

1. **Zip the 4 game files** on your PC:
   - `index.html`
   - `game.js`
   - `styles.css`
   - `manifest.json`
2. **Upload the zip file** to your SharePoint site
3. **Share the link** or make accessible to yourself

### Step 2: Download to Kindle Fire

1. **On Kindle**, open Silk browser or Chrome
2. **Navigate to SharePoint** and sign in
3. **Download the zip file** - it goes to `/storage/emulated/0/Download/`
4. **Extract the zip file** using:
   - "ES File Explorer" (from Amazon Appstore), or
   - Built-in file manager
5. **All 4 files should be in** `/storage/emulated/0/Download/`

### Step 3: Open in Chrome and Bookmark

1. **Install Chrome** from Amazon Appstore (if not installed)
2. **Open Chrome** on Kindle
3. **Type in address bar**: `file://storage/emulated/0/Download/index.html`
4. **Tap the star icon** to bookmark
5. **Name it** "Baseball Game"
6. **Done!** Open Chrome → Bookmarks → Baseball Game anytime

### Quick Access Tip
- Keep Chrome open with the bookmark visible
- Or try: Chrome menu (⋮) → "Add to Home screen" (if available)

---

## 📱 iPhone/iOS Setup (Fullscreen Mode)

### For iPhone (iOS/iPadOS) - Best Experience:

**Note:** The browser fullscreen button does NOT work on iPhone due to iOS restrictions. Instead, use "Add to Home Screen" for a true fullscreen, app-like experience!

1. **Open the game in Safari** (recommended) or Chrome
2. **Tap the Share button** (⬆️ icon at bottom of screen in Safari, or at top in Chrome)
3. **Scroll down and select "Add to Home Screen"**
4. **Name it** "Baseball" (or whatever you like)
5. **Tap "Add"**
6. **Launch from your home screen** - it now runs fullscreen without browser UI!

### Why Add to Home Screen?
- ✅ **No address bar** taking up screen space
- ✅ **No browser controls** cluttering the view
- ✅ **Launches like a native app** instantly
- ✅ **Works offline** once loaded
- ✅ **Custom icon** on your home screen

### 🔄 Will It Auto-Update?

**YES** - If you add from a **web URL** (recommended for auto-updates):
- Example: `https://yourusername.github.io/basement-baseball/`
- Opens from URL → Always fetches latest version when launched
- Any code pushed to GitHub Pages appears automatically

**NO** - If you add from **local files**:
- Example: `file:///storage/emulated/0/Download/index.html`
- Opens from device storage → Shows saved version only
- Must manually replace files to update

**Recommendation:** Host on GitHub Pages (free!) for automatic updates. See "Hosting for Auto-Updates" section below.

---

## 📱 iPad Setup (Email Method)

### For iPad (iOS/iPadOS):

1. **Email yourself** the 4 files as attachments
2. **On iPad**, open the email in Mail app
3. **Tap `index.html` attachment** - it opens in Safari
4. **Tap Share button** (square with arrow) → "Add to Home Screen"
5. **Done!** Launches like a native app from home screen

---

## 📱 Android Tablet Setup

1. **Copy files** to tablet storage (Downloads folder)
2. **Open Chrome** browser
3. **Navigate to**: `file:///storage/emulated/0/Download/index.html`
4. **Chrome menu** (⋮) → "Add to Home screen"
5. **Done!** App icon on home screen

## How It Works

### Pitch-by-Pitch Mode (Default)

Perfect for basement whiffle ball machines! After each pitch:

1. **Report Contact Type**:
   - Grounder ⚾
   - Line Drive ➡️
   - Pop Up ⬆️

2. **Then Select Quality**:
   - Hard Hit 💪
   - Soft Hit 🤚

**OR Report No Contact**:
- Swing & Miss (adds strike)
- No Swing (random ball or strike)
- Foul Ball (adds strike, max 2)

The app calculates realistic outcomes based on MLB probabilities!

### Advanced Manual Controls

Click "Show Advanced Controls" for direct input:
- Single / Double / Triple / Home Run
- Ball / Strike / Walk / Out

Perfect for quick scoring or manual game tracking.

## Game Rules

- ⚾ **Innings**: 9 innings standard (extendable)
- 🔄 **Half Innings**: Away bats top, Home bats bottom
- ❌ **Outs**: 3 outs per half inning
- 📊 **Scoring**: Runs added to correct team based on inning half
- 🏃 **Runners**: Visual indicators on bases and TV-style diamond display
- 💯 **Count**: Balls (4 = walk), Strikes (3 = out)

## Requirements

- Any modern web browser (Safari, Chrome, Firefox, Edge)
- No installation or build tools needed!

## How to Run

### Option 1: Open Directly (Simplest)

1. **Double-click** `index.html` in File Explorer
2. **OR** Right-click `index.html` → Open with → Your browser

### Option 2: Using Live Server (Recommended for Development)

1. **Open this folder in VS Code**
2. **Install Live Server extension** (if not installed):
   - Click Extensions icon in VS Code
   - Search for "Live Server"
   - Install it
3. **Right-click** on `index.html` → "Open with Live Server"
4. **App opens** automatically in your browser

### Option 3: Simple HTTP Server

Using PowerShell in this directory:
```powershell
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser

## Installing on iPad

### As a Web App (No App Store Needed!)

1. **Open** `index.html` in Safari on the iPad (upload to cloud storage or host on local network)
2. **Tap the Share button** (square with arrow)
3. **Scroll down** and tap "Add to Home Screen"
4. **Tap "Add"**
5. **Launch** from home screen like a real app!

### Hosting Options for iPad Access

**Easy sharing methods:**
- **OneDrive/Google Drive**: Upload the folder, open in Safari on iPad
- **Local Network**: Run the HTTP server above, access from iPad using your computer's IP
- **GitHub Pages**: Push to GitHub, enable Pages for free hosting (best for auto-updates!)

---

## 🌐 Hosting for Auto-Updates (Recommended)

To ensure your home screen app always shows the **latest version**, host it on the web instead of using local files.

### Option 1: GitHub Pages (Free & Easy)

**One-time setup:**

1. **Push this code to GitHub** (if not already done):
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/basement-baseball.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repo on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Click **Save**
   - Wait 1-2 minutes for deployment

3. **Your app is now live at**:
   `https://yourusername.github.io/basement-baseball/`

4. **Add to home screen from this URL** - it will auto-update!

**To update the app later:**
```powershell
git add .
git commit -m "Update game"
git push
```
Within 1-2 minutes, anyone who opens the app gets the latest version automatically!

### Option 2: Other Free Hosting

- **Netlify**: Drag & drop folder, instant deployment
- **Vercel**: Connect GitHub repo, auto-deploys on push
- **Cloudflare Pages**: Similar to GitHub Pages

### How Updates Work

- **Hosted URL** (https://...): Browser checks server for latest files each launch
- **Local files** (file:///...): Browser reads saved files, never updates
- **Best practice**: Always use a web URL for production use

---

## 🔧 Troubleshooting

### Home Screen App Shows Old Version

**Problem:** Browser shows v1.12.2 but home screen app shows v1.11.4

**Cause:** iOS/Android caches the home screen app files

**Solution:**
1. **Delete the home screen icon** (long-press → Remove/Delete)
2. **Open in Safari/Chrome browser** and verify you see the new version
3. **Clear browser cache** (optional but recommended):
   - Safari: Settings → Safari → Clear History and Website Data
   - Chrome: Settings → Privacy → Clear Browsing Data
4. **Re-add to home screen** (Share → Add to Home Screen)
5. **Launch from home screen** - should now show current version

**Prevention:** Always access via a **web URL** (not local files) so the app checks for updates each launch

### Game Not Loading or Broken

- Check browser console for errors (F12 → Console tab)
- Verify all 4 files are in the same folder
- Try a different browser
- Ensure sounds folder is present (optional for sound effects)

### Fullscreen Not Working

- **iPhone/iOS:** Browser fullscreen is not supported - use "Add to Home Screen" instead (see iPhone Setup section)
- **Android/Desktop:** Click the fullscreen button (⛶) in the header

---

## 🎨 Customizing the App Icon

The app currently uses a baseball icon (⚾) when added to home screen. To change it:

### Option 1: Use Your Own Image Files

1. **Create icon images**:
   - `icon-192.png` (192x192 pixels)
   - `icon-512.png` (512x512 pixels)
   - Use any image editor (Paint, Photoshop, online tools like Canva)

2. **Place them in the same folder** as `index.html`

3. **Update `manifest.json`**:
   ```json
   "icons": [
     {
       "src": "icon-192.png",
       "sizes": "192x192",
       "type": "image/png"
     },
     {
       "src": "icon-512.png",
       "sizes": "512x512",
       "type": "image/png"
     }
   ]
   ```

### Option 2: Use an Online Icon Generator

1. **Visit a free icon generator** (search "PWA icon generator")
2. **Upload your image** or create one
3. **Download the generated icons**
4. **Replace the icon files** and update `manifest.json`

### Current Icon
The app uses an inline SVG baseball icon. It shows up as a white baseball with red stitching when you add to home screen.

**Tip:** For best results, use:
- Square images (1:1 aspect ratio)
- Simple, high-contrast designs
- PNG format with transparency
- Recommended sizes: 192x192, 512x512

---

## How to Play

### Basement Whiffle Ball Mode

1. **Set up your whiffle ball machine** in the basement
2. **Pitcher throws** from the machine
3. **Kid hits the ball** (or misses/fouls)
4. **Report the result**:
   - Did they make contact? → Select grounder/line drive/pop up, then hard/soft
   - Miss/foul/no swing? → Select the appropriate button
5. **App calculates outcome** - single, double, out, etc.
6. **Watch runners advance** on the bases
7. **3 outs = end of half inning** - runs are tallied
8. **Continue through 9 innings**!

### Manual Scoring Mode

- Click "Show Advanced Controls"
- Directly enter any outcome (single, double, walk, strike, etc.)
- Perfect for manual scorekeeping or quick games

## Game Stats Displayed

- **MLB Scoreboard**: Inning-by-inning runs (1-9)
- **Total Runs**: Home and Away
- **Current Inning**: With top ▲ / bottom ▼ indicator
- **Count**: Balls, Strikes, Outs
- **Runners**: Visual diamond showing who's on base

## Files

- `index.html` - Main game page
- `styles.css` - Styling and animations
- `game.js` - Game logic and interactivity

## Customization Ideas

- Edit outcome probabilities in `game.js` `processHit()` function
- Adjust colors and styling in `styles.css`
- Add team names and logos
- Track player statistics
- Add pitch speed tracking
- Include video replay integration
- Export game stats to CSV

## Technical Details

### Outcome Probabilities

Based on contact type and quality:

**Grounders:**
- Hard: 70% single, 30% out
- Soft: 20% single, 80% out

**Line Drives:**
- Hard: 40% single, 30% double, 10% triple, 5% HR, 15% caught
- Soft: 50% single, 20% double, 30% caught

**Pop Ups:**
- Hard: 60% caught, 30% single, 10% double
- Soft: 95% caught, 5% single (blooper)

## Browser Compatibility

Works on all modern browsers:
- ✅ Safari (iOS/macOS)
- ✅ Chrome
- ✅ Firefox
- ✅ Edge

## License

Free to use and modify for personal use.
