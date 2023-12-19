const folderData = {
    id: "1",
    name: "root",
    isFolder: true,
    code: '',
    items: [
        {
            id: "2",
            name: "public",
            isFolder: true,
            code: '',
            items: [
                {
                    id: "3",
                    name: "public nested 1",
                    isFolder: true,
                    code: '',
                    items: [
                        {
                            id: "4",
                            name: "index.html",
                            isFolder: false,
                            code: '<html></html>',
                            items: []
                        },
                        {
                            id: "5",
                            name: "hello.html",
                            isFolder: false,
                            code: '<html>Hello</html>',
                            items: []
                        }
                    ]
                },
                {
                    id: "6",
                    name: "public_nested_file.txt",
                    isFolder: false,
                    code: 'text....',
                    items: []
                }
            ]
        },
        {
            id: "7",
            name: "src",
            isFolder: true,
            code: '',
            items: [
                {
                    id: "8",
                    name: "App.js",
                    isFolder: false,
                    code: 'const App = () => {return (<div>Hello</div>)}',
                    items: []
                },
                {
                    id: "9",
                    name: "Index.js",
                    isFolder: false,
                    code: 'const App = () => {return (<div>Hello</div>)}',
                    items: []
                },
                {
                    id: "10",
                    name: "styles.css",
                    isFolder: false,
                    code: 'body{color: white}',
                    items: []
                }
            ]
        },
        {
            id: "11",
            name: "package.json",
            isFolder: false,
            code: 'axios',
            items: []
        }
    ]
};

export const htmlCode = {
    id: "1",
    name: "root",
    isFolder: true,
    code: '',
    items: [
        {
            id: '2',
            name: 'index.html',
            isFolder: false,
            code: '',
            items: []
        },
        {
            id: '3',
            name: 'styles.css',
            isFolder: false,
            code: '',
            items: []
        },
        {
            id: '4',
            name: 'script.js',
            isFolder: false,
            code: '',
            items: []
        },
    ]
}

export const pythonCode = {
    id: "1",
    name: "root",
    isFolder: true,
    code: '',
    items: [
        {
            id: '2',
            name: 'main.py',
            isFolder: false,
            code: '',
            items: []
        }
    ]
}
export const jsCode = {
    id: "1",
    name: "root",
    isFolder: true,
    code: '',
    items: [
        {
            id: '2',
            name: 'index.js',
            isFolder: false,
            code: '',
            items: []
        }
    ]
}
export const EmptyCode = {
    id: "1",
    name: "root",
    isFolder: true,
    code: '',
    items: []
}

export default folderData;