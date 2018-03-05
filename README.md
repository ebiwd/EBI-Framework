[![Build Status](https://travis-ci.org/ebiwd/EBI-Framework.svg?branch=v1.3)](https://travis-ci.org/ebiwd/EBI-Framework)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/ebiwd/EBI-Framework)

# EBI-Framework v1.3

v1.3 is in beta and is targeted for a January 2018 release. Homed here are the various assets that make the EBI Visual Framework (CSS, JS, and a few images and build scripts).

To view plans for v1.3 (and to join the discussion), [see issue 103](https://github.com/ebiwd/EBI-Framework/issues/103).

The core files that power the EBI Visual Framework:
- https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/css/ebi-global.css
- https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/libraries/foundation-6/js/foundation.js
- https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/js/foundationExtendEBI.js
- https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/js/script.js

Guidance on using is available at:
- https://www.ebi.ac.uk/style-lab/websites/
- https://www.ebi.ac.uk/style-lab/websites/patterns/

## Upgrading?

### On v1.1? You should upgrade.

We recommend upgrading to v1.3 in a number of scenarios:

1. You don't want or can't use the Foundation Framework core libraries
1. You're a 3rd party site or service and want less of the "EBI look"
1. More to come.

**Do I have to upgrade?** If you're using the EBI Visual Framework v1.1 or v1.2 it is not required that you upgrade, but there are [a number of improvements](https://github.com/ebiwd/EBI-Framework/issues/103) for sites that show a lot of data.

### On v1.2? Upgrading is as easy as falling off a log.

1. Update your `v1.2` asset references to `v1.3`
2. Remove the reference to `foundation.min.css` or `foundation.css` (this is now included in [`ebi-global.css`](https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/css/ebi-global.css))
3. Bonus: you should also [load assets from the EMBL-EBI CDN at ebi.emblstatic.net](https://github.com/ebiwd/EBI-Framework/issues/119)

See a [full overview of changes in v1.3 here](https://github.com/ebiwd/EBI-Framework/issues/103).

## Where to start? How to use this?

1. Quick start:
  - See the [HTML boilerplate demos in the EBI Style Lab](https://www.ebi.ac.uk/style-lab/websites/sample-site/).
1. Guidance:
  - For web guidelines, [check out the Style Labe](https://www.ebi.ac.uk/style-lab/websites/sample-site/) for guidance on making your site look proper and correct.
1. Building directly from the CSS and JS:
  - If you'd like to look into making direct use of the CSS and JS, see the programatically built documentation (this is an ongoing effort):
    - [CSS](https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/css/styleguide/section-components.html)
    - [JS](https://github.com/ebiwd/EBI-Framework/blob/v1.3/js/documenation.md#table-of-contents)
1. Help!
  - Check out the [issue queue](https://github.com/ebiwd/EBI-Framework/issues) or contact [Ken Hawkins](https://www.ebi.ac.uk/about/people/ken-hawkins) in the Web Development team.

### Do I need to download this?

No. The vast majority of users should link to the EBI hosted files. You'll load three CSS files, seven JS files, and use a wrapper HTML. Have a look at the source of [the simple boilerplate page](https://www.ebi.ac.uk/style-lab/websites/sample-site/boilerplate/blank.html).

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

## Outreach
Not all developers are in the same place, so we plan to make use of multiple channels:

- Github: Many developers already live in the Github ecosystem, engaging them here will also fit well into the pull request/issue queue ecosystem.
- Web Guidelines Committee: Not only does this facilitate exposure, but is an active forum for peer review.
- Slack: A strong space for communication that can happen even in distributed teams.
- Clinics: An offline space for developers to chat in depth, current thinking is to run in parallel with External Relations' monthly content clinics.
   - Pattern library workshops: While separate from the core framework, it is interdependent
- Showing: Launching the corporate site in the new framework will not only increase awareness but also lead by example.

With the exception of clinics, all of these can be ongoing support/outreach efforts. Recommend the clinics continue as long as there is interest.

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

The support for previous major versions (branches) is still being considered, but the current suggestion is that the last three major version will be supported with updates to assets, fonts, and critical EMBl and EBI branding.

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

1. Start with `npm install && npm run motion-ui-update`.
2. For the rest, have a look at `package.json`. Likely the the `npm run scss` command will cover 90% of use cases.

#### Deploying with NPM
Releases are available via NPM at https://www.npmjs.com/package/ebi-framework

## Developing locally
1. Edit any CSS or JS and build with `npm run scss` or `npm run js`
2. Serve index.html with `jekyll serve --port 99`
3. Open http://127.0.0.1:99/EBI-Framework/

Todo: Run the build process and serve with gulp and browsersync.

## Roadmap
- v1.1: Major update to the 2013 look and functionality
- v1.2: [Major improvements around modularity, structure and visual refinements](https://github.com/ebiwd/EBI-Framework/issues/61)
- v1.3: To come
- v1.4: Unit testing
- v1.5: Add animation guidance and tooling ([see this](https://medium.com/@vlh/what-does-disney-know-about-interface-animation-anyway-86b32d01bc4a))
