import PouchDB from 'pouchdb'
import PouchFind from 'pouchdb-find'
PouchDB.plugin(PouchFind)

export function getDB() {
  const db = new PouchDB('mindmaps')
  db.info().then(function(info) {
    // console.log(info)
  })
  return db
}

export function destroyDB() {
  new PouchDB('mindmaps').destroy().then(function() {
    console.log('destroyDB sucessed')
  }).catch(function(err) {
    console.log(err)
  })
}

export function showAll(db) {
  db.allDocs({ include_docs: true })
    .then(function(response) {
      console.log(response)
      console.log(response.rows)
    }).catch(function(err) {
      console.log(err)
    })
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

export async function getRootsID(db) {
  const promise = new Promise(function(resolve, reject) {
    db.createIndex({
      index: { fields: ['docType', 'parents'] }
    })
      .then(function() {
        db.find({
          selector: {
            docType: 'node',
            parents: { $eq: [] }
          }
        }).then(function(result) {
          result = result.docs.map(a => a._id)
          resolve(result)
        })
      }).catch(function(err) {
        reject(err)
      })
  })
  const result = await promise
  return result
}

export async function getAllNodes(db) {
  const promise = new Promise(function(resolve, reject) {
    db.createIndex({
      index: { fields: ['docType'] }
    })
      .then(function() {
        db.find({
          selector: {
            docType: 'node'
          }
        }).then(function(result) {
          result = result.docs
          resolve(result)
        })
      }).catch(function(err) {
        reject(err)
      })
  })
  const result = await promise
  return result
}

export async function getNode(db, nodeID: string) {
  const promise = new Promise(function(resolve, reject) {
    db.get(nodeID).then(function(doc) {
      resolve(doc)
    }).catch(function(err) {
      reject(err)
    })
  })
  const result = await promise
  return result
}

export function addChildToParentNode(db, nodeID: string, childID: string) {
  db.get(nodeID).then(function(doc) {
    doc.children.push(childID)
    return db.put(doc)
  }).then(function(respond) {
    console.log(respond)
  }).catch(function(err) {
    console.log(err)
  })
}
/*
1

1-1
*/
export function addNode(db, parentID: string, inputContent: string, inputNotes: string) {
  db.post({
    docType: 'node',
    mindmapId: '1',
    parent: parentID,
    children: [],
    content: inputContent,
    notes: inputNotes
  }).then(function(respond) {
    console.log(respond)
    const childID = respond.id
    if (parentID !== '') {
      return addChildToParentNode(db, parentID, childID)
    }
  }).catch(function(err) {
    console.log(err)
  })
}

export function addTestNodeInfo(db) {
  db.post({
    docType: 'node',
    mindmapId: '1',
    parents: [],
    children: [],
    content: '1-2',
    notes: '123'
  }).then(function(respond) {
    db.post({
      docType: 'node',
      mindmapId: '1',
      parents: [],
      children: [],
      content: '1-1',
      notes: '112'
    }).catch(function(err) {
      console.log(err)
    })
    db.post({
      docType: 'node',
      mindmapId: '1',
      parents: [respond.id],
      children: [],
      content: '2-2',
      notes: '456'
    }).catch(function(err) {
      console.log(err)
    })
    return {
      node: db.post({
        docType: 'node',
        mindmapId: '1',
        parents: [respond.id],
        children: [],
        content: '2-1',
        notes: '456'
      }),
      rootID: respond.id
    }
  }).then(function(respond) {
    console.log(respond)
    return respond.node.then(function(respond) {
      db.post({
        docType: 'node',
        mindmapId: '1',
        parents: [respond.id],
        children: [],
        content: '3-1',
        notes: '789'
      })
    })
  }).catch(function(err) {
    console.log(err)
  })
}

// 總db -> 選特定mindmap: getMindMapID() -> string _id 傳給 繪製頁面
// getMindMapJson(id) -> json檔 mindmap 要設計成從根節點遍歷
// 另外排順序 or tmplate 遞回去自己抓子節點 -> 要先找根節點

/*
[
  {
    " docType": "mindmap_info",
    "_id": "預設隨機UUID",
    "mapName": "範例1"
  },
  {
    "docType": "node",
    "mindmapId": "所屬 mindmapId",
    "_id": "預設隨機UUID",
    "parents": [],
    "children": ["2"],
    "content": "11",
    "notes": "123"
  },
  {
    "docType": "node",
    "mindmapId": "所屬 mindmapId",
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
