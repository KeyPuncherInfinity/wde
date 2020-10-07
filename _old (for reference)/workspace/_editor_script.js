function filter (e) {
    console.log(e);
    let k = new KeyboardEvent("keypress");
    console.log(k);
    k.key("n");
    if (e.key == 'Tab') {
        let tarea = document.getElementById("tarea");
        return false;
    }
}
