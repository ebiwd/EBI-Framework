# Responsify code

Date: 2015.09.25

These files, when loaded(*), enable a basic responsive format for the Drupal EBI website.

The scope of the project requires no content changes to the desktop version of the site, 
therefore there is much rearanging of content via js/jquery, not ideal, but it does
the job for the narrow scope of work and timeframe.

(*) The files are currently conditionally invoked by ../js/responsify.js

## Technical implemntation
At a high level, this works by layering atop the desktop version of the site. ../js/responsify.js checks the current URL, and if the page is whitelisted, a series of CSS and JS files are invoked. If the screen is larger than 800 pixels, no special JS runs. 

### Notes
- Scripts/CSS target a width of 800px, aims for no change on browsers bigger than this
- We do not support "browser wanking", that said, we do make a best effort for those that resize from a mobile size to big to look good at bigger sizes


## Features
- General cleanup of styles for mobile, i.e. Fewer gradients, background images, columns

### Header navigation
- Global nav
  - Refactors global sections to use icons over text 
  - Search box shows as dropdown

- Section bar
  - Always shows top level breadcrumb as title
  - Navigation shows as flyout tab
  - Local search, if enabled, shows as flyout

- Page-level navigation
  - Page title shows with page content
  - Local nav or popular links show as flyout
  - Local options (share, login, etc) show to right

### Footer navigation
- Shows as two column list

### Content