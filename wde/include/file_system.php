<?php
    class FILES
    {
        public $name;
        public $path;
        public $type;

    }

    class FILE EXTENDS FILES
    {
        public $extension;
        public $size;

        function __construct($name)
        {
            $this->type = "file";
            $this->name = $name;
        }
    }

    class FOLDER EXTENDS FILES
    {
        public const PREV_DIR = ".\\..";
        public const CURR_DIR = ".\\";

        public $isempty;
        public $sub_dir;

        function __construct($name)
        {   
            $this->type = "dir";
            $this->name = $name;
        }
    }


/*     function get_array_of_dir()
    {
        $list = scandir(FOLDER::CURR_DIR);
        $list_of_files = [];
        foreach ($list as $file) 
        {
            if ($file == "." || $file == ".." || $file == ".git")
                continue;
            if (is_dir("$file"))
            {
                $file_object = new FOLDER($file);
                $file_object->name = "$file";
            }
            else
            {
                $file_object = new FILE($file);
            }
            array_push($list_of_files, json_encode($file_object));
        }

        return json_encode($list_of_files);
    } */


    function get_array_of_dir($dir)
    {
        chdir($dir);
        $list = scandir(FOLDER::CURR_DIR);
        $list_of_files = Array();

        foreach ($list as $file)
        {
            if ($file == "." || $file == ".." || $file == ".git")
                continue;
            if (is_dir("$file"))
            {
                $file_object = new FOLDER($file);
                $file_object->name = "$file";
            }
            else
            {
                $file_object = new FILE($file);
            }
            array_push($list_of_files, json_encode($file_object));
        }

        return json_encode($list_of_files);
    }
?>