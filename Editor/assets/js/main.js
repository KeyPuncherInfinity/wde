var tabs = {
    tabs: [],

    createli: function() {
        var li = document.createElement('li');
        li.classList = 'nav-item active';
        return li;
    },
    
    createanchor: function() {
        var a = document.createElement('a');
        a.classList = 'nav-link text-light pl-3 pr-3';
        return a;
    },

    createcloseicon: function() {
        var i = document.createElement('i');
        i.classList = 'far fa-times ml-2';
        return i;
    }
};

// Clear all child elements from the given element
function clear(leftPanel) {
    leftPanel.innerHTML = '';
}



$(document).ready(function() {

    //Adding tabular spaces
    document.getElementById('editor').addEventListener('keydown', function(e) {
        if (e.key == 'Tab') {
            e.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            this.value = this.value.substring(0, start) +
            "\t" + this.value.substring(end);

            // put caret at right position again
            this.selectionStart =
            this.selectionEnd = start + 1;
        }
    });


});

var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");
editor.setOptions({
    fontSize: "16px"
});
editor.setShowPrintMargin(false);
var EditSession = require('ace/edit_session').EditSession;

// Open a new tab with the provided file
function opentab(path, file) {

    var filecontent = fetch(path + file);
    var newSession = new EditSession(filecontent);

    var tab = {
        name: file,
        session: newSession
    };

    tabs.tabs.push(tab);

    editor.setSession(newSession);
}

// get contents of a file to open it in the wde
function fetch(file) {
    var fileReq = new XMLHttpRequest();
    fileReq.open('POST', './assets/php/file_content.php', false); // Find a better way to do this*
    fileReq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            ;
        }
    }
    fileReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    fileReq.send("file=" + file);
    return fileReq.responseText;
}

// Refresh tab list
function updateTab() {

    tablist = document.getElementById('tab-list');
    clear(tablist);
    //console.log(tabs);
    for(tab of tabs.tabs) {
        var li = tabs.createli();
        var a = tabs.createanchor();
        a.appendChild(document.createTextNode(tab.name));
        a.appendChild(tabs.createcloseicon());
        li.appendChild(a);

        tablist.appendChild(li);
    }
}

