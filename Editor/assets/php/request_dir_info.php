<?php
    include('./explorer.php');

    $dir = $_POST['dir'];
    $name = $_POST['name'];

    if ($name == 'null')
    {
        $name = '';
    }

    //$dir = './../../../.';

    $ff_in_lib = ff_get_list($dir, $name,  array('.', '..', '.git'));

    echo json_encode($ff_in_lib);
?>