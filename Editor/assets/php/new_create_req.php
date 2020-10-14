<?php 

    if (isset($_POST['path'], $_POST['name'], $_POST['new_name'], $_POST['type'])) 
    {
        $path = $_POST['path'];
        $name = $_POST['name'];
        $new_name = $_POST['new_name'];
        $type = $_POST['type'];

        if ($type == 'dir')
        {
            if (mkdir($path . $name . '\\' . $new_name))
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
            $new_file = fopen($path . $name . '\\' . $new_name, "w");
            fclose($new_file);

            if (file_exists($path . $name . '\\' . $new_name)) 
            {
                echo '1';
            }
            else
            {
                echo '0';
            }
        }
    }
    else
    {
    }

?>