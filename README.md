[![Build Status](https://travis-ci.org/ebiwd/EBI-Framework.svg?branch=v1.2)](https://travis-ci.org/ebiwd/EBI-Framework)

# EBI-Framework v1.2

v1.2 is targeted for a July 2017 release. Homed here are the various assets that make the EBI Visual Framework (CSS, JS, and a few images and build scripts).

To view plans for v1.2 (and to join the discussion), [see issue 61](https://github.com/ebiwd/EBI-Framework/issues/61).

Code is available for usage at:
- http://www.ebi.ac.uk/web_guidelines/EBI-Framework/v1.2/
- http://www.ebi.ac.uk/web_guidelines/EBI-Framework/v1.2/js
- http://www.ebi.ac.uk/web_guidelines/EBI-Framework/v1.2/css

### Should I upgrade?
We recommend upgrading to v1.2 in a number of scenarios:
1. You have a site that is activley maintained and want to increase performance and ensure better responsive design and accesibility.
2. You're developing with a JS framework like React or Angular, we've made a number of important stuctural changes.
3. You have a site using the old EBI Compliance theme and want a less intrusive upgrade and want to use the EBI Visual Framework 'lite' implementation.

### Do I have to upgrade?
If you're using the EBI Visual Framework v1.1 it is not required that you upgrade.

### How do I migrate?
Follow the migration guide: https://github.com/ebiwd/EBI-Framework/issues/85#issuecomment-296141733

## Where do I start? How do I use this?

1. Quick start:
  - See the [HTML demos in the EBI Pattern Library /sample-site directory](https://ebiwd.github.io/EBI-Pattern-library/sample-site-v1.2/).
2. Guidance:
  - For the updated web guidelines, [check out the pattern library](https://ebiwd.github.io/EBI-Pattern-library/) for guidance on making your site look proper and correct.
3. Help!
  - Check out the [issue queue](https://github.com/ebiwd/EBI-Framework/issues) or contact [Ken Hawkins](https://www.ebi.ac.uk/about/people/ken-hawkins) on the Web Development team.

### Do I need to download this?

No. The vast majority of users should link to the EBI hosted files. You'll load three CSS files, seven JS files, and use a wrapper HTML. Have a look at the source of [the simple boilerplate page](https://ebiwd.github.io/EBI-Pattern-library/sample-site-v1.2/boilerplate/blank.html).

## About the framework  

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
//www.ebi.ac.uk/web_guidelines/[repo-name]/[branch]/[repo-files]
```
That is:
```
//www.ebi.ac.uk/web_guidelines/EBI-Framework/v1.2/js/script.js
```

#### Building from NPM
We expect the vast majority of users to link to the built CSS and JS files (as shown in the sample HTML files), however some teams may want to download the EBI Framework and modify it for performance or deeper appearance issues.

We've configured the system to build with NPM (no need for gulp or bower).

To get started, have a look at `package.json`. Likely the the `npm run scss` command will cover 90% of use cases.

#### Deploying with NPM
Releases are available via NPM at https://www.npmjs.com/package/ebi-framework

## Roadmap
- v1.2: https://github.com/ebiwd/EBI-Framework/issues/61
- v1.3: Angular 1st class support, accessibility improvements
- v1.4: Unit testing
- v1.5: Add animation guidance and tooling ([see this](https://medium.com/@vlh/what-does-disney-know-about-interface-animation-anyway-86b32d01bc4a))
