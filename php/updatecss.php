<?php

// path where we fine the control files (*.txt) and the css files (*.css)
$input_path = realpath(dirname(__FILE__) . '/../css/compliance/develop');
$control_files = $input_path . '/*.txt'; 
// path where we write the minified css
$output_path = realpath(dirname(__FILE__) . '/../css/compliance/mini');

$files = glob($control_files);
foreach ($files as $file) {
  echo "Processing {$file}\n";
 
  $output_name = str_replace(".txt", ".css", basename($file));
  $output_file = "{$output_path}/{$output_name}";

  $control_file = explode("\n", file_get_contents($file));
  $output = ""; 
  foreach ($control_file as $line) {
    if (strlen(trim($line)) > 0) {
      echo "- Including {$input_path}/{$line}\n";

      $output .= "<!-- {$line} -->\n";
      $output .= file_get_contents("{$input_path}/{$line}");
    }
  }

  // get size of files
  $start_length = strlen($output);

  // // remove all comments
  // $output = preg_replace('#/\*.*\*/#Uusm', '', $output);
  // // replace multiple spaces with single space
  // $output = preg_replace('#[ \t]+#', ' ', $output);
  // // remove space at start and end of line
  // $output = preg_replace('#^ #Uusm', '', $output);
  // $output = preg_replace('# $#Uusm', "\n", $output);
  // // remove empty lines
  // $output = preg_replace('#(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+#', "\n", $output);
  
  // // remove leading spaces and trailing semicolon+spaces from css properties
  // $output = preg_replace('#{\s+#', '{', $output);
  // $output = preg_replace('#;?\s+}#', '}', $output);

  // // remove space between properties
  // $output = preg_replace('#: #', ':', $output);
  // $output = preg_replace('#;[ \n]#', ';', $output);
  // $output = preg_replace('#,[ \n]#', ',', $output);

  // replace html comment (inserted by this script) with php comments
  $output = preg_replace('#<!--#', '/*', $output);  
  $output = preg_replace('#-->#', '*/', $output);  

  $end_length = strlen($output);
  
  echo "Writing to {$output_file} - saved " . ($start_length - $end_length) . "bytes\n";
  file_put_contents($output_file, $output);

} 
