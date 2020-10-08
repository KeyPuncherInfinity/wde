var library = {
    path: "./../../../",
    name: ".",
    subdir: null
}


function init() {
    setInterval(updateLibrary, 2000);
}

function updateLibrary() {
    sendReq(library);
}

function sendReq(dir) {
    var httpReq = new XMLHttpRequest();
    httpReq.open('POST', './assets/php/request_dir_info.php', true);
    httpReq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //console.log('Response: ' + this.responseText);
            linkToLibrary(dir, this.responseText);
            console.log(dir.subdir);
        }
    }
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.send("dir=" + dir.path + dir.name);
    
}

function linkToLibrary(dir, responseText) {
    dir.subdir = JSON.parse(responseText);
}