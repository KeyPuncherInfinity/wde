/* function initExplorer() {
    setInterval(updateFileFolder, 2000);
} */

var list_of_files = [];

function updateFileFolder() {
    var requestList = new XMLHttpRequest();
    requestList.open("POST", "./request/file_folder_list.php", true);
    requestList.send();
    if (requestList.DONE) {
        requestList.onreadystatechange = updateList; 
    }

}

function updateList() {
    var requestList = JSON.parse(this.responseText);

    var list = createList(requestList);
    console.log(list);
}

function createList(arg) {

    var dir = [];

    for (item of arg) {
        var obj = JSON.parse(item);
        if (obj.type == "dir") {
            //obj.subdir = createList(JSON.parse(obj.subdir));
        }
        dir.push(obj);
    }

    return dir;
}
