// Injects the ELXIR Banner onto sites that are part of the network
// For guidance on using: wwwdev.ebi.ac.uk/style-lab/websites/patterns/banner-elixir.html
function elixirBanner() {
  try {
    var divElixirBanner = document.getElementById('elixir-banner');
    if (divElixirBanner) {
      var defaultName = 'This',
          defaultDescription = 'This is part of the ELIXIR distributed infrastructure for life-science information.',
          basicStylingForNonfoundationSites = '',
          defaultLogo = 'https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.2/images/logos/assorted/elixir_kitemark-60px.png',
          defaultLink = 'https://www.elixir-europe.org/about-us/why-needed',
          defaultTextColor = '#fff',
          defaultColor = 'blue'; // options: orange, grey, green, blue, none

      if (typeof divElixirBanner.dataset.color !== "undefined") {
        defaultColor = divElixirBanner.dataset.color;
        defaultColor = (defaultColor == 'orange' ? 'rgb(244,125,32)' : defaultColor);
        defaultColor = (defaultColor == 'grey' ? 'rgb(77,77,72)' : defaultColor);
        defaultColor = (defaultColor == 'green' ? 'rgb(190,191,50)' : defaultColor);
        defaultColor = (defaultColor == 'blue' ? 'rgb(79,138,156)' : defaultColor);
        defaultColor = (defaultColor == 'none' ? 'transparent' : defaultColor);
        defaultTextColor = (defaultColor == 'transparent' ? '#222' : defaultTextColor); // grey text if background is none
      }
      if (typeof divElixirBanner.dataset.name !== "undefined") {
        defaultName = divElixirBanner.dataset.name;
      }
      if (divElixirBanner.dataset.useCdrLogo == "true") {
        defaultLogo = 'https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/images/logos/ELIXIR/elixir-cdr.gif';
      }
      if (typeof divElixirBanner.dataset.description !== "undefined") {
        defaultDescription = divElixirBanner.dataset.description;
      }
      if (typeof divElixirBanner.dataset.moreInformationLink !== "undefined") {
        defaultLink = divElixirBanner.dataset.moreInformationLink;
      }
      if (divElixirBanner.dataset.useBasicStyles === 'true') {
        basicStylingForNonfoundationSites = `
          .elixir-ribbon {
            font-family: Helvetica, Arial, FreeSans, 'Liberation Sans', sans-serif;
          }

          .elixir-ribbon .row {
            max-width: 1200px;
            margin: 0 auto 1rem;
          }

          .elixir-ribbon .row::before,
          .elixir-ribbon .row::after {
            display: table;
            content: ' ';
          }

          .elixir-ribbon h5 {
            font-size: 1.3rem;
          }
        `;
      }

      var html = `
        <div id="elixir-ribbon" class="elixir-ribbon">
          <div class="row">
            <div class="column">
              <a href="`+defaultLink+`">
                <div class="elixir-logo-kite"></div>
                <h5>
                  <span class="elixir-banner-name">`+defaultName+`</span> is part of the ELIXIR infrastructure
                </h5>
                <div id="elixir-banner-info">
                  <small>
                    <span class="elixir-banner-description">`+defaultDescription+`</span>
                    <span class="readmore">Learn more &#8250;</span>
                  </small>
                </div>
              </a>
            </div>
          </div>
        </div>

        <style>
        .elixir-ribbon {
          padding: 1rem 0;
          background-color: `+defaultColor+`;
        }
        `+basicStylingForNonfoundationSites+`
        .elixir-ribbon,
        .elixir-ribbon h5,
        .elixir-ribbon a,
        .elixir-ribbon a:active,
        .elixir-ribbon a:visited,
        .elixir-ribbon a:hover {
          color: `+defaultTextColor+`;
          text-decoration: none;
        }
        .elixir-ribbon a:hover {
          opacity: .8;
        }
        .elixir-ribbon .readmore {
          border-bottom: 1px dotted `+defaultTextColor+`;
        }
        .elixir-ribbon h5 {
          margin: 0;
        }
        .elixir-ribbon .elixir-logo-kite {
          background: 80% 58% url("`+defaultLogo+`") no-repeat;
          position: relative;
          top: -5px;
          margin: 0 1rem -.5rem 0;
          height: 60px;
          width: 60px;
          display: inline-block;
          float: left;
          background-size: 60px;
        }
        </style>
      `;

      divElixirBanner.innerHTML = html;

      // try {
      // } catch (err) {
      //   setTimeout(init, 500);
      // }
    }
  }
  catch (err) {
    console.log(err)

  }
}

// Run
elixirBanner();
