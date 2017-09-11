/**
 * Mark pdf/doc/txt links with link-pdf/link-doc/link-txt classes.
 */
function ebiFrameworkExternalLinks() {
  // exclude links with images
  // include only links to own domains
  function isOwnDomain(url) {
    return (url.indexOf('//') === -1 ||
      url.indexOf('//www.ebi.ac.uk') !== -1 ||
      url.indexOf('//wwwdev.ebi.ac.uk') !== -1 ||
      url.indexOf('//srs.ebi.ac.uk') !== -1 ||
      url.indexOf('//ftp.ebi.ac.uk') !== -1 ||
      url.indexOf('//intranet.ebi.ac.uk') !== -1 ||
      url.indexOf('//pdbe.org') !== -1 ||
      url.indexOf('//' + document.domain) !== -1);
  }
  function isFileType(url, type) {
    return url.indexOf(type, url.length-type.length)!==-1;
  }
  try {
    var alist = document.getElementsByTagName('a');
    var fileTypes = ['pdf', 'doc', 'txt'];
    var i, icon;
    for (i=0; i<alist.length; i++) {
      for (var type in fileTypes) {
        if (alist[i].innerHTML.indexOf('<span class="link-' + fileTypes[type] + '"></span>') === -1 && alist[i].innerHTML.indexOf('<img') === -1 && isFileType(alist[i].href, fileTypes[type]) && isOwnDomain(alist[i].href)) {
          icon = document.createElement('span');
          icon.className = 'link-' + fileTypes[type];
          alist[i].appendChild(icon);
        }
      }
    }
  }
  catch(err) {}
}
