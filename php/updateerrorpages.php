<?php
if (strpos(dirname(__FILE__), 'www.ebi.ac.uk') === FALSE) {
  // not on production server
  $template_service = "http://wwwint.ebi.ac.uk/web/template-service/dev/templates/compliance/services/full";
  $main_domain = "http://www.ebi.ac.uk";
//  $main_domain = "http://wwwdev.ebi.ac.uk";
}
else {
  $template_service = "http://wwwint.ebi.ac.uk/web/template-service/prod/templates/compliance/services/full";
  $main_domain = "http://www.ebi.ac.uk";
}
$output_path = realpath(dirname(__FILE__) . '/../html/errorpages');

$base_pages = array(
  array(
    'src' => $main_domain . '/not-found',
    'dest' => $output_path . '/404.html',
    'body-class' => 'error-not-found',
  ),
  array(
    'src' => $main_domain . '/access-denied',
    'dest' => $output_path . '/403.html',
    'body-class' => 'error-access-denied',
  ),
  array(
    'src' => $main_domain . '/access-denied-industry',
    'dest' => $output_path . '/403-industry.html',
    'body-class' => 'error-access-denied-industry',
  ),
  array(
    'src' => $main_domain . '/access-denied-login',
    'dest' => $output_path . '/403-login.html',
    'body-class' => 'error-access-denied-login',
    'js' => "document.cookie.split(';').map(function(text) { text=text.replace(/^\s+/,''); if (text.indexOf('X-Mapping-') !== -1) { document.cookie=text.split('=')[0] + '=; Max-Age=0; Path=/'; } return text; })",
  ),
  array(
    'src' => $main_domain . '/server-error',
    'dest' => $output_path . '/500.html',
    'body-class' => 'error-server-error',
  ),
/*
  array(
    'src' => $main_domain . '/maintenance',
    'dest' => $output_path . '/maintenance.html',
    'body-class' => 'error-maintenance',
  ),
*/
);

// get pages from live site
foreach ($base_pages as &$base_page) {
  echo "Reading {$base_page['src']}\n";

  $ch = curl_init($base_page['src']);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  $page = curl_exec($ch);
  $http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);

  // stop if error
  if (!($http == '200' || $http == '304') || $page === FALSE) {
    exit("Error reading {$base_page['src']}, response: {$http}");
  }

  // ensure there are no comments in the content
  $page = preg_replace('#<!--.*-->#Usm', '', $page); 
  
  // extract the content details
  preg_match('#<div id="content"[^>]*>.*(<section.*</section>)\s*</div>\s*<footer#Usm', $page, $matches); //\s*(<section.*</section>)\s+</div>\s+<footer#Usm', $page, $matches);
  $base_page['content'] = trim($matches[1]);
  // remove unnecessary classes and ids 
  $base_page['content'] = preg_replace('#\s(id|class)="(node|field)[^"]*"#Usm', '', $base_page['content']);
  $base_page['content'] = preg_replace('#\s(property|about|typeof)="[^"]*"#Usm', '', $base_page['content']);

  preg_match('#<title[^>]*>(.*)</title>#Usm', $page, $matches);
  $base_page['html_title'] = decode_entities(trim($matches[1]));

  preg_match('#<h1[^>]*>(.*)</h1>#Usm', $page, $matches);
  $base_page['page_title'] = decode_entities(trim($matches[1]));
//}

//foreach ($base_pages as &$base_page) {
  echo "Reading {$template_service} with POST\n";

  // create template from template service
  $ch = curl_init($template_service);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
 
  // post data
  $data = array(
    'globalTemplate' => array(
      'title' => $base_page['html_title'],
    ),
    "localMasthead" => array(
      'title' => $base_page['page_title'],
      'homepageUrl' => '/',
    ),
    'globalFooter' => 1,  // true to add the global footer
  );
  $data_string = json_encode($data);
  curl_setopt($ch, CURLOPT_POSTFIELDS, urlencode($data_string));

  // write to file
  $template = curl_exec($ch);
  $http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);

  if (!($http == '200' || $http == '304') || $template === FALSE) {
    exit("Error reading {$base_page['dest']}, response: {$http}");
  }

  $template = preg_replace('#<!-- local-nav -->.*<!-- /local-nav -->#Usm', '', $template);
  $template = preg_replace('#(class="[^"]*)active([^"]*")#Usm', '$1$2', $template);
  $template = str_replace('level2', 'level1 page-error ' . isset($base_page['body-class']) ? $base_page['body-class'] : '', $template);
  $template = str_replace('##contentHTML##', $base_page['content'], $template);
  if (isset($base_page['js'])) {
    echo "Adding JS\n";
    $template = str_replace('</body>', '<script>' . $base_page['js'] . '</script></body>', $template);
  }

  echo "Writing {$base_page['dest']}\n";

  if (file_put_contents($base_page['dest'], $template) === FALSE) {
    exit("Error writing to {$base_page['dest']}");
  }
}



function decode_entities($text) {
    $text= html_entity_decode($text,ENT_QUOTES,"ISO-8859-1"); #NOTE: UTF-8 does not work!
    $text= preg_replace('/&#(\d+);/me',"chr(\\1)",$text); #decimal notation
    $text= preg_replace('/&#x([a-f0-9]+);/mei',"chr(0x\\1)",$text);  #hex notation
    return $text;
}
