<?php
    include("./../include/file_system.php");

    $list_of_files = array();

    $list_of_files = get_array_of_dir($_POST['']);

    echo $list_of_files;
?>