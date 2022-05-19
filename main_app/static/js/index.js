var editor = ace.edit("editor");
var beautify = ace.require("ace/ext/beautify");
const defaultCode = new DefaultCode();
var cssVariables = document.querySelector(':root');
editor.setTheme("ace/theme/chrome");
editor.session.setMode("ace/mode/c_cpp");
const selectedLanguage = document.getElementById("selectedLanguage");
document.getElementById('editor').style.fontSize = "18px";
selectedLanguage.innerText = "C (GCC 9.1.0)";
let selectedLangObj = {
    label: "C (GCC 9.1.0)",
    lang: "c",
    version: "0",
    mode: "c_cpp",
    extension: 'c'
};
editor.session.setValue(defaultCode.code[selectedLangObj.lang]);
document.getElementById('inputfile').accept = '.' + selectedLangObj.extension;

function run() {
    const run_btn = document.getElementById("run_btn");
    run_btn.innerText = "Compiling";
    var code = editor.getValue();
    console.log(code);
    if (!code) {
        alert("Please Enter write code ...");
        run_btn.innerText = "Run";
        return;
    }
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', 'http://localhost:3000');
    fetch("https://vv-ide.herokuapp.com/compile", {
        method: "POST",
        headers,
        mode: 'cors',
        body: JSON.stringify({
            "script": code,
            "language": selectedLangObj.lang,
            "versionIndex": selectedLangObj.version,
            "stdin": document.getElementById('stdin').value
        })
    }).then(res => {
        console.log(res);
        res.json().then((response) => {
            console.log(response);
            if (selectedLangObj.lang === 'php') {
                document.getElementById("compile_output").innerHTML = response.response.output;
            } else {
                document.getElementById("compile_output").innerText = response.response.output;
            }
            document.getElementById("compile_time").innerText = "Time: " + response.response.cpuTime + " ms";
            document.getElementById("compile_memory").innerText = "Memory: " + response.response.memory + " bytes";
            run_btn.innerText = "Run";
        }).catch(error => {
            console.log(error);
            alert("Could not compile code try later");
            run_btn.innerText = "Run";
        })
    }).catch(error => {
        console.log(error);
        alert("Could not compile code try later");
        run_btn.innerText = "Run";
    });
}

function showSettings() {
    $('#settings').css("display", "flex");
     
}

$('#settings').click(function (ev) {
    const settings = document.getElementById('settings');
    if (ev.target === settings)
        $('#settings').hide();
});

function saveSettings() {
    // handling the active line select value
    let activeLineSelectValue;
    const el = document.getElementsByName('activeLineSelect');
    for (let i = 0; i < el.length; i++) {
        if (el[i].checked) {
            activeLineSelectValue = el[i].value;
        }
    }
    editor.setShowPrintMargin(activeLineSelectValue);
    editor.setTheme("ace/theme/" + document.getElementById("themeSelect").value);
    const lang = JSON.parse(document.getElementById("languageSelect").value);
    if (selectedLangObj.lang !== lang.lang) {
        const check = confirm('It seems you had changed language \nIt will effect your code');
        if (check) {
            editor.session.setMode("ace/mode/" + lang.mode);
            editor.setValue(defaultCode.code[lang.lang]);
            selectedLangObj = lang;
            selectedLanguage.innerText = lang.label;
        }
    }
    document.getElementById('inputfile').accept = '.' + selectedLangObj.extension;
    document.getElementById('editor').style.fontSize = document.getElementById("fontSizeSelect").value + "px";
    $('#settings').hide();
}

function cancelSettings() {
    $('#settings').hide();
}

function downloadCode() {
    const name = "NEW FILE_" + selectedLangObj.lang + " " + new Date().toLocaleString();
    download(editor.getValue(), name + "." + selectedLangObj.extension, 'text/plain');
}

function download(strData, strFileName, strMimeType) {
    var D = document,
        A = arguments,
        a = D.createElement("a"),
        d = A[0],
        n = A[1],
        t = A[2] || "text/plain";

    //build download link:
    a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);


    if (window.MSBlobBuilder) { // IE10
        var bb = new MSBlobBuilder();
        bb.append(strData);
        return navigator.msSaveBlob(bb, strFileName);
    } /* end if(window.MSBlobBuilder) */



    if ('download' in a) { //FF20, CH19
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function() {
            var e = D.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
    }; /* end if('download' in a) */



    //do iframe dataURL download: (older W3)
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
    setTimeout(function() {
        D.body.removeChild(f);
    }, 333);
    return true;
}

function clearCode() {
    let confirm = window.confirm("Are you sure you want to reset code \nYou cannot get this code back");
    if (confirm)
        editor.session.setValue(defaultCode.code[selectedLangObj.lang]);
}

window.onbeforeunload = function (event) {
    return confirm("Confirm refresh");
};

function uploadCode(){
    document.getElementById('inputfile')
        .addEventListener('change', function() {

            var fr=new FileReader();
            fr.onload=function(){
                editor.setValue(fr.result);
            }
            fr.readAsText(this.files[0]);
        })
}
function showInfo(){
    window.open('Readme.md.html');
}