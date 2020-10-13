<?php
    include('./explorer.php');

    if (isset($_POST['dir'], $_POST['name'])) {
        $dir = $_POST['dir'];
        $name = $_POST['name'];
    
        if ($name == 'null')
        {
            $name = '';
        }
    
    
        $ff_in_lib = ff_get_list($dir, $name,  array('.', '..', '.git'));
    
        $ff_in_lib = ff_sort_lib($ff_in_lib);
    
        echo json_encode($ff_in_lib);
    }
    else { // useful for debugging
        $dir = 'D:\Abdul Aziz\Dev\Projects\wde\htdocs';
        $name = '';
    
        $ff_in_lib = ff_get_list($dir, $name,  array('.', '..', '.git'));
    
        $ff_in_lib = ff_sort_lib($ff_in_lib); 

        foreach ($ff_in_lib as $ff) {
            foreach ($ff as $key=>$value) {
                echo $key . ":\t\t" . $value . '<br>';
            }
            echo '<br>';
        }
    }

?>