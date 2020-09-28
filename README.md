[![Build Status](https://travis-ci.org/ebiwd/EBI-Framework.svg?branch=v1.4)](https://travis-ci.org/ebiwd/EBI-Framework)
[![Chat for support on Slack](https://img.shields.io/static/v1?label=chat&message=Slack&color=blue)](https://join.slack.com/t/visual-framework/shared_invite/enQtNDAxNzY0NDg4NTY0LWFhMjEwNGY3ZTk3NWYxNWVjOWQ1ZWE4YjViZmY1YjBkMDQxMTNlNjQ0N2ZiMTQ1ZTZiMGM4NjU5Y2E0MjM3ZGQ)

# The EBI Visual Framework v1.4

The 1.x version of the Framework is at its end of life. You should only use 1.4 project if you have an existing 1.x project. For new project [you should use 2.0](https://visual-framework.github.io/vf-core/), which [can be used along side 1.x code](https://visual-framework.github.io/vf-core/demos/integration-vf1/).

## What's new in v1.4?

See a [full overview of changes in v1.4 in issue 162](https://github.com/ebiwd/EBI-Framework/issues/162).

## Upgrading?

| Your current version | Effort required | What you'll get |
| ---- | ---- | ---- |
| v1.1 | 1-2 hours | Better performance, a more functional design |
| v1.2 | minutes | Better performance, more design flexibility |
| v1.3 | minutes | Alignment with the VF 2.0 |

### Details on upgrading

- From v1.3:
  1. Update your `v1.3` asset references to `v1.4`
- From v1.2:
  1. Update your `v1.2` asset references to `v1.4`
  1. Remove the reference to `foundation.min.css` or `foundation.css` (this is now included in [`ebi-global.css`](https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.4/css/ebi-global.css))
  1. [Remove the HTML markup](https://github.com/ebiwd/EBI-Style-lab/blob/master/content/pages/websites/sample-site/boilerplate/blank.html#L69) inside your `div#masthead-black-bar`. This will automatically be inserted by `script.js`.
  1. Bonus: you should also [load assets from the EMBL-EBI CDN at ebi.emblstatic.net](https://github.com/ebiwd/EBI-Framework/issues/119)
- From v1.1:
  1. [Follow the update guide from v1.1 to v1.2](https://github.com/ebiwd/EBI-Framework/issues/85)
  2. Then follow the steps above for updating from v1.2

## About the EBI Visual Framework  

This project helps ensure brand consistency and the easy use of modern web design best practices -- such as responsive design, iterative maintenance cycles, and UX-tested patterns.

## Outreach

Not all developers are in the same place, so we plan  make use of multiple channels:

- Github: We know many developers already live in the Github ecosystem, so go ahead and [open an issue with your question/comment/concern](https://github.com/ebiwd/EBI-Framework/issues).
- [Web Guidelines Committee](https://www.ebi.ac.uk/seqdb/confluence/display/WGC/): overseeing the tooling for the look, feel and function of EMBL-EBI websites, the WGC holds meeting on the first Tuesday of each month at 11.00, all teams are invited to send a representative.

#### Deploying with npm

Releases are available via npm at https://www.npmjs.com/package/ebi-framework

## Developing locally

1. Edit any CSS or JS and build with `npm run scss` or `npm run js`
2. Serve index.html 
  - `npm install -g browser-sync`
  - `browser-sync start --files index.html  --server` OR:
  - `browser-sync start --files local-dev.html  --server`
    - https://www.browsersync.io/docs/command-line