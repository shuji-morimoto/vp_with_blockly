window.onload = () => {
    Blockly.defineBlocksWithJsonArray(custom_blocks);
    workspace = Blockly.inject('blocklyDiv',
        {
            toolbox: toolbox,
            scrollbars : true, 
            sounds : false, 
            trashcan : true, 
            zoom : {
                controls : true, 
                wheel : false, 
                startScale : 1.0, 
                maxScale : 2.0, 
                minScale : 0.5, 
                scaleSpeed : 1.1,
            },
        }
    );

    javascript.javascriptGenerator.init(workspace);
    Blockly.serialization.workspaces.load(startupBlocks, workspace);
    document.getElementById("button0").addEventListener("click", _showWorkspaceBlocks);
    workspace.addChangeListener(_generateCode);

    drawer = new CanvasDrawer(document.getElementById("drawer-canvas"));

    function _showWorkspaceBlocks() {
        let output = document.getElementById("output");
        output.value = JSON.stringify(Blockly.serialization.workspaces.save(workspace));
    }

    function _generateCode() {
        let output = document.getElementById("output");
        let start = workspace.getBlocksByType("drawer_start")[0];
        let code = javascript.javascriptGenerator.blockToCode(start);
        output.value = code;
        try {
            document.getElementById("output").value = code;
            Function("{drawer.init();" + code + "}")();
        } catch (error) {
            alert(error);
        }
    }
}
