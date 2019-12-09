var webp = require('webp-converter');
var fs = require('fs'), request = require('request');
var im = require('imagemagick');
const sql = require('mssql')
var files = require('fs-extra')
const axios = require('axios');

function getImagen() {
    try {
        sql.connect('mssql://SA:f3N1xK13ro.136@190.85.232.137/DBKiero_Productos').then(() => {
            return result = sql.query(`SELECT top(10) * FROM tbl_Productos`)
        }).then((result) => {
            var listaArray = new Array;
            var lista = new Array;
            result.recordset.map(function (resul) {
                imagenjpg = resul.Imagenes_1.replace("https://images-na.ssl-images-amazon.com/images/I/", "")
                imagen = imagenjpg.replace(".jpg", "")
                Imagen_final = imagen + '.jpg'

                axios.get("https://images.kiero.co/images/_L/" + Imagen_final).then(function () {
                    console.log("OK")
                }).catch(error => {
                  imagenjpg = resul.Imagenes_1.replace("https://images-na.ssl-images-amazon.com/images/I/", "")
                  imagen = imagenjpg.replace(".jpg", "")
                  Imagen_final = imagen + '.jpg'
                  im.resize({
                      srcData: fs.readFileSync(imagenjpg, 'binary'),
                      width: 220,
                      height: 220,
                    }, function(err, stdout, stderr){
                      console.log("DATA: ",Imagen_final)
                      if (err) throw err
                      imagenjpg = resul.Imagenes_1.replace("https://images-na.ssl-images-amazon.com/images/I/", "")
                      imagen = imagenjpg.replace(".jpg", "")
                      Imagen_final = imagen + '.jpg'
                      fs.writeFileSync(`/home/joxe/Desktop/develop/node/IMAGENES/JPG/${Imagen_final}`, stdout, 'binary');
                      console.log(`${Imagen_final} change within 220x220px JPG`)
                      
                    })   
                })
            })
        })
    } catch (err) { }
}
getImagen()

/*
* @getDetail
* Permite inicier el arranque de el compilador metodo
*/

