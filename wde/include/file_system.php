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
    }

    class FOLDER EXTENDS FILES
    {
        public const PREV_DIR = ".\\..";
        public const CURR_DIR = ".\\";

        public $isempty;
        public $sub_dir;


        function is_empty()
        {
            chdir(FOLDER::CURR_DIR . "$this->name");
            $list = scandir(FOLDER::CURR_DIR);
            $this->sub_dir = get_array_of_dir();
            chdir(FOLDER::PREV_DIR);
        }

        function __construct($name)
        {   
            $this->type = "dir";
            $this->name = $name;
            if (!$this->is_empty())
            {

            }
        }
    }


    function disp_files_from_array($list) # throwaway function
    {
        foreach($list as $files)
        {   
            if ($files->type == "dir")
            {
                disp_files_from_array($files->sub_dir);
            }
            else
            {
                echo $files->name . "<br>";
            }
        }
    }

    function get_array_of_dir()
    {
        $list = scandir(FOLDER::CURR_DIR);
        $list_of_files = [];
        foreach ($list as $file) 
        {
            if ($file == "." || $file == "..")
                continue;
            if (is_dir("$file"))
            {
                $file_object = new FOLDER($file);
            }
            else
            {
                $file_object = new FILE();
                $file_object->name = "$file";
            }
            array_push($list_of_files, $file_object);
        }

        return $list_of_files;
    }

?>