function search(array, id) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    if (element.id === id) {
      array.splice(index, 1)
      return element
    } else {
      return search(element.children, id)
    }
  }
}

// const update = (array, id, object) => array.some(o => o.id === id
//   ? o.children.push(object)
//   : update(o.children, id, object)
// )
function update(array, id, object) {
  array.some(o => o.id === id
    ? o.children.push(object)
    : update(o.children, id, object)
  )
}

export function setChildToNodes(nodes: [], parentID: string, nodeID: string) {
// export function setChildToNodes() {
  // 先找到指定的parent，add child
  // console.log('json setChildToNodes')
  // const nodes = [
  //   {
  //     id: 'nodeID-1',
  //     children: [
  //       {
  //         id: 'nodeID-1-1',
  //         children: [
  //           {
  //             id: 'nodeID-1-1-1',
  //             children: []
  //           }
  //         ]
  //       },
  //       {
  //         id: 'nodeID-1-2',
  //         children: []
  //       }
  //     ]
  //   },
  //   {
  //     id: 'nodeID-2',
  //     children: []
  //   }
  // ]
  // const nodeID = 'nodeID-1-1-2'
  console.log(nodes)
  let node = search(nodes, nodeID)
  if (!node) {
    node = {
      id: nodeID,
      children: []
    }
  }
  // console.log(node)
  update(nodes, parentID, node)
  // console.log(nodes)
  return nodes
}
