# EBI-Framework

- [View the demo and documentation] (http://ebiwd.github.io/EBI-Framework/)
- [Get the latest release] (https://github.com/ebiwd/EBI-Framework/releases/latest)

## About
This, the EBI Visual Framework, is the sucessor to the current EBI Compliance Theme and is targeted for an autumn 2016 release.

The project is an enhancement atop the Compliance Theme, updating the visual styles to EBI print colours and text, modern web design best practices -- such as responsive design, and to move to a versioned framework for improved maintnance cycles.

As of 7 June the project is in beta and we are focusins on outreach to minimise any unkown use cases before we begin focussing on bugs and optimisation.

The first release will be v1.1 -- the current EBI Compliance Theme is the v1.0.

## Quick start
For a quick start, run with the HTML templates in the /sample-site directory (these are a work in progress), and [try out the in-browser migration JS] (https://github.com/ebiwd/EBI-Framework/blob/gh-pages/sample-site/migrations/testMigration.js)

## About the framework
In all, an evolutionary step of the current EMBL-EBI web compliance kit, this project aims to continue the efforts of the existing guidance by providing:

- Modularization of framework components that will:
  - Require fewer roll-your-own solutions
  - Be more robust out of the box
  - Standardization of tooling
- Project themes: colour palettes are now themes with flexible spacing, layout options
  - Sync styles and colour palette with corporate EMBL-EBI styles
- Update visual assets to make use of contemporary web browser features for:
  - More consistency with print visual language
  - Enhanced mobile support
- Pattern library for reusable componenets to speed development and reduce fragmentation (in progress, more targeted for 1.2 release)
  - Page-specific header colours and images through metatags: meta-background-image, meta-background-color
  - Built in [pattern support through Foundation Framework] (http://foundation.zurb.com/sites/docs/grid.html)
- Page lifecycle tracking: An improved meta-tag based model for maintaining and tracking content freshness, ownership, and intent
- Regular updates: A versioning system for the framework to help track changes, features, and usage
  - Scss support (optional)
  - NPM updating (optional)
- Collaboration: A more collaborative code base (note this is on GitHub) to offer a better path for code collaboration and integration


## Considerations
A short list of concerns that need to be kept in mind during the dev process.

- Handling non text-centric web applications/services: need to ensure that audience is considered/brought into fold
  - Design pattern library/kitchen sink is potential mitigation 
- There are generally several flavours of any visual tooling, a stronger pattern library would be helpful
- Table functionality is generally very simple; it seems guidance could help push this forward
- Mobile and widescreen support is generally weak throughout
- Layouts are simple/weak/inconsistent; templates and samples would help
- Must be concious to supply enough vital documentation/patterns, but without recreating the Foundation documentation
- Do we keep documentation as one long file, or split into multiple...
- Presently sample code blocks are kept to a minimum to keep the document shorter and increase our flexibility -- as our audience is devs, we may not need code samples at all, as code source should suffice?
- Many of the color palette tags ( .primary-*, .secondary-a-*, .secondary-b-*, .complement-* ) appear to have no usage (wget + grep) and could likely be removed from the base style sheets. We should survey, pilot in alpha.
- Standardised feeback capturing

## Roadmap
- v1.2: Guidance and templates for wide-screen content engagements;
        Use the masthead image as a skybox promo/feature
- v1.4: Unit testing
- v1.5: Add animation guidance and tooling ([see this] (https://medium.com/@vlh/what-does-disney-know-about-interface-animation-anyway-86b32d01bc4a))
