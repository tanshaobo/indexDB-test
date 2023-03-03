/*
 * @Author: tanshaobo
 * @Date: 2022-11-18 10:52:44
 * @LastEditors: tanshaobo
 * @LastEditTime: 2023-03-01 15:07:01
 * @Description: file content
 * @FilePath: \新建文件夹\03_addData.js
 */
function addData(db, storeName, data) {
  return new Promise((resolve,reject)=>{
    var request = db
    .transaction([storeName], "readwrite") // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
    .objectStore(storeName) // 仓库对象
    .add(data);
    
    request.onsuccess = function (event) {
      resolve('success')
    };
    
    request.onerror = function (event) {
      reject('error')
    };
  })
}