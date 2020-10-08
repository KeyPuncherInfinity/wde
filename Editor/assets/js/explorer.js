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

    mainUL = document.getElementById('main-ul');
    list = createLibraryList(library);
    mainUL.append(list);
}

function createLibraryList(lib) {
    var li = document.createElement('li');

    for(ff of lib.subdir) {
        if (ff.type == 'dir') {
            li.append(createFolderElement(ff));
        }
        else {
            li.append(createFileElement(ff));
        }
    }

    return li;
}

function createFileElement(f) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    var iDropdown = document.createElement('i');
    var iFolder = document.createElement('i');
    var name = document.createTextNode(' ' + f.name);
    li.classList = 'nav-item pl-3'
    a.href = '#';
    a.classList = 'nav-link text-light';
    iDropdown.classList = "far fa-chevron-right mr-2";
    iFolder.classList = "fas fa-file";

    a.append(iDropdown, iFolder, name);
    li.append(a);

    if (f.type == 'dir') {
        li.append(createLibraryList(f));
    }
    return li;
}

function createFolderElement(f) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    var iDropdown = document.createElement('i');
    var iFolder = document.createElement('i');
    var name = document.createTextNode(' ' + f.name);
    li.classList = 'nav-item pl-3'
    a.href = '#';
    a.classList = 'nav-link text-light';
    iDropdown.classList = "far fa-chevron-right mr-2";
    iFolder.classList = "fas fa-folder";

    a.append(iDropdown, iFolder, name);
    li.append(a);

    if (f.type == 'dir') {
        li.append(createLibraryList(f));
    }
    return li;

}