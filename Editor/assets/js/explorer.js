var library = {
    path: null,
    name: null,
    type: "dir",
    subdir: null
}


var fofi = {

    currentfolder: null,

    createli: function(ff) {
        var li = document.createElement('li');
        li.classList = 'nav-item pl-3';
        li.setAttribute('data-name', ff.name);
        li.setAttribute('data-path', ff.path);
        li.setAttribute('data-visibility', 'hidden');
        return li;
    }, 

    createanchor: function() {
        var a = document.createElement('a');
        a.classList = 'nav-link text-light';
        a.href='#';
        return a;
    },

    createfileicon: function() {
        var i = document.createElement('i');
        i.classList = 'fas fa-file-code';
        return i;
    },

    createfoldericon: function() {
        var i = document.createElement('i');
        i.classList = 'fas fa-folder';
        return i;
    },

    createchevronright: function() {
        var i = document.createElement('i');
        i.classList = 'far fa-chevron-right mr-2';
        return i;
    }
}


/* 
    Send request for list of files and folders
    Request is made recursively to recieve all child directories as well
*/
function updateLibrary() {
    sendReq(library);
    updateExplorer();
}

function sendReq(dir) {
    var httpReq = new XMLHttpRequest();
    httpReq.open('POST', './assets/php/request_dir_info.php', false); // Find a better way to do this*
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

    for(ff of dir.subdir)
    {
        //console.log(library.subdir);
        if (ff.type == 'dir')
        {
            sendReq(ff);
        }
    }
    //console.log(dir);
}


/* 
    The list recieved is added to the left panel
*/
function updateExplorer() {   
    var leftPanel = document.getElementById('main-ul');
    clearChildNodes(leftPanel); // First clear the panel before adding to the list
    unhidelist(leftPanel, library);
}

// gets reference to a directory/file given the starting location

function getFileRef(path, name, lib) {
    regex = new RegExp(lib.path.replace(/\\/g, '\\\\'));
    //console.log(path);
    path = path.replace(regex, '');
    //console.log(path + name);
    path = path.split('\\');
    //console.log(path);


    return FileRef(path, name, library.subdir);
}


function FileRef (path, name) {
    
    lib = library.subdir;
    for (var i = 1; i < path.length - 1; i++) {
        for(var dir of lib) {
            if (dir.name == path[i]) {
                lib = dir.subdir;
                break;
            }
        }    
    }

    //console.log(lib);
    for (dir of lib) {
        if (dir.name == name) {
            //console.log(dir);
            return dir;
        }
    }
}


// This lists all files and folders contained within the parent folder
function unhidelist(parent, dir) {

    //clearChildNodes(parent);

    var ul = document.createElement('ul');
    ul.classList = 'navbar-nav panel font-size-14';
    ul.id = 'fofi-list';

    for (ff of dir.subdir) {
        if (ff.type == 'dir') {
            var ele = createFolderElement(ff);
        }
        else {
            var ele = createFileElement(ff);
        }
        ul.appendChild(ele);
    }
    parent.appendChild(ul);
}

// This hides the files and folders by clearing the parent of all child nodes
function hidelist(parent) {
    clearChildList(parent);
}

// Toggles between hidden and visibile of directories
function toggleSubDir(e) {
    //console.log(e.getAttribute('data-path') + e.getAttribute('data-name'));
    var fileref = getFileRef(e.getAttribute('data-path'), e.getAttribute('data-name'), library);
    //console.log(fileref);

    if (e.getAttribute('data-visibility') == 'hidden') {
        unhidelist(e, fileref);
        e.setAttribute('data-visibility', 'visibile');
    }
    else {
        hidelist(e);
        e.setAttribute('data-visibility', 'hidden');
    }

}


// Create a folder element
function createFolderElement(f) {

    var li = fofi.createli(ff);
    var a = fofi.createanchor();
    li.appendChild(a);
    a.appendChild(fofi.createchevronright());
    a.appendChild(fofi.createfoldericon());
    a.appendChild(document.createTextNode(' ' + f.name));

    li.addEventListener('click', function() {
        event.stopPropagation();
        selectfolder(this);
        toggleSubDir(this);
    })
    return li;
}

