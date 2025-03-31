import React, { useState } from "react";
import "./App.css";

function App() {
  const questions = {
    Easy: [
      {
        question: "Find the largest number in an array.",
        solution: `function findLargest(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}`,
        hint: "Initialize with first element and compare with others"
      },
      {
        question: "Check if a number is prime.",
        solution: `function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}`,
        hint: "Only need to check divisors up to square root"
      },
      {
        question: "Reverse a string without using built-in methods.",
        solution: `function reverseString(str) {
  let reversed = '';
  for (let char of str) {
    reversed = char + reversed;
  }
  return reversed;
}`,
        hint: "Build string character by character in reverse order"
      },
      {
        question: "Find the factorial of a number.",
        solution: `function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}`,
        hint: "Recursive solution with base case"
      },
      {
        question: "Check if a number is even or odd.",
        solution: `function isEven(num) {
  return num % 2 === 0;
}`,
        hint: "Use modulus operator"
      },
      {
        question: "Sum all numbers in an array.",
        solution: `function sumArray(arr) {
  return arr.reduce((sum, num) => sum + num, 0);
}`,
        hint: "Can use reduce or simple loop"
      },
      {
        question: "Count vowels in a string.",
        solution: `function countVowels(str) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  return str.toLowerCase().split('')
    .filter(char => vowels.includes(char)).length;
}`,
        hint: "Convert to lowercase and check against vowel list"
      },
      {
        question: "Find the average of numbers in an array.",
        solution: `function findAverage(arr) {
  return arr.reduce((sum, num) => sum + num, 0) / arr.length;
}`,
        hint: "Sum divided by length"
      },
      {
        question: "Check if a string is a palindrome.",
        solution: `function isPalindrome(str) {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleanStr === cleanStr.split('').reverse().join('');
}`,
        hint: "Compare original with reversed string"
      },
      {
        question: "Remove duplicates from an array.",
        solution: `function removeDuplicates(arr) {
  return [...new Set(arr)];
}`,
        hint: "Set automatically removes duplicates"
      },
      {
        question: "Find the second largest number in an array.",
        solution: `function secondLargest(arr) {
  const unique = [...new Set(arr)];
  unique.sort((a, b) => b - a);
  return unique.length >= 2 ? unique[1] : null;
}`,
        hint: "Sort in descending order and pick second element"
      }
    ],
    Medium: [
      {
        question: "Find the first non-repeating character in a string.",
        solution: `function firstNonRepeatingChar(str) {
  const charCount = {};
  
  // Count character occurrences
  for (let char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  
  // Find first with count 1
  for (let char of str) {
    if (charCount[char] === 1) return char;
  }
  
  return null;
}`,
        hint: "Two-pass solution: count then find"
      },
      {
        question: "Implement a queue using two stacks.",
        solution: `class Queue {
  constructor() {
    this.stack1 = []; // For enqueue
    this.stack2 = []; // For dequeue
  }
  
  enqueue(item) {
    this.stack1.push(item);
  }
  
  dequeue() {
    if (this.stack2.length === 0) {
      // Move all elements from stack1 to stack2
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2.pop();
  }
}`,
        hint: "Use one stack for enqueue, another for dequeue"
      },
      {
        question: "Find the longest substring without repeating characters.",
        solution: `function longestSubstring(s) {
  let max = 0;
  let start = 0;
  const map = {};
  
  for (let end = 0; end < s.length; end++) {
    // If character seen and within current window
    if (map[s[end]] !== undefined && map[s[end]] >= start) {
      start = map[s[end]] + 1;
    }
    map[s[end]] = end;
    max = Math.max(max, end - start + 1);
  }
  
  return max;
}`,
        hint: "Sliding window technique with hash map"
      },
      {
        question: "Merge two sorted arrays.",
        solution: `function mergeSortedArrays(arr1, arr2) {
  let i = 0, j = 0;
  const merged = [];
  
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      merged.push(arr1[i++]);
    } else {
      merged.push(arr2[j++]);
    }
  }
  
  // Add remaining elements
  return [...merged, ...arr1.slice(i), ...arr2.slice(j)];
}`,
        hint: "Two-pointer approach"
      },
      {
        question: "Validate balanced parentheses.",
        solution: `function isValidParentheses(s) {
  const stack = [];
  const pairs = { '(': ')', '[': ']', '{': '}' };
  
  for (let char of s) {
    if (pairs[char]) {
      stack.push(char);
    } else {
      if (stack.length === 0 || pairs[stack.pop()] !== char) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}`,
        hint: "Use stack to track opening brackets"
      },
      {
        question: "Find all anagrams of a string in another string.",
        solution: `function findAnagrams(s, p) {
  const result = [];
  const pCount = {};
  const sCount = {};
  const pLen = p.length;
  
  // Initialize frequency map for p
  for (let char of p) {
    pCount[char] = (pCount[char] || 0) + 1;
  }
  
  // Sliding window over s
  for (let i = 0; i < s.length; i++) {
    // Add current character to window
    sCount[s[i]] = (sCount[s[i]] || 0) + 1;
    
    // Remove character leaving the window
    if (i >= pLen) {
      const leftChar = s[i - pLen];
      if (sCount[leftChar] === 1) {
        delete sCount[leftChar];
      } else {
        sCount[leftChar]--;
      }
    }
    
    // Compare frequency maps
    if (i >= pLen - 1 && compareMaps(pCount, sCount)) {
      result.push(i - pLen + 1);
    }
  }
  
  return result;
}

function compareMaps(map1, map2) {
  if (Object.keys(map1).length !== Object.keys(map2).length) return false;
  for (let key in map1) {
    if (map1[key] !== map2[key]) return false;
  }
  return true;
}`,
        hint: "Sliding window with frequency counting"
      },
      {
        question: "Implement binary search.",
        solution: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`,
        hint: "Divide and conquer approach"
      },
      {
        question: "Find the kth largest element in an array.",
        solution: `function findKthLargest(nums, k) {
  // Quickselect algorithm
  const partition = (arr, left, right) => {
    const pivot = arr[right];
    let i = left;
    
    for (let j = left; j < right; j++) {
      if (arr[j] > pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
      }
    }
    
    [arr[i], arr[right]] = [arr[right], arr[i]];
    return i;
  };
  
  let left = 0, right = nums.length - 1;
  
  while (left <= right) {
    const pivotIndex = partition(nums, left, right);
    
    if (pivotIndex === k - 1) {
      return nums[pivotIndex];
    } else if (pivotIndex < k - 1) {
      left = pivotIndex + 1;
    } else {
      right = pivotIndex - 1;
    }
  }
  
  return -1;
}`,
        hint: "Quickselect algorithm (optimized quicksort)"
      },
      {
        question: "Group anagrams together.",
        solution: `function groupAnagrams(strs) {
  const map = new Map();
  
  for (const str of strs) {
    const key = [...str].sort().join('');
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }
  
  return Array.from(map.values());
}`,
        hint: "Use sorted string as hash key"
      },
      {
        question: "Find the container with most water.",
        solution: `function maxArea(height) {
  let max = 0;
  let left = 0;
  let right = height.length - 1;
  
  while (left < right) {
    const h = Math.min(height[left], height[right]);
    const w = right - left;
    max = Math.max(max, h * w);
    
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  
  return max;
}`,
        hint: "Two pointers moving inward"
      }
    ],
    Hard: [
      {
        question: "Implement an LRU Cache.",
        solution: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // Preserves insertion order
  }
  
  get(key) {
    if (!this.cache.has(key)) return -1;
    
    // Refresh the key by deleting and re-adding
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
  
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    
    this.cache.set(key, value);
    
    // Evict least recently used if over capacity
    if (this.cache.size > this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }
}`,
        hint: "Map preserves insertion order in JavaScript"
      },
      {
        question: "Find the median of two sorted arrays.",
        solution: `function findMedianSortedArrays(nums1, nums2) {
  // Ensure nums1 is the smaller array
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }
  
  const m = nums1.length;
  const n = nums2.length;
  let low = 0, high = m;
  
  while (low <= high) {
    const partitionX = Math.floor((low + high) / 2);
    const partitionY = Math.floor((m + n + 1) / 2) - partitionX;
    
    const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
    const minRightX = partitionX === m ? Infinity : nums1[partitionX];
    
    const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
    const minRightY = partitionY === n ? Infinity : nums2[partitionY];
    
    if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
      // Found correct partition
      if ((m + n) % 2 === 0) {
        return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
      } else {
        return Math.max(maxLeftX, maxLeftY);
      }
    } else if (maxLeftX > minRightY) {
      high = partitionX - 1;
    } else {
      low = partitionX + 1;
    }
  }
  
  throw new Error("Input arrays are not sorted");
}`,
        hint: "Binary search on the smaller array"
      },
      {
        question: "Solve the N-Queens problem.",
        solution: `function solveNQueens(n) {
  const result = [];
  
  function backtrack(row, cols, diags, antiDiags, board) {
    if (row === n) {
      result.push([...board]);
      return;
    }
    
    for (let col = 0; col < n; col++) {
      const diag = row - col;
      const antiDiag = row + col;
      
      if (cols.has(col) || diags.has(diag) || antiDiags.has(antiDiag)) continue;
      
      cols.add(col);
      diags.add(diag);
      antiDiags.add(antiDiag);
      board[row] = col;
      
      backtrack(row + 1, cols, diags, antiDiags, board);
      
      cols.delete(col);
      diags.delete(diag);
      antiDiags.delete(antiDiag);
      board[row] = null;
    }
  }
  
  backtrack(0, new Set(), new Set(), new Set(), new Array(n).fill(null));
  return result;
}`,
        hint: "Backtracking with sets for tracking attacks"
      },
      {
        question: "Find the longest palindromic substring.",
        solution: `function longestPalindrome(s) {
  if (!s || s.length === 0) return "";
  
  let start = 0, end = 0;
  
  for (let i = 0; i < s.length; i++) {
    const len1 = expandAroundCenter(s, i, i);   // Odd length
    const len2 = expandAroundCenter(s, i, i + 1); // Even length
    const len = Math.max(len1, len2);
    
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }
  
  return s.substring(start, end + 1);
}

function expandAroundCenter(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }
  return right - left - 1;
}`,
        hint: "Expand around center for odd/even length palindromes"
      },
      {
        question: "Implement a Trie (Prefix Tree).",
        solution: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  
  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }
  
  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return node.isEndOfWord;
  }
  
  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return true;
  }
}`,
        hint: "Tree structure where each node represents a character"
      },
      {
        question: "Find the maximum sum subarray (Kadane's Algorithm).",
        solution: `function maxSubArray(nums) {
  let maxCurrent = nums[0];
  let maxGlobal = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);
    if (maxCurrent > maxGlobal) {
      maxGlobal = maxCurrent;
    }
  }
  
  return maxGlobal;
}`,
        hint: "Track current and global maximum sums"
      },
      {
        question: "Merge k sorted lists.",
        solution: `class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeKLists(lists) {
  if (!lists || lists.length === 0) return null;
  
  // Priority queue implementation (min heap)
  const pq = new MinHeap();
  
  // Add all list heads to the heap
  for (const list of lists) {
    if (list) pq.insert(list);
  }
  
  const dummy = new ListNode();
  let current = dummy;
  
  while (!pq.isEmpty()) {
    const node = pq.extractMin();
    current.next = node;
    current = current.next;
    
    if (node.next) {
      pq.insert(node.next);
    }
  }
  
  return dummy.next;
}

