<?php 
    session_start();

    if (isset($_POST['edit']))
    {
        $_SESSION['file'] = $_SESSION['cur_dir'] . preg_filter("/Edit /", "", $_POST['edit']);

        header("Location: ./workspace/_editor.php");
    }
    elseif (isset($_POST['enter']))
    {
        if (preg_filter("/Enter /", "", $_POST['enter']) == "..") 
        {
            if ($_SESSION['rel_dir'] != ".\\")
            {        
                $_SESSION['cur_dir'] = preg_filter("/(\\\\\w+\\\\)$/", "", $_SESSION['cur_dir']) . "\\";
                $_SESSION['rel_dir'] = preg_filter("/(\\\\\w+\\\\)$/", "", $_SESSION['rel_dir']) . "\\";
            }
        }
        else
        {
            $_SESSION['cur_dir'] = $_SESSION['cur_dir'] . preg_filter("/Enter /", "", $_POST['enter']) . "\\";
            $_SESSION['rel_dir'] = $_SESSION['rel_dir'] . preg_filter("/Enter /", "", $_POST['enter']) . "\\";
        }
    }
    else 
    {
        exec("cd", $_current_dir);
        $_SESSION['cur_dir'] = $_current_dir[0] . "\\";
        $_SESSION['rel_dir'] = ".\\";
    }
    include("./workspace/_command.php");  
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/main.css">
    <title>Online Text Editor</title>
</head>
<body class="bg-dark-lighten text-light">
    
    <nav class="navbar navbar-dark bg-dark justify-content-center shadow">
        <h1 class="text-center font-weight-normal mt-3"><i class="far fa-infinity mr-3"></i>INFINITY FILE EXPLORER</h1>
    </nav>

    <main>

    <div class="table-responsive w-100">
        <div class="container">
            <h5><i class="fad fa-folders mr-3 mt-4"></i><?php echo $_SESSION['cur_dir']?></h5>
            <table class="table table-striped table-dark mt-4 w-100">
                <thead>
                    <tr>
                    <th scope="col">Sr.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Action</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Rename</th>
                    </tr>
                </thead>
                <tbody>
                    <?php 
                        echo '
                        <tr>
                            <th scope="row">1</th>
                            <td><i class="fad fa-folder mr-2"></i>Previous Folder</td>
                            <td>Folder</td>
                            <td>'.enter_or_edit("..").'</td>
                            <td><a href="#" class="btn btn-danger"><i class="fad fa-trash"></i></a></td>
                            <td><a href="#" class="btn btn-primary"><i class="fad fa-edit"></i></a></td>
                        </tr>
                        ';
        
                        $sr = 2;
                        foreach($dir as $key=>$value) {
                            $type = type($value);
                            echo '
                                <tr>
                                    <th scope="row">'.$sr.'</th>
                                    <td>'.simple_or_hyperlink($value, $_SESSION['rel_dir']).'</td>
                                    <td>'.type($value).'</td>
                                    <td>'.enter_or_edit($value).'</td>
                                    <td><a href="#" class="btn btn-danger"><i class="fad fa-trash"></i></a></td>
                                    <td><a href="#" class="btn btn-primary"><i class="fad fa-edit"></i></a></td>
                                </tr>
                            ';
                            $sr ++;
                        }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
    </main>
    
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>