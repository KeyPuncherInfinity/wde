<?php 
    exec("dir /B /OG /ON \"{$_SESSION['cur_dir']}\" ", $dir);

    function type($file) 
    {
        $file_type = preg_split("/\./", $file);
        if (sizeof($file_type) < 2)
        {
            return "Folder";
        }
        else
        {
                return $file_type[1];
        }
    }

    function simple_or_hyperlink($file, $path) 
    {

        if (type($file) == "Folder")
        {
            return "<i class=\"fad fa-folder mr-2\"></i> $file";
        }
        else
        {
            return "<a class=\"text-info\" href=\"#!" . $path . "$file\"> <i class=\"fad fa-file mr-2\"></i> $file <a>";
        }
    }

    function enter_or_edit($file)
    {

        if ($file == "..") 
        {
            return (
                "<form method=\"POST\" action\"" . $_SERVER['PHP_SELF'] . "\">" . 
                    "<input type=\"Submit\" value=\"Enter $file\" name=\"enter\" class=\"btn btn-block btn-outline-light\">" .
                "</form>"
            );
        }

        if (type($file) == "Folder")
        {
            return (
            "<form method=\"POST\" action\"" . $_SERVER['PHP_SELF'] . "\">" . 
                "<input type=\"Submit\" value=\"Enter $file\" name=\"enter\" class=\"btn btn-block btn-outline-light\">" .
            "</form>"
            );
        }
        else
        {
            return (
            "<form method=\"POST\" action\"" . $_SERVER['PHP_SELF'] . "\">" .
                "<input type=\"Submit\" value=\"Edit $file\" name=\"edit\" class=\"btn btn-block btn-outline-light\">" .
            "</form>"
            );
        }
    }


?>