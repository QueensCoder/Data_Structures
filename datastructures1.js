//Stack
//Stacks works like call stack last item in the is the first item out
//LIFO last in first out
class Stack {
  constructor() {
    this.count = 0;
    this.container = {};
  }
  //adds item to top of stack
  add(item) {
    this.container[++this.count] = item;
  }

  //removes item from top of stack
  remove() {
    if (!this.count) return;
    let removed = this.container[this.count];
    delete this.container[this.count--];
    return removed;
  }
}
//------------------------------------------------------------------------------------------------

//Queue
//Queue works like a real life line, the first item/person in is the first out
//FIFO first in first out
class Queue {
  constructor() {
    this.queue = {};
    this.head = 0;
    this.tail = 0;
  }
  //adds to end of queue
  enqueue(item) {
    this.queue[this.tail++] = item;
  }

  //removes from head of queue
  dequeue() {
    if (this.tail === this.head) return;
    let remove = this.queue[this.head];
    delete this.queue[this.head++];
    return remove;
  }

  //tells how many items are in queue
  size() {
    return this.tail - this.head;
  }
}

//------------------------------------------------------------------------------------------------

//Double Linked List
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  //adds to head of List
  addToHead(item) {
    let newNode = new Node(item);
    if (!this.tail) this.tail = newNode;
    if (this.head) {
      this.head.previous = newNode;
      newNode.next = this.head;
    }
    this.head = newNode;
  }
  //adds to Tails of List
  addToTail(item) {
    let newNode = new Node(item);
    if (!this.head) this.head = newNode;
    if (this.tail) {
      this.tail.next = newNode;
      newNode.previous = this.tail;
    }
    this.tail = newNode;
  }
  //remove from head of List
  removeHead() {
    if (!this.head) return;
    let remove = this.head;
    if (remove.next) {
      //if next node exists
      this.head = remove.next;
      this.head.previous = null;
    } else {
      //if remove is last node in list
      this.head = null;
      this.tail = null;
    }
    return remove.value;
  }
  //reomove from Tail of List
  removeTail() {
    if (!this.tail) return;
    let remove = this.tail;
    if (remove.previous) {
      //if previous node exists
      this.tail = remove.previous;
      this.tail.next = null;
    } else {
      //if no other node is in list
      this.head = null;
      this.tail = null;
    }
    return remove.value;
  }
  // searches for a Node's value using strings or functions
  //start with head if no node end else determine if style is string or function
  //conduct approriate operation depending on style if neither condition is met
  //recurse..... 3 base cases are our if statements.
  search(style, searchNode = this.head) {
    if (!searchNode) return null;
    if (typeof style === 'string' && searchNode.value === style)
      return searchNode.value;
    if (typeof style === 'function' && style(searchNode.value))
      return searchNode.value;
    return this.search(style, (searchNode = searchNode.next));
  }
}

//Node class that makes each Node for List.
class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
    this.previous = null;
  }
}

//------------------------------------------------------------------------------------------------

//Binary Search Tree
//Each Node is a Binary Search Tree
class BinarySearchTree {
  constructor(val) {
    this.value = val;
    this.mag = 1;
  }

  //insert value into proper place depending on other nodes value
  insert(val) {
    let direction = val < this.value ? 'left' : 'right';
    if (!this[direction]) {
      this[direction] = new BinarySearchTree(val);
      this.mag++;
    } else this[direction].insert(val);
  }

  //sees if tree contains specific value
  contains(val) {
    if (this.value === val) return true;
    let direction = val < this.value ? 'left' : 'right';
    return this[direction] ? this[direction].contains(val) : false;
  }

  //breadth first search uses queue to evaluate each node and childrend nodes
  //first evalute node then add children to queue then repeat
  breadthFirstForEach(cb, queue = [this]) {
    if (queue.length) {
      const node = queue.shift();
      cb(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      return this.breadthFirstForEach(cb, queue);
    }
  }

  //depthfirst search using recursion
  // will improve
  depthFirstForEach(cb, searchType) {
    searchType ? searchType : (searchType = 'in-order');
    if (searchType === 'in-order') {
      //look left, then at node , then look right, left/right is recursive
      if (this.left) this.left.depthFirstForEach(cb);
      cb(this.value);
      if (this.right) this.right.depthFirstForEach(cb);
    } else if (searchType === 'pre-order') {
      cb(this.value);
      if (this.left) this.left.depthFirstForEach(cb, 'pre-order');
      if (this.right) this.right.depthFirstForEach(cb, 'pre-order');
    } else if (searchType === 'post-order') {
      if (this.left) this.left.depthFirstForEach(cb, 'post-order');
      if (this.right) this.right.depthFirstForEach(cb, 'post-order');
      cb(this.value);
    }
  }
  //returns magnitude of a tree
  size() {
    return this.mag;
  }

  //finds smallest node value in tree
  min() {
    return !this.left ? this.value : this.left.min();
  }

  //finds largest node value in tree
  max() {
    return !this.right ? this.value : this.right.max();
  }

  //find the largest rooNode value that is smaller than the num
  largestSmallerKey(rootNode, num) {
    return -1;
  }
}
