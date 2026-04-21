<!-- Project: Basement Baseball / Basement Softball -->
<!-- Interactive baseball/softball simulation web app for kids -->
<!-- Hosted on GitHub Pages: https://mjk5000.github.io/basement-baseball/ -->

## Project Status: Ô£à COMPLETE & DEPLOYED

This is a fully functional web application deployed to GitHub Pages.
Current version: v1.17.9 (April 21, 2026)

### Project Overview
- **Type**: Progressive Web App (PWA)
- **Platform**: Web-based (HTML/CSS/JavaScript)
- **Target Devices**: iPad, Kindle Fire, tablets, phones, desktop
- **Hosting**: GitHub Pages (auto-deploys on push to main)
- **URL**: https://mjk5000.github.io/basement-baseball/

### Technology Stack
- Pure HTML5, CSS3, JavaScript (no frameworks)
- No build process required
- No external dependencies
- Runs directly in browser

### Key Features (v1.17.9)
- Ô£à Custom team names (max 11 characters, must be unique)
- Ô£à Boys names (310+) and Girls names (220+) with per-team toggle
- Ô£à Dynamic branding (Baseball ÔÜ¥ / Softball ­ƒÑÄ)
- Ô£à Unique lineups - no duplicate names across teams
- Ô£à Special players: Kajewski, Hugh, Harry, Jude, Mo, Maureen
- Ô£à Game of Thrones character names
- Ô£à Baseball nicknames (Tex, Ace, Ringo, Duke, etc.)
- Ô£à Team names appear as players in lineups
- Ô£à MLB-style scoreboard with inning-by-inning tracking
- Ô£à Pitch-by-pitch mode for whiffle ball
- Ô£à Advanced manual controls
- Ô£à Pitcher statistics tracking
- Ô£à Pentagon home plate design
- Ô£à Sound effects with mute/unmute
- Ô£à Fullscreen mode
- Ô£à PWA installable to home screen

### File Structure
```
BasementBaseball/
Ôö£ÔöÇÔöÇ index.html       # Main page (~500 lines)
Ôö£ÔöÇÔöÇ game.js          # Game logic (~3500 lines)
Ôö£ÔöÇÔöÇ styles.css       # Styling (~1500 lines)
Ôö£ÔöÇÔöÇ manifest.json    # PWA manifest
Ôö£ÔöÇÔöÇ sounds/          # Sound effects folder
Ôö£ÔöÇÔöÇ README.md        # User documentation
Ôö£ÔöÇÔöÇ Setup.txt        # Quick setup guide
ÔööÔöÇÔöÇ .github/
    ÔööÔöÇÔöÇ copilot-instructions.md  # This file
```

## Development Guidelines

### Making Changes
1. Edit files locally (index.html, game.js, styles.css)
2. Test in browser (open index.html or use Live Server)
3. Update version numbers when releasing:
   - index.html: CSS/JS links, version displays (3 locations)
   - manifest.json: version and start_url (2 locations)
4. Commit and push:
   ```bash
   git add .
   git commit -m "v1.X.X: Description of changes"
   git push origin main
   ```
5. GitHub Pages auto-deploys within 1-2 minutes

### Version Numbering
- Format: v1.X.Y
- Major features: increment X (e.g., v1.17.0 ÔåÆ v1.18.0)
- Minor fixes: increment Y (e.g., v1.17.9 ÔåÆ v1.17.10)
- Always update all 5 version strings in sync

### Code Organization
**game.js** key sections:
- POPULAR_NAMES array: 310+ boys names
- GIRLS_NAMES array: 220+ girls names
- generateBothLineups(): Lineup generation with name rules
- startNewGame(): Game initialization and validation
- processHit(): Outcome probability calculations
- incrementPitchCount(), incrementStrikeCount(): Pitcher stats

**index.html** key sections:
- Settings modal: Team names, girls/boys checkboxes
- Game title: Dynamically changes Baseball ÔÜ¥ Ôåö Softball ­ƒÑÄ
- SVG diamond: Visual base runners display
- Pentagon home plate: Realistic proportions

**styles.css** key sections:
- Panel gradients: Scoreboard, lineups, game status
- Checkbox styling: Girls/boys name toggles
- Responsive breakpoints: Mobile, tablet, desktop
- Button styling: Contact type, quality, manual controls

### Testing Checklist
- [ ] Test boys team + boys team (should show "Baseball")
- [ ] Test girls team + girls team (should show "Softball")
- [ ] Test mixed (boys + girls teams, should show "Baseball")
- [ ] Verify no duplicate names across lineups
- [ ] Check Kajewski appears exactly once
- [ ] Check Hugh, Harry, Jude appear on boys teams only
- [ ] Check Mo/Maureen appears on girls teams (or when team named Mo/Maureen)
- [ ] Test custom team name appears in lineup
- [ ] Test same team name validation (should be blocked)
- [ ] Test max name length (11 characters)
- [ ] Test on mobile device (touch controls)
- [ ] Test fullscreen mode
- [ ] Test sound mute/unmute
- [ ] Test PWA installation

### Deployment Status
Ô£à GitHub repository: https://github.com/mjk5000/basement-baseball
Ô£à GitHub Pages enabled: main branch, root directory
Ô£à Live URL: https://mjk5000.github.io/basement-baseball/
Ô£à PWA manifest configured
Ô£à Offline caching enabled
Ô£à Documentation complete (README.md, Setup.txt)

### Support & Issues
- Report bugs: https://github.com/mjk5000/basement-baseball/issues
- Current version displayed at bottom of game screen
- Version history in README.md

---

## Instructions for AI Assistants

When working on this project:
1. **Maintain existing architecture** - Pure HTML/CSS/JS, no frameworks
2. **Update version numbers** - All 5 locations when releasing
3. **Test thoroughly** - Name generation logic is complex
4. **Preserve features** - Don't break existing functionality
5. **Keep documentation updated** - README.md and Setup.txt
6. **Use cache busting** - Version query strings on CSS/JS links
7. **Commit message format**: "vX.X.X: Brief description"
8. **Keep it kid-friendly** - Simple UI, fun features

### Common Tasks

**Add new names:**
```javascript
// In game.js
const POPULAR_NAMES = [...existing..., 'NewName1', 'NewName2'];
const GIRLS_NAMES = [...existing..., 'NewGirlName1', 'NewGirlName2'];
```

**Adjust probabilities:**
```javascript
// In game.js ÔåÆ processHit() function
case 'grounder':
    if (quality === 'hard') {
        return Math.random() < 0.70 ? 'single' : 'out';
    }
```

**Change styling:**
```css
/* In styles.css */
.scoreboard-panel {
    background: linear-gradient(...);
}
```

**Update version:**
1. index.html: 3 locations (CSS link, JS link, version display)
2. manifest.json: 2 locations (version, start_url)

This project is stable and production-ready. Focus on enhancements and bug fixes.

