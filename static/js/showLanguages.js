const languages = [
     
    {
        label: "C (GCC 9.1.0)",
        lang: "c",
        version: "4",
        mode: "c_cpp",
        extension: 'c'
    },
    //done
    
    {
        label: "C++ (GCC 9.1.0)",
        lang: "cpp",
        version: "4",
        mode: "c_cpp",
        extension: 'cpp'
    },
    // done
    {
        label: "C++ 14 (g++ 14 GCC 9.1.0)",
        lang: "cpp14",
        version: "4",
        mode: "c_cpp",
        extension: 'cpp'
    },
    // Done
    {
        label: "C++ 17 (g++ 14 GCC 9.10)",
        lang: "cpp17",
        version: "1",
        mode: "c_cpp",
        extension: 'cpp'
    },
     
    // Done
    {
        label: "Java (JDK 1.8.0_66)",
        lang: "java",
        version: "0",
        mode: 'java',
        extension: 'java'
    },
    {
        label: "Java (9.0.1)",
        lang: "java",
        version: "1",
        mode: 'java',
        extension: 'java'
    },
    {
        label: "Java (10.0.1)",
        lang: "java",
        version: "2",
        mode: 'java',
        extension: 'java'
    },
    {
        label: "Java (11.0.4)",
        lang: "java",
        version: "3",
        mode: 'java',
        extension: 'java'
    },
     
    // Done
     
    {
        label: "Python 2 (2.7.16)",
        lang: "python2",
        version: "2",
        mode: "python",
        extension: 'py'
    },
    // Done
     
    {
        label: "Python 3 (3.7.4)",
        lang: "python3",
        version: "3",
        mode: "python",
        extension: 'py'
    },
    // Done
    {
        label: "SQL (SQLite 3.9.2)",
        lang: "sql",
        version: "0",
        mode: "sql",
        extension: 'sql'
    },
    {
        label: "SQL (SQLite 3.29.0)",
        lang: "sql",
        version: "3",
        mode: "sql",
        extension: 'sql'
    },
    // Done
     
]

const languageSelect = document.getElementById("languageSelect");
for (let i = 0 ; i < languages.length; i++){
    languageSelect.options[languageSelect.options.length] = new Option(languages[i].label, JSON.stringify(languages[i]));
}
