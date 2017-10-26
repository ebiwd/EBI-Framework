# Depreciated 

This experiment has come to an end. If you're looking for a lite implementation, [you should use v1.2](https://github.com/ebiwd/EBI-Framework/tree/v1.2).

# EBI-Framework Lite version

This is trimmed version of the [EBI Visual Framework v1.1](https://github.com/ebiwd/EBI-Framework).

You are looking at a lite version that includes less support for the [EBI Pattern Library] (https://ebiwd.github.io/EBI-Pattern-library/) but will also more easily support legacy sites or sites using another framework, such as Bootstrap.

If you can use the main version of the EBI Visual Framework that is the recommended path.

Homed here are the various assets that make the EBI Visual Framework (CSS, JS, and a few images and build scripts).

## Where do I start? How do I use this?

Start by seeing the documentation for the main release: https://github.com/ebiwd/EBI-Framework

_Sample boilerplate page to come_

### What's different

- The Foundation Framework has been much trimmed (by roughly 1,300 lines or 30%), removed:
  - Forms
  - Tables
  - Typography
  - A plethora of components
- Foundation JS
  - No dropdown menu
  - Removal of EMBL-EBI dropdown nicities
- foundationExtendEBI.js has been emptied, that means:
  - No value add scripts for responsive tables, filtering
  - Google Analytics bonuses
  - Drop down menu polishing, scrolling, etc.
- jQuery is not used by default

Still working are the basic colour palettes, layout, and responsive components.
