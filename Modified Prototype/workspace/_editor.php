<?php 

    session_start();
    if (isset($_POST['location'])) 
    {
        $file =  $_POST['location'];
    }
    else
    {
        $file = $_SESSION['file'];
    }

    if (isset ($_POST['save']))
    {
        file_put_contents($_POST['location'], $_POST['code']);
        header("Location: ../index.php");
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../assets/css/main.css">
    <title>Online Text Editor</title>
</head>
<body class="bg-dark-lighten text-light">
    
    <nav class="navbar navbar-dark bg-dark justify-content-center shadow">
        <h1 class="text-center font-weight-normal mt-3"><i class="far fa-infinity mr-3"></i>INFINITY FILE EXPLORER</h1>
    </nav>

    <main>

        <div class="container mt-5">            
        <div class="pb-4">
            <?php 
                echo $file;
            ?>
        </div>
        <form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
            <textarea class="form-control bg-dark text-light p-2" style="width: 98%; height: 100%;" rows="16" name="code" id="tarea" onkeydown="return filter(event)"><?php echo "\n" . file_get_contents($file);?></textarea>
            <input type="text" value="<?php echo $file;?>" name="location"style="visibility: hidden;">
            <input type="submit" value="Save Changes" name="save" class="mt-3 mr-4 float-right btn btn-success" >
        </form>
    </div>

    </main>
    
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="_editor_script.js"></script>
</body>
</html>