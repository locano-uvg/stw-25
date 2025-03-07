    // agregar responsive al gridTemplateColumns
    let media = window.matchMedia("(max-width: 600px)");
    if (media.matches) {
        layout.style.gridTemplateColumns = "1fr";
    }
    media.addListener(function (e) {
        if (e.matches) {
            layout.style.gridTemplateColumns = "1fr";
        } else {
            layout.style.gridTemplateColumns = "repeat(" + columnas + ", 1fr)";
        }
    });