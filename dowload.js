var webp=require('webp-converter');
var fs = require('fs'),  request = require('request');
var im = require('imagemagick');
const sql = require('mssql')
var files = require('fs-extra')
const axios = require('axios');

function download(){
  try {    
    sql.connect('mssql://SA:f3N1xK13ro.136@190.85.232.137/DBKiero_Productos').then(()=>{
      return result =  sql.query(`SELECT top(1) * FROM tbl_Productos`)
    }).then((result)=>{
      var listaArray =  new Array;
      var lista = new Array;
      result.recordset.map(function(resul){
        imagenjpg = resul.Imagenes_1.replace("https://images-na.ssl-images-amazon.com/images/I/","")
        imagen = imagenjpg.replace(".jpg","")
        Imagen_final = imagen+'.jpg'

        axios.get("https://images.kiero.co/images/_L/"+Imagen_final).then(function(){
          console.log("OK")          
        }).catch(error => {
          
          var download =  function(uri, filename, callback){
            request.head(uri, function(err, res, body){
              request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
          };
          imagenjpg = resul.Imagenes_1.replace("https://images-na.ssl-images-amazon.com/images/I/","")
          imagen = imagenjpg.replace(".jpg","")
          Imagen_final = imagen+'.jpg'
          download(resul.Imagenes_1, imagenjpg, async function(req){
            
          })          
          
        
        })
      })
    })    
  }catch(err){}
}
download();