<?php
    include("./include/file_system.php");

    if (!isset($_SESSION['ABS_CUR_DIR']))
    {
        chdir(".\\..\\"); # Change the working directory to where wde.html resides
        
        $list = scandir(".\\");

        foreach ($list as $file)
        {
            echo $file . "<br>";
        }
        
        #list_files_in_directory();
    }
    else
    {
        #list_files_in_directory();
    }
    
?>