/*
 * @Author: tanshaobo
 * @Date: 2023-03-01 14:46:41
 * @LastEditors: tanshaobo
 * @LastEditTime: 2023-03-01 14:53:25
 * @Description: file content
 * @FilePath: \新建文件夹\11_deleteDataByIndexAndCursor.js
 */
/**
 * 通过索引和游标删除指定的数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名
 * @param {object} indexValue 索引值
 */
function deleteDataByIndexAndCursor(db, storeName, indexName, indexValue) {
  return new Promise((resolve, reject)=>{
    var store = db.transaction(storeName, "readwrite").objectStore(storeName);
    var request = store
    .index(indexName) // 索引对象
    .openCursor(IDBKeyRange.only(indexValue)); // 指针对象
    request.onsuccess = function (e) {
      var cursor = e.target.result;
      var deleteRequest;
      if (cursor) {
        deleteRequest = cursor.delete(); // 请求删除当前项
        deleteRequest.onerror = function () {
          console.log("游标删除该记录失败");
        };
        deleteRequest.onsuccess = function () {
          console.log("游标删除该记录成功");
          resolve('使用游标删除成功')
        };
        cursor.continue();
      }
    };
    request.onerror = function (e) {};
  })
}