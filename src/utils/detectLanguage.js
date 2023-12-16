export const detectLanguage = (ext) => {
    switch(ext){
        case 'html': 
            return 'html'
        case 'js':
            return 'javascript'
        case 'css':
            return 'css'
        case 'py': 
            return 'python'
        default: 
            return 'javascript'
    }
}