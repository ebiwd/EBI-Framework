if( typeof document.getElementsByClassName !== "function"){ 
    document.getElementsByClassName = function( className, nodeName )
    {
      var result = [], tag = nodeName||'*', node, seek, i;
      if( document.evaluate ){
        seek = '//'+ tag +'[@class="'+ className +'"]';
        seek = document.evaluate( seek, document, null, 0, null );
        while( (node = seek.iterateNext()) )
          result.push( node );
      }else{
        var rightClass = new RegExp( '(^| )'+ className +'( |$)' );
        seek = document.getElementsByTagName( tag );
        for( i=0; i<seek.length; i++ )
          if( rightClass.test( (node = seek[i]).className ) )
        result.push( seek[i] );
      }
      return result;
    };
} // end if

if (document.getElementsByClassName('mhmm').length) {
  // new format
  function htmlEscape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
  function getFontName() {
    var heading = document.getElementsByTagName('h1')[0].innerText;
    var fontStart = heading.indexOf('-')+1;
    var fontLength = heading.indexOf(' ', fontStart) - fontStart;
    var fontName = heading.substr(fontStart, fontLength).toLowerCase();
    return fontName;
  }
  function getIconName(wrapper) {
    var iconName = wrapper.getElementsByClassName('mls')[0].innerText;
    return iconName;
  }
  function setIconName(wrapper, value) {
    wrapper.getElementsByClassName('mls')[0].innerText = value;
  }
  function getIconLetter(wrapper) {
    var iconLetter = wrapper.getElementsByTagName('input')[1].value;
    return iconLetter;
  }
  function getIconColor(font, letter) {
    lookup = {
      'conceptual' : {
        'd' : 'c1',
        'g' : 'c2',
        'P' : 'c3',
        's' : 'c4',
        'y' : 'c5',
        'b' : 'c6',
        'o' : 'c7',
        'l' : 'c8',
        'c' : 'c9'
      },
      'socialmedia' : {
        'F' : 's1',
        'T' : 's2',
        'L' : 's3',
        'B' : 's4',
        'O' : 's5',
        'G' : 's6',
        'Y' : 's7',
        'f' : 's8',
        'V' : 's9',
        'w' : 's10',
        'S' : 's11',
        'P' : 's12',
        'R' : 's13'
      }
    }
    return (lookup[font] && lookup[font][letter]) ? lookup[font][letter] : '';
  }
  function appendDrupalUsage(wrapper, font, letter) {
    var label="Drupal";
    var color=getIconColor(font, letter);

    var attrFont = font ? 'icon-' + font : '';
    var attrLetter = ':' + letter;
    var attrColor = color ? ':' + color : '';

    var text='[' + attrFont + attrLetter + attrColor + ']';

    var html = ' \
      <div class="fs0 bshadow0 clearfix hidden-false"> \
          <span class="unit pvs fgc1">' + label + ': </span> \
          <input type="text" readonly="" value="' + htmlEscape(text) + '"  class="unitRight" style="width:88%"> \
      </div> \
      ';
   
    wrapper.insertAdjacentHTML('beforeend', html);
  }
  function appendHTMLUsage(wrapper, font, letter) {
    var label="HTML";
    var color=getIconColor(font, letter);

    var attrFont = font ? ' icon-' + font : '';
    var attrLetter = letter;
    var attrColor = color ? ' icon-' + color : '';

    var text='<* class="icon' + attrFont + attrColor + '" data-icon="' + attrLetter + '">';

    var html = ' \
      <div class="fs0 bshadow0 clearfix hidden-false"> \
          <span class="unit pvs fgc1">' + label + ': </span> \
          <input type="text" readonly="" value="' + htmlEscape(text) + '"  class="unitRight" style="width:88%"> \
      </div> \
      ';
   
    wrapper.insertAdjacentHTML('beforeend', html);
  }

  var fontName = getFontName();
  var glyphs = document.getElementsByClassName('glyph');
  for (var i=0; i<glyphs.length; i++) {
    var glyph = glyphs[i];
//    var iconName = getIconName(glyph);
//    setIconName(glyph, iconName.substr(iconName.indexOf('-')+1)); 
    var iconLetter = getIconLetter(glyph);
    appendDrupalUsage(glyph, fontName, iconLetter);
    appendHTMLUsage(glyph, fontName, iconLetter);
  }
}
else {
  // old format
  var names=[];
  var heading = document.getElementsByTagName('h1')[0].innerHTML;
  var font = heading.substr(8,heading.indexOf(' ',8)-8).toLowerCase();
  var spans = document.getElementsByTagName('span');
  var i, j;

  for (i=0, j=0; i<spans.length; i++) {
    if (spans[i].hasAttribute('aria-hidden')) {
      names[j++] = spans[i].nextSibling.data.trim().substr(5).replace('_',' ');
    }
  }
  var divs = document.getElementsByTagName('div');
  for (i=0, j=0; i<divs.length; i++) {
    if (divs[i].hasAttribute('aria-hidden')) {
      var icon=divs[i].getAttribute('data-icon');
      if (icon === '<') {
        icon = '&amp;lt;';
      }
      if (icon === '>') {
        icon = '&amp;gt;';
      }
      if (icon === '"') {
        icon = '&amp;quot;';
      }
      if (icon === '&') {
        icon = '&amp;amp;';
      }
      var desc = document.createElement('h2');
      desc.className = "desc";
      desc.innerHTML = '<strong>' + names[j++] + '</strong>';
      divs[i].parentNode.insertBefore(desc,divs[i]);
      var usage = document.createElement('div');
      usage.className = "usage";
      usage.innerHTML = '<strong>HTML:</strong> &lt;* class="icon icon-' + font + '" data-icon="' + icon + '">';
      usage.innerHTML += '<br /><strong>Drupal:</strong> [icon-' + font + ':' + icon + ']';
      divs[i].parentNode.appendChild(usage);
    }
  }
  var styles = document.createElement('style');
  styles.innerHTML = 
    ".glyph { width: auto; height: 12em; }" +
    "h2.desc { text-align: left; color: #B35047; }" +
    "div.usage { font-size: 86%; text-align: left; }" +
    "input { display: none; }" +
    "section+div+section { display: none; }";
  document.body.appendChild(styles);
}







