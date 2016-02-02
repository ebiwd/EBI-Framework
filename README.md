# EBI-Framework

[View the demo] (http://khawkins98.github.io/EBI-Framework/)

## Version: 1.1-dev

The current idea is to develop a framework drawing heavily off print styles and use the Foundation 6 framework. Basic support will not require jQuery (including basic responsive layouts) but will be enabled by default.

## Quick start
For a quick start, run with the HTML templates in the /sample-site directory.

## About the framework
In all, an evolutionary step of the current EMBL-EBI web compliance kit, this project aims to continue the efforts of the existing guidance by providing:

- Modularization of framework components that will:
  - Require fewer roll-your-own solutions
  - Be more robust out of the box
  - Standardization of tooling
- Update visual assets to make use of contemporary web browser features for:
  - More consistency with print visual language
  - Enhanced mobile support
- Content first approach: create a content toolkit to help teams understand how to structure content
  - Templated layouts, such as BBC’s Gel http://www.bbc.co.uk/gel/web/foundations/universal-grid/columns
  - Customizable widths/fixed/fluid/max
- Page lifecycle tracking: An improved meta-tag based model for maintaining and tracking content freshness, ownership, and intent
- Faster development: style guide and pattern library to help accelerate development and understanding
- Regular updates: A versioning system for the framework to help track changes, features, and usage
- Collaboration: A more collaborative code base (such as hosting on GitHub) to offer a better path for code collaboration and integration

## Considerations
A short list of concerns that need to be kept in mind during the dev process.

- Handling non text-centric web applications/services: need to ensure that audience is considered/brought into fold
  - Design pattern library/kitchen sink is potential mitigation 
- There are generally several flavours of any visual tooling, a stronger pattern library would be helpful
- Table functionality is generally very simple; it seems guidance could help push this forward
- Mobile and widescreen support is generally weak throughout
- Layouts are simple/weak/inconsistent; templates and samples would help


View /html/demo/index.html for more information and living style guide.

## Roadmap
- v1.2: Guidance and templates for wide-screen content engagements
- v1.4: Unit testing
- v1.5: Add animation guidance and tooling; https://medium.com/@vlh/what-does-disney-know-about-interface-animation-anyway-86b32d01bc4a
- v1.9: Possible switch to use SASS for better customisation and performance optimisation

## Changelog
2016-01-14
- Version is at "rough draft" stage. Largely implementing a revised style and functionality. 
2015-11-23
- Forks EBI Compliance theme into EBI Framework v1.1
