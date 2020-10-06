import PouchDB from 'pouchdb'
import PouchFind from 'pouchdb-find'
PouchDB.plugin(PouchFind)

export function getDB() {
  const db = new PouchDB('mindmaps')
  db.info().then(function(info) {
    console.log(info)
  })
  return db
}

export function read(db) {
  db.createIndex({
    index: { fields: ['doc_type'] }
  })
    .then(function() {
      return db.find({
        selector: {
          doc_type: 'mindmap_info'
        }
      })
    })
    .then(function(docs) {
      console.log(docs)
    })
}

// 總db -> 選特定mindmap: getMindMapID() -> string _id 傳給 繪製頁面
// getMindMapJson(id) -> json檔 mindmap 要設計成從根節點遍歷
// 另外排順序 or tmplate 遞回去自己抓子節點 -> 要先找根節點

/*
[
  {
    " doc_type": "mindmap_info",
    "_id": "預設隨機UUID",
    "map_name": "範例1"
  },
  {
    "doc_type": "node",
    "mindmap_id": "所屬 mindmap_id",
    "_id": "預設隨機UUID",
    "parents": [],
    "children": ["2"],
    "content": "11",
    "notes": "123"
  },
  {
    "doc_type": "node",
    "mindmap_id": "所屬 mindmap_id",
    "_id": "預設隨機UUID",
    "parents": ["1"],
    "children": [],
    "content": "22",
    "notes": "456"
  }
]
 */

// 檔案列表放一起: 透過 mango-queries,進行進階查詢，取得特定資料。ex: doc_type: mindmap_info || node ; mindmap_id: 所屬mindmap

// 檔案列表分開放: db 一定要提供自訂name,
