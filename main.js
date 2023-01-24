const {app,BrowserWindow,Menu} = require('electron')

app.on('ready',()=>{
    const mainWindom = new BrowserWindow({
        width:1500,
        height:1000,
        // frame:false
    })

    mainWindom.loadURL('http://localhost:3000/home/show-book')

    const template = [
        {
            label:'111',
            submenu:[
                {
                    label:'new',
                    click (){
                        new BrowserWindow({
                            width:1000,
                            height:1000
                        })
                    }
                }
            ]
        },
        {
            label:'222'
        }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
})