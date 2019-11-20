[![Build Status](https://travis-ci.org/ebiwd/EBI-Framework.svg?branch=v1.3)](https://travis-ci.org/ebiwd/EBI-Framework)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/ebiwd/EBI-Framework)

# The EBI Visual Framework v1.3

Homed here are the various assets that make the EBI Visual Framework (CSS, JS, and a few images and build scripts).

These are the core files that power the EBI Visual Framework:
- https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/css/ebi-global.css
- https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/libraries/foundation-6/js/foundation.js
- https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/js/foundationExtendEBI.js
- https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/js/script.js

General guidance on using is available at:
- https://www.ebi.ac.uk/style-lab/websites/
- https://www.ebi.ac.uk/style-lab/websites/patterns/

## Where to start? How to use this?

Head to the EBI Style Lab and [start implementing the EBI Visual Framework](https://www.ebi.ac.uk/style-lab/websites/#implementing-the-ebi-visual-framework).

## What's new in v1.3?

- Updates to Zurb Foundation 6.4 ([use of Foundation is largely optional](https://www.ebi.ac.uk/style-lab/websites/sample-site/integrations/lite.html))
- Now with minified (.min) versions of all JS/CSS
- Better loading of Foundation, foundationExtendEBI, and script.js
- [A better announcements system](https://www.ebi.ac.uk/style-lab/websites/patterns/announcements.html)
- [An 'external' href link style](https://www.ebi.ac.uk/style-lab/websites/patterns/formatting.html)
- [Grids of colour now show better](https://www.ebi.ac.uk/style-lab/websites/patterns/button-grid.html)
- Fixes alignment of black bar icons
- Fully manage #masthead-black-bar in script.js
- [Reduces bloat in the HTML boilerplates](https://www.ebi.ac.uk/style-lab/websites/sample-site/)
- Adds a visible a:focus style ([hold down the tab key](https://www.ebi.ac.uk/style-lab/websites/sample-site/)

See a [full overview of changes in v1.3 here](https://github.com/ebiwd/EBI-Framework/issues/103).

### How has the look changed from v1.2?

Very little. We've focused mainly on architectural changes however there are a number of small improvements around spacing and more consistency in button states.

Compare a sample page on the three versions: [v1.1](https://ebiwd.github.io/EBI-Pattern-library/sample-site/boilerplate/ultra-wide.html), [v1.2](https://www.ebi.ac.uk/style-lab/websites/sample-site-v1.2/boilerplate/ultra-wide.html), [v1.3](https://www.ebi.ac.uk/style-lab/websites/sample-site/boilerplate/ultra-wide.html)

## Upgrading?

| Your current version | Effort required | What you'll get |
| ---- | ---- | ---- |
| v1.1 | 1-2 hours | Better performance, a more functional design |
| v1.2 | minutes | Better performance, more design flexibility |

### Details on upgrading

- From v1.2:
  1. Update your `v1.2` asset references to `v1.3`
  1. Remove the reference to `foundation.min.css` or `foundation.css` (this is now included in [`ebi-global.css`](https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/css/ebi-global.css))
  1. [Remove the HTML markup](https://github.com/ebiwd/EBI-Style-lab/blob/master/content/pages/websites/sample-site/boilerplate/blank.html#L69) inside your `div#masthead-black-bar`. This will automatically be inserted by `script.js`.
  1. Bonus: you should also [load assets from the EMBL-EBI CDN at ebi.emblstatic.net](https://github.com/ebiwd/EBI-Framework/issues/119)
- From v1.1:
  1. [Follow the update guide from v1.1 to v1.2](https://github.com/ebiwd/EBI-Framework/issues/85)
  2. Then follow the steps above for updating from v1.2

### Do I have to upgrade?

If you're using the EBI Visual Framework v1.1 or v1.2 it is not required that you upgrade, but there are [a number of improvements](https://github.com/ebiwd/EBI-Framework/issues/103) for:

1. sites that show a lot of data
1. You don't want or can't use the Foundation Framework core CSS
1. You're a 3rd party site or service and want less of the "EBI look"

## About the EBI Visual Framework  

This project helps ensure brand consistency and the easy use of modern web design best practices -- such as responsive design, iterative maintenance cycles, and UX-tested patterns.

Releases are planned six months apart, generally in summer/winter. The exact timing and features are discussed in the Web Guidelines Committee and in this project's issue queue.

This project continues efforts of the existing guidance by providing:

- Modularisation of framework components that will:
  - Require fewer roll-your-own solutions
  - Be more robust out of the box
  - Standardisation of tooling
- Project themes: colour palettes are now themes with flexible spacing, layout options
  - Sync styles and colour palette with corporate EMBL-EBI styles
- Update visual assets to make use of contemporary web browser features for:
  - More consistency with print visual language
  - Enhanced mobile support
- Pattern library for reusable components to speed development and reduce fragmentation (in progress, more targeted for 1.2 release)
  - Page-specific header colours and images through metatags: meta-background-image, meta-background-color
  - Built in [pattern support through Foundation Framework](http://foundation.zurb.com/sites/docs/grid.html)
- Page lifecycle tracking: An improved meta-tag based model for maintaining and tracking content freshness, ownership, and intent
- Regular updates: A versioning system for the framework to help track changes, features, and usage
  - Sass support (optional)
  - NPM updating (optional)
- Collaboration: A more collaborative code base (note this is on GitHub) to offer a better path for code collaboration and integration

### Do I need to download this?

No. The vast majority of users should link to the EBI hosted files. You'll load three CSS files, seven JS files, and use a wrapper HTML. Have a look at the source of [the simple boilerplate page](https://www.ebi.ac.uk/style-lab/websites/sample-site/boilerplate/blank.html).

## Outreach
Not all developers are in the same place, so we plan  make use of multiple channels:

- Github: We know many developers already live in the Github ecosystem, so go ahead and [open an issue with your question/comment/concern](https://github.com/ebiwd/EBI-Framework/issues).
- [Web Guidelines Committee](https://www.ebi.ac.uk/seqdb/confluence/display/WGC/): overseeing the tooling for the look, feel and function of EMBL-EBI websites, the WGC holds meeting on the first Tuesday of each month at 11.00, all teams are invited to send a representative.
- Gitter: If you want to have a conversation, [chat us on Gitter](https://gitter.im/ebiwd/EBI-Framework).
- Pattern library workshops: We host periodic workshops to find and document patterns common across EMBL-EBI sites and services.
- Show-and-tell: [Share your pattern in the EMBL-EBI Style Lab](https://www.ebi.ac.uk/style-lab/websites/patterns/).

## Versioning
As not all users of the framework will be able to update to the very latest and we do not wish to hold others back, we are using a semantic versioning style of releases.

| Major release | Minor release | Note |
| ------------- | ------------- | ---- |
| (Branch)      | (Tag)         | |
| 1.1           | .0            | Initial release evolving from Compliance theme |
| "             | .1            | Tagged minor release |
| "             | .2            | Tagged minor release |
| "             | .3            | Tagged minor release |
| 1.2           | .0            | Documented, breaking release |
| "             | .1            | Tagged minor release |
| 1.3           | .0            | Documented, breaking release |

Difference between major, minor releases:
- Major releases (1.1, 1.2, 1.3...) can have breaking changes and any such changes will be detailed and tested.
- Minor releases (0.0.X) will not have changes to code structure or parts and will mainly add features or update visual assets (such as logos or icon fonts).

We support the last two major releases with bug fixes and branding. New features will only be added to the current and development versions.

Where's version 1.0, you ask? Version 1.0 is the [old EBI Compliance theme](https://www.ebi.ac.uk/web_guidelines/html/compliance/).

### Test releases
Testing releases will be identified in their tag, a la: `V1.1.0-alpha`, where `.0-alpha` is the tag. `-alpha`, `-beta` and `-dev` are common tag suffixes.

### Variant releases
There are no officially supported variants. An Angular-specific variant is being considered.

### Deployment
Files are hosted in this pattern:
```
https://ebi.emblstatic.net/web_guidelines/[repo-name]/[branch]/[repo-files]
```
That is:
```
https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/js/script.js
```

#### Building from NPM
We expect the vast majority of users to link to the built CSS and JS files (as shown in the sample HTML files), however some teams may want to download the EBI Framework and modify it for performance or deeper appearance issues.

We've configured the system to build with NPM (no need for gulp or bower).

1. You need to [install node](https://nodejs.org/en/download/)
1. Install `npx` with `npm install -g npx`
1. Start with `npm install && npm run motion-ui-update`
1. For the rest, have a look at `package.json`. Likely `npm run scss` command will cover 90% of use cases

#### Deploying with NPM
Releases are available via NPM at https://www.npmjs.com/package/ebi-framework

## Developing locally
1. Edit any CSS or JS and build with `npm run scss` or `npm run js`
2. Serve index.html with `jekyll serve --port 99`
3. Open http://127.0.0.1:99/EBI-Framework/

Todo: Run the build process and serve with gulp and browsersync.

## Roadmap
- v1.4: Documentation, EMBL integration, abstracting core structure into a reusable "Framework for the Life Sciences"
- v1.5: Patterns, accessibility.
