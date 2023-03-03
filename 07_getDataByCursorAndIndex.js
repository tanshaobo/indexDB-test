/*
 * @Author: tanshaobo
 * @Date: 2023-02-27 20:01:30
 * @LastEditors: tanshaobo
 * @LastEditTime: 2023-03-01 10:32:25
 * @Description: file content
 * @FilePath: \新建文件夹\07_getDataByCursorAndIndex.js
 */
/**
 * 通过索引和游标查询记录
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名称
 * @param {string} indexValue 索引值
 */
function getDataByCursorAndIndex(db, storeName, indexName, indexValue) {
  return new Promise((resolve,reject) => {

    let list = [];
    var store = db.transaction(storeName, "readwrite").objectStore(storeName); // 仓库对象
    var request = store
    .index(indexName) // 索引对象
    .openCursor(IDBKeyRange.only(indexValue)); // 指针对象
    request.onsuccess = function (e) {
      var cursor = e.target.result;
      if (cursor) {
        // 必须要检查
        list.push(cursor.value);
        cursor.continue(); // 遍历了存储对象中的所有内容
      } else {
        console.log("游标索引查询结果：", list);
        resolve(list)
      }
    };
    request.onerror = function (e) {};
  })
}
