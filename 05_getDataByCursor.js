/*
 * @Author: tanshaobo
 * @Date: 2023-02-20 09:33:41
 * @LastEditors: tanshaobo
 * @LastEditTime: 2023-03-01 10:32:55
 * @Description: file content
 * @FilePath: \新建文件夹\05_getDataByCursor.js
 */
/**
 * 通过游标读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 */
 function getDataByCursor(db, storeName) {
  return new Promise((resolve,reject) => {
    let list = [];
    var store = db
    .transaction(storeName, "readwrite") // 事务
    .objectStore(storeName); // 仓库对象
    var request = store.openCursor(); // 指针对象
    // 游标开启成功，逐行读数据
    request.onsuccess = function (e) {
      var cursor = e.target.result;
      if (cursor) {
        // 必须要检查
        list.push(cursor.value);
        cursor.continue(); // 遍历了存储对象中的所有内容
      } else {
        console.log("游标读取的数据：", list);
        resolve(list)
      }
    };
  })
}