// Create a file element
function createFileElement(f) {
    
    var li = fofi.createli(ff);
    var a = fofi.createanchor();
    li.appendChild(a);
    a.appendChild(fofi.createfileicon());
    a.appendChild(document.createTextNode(' ' + f.name));

    li.addEventListener('click', function () {
        //console.log(this.getAttribute('data-name'));
        event.stopPropagation();
        openNewTab(this.getAttribute('data-path'), this.getAttribute('data-name'));
    })
    return li;
}

function clearChildList(parent) {
    parent.removeChild(parent.childNodes[1]);
}

function openNewTab(path, file) {
    if (opentab(path, file)) { 
        updateTab(); // No need to update tab list if opening a duplicate file
    }
}

function selectfolder(e) {
    if (fofi.currentfolder != null) {
        fofi.currentfolder.removeAttribute('id');
        fofi.currentfolder.removeAttribute('style');
    }
    fofi.currentfolder = e;
    fofi.currentfolder.setAttribute('id', 'selected');
    fofi.currentfolder.setAttribute('style', 'background: #3f75cc;')
}


// Most functions required to create a folder
function createFolder() {
    //console.log(fofi.currentfolder.getAttribute('data-path') + fofi.currentfolder.getAttribute('data-name'));
    document.getElementById('new-folder').style.display = 'flex';
}

function closeprompt() {
    document.getElementsByClassName('new-prompt')[0].style.display = 'none';
    document.getElementsByClassName('new-prompt')[1].style.display = 'none';
}

function createfolderinlibrary() {
    closeprompt();
    var newname = document.getElementById('new-folder-name').value;
    document.getElementById('new-folder-name').value = null;

    var folderReq = new XMLHttpRequest();
    folderReq.open('POST', './assets/php/new_create_req.php', true);
    folderReq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == 1) {
                var ref = getFileRef(fofi.currentfolder.getAttribute('data-path'), fofi.currentfolder.getAttribute('data-name'), library);
                sendReq(ref);
                hidelist(fofi.currentfolder);
                unhidelist(fofi.currentfolder, ref);
            }
        }
    }
    folderReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    folderReq.send("path=" + fofi.currentfolder.getAttribute('data-path') + "&name=" + fofi.currentfolder.getAttribute('data-name') + "&new_name=" + newname + "&type=dir");    
}

// Most functions required to create a file

function createFile() {
    document.getElementById('new-file').style.display = 'flex';
}

function createfileinlibrary() {
    closeprompt();
    var newname = document.getElementById('new-file-name').value;
    document.getElementById('new-file-name').value = null;
    var folderReq = new XMLHttpRequest();
    folderReq.open('POST', './assets/php/new_create_req.php', true);
    folderReq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            if (this.responseText == 1) {
                var ref = getFileRef(fofi.currentfolder.getAttribute('data-path'), fofi.currentfolder.getAttribute('data-name'), library);
                sendReq(ref);
                hidelist(fofi.currentfolder);
                unhidelist(fofi.currentfolder, ref);
                openNewTab(fofi.currentfolder.getAttribute('data-path') + fofi.currentfolder.getAttribute('data-name') + '\\', newname);
            }
        }
    }
    folderReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    folderReq.send("path=" + fofi.currentfolder.getAttribute('data-path') + "&name=" + fofi.currentfolder.getAttribute('data-name') + "&new_name=" + newname + "&type=file");
}


// Gets the root path of the library
function initlibrary() {
    var libRootReq = new XMLHttpRequest();
    libRootReq.open('POST', './assets/php/root_path.php', false); // Find a better way to do this*
    libRootReq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            library.path = this.responseText;
        }
    }
    libRootReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    libRootReq.send();
}


// Tasks to perform when the page loads
$(document).ready(function() {
    initlibrary();
    updateLibrary();
});