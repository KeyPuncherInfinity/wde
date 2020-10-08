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

    function __construct($name, $path)
    {
        $this->type = "file";
        $this->name = $name;
        $this->path = $path;
    }
}

class FOLDER EXTENDS FILES
{
    public const PREV_DIR = ".\\..";
    public const CURR_DIR = ".\\";

    public $subdir;

    function __construct($name, $path)
    {   
        $this->type = "dir";
        $this->name = $name;
        $this->path = $path;
    }
}

function ff_get_list($dir, $name, $ignore)
{
    $ff_obj_list = array();

    $ff_list = scandir($dir . $name);

    $ff_list = ff_unset($ff_list, $ignore);

    foreach ($ff_list as $ff)
    {
        if (is_dir($dir . $name . '/' . $ff))
        {
            $ff_obj = new FOLDER($ff, $dir . $name . '/');
        }
        else
        {
            $ff_obj = new FILE($ff, $dir . $name . '/');
        }

        array_push($ff_obj_list, $ff_obj);
    }

    return $ff_obj_list;

}


function ff_unset($ff_list, $array)
{
    foreach ($array as $val2unset)
    {
        unset($ff_list[array_search($val2unset, $ff_list)]);
    }
    return $ff_list;
}

?>