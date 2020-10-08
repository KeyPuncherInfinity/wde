<?php
    include('./explorer.php');

    $dir = $_POST['dir'];

    //$dir = './../../../.';

    $ff_in_lib = ff_get_list($dir,  array('.', '..'));

    echo json_encode($ff_in_lib);
?>