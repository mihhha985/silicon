const path = require("path");

function trimUrl(url) {
   let pos = url.indexOf('?');
   if(pos === -1){
      return url;
   }else{
      return  url.substring(0, pos);
   }
}

function trimBeforeSlash(url) {
   let pos = url.lastIndexOf('/');
   if(pos === -1 || pos === 0){
      return url;
   }else{
      return url.substring(0, pos);
   }
}

function createPath(catalog, file){
   return path.resolve(__dirname, '../views', catalog, `${file}.ejs`);
}


module.exports = {
   trimUrl,
   trimBeforeSlash,
   createPath,
};
