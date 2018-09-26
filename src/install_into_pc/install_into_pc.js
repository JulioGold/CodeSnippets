var path = require('path');
var fs = require('fs-extra');

// Quanto existe a propriedade localTemplatesStructureRead é porque você quer ler a estrutura de um local mas deseja definir um targetPath diferente.
// Isso é utilizado para debug.
var templates = [
    {
        sourcePath: './../../SQL Server Management Studio/13.0/Templates/Sql',
        targetPath: path.join(process.env.USERPROFILE, '/AppData/Roaming/Microsoft/SQL Server Management Studio/13.0/Templates/Sql'),
    },
    {
        sourcePath: './../../SQL Server Management Studio/14.0/Templates/Sql',
        targetPath: path.join(process.env.USERPROFILE, '/AppData/Roaming/Microsoft/SQL Server Management Studio/14.0/Templates/Sql'),
    },
    {
        sourcePath: './../../Visual Studio 2017/Code Snippets/Visual C#',
        targetPath: path.join(process.env.USERPROFILE, '/Documents/Visual Studio 2017/Code Snippets/Visual C#'),
    },
    {
        sourcePath: './../../vscode/snippets',
        targetPath: path.join(process.env.USERPROFILE, '/AppData/Roaming/Code/User/snippets'),
        isTopFolder: true
    }
];

for (var j = 0; j < templates.length; j++) {
    var template = templates[j];
    DoTheInstalation(template);
}

function DoTheInstalation(template) {
    var sourcePath = template.sourcePath;
    var targetPath = template.targetPath;

    if (template.isTopFolder) {
        fs.ensureDirSync(targetPath);
        fs.copySync(sourcePath, targetPath, { overwrite: true });
    } else {
        var items = fs.readdirSync(sourcePath);

        for (var i = 0; i < items.length; i++) {
            var currentFolder = items[i];
            fs.ensureDirSync(path.join(targetPath, currentFolder));
            fs.copySync(path.join(sourcePath, currentFolder), path.join(targetPath, currentFolder), { overwrite: true });
        }
    }
}
