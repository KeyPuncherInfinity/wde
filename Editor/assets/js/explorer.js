var library = {
    path: "./../../..",
    name: null,
    type: "dir",
    subdir: null
}


var fofi = {
    createli: function(ff) {
        var li = document.createElement('li');
        li.classList = 'nav-item pl-3';
        li.setAttribute('data-name', ff.name);
        li.setAttribute('data-path', ff.path);
        return li;
    }, 

    createanchor: function() {
        var a = document.createElement('a');
        a.classList = 'nav-link text-light';
        return a;
    },

    createfileicon: function() {
        var i = document.createElement('i');
        i.classList = 'fas fa-file';
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
function init() {
    setInterval(updateLibrary, 2000);
}
 */


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


/* 
    The list recieved is added to the left panel
*/
function updateExplorer() {   
    var leftPanel = document.getElementById('main-ul');
    clear(leftPanel); // First clear the panel before adding to the list
    unhidelist(leftPanel, library);
}



// This lists all files and folders contained within the parent folder
function unhidelist(parent, dir) {

    clear(parent);

    var ul = document.createElement('ul');
    ul.classList = 'navbar-nav panel font-size-14';

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
function hidelist(dir) {
    clear(dir);
}

// Create a folder element
function createFolderElement(f) {

    var li = fofi.createli(ff);
    var a = fofi.createanchor();
    li.appendChild(a);
    a.appendChild(fofi.createchevronright());
    a.appendChild(fofi.createfoldericon());
    a.appendChild(document.createTextNode(' ' + f.name));
    return li;
}

// Create a file element
function createFileElement(f) {
    
    var li = fofi.createli(ff);
    var a = fofi.createanchor();
    li.appendChild(a);
    a.appendChild(fofi.createchevronright());
    a.appendChild(fofi.createfileicon());
    a.appendChild(document.createTextNode(' ' + f.name));

    li.addEventListener('click', function () {
        //console.log(this.getAttribute('data-name'));
        openNewTab(this.getAttribute('data-path'), this.getAttribute('data-name'));
    })
    return li;
}

function openNewTab(path, file) {
    opentab(path, file);
    updateTab();
}