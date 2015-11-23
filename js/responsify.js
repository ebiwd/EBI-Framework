
// only run on these mobile devices
if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB10|IEMobile|Silk|Nokia|Opera Mini/i.test(navigator.userAgent) ) {

  (function responsify() {
    var requireScripts = [];
    var requireStyles = [];
    var i, j;

    function isMatch(path, includes, excludes) {
      var match=false;

      for (var i=0; i<includes.length && ! match; i++) {
        // check if pathname matches
        pattern = new RegExp(includes[i], '');
        if (pattern.test(path)) {
          match=true;
        }
      }
      for (var i=0; i<excludes.length & match; i++) {
        // check if pathname matches
        pattern = new RegExp(excludes[i], '');
        if (pattern.test(path)) {
          match=false;
        }
      }

      return match;
    }

    function init() {
      try {
        var existingStyles = document.getElementsByTagName('link');
        var gotStyle, putStyle;
        for (j = 0; j < requireStyles.length; j++) {
          for (gotStyle = false, i = 0; i < existingStyles.length; i++)
            if (existingStyles[i].href.indexOf(requireStyles[j]) !== -1)
              gotStyle = true;
          if (!gotStyle) {
            putComment = document.createComment(requireStyles[j] + ' automatically inserted');
            putStyle = document.createElement('link');
            putStyle.type = 'text/css';
            putStyle.rel = 'stylesheet';
            putStyle.media = 'screen';
            putStyle.href = requireStyles[j];
            document.body.appendChild(putComment);
            document.body.appendChild(putStyle);
          }
        }
        var existingScripts = document.getElementsByTagName('script');
        var gotScript, putScript;
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
      }
      catch(err) {
        console.log(err);
        setTimeout(init,500);
      }
    }




    // Regex include paths
    var includePaths = [ '^/$', '^/about', '^/services', '^/research', '^/training', '^/industry', '^/support', '^/GOA' ];
    // Regex exlude paths
    var excludePaths = [ '^/support/ipd\.php$', '^/support/hla\.php$' ];

    // Regex include body classes
    var includeClasses = [ 'environment-prod', 'environment-stage', 'environment-dev' ];
    // Regex exclude body classes
    var excludeClasses = [];

    if (isMatch(document.body.className, includeClasses, excludeClasses)) {

      // hide the content until we can process through it and load up the JS/CSS
      document.body.style.paddingTop = '1000px';

      // jQuery is a dependency for our solution
      if(!window.jQuery) {
         var script = document.createElement('script');
         script.type = "text/javascript";
         script.src = "//www.ebi.ac.uk/misc/jquery.js?v=1.4.4";
         document.getElementsByTagName('head')[0].appendChild(script);
      }

      // tweaks made to target specific pages or other narrow use cases
      requireScripts.push( '//www.ebi.ac.uk/web_guidelines/responsify/responsify-page-specific.js'); 
      requireStyles.push( '//www.ebi.ac.uk/web_guidelines/responsify/responsify-page-specific.css'); 

      // include on all pages matching class
      requireScripts.push('//www.ebi.ac.uk/web_guidelines/responsify/responsify-global.js'); 
      requireStyles.push( '//www.ebi.ac.uk/web_guidelines/responsify/responsify-global.css'); 

      // mobile-optimized notice
      requireScripts.push('//www.ebi.ac.uk/web_guidelines/responsify/responsify-mobile-ready.js'); 
      requireStyles.push( '//www.ebi.ac.uk/web_guidelines/responsify/responsify-mobile-ready.css'); 

      if (isMatch(document.location.pathname, includePaths, excludePaths) ) {
        // include on all pages matching path
        requireScripts.push('//www.ebi.ac.uk/web_guidelines/responsify/responsify-content.js'); 
        requireStyles.push( '//www.ebi.ac.uk/web_guidelines/responsify/responsify-content.css'); 
      }
    }

    init();
  })();

}
