<?php
    include("./include/file_system.php");

    $list_of_files = [];

    chdir(FOLDER::PREV_DIR); 
    # Change the working directory to where wde.html resides
    
    $list_of_files = get_array_of_dir();


?>


<?php
    disp_files_from_array($list_of_files);

?>