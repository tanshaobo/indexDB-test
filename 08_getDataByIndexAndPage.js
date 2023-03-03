/*
 * @Author: tanshaobo
 * @Date: 2023-03-01 10:36:01
 * @LastEditors: tanshaobo
 * @LastEditTime: 2023-03-01 10:46:34
 * @Description: file content
 * @FilePath: \新建文件夹\08_getDataByIndexAndPage.js
 */
/**
 * 通过索引和游标分页查询记录
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名称
 * @param {string} indexValue 索引值
 * @param {number} page 页码
 * @param {number} pageSize 查询条数
 */
function getDataByIndexAndPage (
  db,
  storeName,
  indexName,
  indexValue,
  page,
  pageSize
) {

  return new Promise((resolve, reject) => {
    let list = [];
    let counter = 0; // 计数器
    let advanced = true; // 是否跳过多少条查询
    var store = db.transaction(storeName, "readwrite").objectStore(storeName); // 仓库对象
    var request = store
    .index(indexName) // 索引对象
    .openCursor(IDBKeyRange.only(indexValue)); // 指针对象
    request.onsuccess = function (e) {
      var cursor = e.target.result;
      if (page > 1 && advanced) {
        advanced = false;
        cursor.advance((page - 1) * pageSize); // 跳过多少条
        
        return;
      }
      if (cursor) {
        // 必须要检查
        list.push(cursor.value);
        counter++;
        if (counter < pageSize) {
          cursor.continue(); // 遍历了存储对象中的所有内容
        } else {
          cursor = null;
          console.log("分页查询结果", list);
          resolve(list)
        }
      } else {
        console.log("分页查询结果", list);
        resolve(list)
      }
    };
    request.onerror = function (e) {};
  })
  }