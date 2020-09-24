<?php

    if(false)
    {
        ;
    }
    else
    {
        session_name("wde_session");
        session_start();
        $_SESSION['ABS_CUR_DIR'] = dirname(realpath(".\..\wde.html"));
        echo $_SESSION['ABS_CUR_DIR'] . "<br>";
        session_write_close();
    }

?>