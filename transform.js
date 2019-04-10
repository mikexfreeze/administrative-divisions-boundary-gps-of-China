/* create by Micheal Xiao 2019/4/10 17:09 */

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('全国行政区信息（含边界）.json', 'utf8'));

for (let v of obj) {
  let newBoundary = []
  for (let str of v.boundary) { // str 为经纬度数组集合
    let llArr = str.split(";");
    let count = 1;let newLl = [];let newLlArr = []
    for (let llstr of llArr) { // ll 为一组经度或纬度string
      let ll = llstr.split(",")
      if(count === 1){
        newLl[1] = ll[0]
        count = 2
      }else{
        newLl[0] = ll[1]
        newLlArr.push(newLl)
        count = 1
      }
    }
    newBoundary = newBoundary.concat(newLlArr)
  }
  v.boundary = newBoundary
}

var json = JSON.stringify(obj, null, 2);
fs.writeFile('reform.json', json, 'utf8', ()=>{
  console.log("转换完成")
});