/**
 * Copyright (c) EMBL-EBI 2015
 */
(function updateFoot() {
    var html = '' + '<div class="columns small-6 medium-2 "> ' + ' <a href="https://www.ebi.ac.uk" title="EMBL-EBI"><span class="ebi-logo"></span></a> ' + ' <ul> ' + ' <li class="first"><a href="//www.ebi.ac.uk/about/news">News</a></li> ' + ' <li><a href="//www.ebi.ac.uk/about/brochures">Brochures</a></li> ' + ' <li><a href="//www.ebi.ac.uk/about/contact">Contact us</a> ' + ' <li class="last"><a href="http://intranet.ebi.ac.uk">Intranet</a></li> ' + ' </ul> ' + ' </div> ' + ' ' + ' <div class="columns small-6 medium-2 "> ' + ' <h5 class="services"><a class="services-color" href="//www.ebi.ac.uk/services">Services</a></h5> ' + ' <ul> ' + ' <li class="first"><a href="//www.ebi.ac.uk/services">By topic</a></li> ' + ' <li><a href="//www.ebi.ac.uk/services/all">By name (A-Z)</a></li> ' + ' <li class="last"><a href="//www.ebi.ac.uk/support">Help &amp; Support</a></li> ' + ' </ul> ' + ' </div> ' + ' ' + ' <div class="columns small-6 medium-2 "> ' + ' <h5 class="research"><a class="research-color" href="//www.ebi.ac.uk/research">Research</a></h5> ' + ' <ul> ' + ' <li class="first"><a href="//www.ebi.ac.uk/research">Overview</a></li> ' + ' <li><a href="//www.ebi.ac.uk/research/publications">Publications</a></li> ' + ' <li><a href="//www.ebi.ac.uk/research/groups">Research groups</a></li> ' + ' <li class="last"><a href="//www.ebi.ac.uk/research/postdocs">Postdocs</a> &amp; <a href="//www.ebi.ac.uk/research/eipp">PhDs</a></li> ' + ' </ul> ' + ' </div> ' + ' ' + ' <div class="columns small-6 medium-2 "> ' + ' <h5 class="training"><a class="training-color" href="//www.ebi.ac.uk/training">Training</a></h5> ' + ' <ul> ' + ' <li class="first"><a href="//www.ebi.ac.uk/training">Overview</a></li> ' + ' <li><a href="//www.ebi.ac.uk/training/handson">Train at EBI</a></li> ' + ' <li><a href="//www.ebi.ac.uk/training/roadshow">Train outside EBI</a></li> ' + ' <li><a href="//www.ebi.ac.uk/training/online">Train online</a></li> ' + ' <li class="last"><a href="//www.ebi.ac.uk/training/contact-us">Contact organisers</a></li> ' + ' </ul> ' + ' </div> ' + ' ' + ' <div class="columns small-6 medium-2 "> ' + ' <h5 class="industry"><a class="industry-color" href="//www.ebi.ac.uk/industry">Industry</a></h5> ' + ' <ul> ' + ' <li class="first"><a href="//www.ebi.ac.uk/industry">Overview</a></li> ' + ' <li><a href="//www.ebi.ac.uk/industry/private">Members Area</a></li> ' + ' <li><a href="//www.ebi.ac.uk/industry/workshops">Workshops</a></li> ' + ' <li><a href="//www.ebi.ac.uk/industry/sme-forum"><abbr title="Small Medium Enterprise">SME</abbr> Forum</a></li> ' + ' <li class="last"><a href="//www.ebi.ac.uk/industry/contact">Contact Industry programme</a></li> ' + ' </ul> ' + ' </div> ' + ' ' + ' <div class="columns small-6 medium-2 "> ' + ' <h5 class="ebi-color" class="about"><a href="//www.ebi.ac.uk/about">About us</a></h5> ' + ' <ul> ' + ' <li class="first"><a href="//www.ebi.ac.uk/about">Overview</a></li> ' + ' <li><a href="//www.ebi.ac.uk/about/leadership">Leadership</a></li> ' + ' <li><a href="//www.ebi.ac.uk/about/funding">Funding</a></li> ' + ' <li><a href="//www.ebi.ac.uk/about/background">Background</a></li> ' + ' <li><a href="//www.ebi.ac.uk/about/partnerships">Collaboration</a></li> ' + ' <li><a href="//www.ebi.ac.uk/about/jobs" title="Jobs, postdocs, PhDs...">Jobs</a></li> ' + ' <li><a href="//www.ebi.ac.uk/about/people">People &amp; groups</a></li> ' + ' <li><a href="//www.ebi.ac.uk/about/news">News</a></li> ' + ' <li><a href="//www.ebi.ac.uk/about/events">Events</a></li> ' + ' <li><a href="//www.ebi.ac.uk/about/travel">Visit us</a></li> ' + ' <li class="last"><a href="//www.ebi.ac.uk/about/contact">Contact us</a></li> ' + ' </ul> ' + ' </div>' + '';

    function init() {
        try {
            var foot = document.getElementById('global-nav-expanded');
            foot.innerHTML = html;
        } catch (err) {
            setTimeout(init, 500);
        }
    }
    init();
})();
(function updateFooterMeta() {
    var html = '' + '<p class="address">EMBL-EBI, Wellcome Genome Campus, Hinxton, Cambridgeshire, CB10 1SD, UK &nbsp; &nbsp; +44 (0)1223 49 44 44</p> <p class="legal">Copyright &copy; EMBL-EBI 2013 | EBI is an outstation of the <a href="http://www.embl.org">European Molecular Biology Laboratory</a> | <a href="//www.ebi.ac.uk/about/privacy">Privacy</a> | <a href="//www.ebi.ac.uk/about/cookies">Cookies</a> | <a href="//www.ebi.ac.uk/about/terms-of-use">Terms of use</a></p>' + '';

    function init() {
        try {
            var foot = document.getElementById('ebi-footer-meta');
            foot.innerHTML = html;
        } catch (err) {
            setTimeout(init, 500);
        }
    }
    init();
})();
(function includeScripts() {
    var requireScripts = ['//www.ebi.ac.uk/web_guidelines/js/cookiebanner.js', '//www.ebi.ac.uk/web_guidelines/js/foot.js', '//www.ebi.ac.uk/web_guidelines/js/script.js', '//www.ebi.ac.uk/web_guidelines/js/responsify.js', '//www.ebi.ac.uk/web_guidelines/js/downtime.js?' + Math.round(new Date().getTime() / 3600000)];

    function init() {
        try {
            var existingScripts = document.getElementsByTagName('script');
            var gotScript, i, j, putScript;
            for (j = 0; j < requireScripts.length; j++) {
                for (gotScript = false, i = 0; i < existingScripts.length; i++)
                    if (existingScripts[i].src.indexOf(requireScripts[j]) !== -1)
                        gotScript = true;
                if (!gotScript) {
                    putComment = document.createComment(requireScripts[j] + ' automatically inserted');
                    putScript = document.createElement('script');
                    putScript.type = 'text/javascript';
                    putScript.src = requireScripts[j];
                    document.body.appendChild(putComment);
                    document.body.appendChild(putScript);
                }
            }
        } catch (err) {
            setTimeout(init, 500);
        }
    }
    // init(); // disable for dev...
})();