var library = {
    path: "./../../..",
    name: null,
    type: "dir",
    subdir: null
}


function init() {
    setInterval(updateLibrary, 2000);
}

function updateLibrary() {
    sendReq(library);
    updateExplorer();
}

function sendReq(dir) {
    var httpReq = new XMLHttpRequest();
    httpReq.open('POST', './assets/php/request_dir_info.php', true);
    httpReq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //console.log('Response: ' + this.responseText);
            linkToLibrary(dir, this.responseText);
            //console.log(dir.subdir);
        }
    }
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.send("dir=" + dir.path + "&name=" + dir.name);
    
}

function linkToLibrary(dir, responseText) {
    dir.subdir = JSON.parse(responseText);

    for($ff of dir.subdir)
    {
        //console.log(library.subdir);
        if ($ff.type == 'dir')
        {
            sendReq($ff);
        }
    }
    
    //console.log(dir);
}

function updateExplorer() {
    console.log(library);

    //setTimeout(0, createLibraryList(Library));
    createLibraryList(Library);
}

function createLibraryList(lib) {
    var li = document.createElement('li');
    li.class = 'nav-item pl-3';
    var
    for(ff of lib) {
        //if ()
    }
}