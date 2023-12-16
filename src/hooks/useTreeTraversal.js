const useTreeTraversal = () => {
    function insertNode(tree, folderId, itemName, isFolder){
        if(tree.id === folderId && tree.isFolder){
            tree.items.unshift({
                id: new Date(),
                name: itemName,
                isFolder,
                code: '',
                items: []
            })
            return tree
        }

        let latestNode = tree.items.map((item) => {
            return insertNode(item, folderId, itemName, isFolder)
        })
        return {...tree, items: latestNode}
    }

    function updateNode(tree, nodeId, newCode){
        if(tree.id === nodeId){
            return {...tree, code: newCode}
        }
        let updatedItems = tree.items.map((item) => {
            return updateNode(item, nodeId, newCode)
        })
        return {...tree, items: updatedItems}
    }

    function findNode(tree, target){
        if(tree.name === target){
            return tree
        }
        for(const item of tree.items){
            const foundNode = findNode(item, target)
            if(foundNode){
                return foundNode
            }
        }
        return null
    }
    function deleteNode(tree, targetId) {
        if (!tree || typeof tree !== 'object') {
            return tree;
        }
        
        if (tree.id === targetId) {
            return null;
        }
        
        const updatedItems = (tree.items || []).map((item) => deleteNode(item, targetId));

        const filteredItems = updatedItems.filter((item) => item !== null && item !== undefined);
        
        return { ...tree, items: filteredItems };
    }
    
    function getAllFileNames(tree){
        let fileNames = []
        function traverse(node){
            if(!node.isFolder){
                fileNames.push(node.name)
            }
            if(node.items){
                node.items.forEach(traverse)
            }
        }
        traverse(tree)
        return fileNames
    }
    
    

    return {insertNode, updateNode, findNode, deleteNode, getAllFileNames}
}

export default useTreeTraversal