<?php
    include('./explorer.php');

    $dir = $_POST['dir'];
    $name = $_POST['name'];

    #$dir = 'D:\Abdul Aziz\Dev\Projects\wde\htdocs\Editor';
    #$name = 'null';

    if ($name == 'null')
    {
        $name = '';
    }


    $ff_in_lib = ff_get_list($dir, $name,  array('.', '..', '.git'));

    echo json_encode($ff_in_lib);
?>