// MinHeap implementation for ListNode
class MinHeap {
  constructor() {
    this.heap = [];
  }
  
  insert(node) {
    this.heap.push(node);
    this.bubbleUp();
  }
  
  extractMin() {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown();
    }
    return min;
  }
  
  // Other heap methods (bubbleUp, sinkDown) omitted for brevity
}`,
        hint: "Use min-heap to always get the smallest element"
      },
      {
        question: "Find the number of islands in a grid.",
        solution: `function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  
  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;
  
  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') {
      return;
    }
    
    grid[r][c] = '0'; // Mark as visited
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  
  return count;
}`,
        hint: "DFS to mark connected land as visited"
      },
      {
        question: "Word Break problem.",
        solution: `function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  
  return dp[s.length];
}`,
        hint: "Dynamic programming with substring checks"
      },
      {
        question: "Serialize and deserialize a binary tree.",
        solution: `class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

function serialize(root) {
  if (!root) return 'null';
  
  const left = serialize(root.left);
  const right = serialize(root.right);
  
  return \`\${root.val},\${left},\${right}\`;
}

function deserialize(data) {
  const nodes = data.split(',');
  
  function buildTree() {
    const val = nodes.shift();
    if (val === 'null') return null;
    
    const node = new TreeNode(parseInt(val));
    node.left = buildTree();
    node.right = buildTree();
    
    return node;
  }
  
  return buildTree();
}`,
        hint: "Pre-order traversal with null markers"
      }
    ]
  };

  const [selectedLevel, setSelectedLevel] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState({ question: "", solution: "", hint: "" });
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const getNewQuestion = (level) => {
    if (level && questions[level]) {
      const randomIndex = Math.floor(Math.random() * questions[level].length);
      setCurrentQuestion(questions[level][randomIndex]);
      setShowSolution(false);
      setShowHint(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Coding Challenge Generator</h1>

      <div className="buttons">
        {["Easy", "Medium", "Hard"].map((level) => (
          <button
            key={level}
            className={`level-button ${selectedLevel === level ? "active" : ""}`}
            onClick={() => {
              setSelectedLevel(level);
              getNewQuestion(level);
            }}
          >
            {level}
          </button>
        ))}
      </div>

      {selectedLevel && (
        <div className="question-box">
          <h3 className="level">Level: {selectedLevel}</h3>
          <p className="question">
            {currentQuestion.question || "Click 'Next Question' to start!"}
          </p>
          
          {currentQuestion.question && (
            <>
              <div className="action-buttons">
                <button 
                  onClick={() => setShowHint(!showHint)} 
                  className="hint-button"
                >
                  {showHint ? "Hide Hint" : "Show Hint"}
                </button>
                <button 
                  onClick={() => setShowSolution(!showSolution)} 
                  className="solution-button"
                >
                  {showSolution ? "Hide Solution" : "Show Solution"}
                </button>
              </div>
              
              {showHint && (
                <div className="hint-container">
                  <p><strong>Hint:</strong> {currentQuestion.hint}</p>
                </div>
              )}
              
              {showSolution && (
                <div className="solution-container">
                  <pre>{currentQuestion.solution}</pre>
                </div>
              )}
              
              <button 
                onClick={() => getNewQuestion(selectedLevel)} 
                className="next-button"
              >
                Next Question ➡️
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;