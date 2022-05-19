const themes = [
    "chrome",
    "cobalt",
    "merbivore",
   
];
const themeSelect = document.getElementById("themeSelect");
for (let i = 0 ; i < themes.length; i++){
    themeSelect.options[themeSelect.options.length] = new Option(themes[i], themes[i]);
}