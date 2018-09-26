var path = require('path');
var fs = require('fs-extra');

// Quanto existe a propriedade localTemplatesStructureRead é porque você quer ler a estrutura de um local mas deseja definir um targetPath diferente.
// Isso é utilizado para debug.
var templates = [
    {
        sourcePath: path.join(process.env.USERPROFILE, '/AppData/Roaming/Microsoft/SQL Server Management Studio/13.0/Templates/Sql'),
        targetPath: './../../SQL Server Management Studio/13.0/Templates/Sql',
        //targetPath: './tempDestino/SQL Server Management Studio/13.0/Templates/Sql',
        //localTemplatesStructureRead: './../../SQL Server Management Studio/13.0/Templates/Sql'
    },
    {
        sourcePath: path.join(process.env.USERPROFILE, '/AppData/Roaming/Microsoft/SQL Server Management Studio/14.0/Templates/Sql'),
        targetPath: './../../SQL Server Management Studio/14.0/Templates/Sql',
        //targetPath: './tempDestino/SQL Server Management Studio/14.0/Templates/Sql',
        //localTemplatesStructureRead: './../../SQL Server Management Studio/14.0/Templates/Sql'
    },
    {
        sourcePath: path.join(process.env.USERPROFILE, '/Documents/Visual Studio 2017/Code Snippets/Visual C#'),
        targetPath: './../../Visual Studio 2017/Code Snippets/Visual C#',
        //targetPath: './tempDestino/Visual Studio 2017/Code Snippets/Visual C#',
        //localTemplatesStructureRead: './../../Visual Studio 2017/Code Snippets/Visual C#'
    },
    {
        sourcePath: path.join(process.env.USERPROFILE, '/AppData/Roaming/Code/User/snippets'),
        targetPath: './../../vscode/snippets',
        isTopFolder: true
    }
];

for (var j = 0; j < templates.length; j++) {
    var template = templates[j];
    MakeTheImport(template);
}

function MakeTheImport(template) {
    var sourcePath = template.sourcePath;
    var targetPath = template.targetPath;
    var localTemplatesStructureRead = targetPath;

    if (template.isTopFolder) {
        fs.ensureDirSync(targetPath);
        fs.copySync(sourcePath, targetPath, { overwrite: true });
    } else {
        if(template.localTemplatesStructureRead) {
            fs.ensureDirSync(targetPath); // Como é para debug, vou garantir que o diretório exista, apenas para evitar contra tempos desnecessários.
            localTemplatesStructureRead = template.localTemplatesStructureRead;
        }

        var items = fs.readdirSync(localTemplatesStructureRead);

        for (var i = 0; i < items.length; i++) {
            var currentFolder = items[i];
            fs.ensureDirSync(path.join(targetPath, currentFolder));
            fs.copySync(path.join(sourcePath, currentFolder), path.join(targetPath, currentFolder), { overwrite: true });
        }
    }
}
