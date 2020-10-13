var tabs = {
    tabs: [],

    default: {
        session: null,
        message: '\n\tWelcome\n\tPlease Create a file or open a file to begin'
    },

    createli: function(tab) {
        var li = document.createElement('li');
        li.classList = 'nav-item active';
        li.setAttribute('data-path', tab.path);
        li.setAttribute('data-name', tab.name);
        return li;
    },
    
    createanchor: function() {
        var a = document.createElement('a');
        a.classList = 'nav-link text-light pl-3 pr-3';
        return a;
    },

    createcloseicon: function(tab) {
        var i = document.createElement('i');
        i.classList = 'far fa-times ml-2';
        i.setAttribute('data-path', tab.path);
        i.setAttribute('data-name', tab.name);
        return i;
    }
};

// Clear all child elements from the given element
function clearChildNodes(leftPanel) {
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
tabs.default.session = new EditSession(tabs.default.message);
editor.setSession(tabs.default.session);
updateTab();

// Open a new tab with the provided file
function opentab(path, file) {

    for(tab of tabs.tabs) {
        if ((path + file) == tab.path + tab.name) {
            activatetab(path, file);
            return false;
        }
    }

    var filecontent = fetch(path + file);
    var newSession = new EditSession(filecontent);

    var tab = {
        path: path,
        name: file,
        session: newSession
    };

    tabs.tabs.push(tab);

    editor.setSession(newSession);

    return true;
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
    clearChildNodes(tablist);
    //console.log(tabs);
    for(tab of tabs.tabs) {
        var li = tabs.createli(tab);
        var a = tabs.createanchor();
        var icon = tabs.createcloseicon(tab);
        a.appendChild(document.createTextNode(tab.name));
        icon.addEventListener('click', function() {
            event.stopPropagation();
            closetab(this, tabs.tabs);
        });
        a.appendChild(icon);

        li.appendChild(a);
        li.addEventListener('click', function() {
            activatetab(this.getAttribute('data-path'), this.getAttribute('data-name'));
        });

        tablist.appendChild(li);
    }
}

function closetab(e, tablist) {
    var tabref = getTabRef(e.getAttribute('data-path') + e.getAttribute('data-name'));
    var index = tablist.indexOf(tabref);
    if (index != 0) {
        editor.setSession(tablist[index - 1].session);
    }
    else {
        editor.setSession(tabs.default.session);
    }
    tablist.splice(tablist.indexOf(tabref), 1);
    updateTab();
}

function activatetab(path, name) {
    var tabref = getTabRef(path + name);
    editor.setSession(tabref.session);
}

function getTabRef(key) {
    for(tab of tabs.tabs) {
        if (key == (tab.path + tab.name)) {
            return tab;
        }
    }
}