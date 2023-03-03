/*
 * @Author: tanshaobo
 * @Date: 2023-02-27 18:56:01
 * @LastEditors: tanshaobo
 * @LastEditTime: 2023-03-01 10:21:03
 * @Description: file content
 * @FilePath: \新建文件夹\06_getDataByIndex.js
 */
/**
 * 通过索引读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名称
 * @param {string} indexValue 索引值
 */
function getDataByIndex(db, storeName, indexName, indexValue) {
  return new Promise((resolve, reject)=>{
    var store = db.transaction(storeName, "readwrite").objectStore(storeName);
    var request = store.index(indexName).get(indexValue);
    request.onerror = function () {
      console.log("事务失败");
    };
    request.onsuccess = function (e) {
      var result = e.target.result;
      console.log("索引查询结果：", result);
      resolve(result)
    };
  })
}
