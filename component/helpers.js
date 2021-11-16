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


module.exports = {
   trimUrl,
   trimBeforeSlash,
};
