<?php 

    if (isset($_POST['path'], $_POST['name'], $_POST['new_dir'])) 
    {
        $path = $_POST['path'];
        $name = $_POST['name'];
        $new_dir = $_POST['new_dir'];

        if (mkdir($path . $name . '\\' . $new_dir))
        {
            echo '1';
        }
        else 
        {
            echo '0';
        }
    }
    else
    {
    }

?>