/**
 * binary search tree class
 * @link https://www.nczonline.net/blog/2009/06/16/computer-science-in-javascript-binary-search-tree-part-1/
 * @link https://www.nczonline.net/blog/2009/06/16/computer-science-in-javascript-binary-search-tree-part-2/
 */

class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  add(value) {
    let node = {
      value: value,
      left: null,
      right: null
    };
    let current;

    if (!this._root) {
      this._root = node;
    } else {
      current = this._root;

      while (true) {
        if (value < current.value) {
          if (current.left === null) {
            current.left = node;
            break;
          } else {
            current = current.left;
          }
        } else if (value > current.value) {
          if (current.right === null) {
            current.right = node;
            break;
          } else {
            current = current.right;
          }
        } else {
          break;
        }
      }
    }
  }

  contains(value) {
    let found = false;
    let current = this._root;

    while (!found && current) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = true;
      }
    }

    return found;
  }

  traverse(process) {
    function inOrder(node) {
      if (node) {
        if (node.left) {
          inOrder(node.left);
        }

        process(node);

        if (node.right) {
          inOrder(node.right);
        }
      }
    }

    inOrder(this._root);
  }

  remove(value) {
    let found;
    let current = this._root;
    let parent;
    let replacement;
    let replacementParent;

    while (!found && current) {
      if (value < current.value) {
        parent = current;
        current = current.left;
      } else if (value > current.value) {
        parent = current;
        current = current.right;
      } else {
        found = true;
      }
    }

    if (found) {
      let childCount = (current.left ? 1 : 0) + (current.right ? 1 : 0);

      if (current === this._root) {
        switch (childCount) {
          case 0:
            this._root = null;
            break;
          case 1:
            this._root = current.right === null ? current.left : current.right;
            break;
          case 2:
            replacement = this._root.left;

            while (replacement.right !== null) {
              replacementParent = replacement;
              replacement = replacement.right;
            }

            if (replacementParent) {
              replacementParent.right = replacement.left;
              replacement.left = this._root.left;
              replacement.right = this._root.right;
            } else {
              replacement.right = this._root.right;
            }

            this._root = replacement;
            break;
        }
      } else {
        switch (childCount) {
          case 0:
            if (current.value < parent.value) {
              parent.left = null;
            } else {
              parent.right = null;
            }
            break;
          case 1:
            if (current.value < parent.value) {
              parent.left =
                current.left === null ? current.right : current.left;
            } else {
              parent.right =
                current.left === null ? current.right : current.left;
            }
            break;
          case 2:
            replacement = current.left;

            while (replacement.right !== null) {
              replacementParent = replacement;
              replacement = replacement.right;
            }

            if (replacementParent) {
              replacementParent.right = replacement.left;
              replacement.left = current.left;
              replacement.right = current.right;
            } else {
              replacement.right = current.right;
            }

            if (current.value < parent.value) {
              parent.left = replacement;
            } else {
              parent.right = replacement;
            }
            break;
        }
      }
    }
  }

  size() {
    let result = 0;

    this.traverse(node => {
      result++;
    });

    return result;
  }

  toArray() {
    let result = [];

    this.traverse(node => {
      result.push(node.value);
    });

    return result;
  }

  toString() {
    return this.toArray().toString();
  }
}

let bst = new BinarySearchTree();

bst.add(8);
bst.add(3);
bst.add(1);
bst.add(6);
bst.add(4);
bst.add(7);
bst.add(10);
bst.add(14);
bst.add(13);

console.log(bst.toString());
bst.remove(1);
console.log(bst.toString());
