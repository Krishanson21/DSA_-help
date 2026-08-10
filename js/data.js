/* ============================================================
   DSA QUEST — Curriculum Data
   ------------------------------------------------------------
   This is the single source of truth for the whole course.
   Every topic, every concept explanation, every problem lives
   here. Nothing else in the site hardcodes curriculum content.

   HOW TO ADD YOUR YOUTUBE VIDEOS:
   Find the problem below and set its `video` field to your
   YouTube URL, e.g. video: "https://youtu.be/xxxxxxxxx"
   Leave it as "" and the site will show a "Coming soon" badge.

   Difficulty: "Easy" | "Medium" | "Hard"
   premium: true  -> problem requires LeetCode Premium
   ============================================================ */

const CURRICULUM = [
  // ================= WORLD 1 — FOUNDATIONS =================
  {
    tier: "beginner",
    world: "World 1",
    worldTitle: "Foundations",
    worldBlurb: "Build the mental tools every other pattern depends on.",
    topics: [
      {
        id: "big-o",
        title: "Big-O & Complexity",
        icon: "⏱️",
        blurb: "Learn to measure code before you learn to write it fast.",
        concept: `Big-O notation describes how the runtime or memory use of an algorithm grows as
the input size (n) grows. It is not a stopwatch measurement — it's a shape. When you say an
algorithm is O(n), you mean "if I double the input, the work roughly doubles." When you say
O(n²), you mean "if I double the input, the work roughly quadruples."

Every single pattern taught on this site exists because someone asked "can we do better than
the brute force?" and found a way to trade a slower shape for a faster one — usually by
spending a little extra memory (a hash map, a sorted structure, a window) to avoid repeated
work. That trade is the entire game of DSA. Once you can look at nested loops and instantly see
O(n²), or look at a hash map lookup and see O(1), you'll start predicting which pattern a
problem wants before you even finish reading it.

Rule of thumb for interviews: drop constants and lower-order terms (O(3n + 5) is O(n)), and
always analyze the *worst case* unless told otherwise. Also track space complexity — the
memory an algorithm uses beyond the input itself — because "just use a hash map" isn't free.`,
        recognize: [
          "Nested loops over the same input → probably O(n²), ask if a hash map or two pointers can flatten it to O(n).",
          "Sorting first costs O(n log n) — often worth it if it unlocks an O(n) pass afterward.",
          "A single pass with a hash map for lookups is the most common way to turn O(n²) into O(n).",
          "Recursion that branches k ways, d levels deep costs O(k^d) — this is where backtracking gets expensive.",
        ],
        cheatsheet: [
          { name: "O(1)", meaning: "Constant — array index, hash map get/set" },
          { name: "O(log n)", meaning: "Binary search, balanced tree operations" },
          { name: "O(n)", meaning: "Single pass, linear scan, sliding window" },
          { name: "O(n log n)", meaning: "Sorting, divide & conquer, heap of n pushes" },
          { name: "O(n²)", meaning: "Nested loops, brute-force pairs, DP tables" },
          { name: "O(2^n)", meaning: "Subsets / all combinations (backtracking)" },
        ],
        problems: [],
      },
      {
        id: "arrays-hashing",
        title: "Arrays & Hashing",
        icon: "🧺",
        blurb: "Trade memory for speed with the single most useful data structure in interviews.",
        concept: `A hash map (or hash set) gives you average O(1) insert, delete, and lookup by trading
memory for speed. The single biggest unlock in this topic is realizing that almost any
"have I seen this before?" or "how many times does this appear?" question collapses from
O(n²) brute force to O(n) the moment you store what you've seen in a hash map as you scan.

The second big idea is using a hash map (or a fixed-size array, when your alphabet is known,
like lowercase letters) as a *frequency counter*. Two anagram strings will always produce an
identical frequency map. Two arrays are permutations of each other if their sorted forms — or
their frequency maps — match. Once you see "counts of things" in a problem, reach for this.

Watch your space/time tradeoff: sorting gets you correctness in O(n log n) time and O(1) extra
space; a hash map gets you O(n) time at the cost of O(n) space. Both are valid — know why you'd
pick one over the other in an interview.`,
        recognize: [
          "\"Have I seen this value before?\" → hash set.",
          "\"Count occurrences / frequency\" → hash map or fixed-size count array.",
          "\"Group items that share a property\" (anagrams, same sum) → hash map of lists, keyed by a signature.",
          "\"Find a pair/triplet that sums to X\" → hash map for O(n), or sort + two pointers for O(n log n).",
        ],
        problems: [
          { title: "Contains Duplicate", difficulty: "Easy", url: "https://leetcode.com/problems/contains-duplicate/", video: "", tags: ["hash set"] },
          { title: "Valid Anagram", difficulty: "Easy", url: "https://leetcode.com/problems/valid-anagram/", video: "", tags: ["hash map", "counting"] },
          { title: "Two Sum", difficulty: "Easy", url: "https://leetcode.com/problems/two-sum/", video: "", tags: ["hash map"] },
          { title: "Group Anagrams", difficulty: "Medium", url: "https://leetcode.com/problems/group-anagrams/", video: "", tags: ["hash map", "sorting"] },
          { title: "Top K Frequent Elements", difficulty: "Medium", url: "https://leetcode.com/problems/top-k-frequent-elements/", video: "", tags: ["hash map", "bucket sort", "heap"] },
          { title: "Product of Array Except Self", difficulty: "Medium", url: "https://leetcode.com/problems/product-of-array-except-self/", video: "", tags: ["prefix product"] },
          { title: "Valid Sudoku", difficulty: "Medium", url: "https://leetcode.com/problems/valid-sudoku/", video: "", tags: ["hash set"] },
          { title: "Longest Consecutive Sequence", difficulty: "Medium", url: "https://leetcode.com/problems/longest-consecutive-sequence/", video: "", tags: ["hash set"] },
        ],
      },
      {
        id: "two-pointers",
        title: "Two Pointers",
        icon: "👉",
        blurb: "Two indices moving with intention beat one index moving blindly.",
        concept: `Two Pointers replaces a nested loop with two indices that each move in one direction,
never backtracking, so the total work stays O(n) instead of O(n²). It works whenever moving one
pointer inward lets you *safely eliminate* a whole range of possibilities in one step — most
often because the array is sorted.

There are three common shapes: (1) **Converging pointers** — one at each end of a sorted array,
moving toward the middle to find a target sum (Two Sum II, 3Sum, Container With Most Water).
(2) **Fast & slow pointers** — moving through a linked list or array at different speeds to
detect cycles or find midpoints (Floyd's algorithm). (3) **Same-direction pointers** — one
pointer scans ahead while another marks a boundary, common in in-place array partitioning.

The mental test: "if I move the left pointer right, does the answer space I'm eliminating
definitely not contain a better solution?" If yes, two pointers is safe to use.`,
        recognize: [
          "Sorted array + \"find a pair/triplet with sum ___\" → converging two pointers.",
          "Palindrome check on a string → pointers from both ends moving inward.",
          "Linked list \"detect a cycle\" or \"find the middle\" → fast & slow pointers.",
          "\"Maximize the area/width between two indices\" → converging pointers, move the smaller side.",
        ],
        problems: [
          { title: "Valid Palindrome", difficulty: "Easy", url: "https://leetcode.com/problems/valid-palindrome/", video: "", tags: ["converging"] },
          { title: "Two Sum II - Input Array Is Sorted", difficulty: "Medium", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", video: "", tags: ["converging"] },
          { title: "3Sum", difficulty: "Medium", url: "https://leetcode.com/problems/3sum/", video: "", tags: ["converging", "sorting"] },
          { title: "Container With Most Water", difficulty: "Medium", url: "https://leetcode.com/problems/container-with-most-water/", video: "", tags: ["converging", "greedy"] },
          { title: "Trapping Rain Water", difficulty: "Hard", url: "https://leetcode.com/problems/trapping-rain-water/", video: "", tags: ["converging", "prefix max"] },
        ],
      },
      {
        id: "sliding-window",
        title: "Sliding Window",
        icon: "🪟",
        blurb: "Stop re-scanning the same elements — slide the window instead.",
        concept: `Sliding Window is Two Pointers' sibling, specialized for *contiguous subarray/substring*
problems. Instead of recomputing a sum, count, or set from scratch for every possible
window, you maintain a running window with a left and right edge: expand right to include a
new element, and only shrink from the left when the window breaks some constraint. Because
each element enters and leaves the window at most once, the whole scan is O(n) instead of the
brute-force O(n²) (or O(n·k)) of checking every window separately.

There are two flavors. **Fixed-size window**: the window length is given (e.g. "max sum of any
k consecutive elements") — slide it by one each step, add the new element, remove the old one.
**Variable-size window**: you grow the window until it becomes invalid, then shrink it from the
left until it's valid again, tracking the best window seen (e.g. "longest substring with at
most k distinct characters"). Almost every variable-window problem follows this exact
expand-then-shrink loop.`,
        recognize: [
          "\"Longest/shortest/max/min substring or subarray that satisfies ___\" → variable sliding window.",
          "\"Best window of exactly k elements\" → fixed sliding window.",
          "You're recomputing a sum/count for every window from scratch → that's your brute-force signal to switch to a window.",
          "Need a frequency map alongside the window to test validity (distinct chars, anagram match) → hash map + window.",
        ],
        problems: [
          { title: "Best Time to Buy and Sell Stock", difficulty: "Easy", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", video: "", tags: ["window"] },
          { title: "Longest Substring Without Repeating Characters", difficulty: "Medium", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", video: "", tags: ["variable window", "hash set"] },
          { title: "Longest Repeating Character Replacement", difficulty: "Medium", url: "https://leetcode.com/problems/longest-repeating-character-replacement/", video: "", tags: ["variable window", "counting"] },
          { title: "Permutation in String", difficulty: "Medium", url: "https://leetcode.com/problems/permutation-in-string/", video: "", tags: ["fixed window", "counting"] },
          { title: "Minimum Window Substring", difficulty: "Hard", url: "https://leetcode.com/problems/minimum-window-substring/", video: "", tags: ["variable window", "counting"] },
          { title: "Sliding Window Maximum", difficulty: "Hard", url: "https://leetcode.com/problems/sliding-window-maximum/", video: "", tags: ["monotonic deque"] },
        ],
      },
      {
        id: "stack",
        title: "Stack",
        icon: "🥞",
        blurb: "Last in, first out — the natural fit for nested and \"look back\" problems.",
        concept: `A stack (LIFO — last in, first out) is the natural structure whenever a problem has
*nested* or *most-recent-first* structure: matching brackets, undo history, or "the next
element that is bigger/smaller than me." Push, pop, and peek are all O(1), which is why stack
solutions are almost always O(n) overall.

The pattern to master here is the **monotonic stack**: a stack that you keep sorted (increasing
or decreasing) by popping elements that violate the order before pushing the new one. This is
how "next greater element," "daily temperatures," and "largest rectangle in histogram" all run
in O(n) instead of O(n²) — each element is pushed and popped at most once, even though it looks
like nested loops.

Also remember: recursion itself is a stack (the call stack). Any recursive tree/DFS traversal
can be rewritten iteratively with an explicit stack — useful when recursion depth might blow
the stack.`,
        recognize: [
          "Matching/validating nested pairs (parentheses, tags) → stack.",
          "\"Next greater/smaller element\" or \"days until warmer temperature\" → monotonic stack.",
          "Need to undo the most recent operation, or evaluate an expression → stack.",
          "Simulating recursion/DFS without recursion → explicit stack.",
        ],
        problems: [
          { title: "Valid Parentheses", difficulty: "Easy", url: "https://leetcode.com/problems/valid-parentheses/", video: "", tags: ["stack"] },
          { title: "Min Stack", difficulty: "Medium", url: "https://leetcode.com/problems/min-stack/", video: "", tags: ["design"] },
          { title: "Evaluate Reverse Polish Notation", difficulty: "Medium", url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", video: "", tags: ["stack"] },
          { title: "Generate Parentheses", difficulty: "Medium", url: "https://leetcode.com/problems/generate-parentheses/", video: "", tags: ["backtracking", "stack"] },
          { title: "Daily Temperatures", difficulty: "Medium", url: "https://leetcode.com/problems/daily-temperatures/", video: "", tags: ["monotonic stack"] },
          { title: "Car Fleet", difficulty: "Medium", url: "https://leetcode.com/problems/car-fleet/", video: "", tags: ["monotonic stack"] },
          { title: "Largest Rectangle in Histogram", difficulty: "Hard", url: "https://leetcode.com/problems/largest-rectangle-in-histogram/", video: "", tags: ["monotonic stack"] },
        ],
      },
      {
        id: "binary-search",
        title: "Binary Search",
        icon: "🔭",
        blurb: "Halve the search space every step — O(log n) is the reward for sorted structure.",
        concept: `Binary Search works on any search space where you can answer "is the target to the left
or right of this midpoint?" in O(1). Classic use: a sorted array. Each check eliminates half
the remaining space, giving O(log n) instead of O(n) — for a billion elements, that's ~30 steps
instead of a billion.

The advanced (and far more powerful) form is **"binary search on the answer."** Whenever a
problem asks for the minimum/maximum value that satisfies some condition, and you can write a
function 'feasible(x)' that is monotonic (true for all x ≥ some threshold, false below it, or
vice versa), you can binary search over the *answer space* itself rather than an array index.
This is how "Koko Eating Bananas" (search over eating speed) and "Split Array Largest Sum"
work — the array doesn't even need to be sorted; the *condition* needs to be monotonic.

Be exact with your loop invariant. Decide up front whether your range is '[lo, hi]' or
'[lo, hi)', and whether you want the first-true or last-true index — sloppy boundaries are the
#1 source of binary search bugs.`,
        recognize: [
          "Array is sorted (or rotated-sorted) → binary search for the index in O(log n).",
          "\"Find the minimum/maximum X such that condition(X) holds\" → binary search on the answer.",
          "\"Find first/last position satisfying a predicate\" → binary search for a boundary.",
          "A 2D grid where rows and columns are each sorted → binary search per row, or treat as flattened array.",
        ],
        problems: [
          { title: "Binary Search", difficulty: "Easy", url: "https://leetcode.com/problems/binary-search/", video: "", tags: ["classic"] },
          { title: "Search a 2D Matrix", difficulty: "Medium", url: "https://leetcode.com/problems/search-a-2d-matrix/", video: "", tags: ["classic"] },
          { title: "Koko Eating Bananas", difficulty: "Medium", url: "https://leetcode.com/problems/koko-eating-bananas/", video: "", tags: ["binary search on answer"] },
          { title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", video: "", tags: ["rotated array"] },
          { title: "Search in Rotated Sorted Array", difficulty: "Medium", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/", video: "", tags: ["rotated array"] },
          { title: "Time Based Key-Value Store", difficulty: "Medium", url: "https://leetcode.com/problems/time-based-key-value-store/", video: "", tags: ["design", "binary search"] },
          { title: "Median of Two Sorted Arrays", difficulty: "Hard", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/", video: "", tags: ["binary search on answer"] },
        ],
      },
    ],
  },

  // ================= WORLD 2 — CORE PATTERNS =================
  {
    tier: "intermediate",
    world: "World 2",
    worldTitle: "Core Patterns",
    worldBlurb: "The patterns that show up in the majority of real interviews.",
    topics: [
      {
        id: "linked-list",
        title: "Linked List",
        icon: "🔗",
        blurb: "No random access, so every trick here is about pointer choreography.",
        concept: `Linked lists trade random access (no 'arr[i]') for O(1) insertion/removal anywhere,
if you already hold the right pointer. Because you can't "peek ahead" cheaply, almost every
technique here is about carefully choreographing a small number of pointers so you never lose
your place.

Three moves cover 90% of linked-list problems: (1) **Reversal** — walk the list holding
'prev', 'curr', 'next', and flip links as you go. (2) **Fast & slow pointers** — the fast
pointer moves 2 steps for every 1 of the slow pointer, which finds the middle in one pass and
detects a cycle (if fast ever catches slow, there's a cycle — Floyd's algorithm). (3) **Dummy
head node** — when a problem might delete or rearrange the very first node, create a fake node
before the head so you never need special-case code for "is this the head?"

Always draw the list on paper (or in your head) before coding — mislabeling which pointer moves
first is the single most common linked-list bug.`,
        recognize: [
          "\"Reverse\", \"reorder\", or \"rotate\" a list → prev/curr/next pointer surgery.",
          "\"Detect a cycle\" or \"find the middle/kth-from-end node\" → fast & slow pointers.",
          "The head node itself might change or be removed → use a dummy head.",
          "\"Merge k lists\" or \"find intersection\" → heap, or two-pointer merge, depending on count.",
        ],
        problems: [
          { title: "Reverse Linked List", difficulty: "Easy", url: "https://leetcode.com/problems/reverse-linked-list/", video: "", tags: ["pointers"] },
          { title: "Merge Two Sorted Lists", difficulty: "Easy", url: "https://leetcode.com/problems/merge-two-sorted-lists/", video: "", tags: ["dummy head"] },
          { title: "Linked List Cycle", difficulty: "Easy", url: "https://leetcode.com/problems/linked-list-cycle/", video: "", tags: ["fast & slow"] },
          { title: "Reorder List", difficulty: "Medium", url: "https://leetcode.com/problems/reorder-list/", video: "", tags: ["fast & slow", "reversal"] },
          { title: "Remove Nth Node From End of List", difficulty: "Medium", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", video: "", tags: ["dummy head"] },
          { title: "Copy List with Random Pointer", difficulty: "Medium", url: "https://leetcode.com/problems/copy-list-with-random-pointer/", video: "", tags: ["hash map"] },
          { title: "Add Two Numbers", difficulty: "Medium", url: "https://leetcode.com/problems/add-two-numbers/", video: "", tags: ["dummy head"] },
          { title: "LRU Cache", difficulty: "Medium", url: "https://leetcode.com/problems/lru-cache/", video: "", tags: ["design", "doubly linked list"] },
          { title: "Merge k Sorted Lists", difficulty: "Hard", url: "https://leetcode.com/problems/merge-k-sorted-lists/", video: "", tags: ["heap"] },
          { title: "Reverse Nodes in k-Group", difficulty: "Hard", url: "https://leetcode.com/problems/reverse-nodes-in-k-group/", video: "", tags: ["pointers"] },
        ],
      },
      {
        id: "trees",
        title: "Trees",
        icon: "🌳",
        blurb: "Recursion's favorite home — most tree problems are one clean recursive idea.",
        concept: `Almost every binary tree problem is solved by asking: "what do I need from my left
subtree, what do I need from my right subtree, and how do I combine them at this node?" That's
the entire recursive template. Depth, balance, diameter, path sums — all of them are "combine
left result + right result + something about this node."

Traversal order matters: **preorder** (node → left → right) is natural for copying/serializing
a tree top-down; **inorder** (left → node → right) visits a Binary Search Tree's values in
sorted order — this single fact powers half of all BST problems; **postorder** (left → right →
node) is for when a node needs results from both children first (deletion, computing subtree
properties). **BFS / level order** (using a queue) is what you reach for whenever a problem
mentions "level," "depth," or "row" explicitly.

For BSTs specifically, use the invariant directly instead of treating it as a plain tree:
at every node, everything in the left subtree is smaller and everything in the right subtree is
larger. That single fact turns O(n) tree-wide searches into O(log n) descents.`,
        recognize: [
          "\"Compute something about every subtree\" (height, sum, balance) → post-order recursion, combine children's results.",
          "\"Level by level\" / \"row by row\" / \"shortest path in an unweighted tree\" → BFS with a queue.",
          "It's explicitly a BST and you need order, kth-smallest, or a range → inorder traversal or descend using the BST property.",
          "\"Rebuild a tree from a traversal\" → use one traversal to find the root, the other to split left/right subtrees.",
        ],
        problems: [
          { title: "Invert Binary Tree", difficulty: "Easy", url: "https://leetcode.com/problems/invert-binary-tree/", video: "", tags: ["recursion"] },
          { title: "Maximum Depth of Binary Tree", difficulty: "Easy", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", video: "", tags: ["recursion"] },
          { title: "Diameter of Binary Tree", difficulty: "Easy", url: "https://leetcode.com/problems/diameter-of-binary-tree/", video: "", tags: ["post-order"] },
          { title: "Balanced Binary Tree", difficulty: "Easy", url: "https://leetcode.com/problems/balanced-binary-tree/", video: "", tags: ["post-order"] },
          { title: "Same Tree", difficulty: "Easy", url: "https://leetcode.com/problems/same-tree/", video: "", tags: ["recursion"] },
          { title: "Subtree of Another Tree", difficulty: "Easy", url: "https://leetcode.com/problems/subtree-of-another-tree/", video: "", tags: ["recursion"] },
          { title: "Lowest Common Ancestor of a BST", difficulty: "Medium", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", video: "", tags: ["BST property"] },
          { title: "Binary Tree Level Order Traversal", difficulty: "Medium", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/", video: "", tags: ["BFS"] },
          { title: "Binary Tree Right Side View", difficulty: "Medium", url: "https://leetcode.com/problems/binary-tree-right-side-view/", video: "", tags: ["BFS"] },
          { title: "Kth Smallest Element in a BST", difficulty: "Medium", url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", video: "", tags: ["inorder"] },
          { title: "Construct Binary Tree from Preorder and Inorder Traversal", difficulty: "Medium", url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", video: "", tags: ["traversal"] },
          { title: "Validate Binary Search Tree", difficulty: "Medium", url: "https://leetcode.com/problems/validate-binary-search-tree/", video: "", tags: ["BST property"] },
          { title: "Binary Tree Maximum Path Sum", difficulty: "Hard", url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", video: "", tags: ["post-order"] },
          { title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", video: "", tags: ["preorder", "design"] },
        ],
      },
      {
        id: "tries",
        title: "Tries",
        icon: "🔤",
        blurb: "A tree built for one job: blazing-fast prefix lookups.",
        concept: `A Trie (prefix tree) is a tree where each node represents one character, and any path
from the root spells out a prefix that's been inserted. It answers "does any word start with
this prefix?" in O(length of prefix) — completely independent of how many words are stored.
That's the entire reason it exists: hash sets are great for "is this exact word present?" but
useless for "is there ANY word starting with 'pre'?" Tries make prefix queries as cheap as exact
lookups.

Implementation is always the same skeleton: each node holds a fixed-size (or hash-map) array of
child pointers, one per possible next character, plus a boolean 'isEnd' flag marking "a
complete word ends here." Insert and search both just walk character by character, creating
children as needed (insert) or bailing out early if a character path doesn't exist (search).

Once you're comfortable with the basic Trie, the extension is combining it with DFS/backtracking:
walking a grid or a board while simultaneously walking the Trie in lock-step lets you prune
entire search branches the instant the current path stops being a valid prefix of any word.`,
        recognize: [
          "\"Prefix\" appears anywhere in the problem statement → Trie.",
          "Autocomplete / spell-check / dictionary-style word lookup → Trie.",
          "Searching a grid/board for multiple words at once → Trie + backtracking, so branches share prefix work.",
          "Wildcard character matching in search (like '.') → Trie with recursive search that branches on wildcards.",
        ],
        problems: [
          { title: "Implement Trie (Prefix Tree)", difficulty: "Medium", url: "https://leetcode.com/problems/implement-trie-prefix-tree/", video: "", tags: ["design"] },
          { title: "Design Add and Search Words Data Structure", difficulty: "Medium", url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/", video: "", tags: ["design", "DFS"] },
          { title: "Word Search II", difficulty: "Hard", url: "https://leetcode.com/problems/word-search-ii/", video: "", tags: ["trie + backtracking"] },
        ],
      },
      {
        id: "heap",
        title: "Heap / Priority Queue",
        icon: "🏔️",
        blurb: "Always know the smallest (or biggest) element in O(log n), instantly.",
        concept: `A heap is a tree-shaped structure that keeps one guarantee at all times: the root is
always the smallest element (min-heap) or the largest (max-heap). Push and pop are both
O(log n), and peeking at the extreme value is O(1) — which is exactly what you want whenever a
problem repeatedly asks "give me the current smallest/largest" as the data changes.

The single most important trick: **"top K" problems only need a heap of size K**, not a heap of
everything. For "K largest," keep a *min*-heap of size K — any new element bigger than the
heap's smallest kicks the smallest out. This bounds the heap operations to O(n log k) instead of
O(n log n), and it's the pattern behind K Closest Points, Top K Frequent, and similar problems.

The second major use is **merging/scheduling**: whenever you have several sorted streams (k
sorted lists, k sorted arrays) and need the next-smallest across all of them repeatedly, push one
"current" element per stream into a heap and pop-then-push-next in a loop. That's how Merge K
Sorted Lists and Task Scheduler-style problems become efficient.`,
        recognize: [
          "\"Kth largest/smallest\" or \"top K ___\" → heap of size K.",
          "\"Continuously find the median / min / max as elements stream in\" → heap (often two heaps for median).",
          "Merging multiple already-sorted sources → heap holding one \"current\" element per source.",
          "Task/CPU scheduling by priority or frequency → max-heap on priority/frequency.",
        ],
        problems: [
          { title: "Kth Largest Element in a Stream", difficulty: "Easy", url: "https://leetcode.com/problems/kth-largest-element-in-a-stream/", video: "", tags: ["min-heap of size k"] },
          { title: "Last Stone Weight", difficulty: "Easy", url: "https://leetcode.com/problems/last-stone-weight/", video: "", tags: ["max-heap"] },
          { title: "K Closest Points to Origin", difficulty: "Medium", url: "https://leetcode.com/problems/k-closest-points-to-origin/", video: "", tags: ["heap of size k"] },
          { title: "Kth Largest Element in an Array", difficulty: "Medium", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/", video: "", tags: ["heap", "quickselect"] },
          { title: "Task Scheduler", difficulty: "Medium", url: "https://leetcode.com/problems/task-scheduler/", video: "", tags: ["max-heap", "greedy"] },
          { title: "Design Twitter", difficulty: "Medium", url: "https://leetcode.com/problems/design-twitter/", video: "", tags: ["heap", "design"] },
          { title: "Find Median from Data Stream", difficulty: "Hard", url: "https://leetcode.com/problems/find-median-from-data-stream/", video: "", tags: ["two heaps"] },
        ],
      },
      {
        id: "backtracking",
        title: "Backtracking",
        icon: "🧩",
        blurb: "Explore every choice, undo the ones that fail, and prune early.",
        concept: `Backtracking is systematic brute force: build a candidate solution one choice at a
time, and the moment a partial choice can't possibly lead to a valid answer, undo it ("back
track") and try the next option. It's implemented as DFS over a decision tree where every node
is "a choice made so far," and the recursion explores every branch — but pruning invalid
branches early is what keeps it from being hopelessly slow.

The universal template is: 'choose → explore → un-choose'. You pick an option, recurse deeper
with it included, and after the recursive call returns, you remove it before trying the next
option — this is exactly why it's called "backtracking." The candidate list/set you're building
is usually mutated in place and undone, which is far more memory-efficient than copying it at
every level.

The key design decisions are always: (1) what's the base case that means "candidate complete"?
(2) what choices are available at this step? (3) what condition lets me prune a branch before
even recursing into it? Good pruning (like skipping duplicates in a sorted input, or stopping
once a partial sum exceeds the target) is the difference between a solution that passes and one
that times out.`,
        recognize: [
          "\"Generate all subsets / permutations / combinations\" → backtracking over choices.",
          "\"Find all ways to ___\" or \"return all valid ___\" (not just one) → backtracking, exhaustive by design.",
          "A grid/board search where you must not reuse a cell → DFS + backtracking with a visited marker you unmark on the way out.",
          "Duplicates in the input that would create duplicate results → sort first, then skip over repeats at the same recursion depth.",
        ],
        problems: [
          { title: "Subsets", difficulty: "Medium", url: "https://leetcode.com/problems/subsets/", video: "", tags: ["choose/explore/unchoose"] },
          { title: "Combination Sum", difficulty: "Medium", url: "https://leetcode.com/problems/combination-sum/", video: "", tags: ["pruning"] },
          { title: "Permutations", difficulty: "Medium", url: "https://leetcode.com/problems/permutations/", video: "", tags: ["swap or visited set"] },
          { title: "Subsets II", difficulty: "Medium", url: "https://leetcode.com/problems/subsets-ii/", video: "", tags: ["dedup"] },
          { title: "Combination Sum II", difficulty: "Medium", url: "https://leetcode.com/problems/combination-sum-ii/", video: "", tags: ["dedup"] },
          { title: "Word Search", difficulty: "Medium", url: "https://leetcode.com/problems/word-search/", video: "", tags: ["grid DFS"] },
          { title: "Palindrome Partitioning", difficulty: "Medium", url: "https://leetcode.com/problems/palindrome-partitioning/", video: "", tags: ["substring choices"] },
          { title: "Letter Combinations of a Phone Number", difficulty: "Medium", url: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/", video: "", tags: ["choose/explore/unchoose"] },
          { title: "N-Queens", difficulty: "Hard", url: "https://leetcode.com/problems/n-queens/", video: "", tags: ["pruning"] },
        ],
      },
      {
        id: "intervals",
        title: "Intervals",
        icon: "📅",
        blurb: "Sort by start time and almost every interval problem falls into place.",
        concept: `Interval problems (meetings, ranges, bookings) become dramatically simpler the moment
you sort by start time — after that, overlap detection between neighbors is a single
comparison: two intervals '[a,b]' and '[c,d]' overlap exactly when 'c <= b' (assuming a ≤ c
after sorting). Almost every problem in this topic is "sort, then sweep once, merging or
counting as you go."

**Merging** overlapping intervals: sort by start, walk through, and merge the current interval
into the last kept one whenever they overlap, otherwise start a new group. **Inserting** a new
interval into an already-sorted, non-overlapping list: walk through, keep intervals entirely
before the new one untouched, merge all intervals that overlap the new one into a single block,
then keep everything entirely after untouched. **Counting overlaps / minimum rooms needed**:
sort start times and end times separately (or use a min-heap of end times) and sweep — this is
the classic "meeting rooms" family.

Watch the inequality direction carefully: whether touching endpoints ('b == c') count as
overlapping changes per problem statement — always double check with the given examples.`,
        recognize: [
          "The input is a list of '[start, end]' ranges → sort by start time first, almost always.",
          "\"Merge overlapping\" → single sweep after sorting, extending or starting a new merged interval.",
          "\"Minimum rooms/resources needed at any point in time\" → sweep line with a min-heap of end times, or sort starts/ends separately.",
          "\"Can you attend all / is there a conflict\" → sort, then just check adjacent pairs.",
        ],
        problems: [
          { title: "Insert Interval", difficulty: "Medium", url: "https://leetcode.com/problems/insert-interval/", video: "", tags: ["sweep"] },
          { title: "Merge Intervals", difficulty: "Medium", url: "https://leetcode.com/problems/merge-intervals/", video: "", tags: ["sort + sweep"] },
          { title: "Non-overlapping Intervals", difficulty: "Medium", url: "https://leetcode.com/problems/non-overlapping-intervals/", video: "", tags: ["greedy"] },
          { title: "Meeting Rooms", difficulty: "Easy", url: "https://leetcode.com/problems/meeting-rooms/", video: "", tags: ["sort + sweep"], premium: true },
          { title: "Meeting Rooms II", difficulty: "Medium", url: "https://leetcode.com/problems/meeting-rooms-ii/", video: "", tags: ["min-heap"], premium: true },
          { title: "Minimum Interval to Include Each Query", difficulty: "Hard", url: "https://leetcode.com/problems/minimum-interval-to-include-each-query/", video: "", tags: ["sweep + heap"] },
        ],
      },
      {
        id: "greedy",
        title: "Greedy",
        icon: "🪙",
        blurb: "Make the best local choice at each step and prove it never backfires.",
        concept: `A greedy algorithm builds a solution by always taking the locally best choice available
right now, and never reconsidering it. It's fast (usually O(n) or O(n log n)) and simple to
code — but it's only *correct* when the problem has a property called the "greedy choice
property": committing to the best immediate option never rules out an optimal overall solution.
The hard part of greedy problems is never the code, it's convincing yourself the local choice is
safe.

A useful habit: try to find a counterexample to your greedy rule before coding it. If you can't
break it after genuinely trying, it's probably correct. Common greedy building blocks: sort the
input by some criterion first (deadline, ratio, position), then make one linear pass taking the
obviously-best option at each step; or track a running "budget" (like fuel or reach) and bail
out the moment it goes negative.

When greedy *doesn't* work (the local best does rule out better global options), that's usually
your signal that the problem actually needs Dynamic Programming instead — greedy and DP are
often two doors into the same room, and the first thing to check is which one this problem's
"optimal substructure" actually respects.`,
        recognize: [
          "\"Maximum/minimum number of ___\" with no need to reconsider past choices → try greedy first.",
          "Sorting by a ratio, ending time, or position before scanning once → classic greedy setup.",
          "You find yourself wanting to \"undo\" a greedy choice later → greedy is wrong here, switch to DP.",
          "\"Is it possible to reach the end / cover everything\" with a resource that depletes → track running budget, bail on negative.",
        ],
        problems: [
          { title: "Maximum Subarray", difficulty: "Medium", url: "https://leetcode.com/problems/maximum-subarray/", video: "", tags: ["running sum"] },
          { title: "Jump Game", difficulty: "Medium", url: "https://leetcode.com/problems/jump-game/", video: "", tags: ["reachability"] },
          { title: "Jump Game II", difficulty: "Medium", url: "https://leetcode.com/problems/jump-game-ii/", video: "", tags: ["BFS-like greedy"] },
          { title: "Gas Station", difficulty: "Medium", url: "https://leetcode.com/problems/gas-station/", video: "", tags: ["running budget"] },
          { title: "Hand of Straights", difficulty: "Medium", url: "https://leetcode.com/problems/hand-of-straights/", video: "", tags: ["hash map + sort"] },
          { title: "Merge Triplets to Form Target Triplet", difficulty: "Medium", url: "https://leetcode.com/problems/merge-triplets-to-form-target-triplet/", video: "", tags: ["greedy filter"] },
          { title: "Partition Labels", difficulty: "Medium", url: "https://leetcode.com/problems/partition-labels/", video: "", tags: ["last-occurrence map"] },
          { title: "Valid Parenthesis String", difficulty: "Medium", url: "https://leetcode.com/problems/valid-parenthesis-string/", video: "", tags: ["range tracking"] },
        ],
      },
    ],
  },

  // ================= WORLD 3 — MASTERY =================
  {
    tier: "advanced",
    world: "World 3",
    worldTitle: "Mastery",
    worldBlurb: "Graphs, dynamic programming, and the tricks that separate good from great.",
    topics: [
      {
        id: "graphs",
        title: "Graphs",
        icon: "🕸️",
        blurb: "Everything connected to everything — trees are just graphs with no cycles.",
        concept: `A graph is nodes plus edges — trees, grids, and networks are all graphs. Two traversal
tools cover most problems: **DFS** (recurse or use an explicit stack; great for "does a path
exist," exploring all of a connected region, detecting cycles, topological sort) and **BFS**
(use a queue; the only correct choice whenever you need the *shortest* path in an unweighted
graph, because BFS explores in exact distance order).

Grids are graphs in disguise: each cell is a node, and its up/down/left/right neighbors are its
edges. "Number of islands," "rotting oranges," and "flood fill" are all just DFS/BFS on this
implicit grid-graph — you rarely need to build an explicit adjacency list for grid problems.

Two structural ideas complete the toolkit: **topological sort** (Kahn's algorithm — repeatedly
remove nodes with no remaining incoming edges) for "task ordering with dependencies" and cycle
detection in *directed* graphs, and **Union-Find / Disjoint Set** for efficiently tracking which
nodes are already connected as you add edges one at a time — the backbone of Kruskal's MST and
"redundant connection" style problems.`,
        recognize: [
          "A grid where you explore connected regions of cells → DFS/BFS treating cells as graph nodes.",
          "\"Shortest path\" with all edges the same weight (unweighted) → BFS, never DFS.",
          "\"Can all tasks be completed given these dependencies\" → topological sort / cycle detection in a directed graph.",
          "\"Are these two nodes already connected\" as edges are added incrementally → Union-Find.",
        ],
        problems: [
          { title: "Number of Islands", difficulty: "Medium", url: "https://leetcode.com/problems/number-of-islands/", video: "", tags: ["grid DFS/BFS"] },
          { title: "Clone Graph", difficulty: "Medium", url: "https://leetcode.com/problems/clone-graph/", video: "", tags: ["DFS + hash map"] },
          { title: "Max Area of Island", difficulty: "Medium", url: "https://leetcode.com/problems/max-area-of-island/", video: "", tags: ["grid DFS"] },
          { title: "Pacific Atlantic Water Flow", difficulty: "Medium", url: "https://leetcode.com/problems/pacific-atlantic-water-flow/", video: "", tags: ["multi-source DFS"] },
          { title: "Surrounded Regions", difficulty: "Medium", url: "https://leetcode.com/problems/surrounded-regions/", video: "", tags: ["boundary DFS"] },
          { title: "Rotting Oranges", difficulty: "Medium", url: "https://leetcode.com/problems/rotting-oranges/", video: "", tags: ["multi-source BFS"] },
          { title: "Walls and Gates", difficulty: "Medium", url: "https://leetcode.com/problems/walls-and-gates/", video: "", tags: ["multi-source BFS"], premium: true },
          { title: "Course Schedule", difficulty: "Medium", url: "https://leetcode.com/problems/course-schedule/", video: "", tags: ["topological sort"] },
          { title: "Course Schedule II", difficulty: "Medium", url: "https://leetcode.com/problems/course-schedule-ii/", video: "", tags: ["topological sort"] },
          { title: "Redundant Connection", difficulty: "Medium", url: "https://leetcode.com/problems/redundant-connection/", video: "", tags: ["union-find"] },
          { title: "Number of Connected Components in an Undirected Graph", difficulty: "Medium", url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/", video: "", tags: ["union-find"], premium: true },
          { title: "Graph Valid Tree", difficulty: "Medium", url: "https://leetcode.com/problems/graph-valid-tree/", video: "", tags: ["union-find"], premium: true },
          { title: "Word Ladder", difficulty: "Hard", url: "https://leetcode.com/problems/word-ladder/", video: "", tags: ["BFS"] },
        ],
      },
      {
        id: "advanced-graphs",
        title: "Advanced Graphs",
        icon: "🛰️",
        blurb: "Weighted edges change everything — enter Dijkstra, MST, and friends.",
        concept: `The moment edges have *different weights*, plain BFS stops guaranteeing the shortest
path (BFS assumes every edge costs the same "1 step"). **Dijkstra's algorithm** fixes this: use
a min-heap keyed by "cheapest distance so far" instead of a plain queue, and always expand the
currently-cheapest unvisited node next. It's BFS's weighted big sibling, and it's the tool for
any "cheapest/shortest path with positive weights" problem.

**Minimum Spanning Tree (MST)** problems ("connect all nodes as cheaply as possible") are
solved with **Prim's** (grow one connected tree, always adding the cheapest edge leaving it —
a min-heap again) or **Kruskal's** (sort all edges cheapest-first, add each edge unless it would
create a cycle, checked via Union-Find). Both are greedy algorithms whose correctness is proven
by the "cut property" of MSTs.

For DAG-specific shortest paths, or path problems that need to explore states in a specific
order (like "cheapest flight with at most K stops"), Bellman-Ford or a modified BFS/DFS that
tracks remaining budget as part of the state often replaces Dijkstra — the key insight is always
"what extra dimension does my state need beyond just 'which node am I at'?"`,
        recognize: [
          "Edges have different weights and you need shortest/cheapest path → Dijkstra (min-heap of running distances).",
          "\"Connect everything as cheaply as possible\" → Minimum Spanning Tree, Prim's or Kruskal's.",
          "Shortest path but with a constraint like \"at most K stops\" → extend the state with that constraint, not plain Dijkstra.",
          "Need to reconstruct an actual path/route, not just its cost → Eulerian path / DFS with edge removal (Reconstruct Itinerary style).",
        ],
        problems: [
          { title: "Reconstruct Itinerary", difficulty: "Hard", url: "https://leetcode.com/problems/reconstruct-itinerary/", video: "", tags: ["Eulerian path"] },
          { title: "Min Cost to Connect All Points", difficulty: "Medium", url: "https://leetcode.com/problems/min-cost-to-connect-all-points/", video: "", tags: ["MST / Prim's"] },
          { title: "Network Delay Time", difficulty: "Medium", url: "https://leetcode.com/problems/network-delay-time/", video: "", tags: ["Dijkstra"] },
          { title: "Swim in Rising Water", difficulty: "Hard", url: "https://leetcode.com/problems/swim-in-rising-water/", video: "", tags: ["Dijkstra-style heap"] },
          { title: "Alien Dictionary", difficulty: "Hard", url: "https://leetcode.com/problems/alien-dictionary/", video: "", tags: ["topological sort"], premium: true },
          { title: "Cheapest Flights Within K Stops", difficulty: "Medium", url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/", video: "", tags: ["Bellman-Ford"] },
        ],
      },
      {
        id: "dp-1d",
        title: "1-D Dynamic Programming",
        icon: "🧮",
        blurb: "Stop solving the same subproblem twice — remember it instead.",
        concept: `Dynamic Programming solves a problem by breaking it into overlapping subproblems,
solving each one *once*, and reusing that answer everywhere it's needed — the opposite of naive
recursion, which resolves the exact same subproblem exponentially many times. The two ways to
implement this are **memoization** (write the natural recursion, cache each result the first
time it's computed) and **tabulation** (build a table bottom-up, iteratively, usually more
memory-efficient since you can often shrink the table to O(1) extra state).

For 1-D DP, the state is almost always 'dp[i]' = "the best answer using/ending-at index i," and
the recurrence expresses 'dp[i]' in terms of a handful of earlier entries ('dp[i-1]', 'dp[i-2]',
etc.). The entire skill of DP is finding the right **state definition** and **recurrence** —
once you have those, the code almost writes itself. Start by writing the brute-force recursion
first; the recurrence for DP is usually staring right at you in the recursive case.

A recognizable family: House Robber (dp[i] = max(rob i + dp[i-2], skip i + dp[i-1])), Climbing
Stairs (dp[i] = dp[i-1] + dp[i-2], literally Fibonacci), and Coin Change (dp[amount] = 1 +
min over coins of dp[amount - coin]) are the three shapes almost every 1-D DP problem
rearranges.`,
        recognize: [
          "\"Count the number of ways to ___\" or \"minimum/maximum ___ to reach a state\" → DP.",
          "Brute-force recursion re-solves identical subproblems many times → add memoization, then convert to tabulation.",
          "The answer at position i only depends on a few previous positions → 1-D 'dp[i]' array (often shrinkable to a couple of variables).",
          "Choices look like \"take it or skip it\" at each step → classic 1-D DP recurrence (House Robber shape).",
        ],
        problems: [
          { title: "Climbing Stairs", difficulty: "Easy", url: "https://leetcode.com/problems/climbing-stairs/", video: "", tags: ["fibonacci shape"] },
          { title: "Min Cost Climbing Stairs", difficulty: "Easy", url: "https://leetcode.com/problems/min-cost-climbing-stairs/", video: "", tags: ["fibonacci shape"] },
          { title: "House Robber", difficulty: "Medium", url: "https://leetcode.com/problems/house-robber/", video: "", tags: ["take/skip"] },
          { title: "House Robber II", difficulty: "Medium", url: "https://leetcode.com/problems/house-robber-ii/", video: "", tags: ["take/skip", "circular"] },
          { title: "Longest Palindromic Substring", difficulty: "Medium", url: "https://leetcode.com/problems/longest-palindromic-substring/", video: "", tags: ["expand from center"] },
          { title: "Palindromic Substrings", difficulty: "Medium", url: "https://leetcode.com/problems/palindromic-substrings/", video: "", tags: ["expand from center"] },
          { title: "Decode Ways", difficulty: "Medium", url: "https://leetcode.com/problems/decode-ways/", video: "", tags: ["fibonacci shape"] },
          { title: "Coin Change", difficulty: "Medium", url: "https://leetcode.com/problems/coin-change/", video: "", tags: ["unbounded knapsack"] },
          { title: "Maximum Product Subarray", difficulty: "Medium", url: "https://leetcode.com/problems/maximum-product-subarray/", video: "", tags: ["track min & max"] },
          { title: "Word Break", difficulty: "Medium", url: "https://leetcode.com/problems/word-break/", video: "", tags: ["dp[i] = can segment"] },
          { title: "Longest Increasing Subsequence", difficulty: "Medium", url: "https://leetcode.com/problems/longest-increasing-subsequence/", video: "", tags: ["dp[i] ending at i"] },
          { title: "Partition Equal Subset Sum", difficulty: "Medium", url: "https://leetcode.com/problems/partition-equal-subset-sum/", video: "", tags: ["0/1 knapsack"] },
        ],
      },
      {
        id: "dp-2d",
        title: "2-D Dynamic Programming",
        icon: "🗺️",
        blurb: "When one index isn't enough state, add a second — grids and pairs of strings.",
        concept: `2-D DP is exactly the same philosophy as 1-D — cache overlapping subproblems — but the
state needs two indices instead of one. The two overwhelmingly common shapes are: **grid
problems** where 'dp[r][c]' is "the best answer reaching cell (r,c)" (Unique Paths, min/max
path sum), and **two-string problems** where 'dp[i][j]' is "the best answer comparing the first
i characters of string A with the first j characters of string B" (Longest Common Subsequence,
Edit Distance).

For two-string DP, the recurrence almost always branches on whether 'A[i-1] == B[j-1]': if they
match, you can often extend a diagonal answer ('dp[i-1][j-1] + 1'); if they don't, you take the
best of "skip a character from A" ('dp[i-1][j]') or "skip a character from B" ('dp[i][j-1]')
— exactly how Edit Distance's insert/delete/replace operations fall out of the recurrence
naturally.

Always build the base cases (row 0 and column 0 of the table) first and explicitly — they
encode "what if one of the two inputs is empty," and getting them wrong is the most common
source of off-by-one bugs in 2-D DP.`,
        recognize: [
          "Two strings/sequences being compared or transformed into each other → 'dp[i][j]' over prefixes of both.",
          "Moving through a grid counting paths or optimizing a path sum → 'dp[r][c]' built from the cell(s) above/left.",
          "\"Ways to make change with unlimited/limited coins\" as a 2-D table (coin index x amount) → knapsack-style DP.",
          "The recursion naturally takes two indices as parameters and both change independently → 2-D DP table.",
        ],
        problems: [
          { title: "Unique Paths", difficulty: "Medium", url: "https://leetcode.com/problems/unique-paths/", video: "", tags: ["grid DP"] },
          { title: "Longest Common Subsequence", difficulty: "Medium", url: "https://leetcode.com/problems/longest-common-subsequence/", video: "", tags: ["two-string DP"] },
          { title: "Best Time to Buy and Sell Stock with Cooldown", difficulty: "Medium", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/", video: "", tags: ["state machine DP"] },
          { title: "Coin Change II", difficulty: "Medium", url: "https://leetcode.com/problems/coin-change-ii/", video: "", tags: ["unbounded knapsack"] },
          { title: "Target Sum", difficulty: "Medium", url: "https://leetcode.com/problems/target-sum/", video: "", tags: ["0/1 knapsack"] },
          { title: "Interleaving String", difficulty: "Medium", url: "https://leetcode.com/problems/interleaving-string/", video: "", tags: ["two-string DP"] },
          { title: "Longest Increasing Path in a Matrix", difficulty: "Hard", url: "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/", video: "", tags: ["grid DP + memo DFS"] },
          { title: "Distinct Subsequences", difficulty: "Hard", url: "https://leetcode.com/problems/distinct-subsequences/", video: "", tags: ["two-string DP"] },
          { title: "Edit Distance", difficulty: "Medium", url: "https://leetcode.com/problems/edit-distance/", video: "", tags: ["two-string DP"] },
          { title: "Burst Balloons", difficulty: "Hard", url: "https://leetcode.com/problems/burst-balloons/", video: "", tags: ["interval DP"] },
          { title: "Regular Expression Matching", difficulty: "Hard", url: "https://leetcode.com/problems/regular-expression-matching/", video: "", tags: ["two-string DP"] },
        ],
      },
      {
        id: "bit-manipulation",
        title: "Bit Manipulation",
        icon: "💾",
        blurb: "Every integer is a row of switches — some problems only make sense that way.",
        concept: `Bit manipulation problems view a number as its binary representation and exploit a
handful of identities: 'x ^ x = 0' and 'x ^ 0 = x' (XOR cancels duplicates, which is why XOR-ing
an entire array finds the single non-duplicate value), 'x & (x-1)' clears the lowest set bit
(useful for counting set bits or checking powers of two: a power of two has exactly one set
bit, so 'x & (x-1) == 0'), and 'x & 1' / 'x >> 1' read and discard the lowest bit one at a time.

The recurring theme is *tiny, constant-time tricks that replace what looks like it needs a loop
or extra memory*. "Find the number that appears once while everything else appears twice" is
O(n) time O(1) space with a single XOR pass — no hash map needed at all. "Count bits from 0 to
n" is a DP where 'dp[i] = dp[i >> 1] + (i & 1)', reusing the previous answer's bit count.

You don't need to memorize many tricks here — you need to recognize the *shape* (parity,
duplicates, powers of two, add-without-plus) and remember that bitwise ops exist as a tool, since
they're easy to forget when you're used to reaching for hash maps and loops.`,
        recognize: [
          "\"Every element appears twice except one\" → XOR the whole array.",
          "\"Is this a power of two/four\" → check 'x & (x-1) == 0' (and 'x > 0').",
          "\"Add two numbers without using + or -\" → XOR for sum-without-carry, AND+shift for carry, loop until carry is 0.",
          "Counting set bits across a range → DP reusing 'dp[i >> 1]', not recomputation from scratch per number.",
        ],
        problems: [
          { title: "Single Number", difficulty: "Easy", url: "https://leetcode.com/problems/single-number/", video: "", tags: ["XOR"] },
          { title: "Number of 1 Bits", difficulty: "Easy", url: "https://leetcode.com/problems/number-of-1-bits/", video: "", tags: ["bit tricks"] },
          { title: "Counting Bits", difficulty: "Easy", url: "https://leetcode.com/problems/counting-bits/", video: "", tags: ["bit DP"] },
          { title: "Reverse Bits", difficulty: "Easy", url: "https://leetcode.com/problems/reverse-bits/", video: "", tags: ["bit tricks"] },
          { title: "Missing Number", difficulty: "Easy", url: "https://leetcode.com/problems/missing-number/", video: "", tags: ["XOR or sum"] },
          { title: "Sum of Two Integers", difficulty: "Medium", url: "https://leetcode.com/problems/sum-of-two-integers/", video: "", tags: ["XOR + carry"] },
          { title: "Reverse Integer", difficulty: "Medium", url: "https://leetcode.com/problems/reverse-integer/", video: "", tags: ["overflow handling"] },
        ],
      },
      {
        id: "math-geometry",
        title: "Math & Geometry",
        icon: "📐",
        blurb: "Grid rotation, spirals, and number tricks that show up more than you'd expect.",
        concept: `This bucket covers problems where the cleanest solution comes from a geometric or
mathematical observation rather than a standard data structure. Grid transformations (rotate,
spiral traversal, set matrix zeroes) are almost always solvable **in place** by tracking layers
or boundaries (top row, bottom row, left col, right col) and shrinking them inward — avoid the
instinct to allocate a second grid unless the problem forbids in-place mutation.

For rotating a matrix 90°, the trick worth memorizing is: transpose the matrix (swap 'a[i][j]'
with 'a[j][i]'), then reverse each row — two simple O(n²) passes instead of juggling four-way
swaps. For spiral traversal, maintain four shrinking boundaries (top, bottom, left, right) and
walk right → down → left → up, moving each boundary inward after its pass completes.

For pure math problems (Happy Number, Pow(x,n), Multiply Strings), look for a cycle-detection
angle (fast/slow pointers work on *any* sequence that eventually repeats, not just linked
lists) or a divide-and-conquer angle (fast exponentiation: 'x^n = (x^(n/2))^2', halving n each
time for O(log n) instead of O(n)).`,
        recognize: [
          "\"Rotate/traverse a matrix in place\" → transpose+reverse (rotation) or shrinking boundaries (spiral).",
          "A sequence of transformations that might loop forever → treat it like a cycle-detection problem (fast/slow pointers), even with no linked list in sight.",
          "\"Compute x^n\" or similarly huge exponent/multiplication → divide and conquer / fast exponentiation, not a naive loop.",
          "Simulating a physical/geometric rule (points, distances, layers) → look for the O(1) formula before reaching for a loop.",
        ],
        problems: [
          { title: "Rotate Image", difficulty: "Medium", url: "https://leetcode.com/problems/rotate-image/", video: "", tags: ["transpose + reverse"] },
          { title: "Spiral Matrix", difficulty: "Medium", url: "https://leetcode.com/problems/spiral-matrix/", video: "", tags: ["shrinking boundaries"] },
          { title: "Set Matrix Zeroes", difficulty: "Medium", url: "https://leetcode.com/problems/set-matrix-zeroes/", video: "", tags: ["in-place marking"] },
          { title: "Happy Number", difficulty: "Easy", url: "https://leetcode.com/problems/happy-number/", video: "", tags: ["cycle detection"] },
          { title: "Plus One", difficulty: "Easy", url: "https://leetcode.com/problems/plus-one/", video: "", tags: ["carry propagation"] },
          { title: "Pow(x, n)", difficulty: "Medium", url: "https://leetcode.com/problems/powx-n/", video: "", tags: ["fast exponentiation"] },
          { title: "Multiply Strings", difficulty: "Medium", url: "https://leetcode.com/problems/multiply-strings/", video: "", tags: ["manual multiplication"] },
          { title: "Detect Squares", difficulty: "Medium", url: "https://leetcode.com/problems/detect-squares/", video: "", tags: ["hash map + geometry"] },
        ],
      },
    ],
  },
];

// Flat lookup helpers used across pages
function getAllTopics() {
  return CURRICULUM.flatMap((w) => w.topics.map((t) => ({ ...t, tier: w.tier, world: w.world, worldTitle: w.worldTitle })));
}

function getTopicById(id) {
  return getAllTopics().find((t) => t.id === id);
}

function getAllProblems() {
  const out = [];
  for (const world of CURRICULUM) {
    for (const topic of world.topics) {
      topic.problems.forEach((p, idx) => {
        out.push({ ...p, topicId: topic.id, topicTitle: topic.title, index: idx, key: `${topic.id}__${idx}` });
      });
    }
  }
  return out;
}

window.CURRICULUM = CURRICULUM;
window.getAllTopics = getAllTopics;
window.getTopicById = getTopicById;
window.getAllProblems = getAllProblems;
