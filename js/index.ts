/**
 * 将数组拆成两份 然后分别追加一个 最大值哨兵
 * @param A 需要排序的数组
 * @param p 开始位置
 * @param q 中间位置
 * @param r 结束位置
 */
function merge(A: Array<number>, p: number, q: number, r: number) {
  let A1 = A.slice(p, q); // 数组左边部分
  let A2 = A.slice(q, r); // 数组右边部分
  // 给A1 A2 追加最大值哨兵  数组循环完成后的边界值
  A1.push(Number.MAX_SAFE_INTEGER);
  A2.push(Number.MAX_SAFE_INTEGER);
  // k 为开始位置
  // i 为左边值
  // j 为右边值
  for (let k = p, i = 0, j = 0; k < r; k++) {
    A[k] = A1[i] < A2[j] ? A1[i++] : A2[j++]
  }
}
/**
 * 对数组进行排序  ---- 归并排序法
 * @param A 需要排序的数组
 * @param p 排序的开始位置
 * @param r 排序的结束位置
 * @returns 
 */
function merge_sort(A: Array<number>, p: number, r: number) {
  if (r - p < 2) return;
  const q = Math.ceil((p + r) / 2)
  // 先排序左边
  merge_sort(A, p, q)
  // 在排序右边
  merge_sort(A, q, r)
  // 将左右两边合起来
  merge(A, p, q, r)
}

// const A = [4, 6, 2, 57, 2, 44, 13, 1];
// merge_sort(A, 0, A.length);
// console.log(A)

/** 
 * 中心扩散算法
 */

function longestPalindrome(s:string){
  // 从每一个位置mid触发 向两边扩散
  let maxLeft = 0; // 记录最长回文 子串的起点 
  let maxRight = 0; // 记录最长回文 子串的终点 
  let maxlen = 0; // 记录最长回文 子串的长度 
  let len = 1;
  //    
  for(let mid = 0; mid < s.length; ++mid){
    let left = mid - 1;  // 
    let right = mid + 1; // 
    // 向左侧扩展 直到超过边界 或 遇到与中心字符不等跳出while 循环
    while(left >= 0 && s[left] == s[mid]){
      left--;
      len++;
    }
    // 向右侧扩展 直到超过边界 或 遇到与中心字符不等跳出while 循环
    while(right < s.length -1 && s[right] == s[mid]){
      right++ ;
      len++;
    }
    // 同时向左右两侧扩展
    while (left >= 0 && right <= s.length -1 && s[left] == s[right]) {
        left--;
        right++;
        len+=2;
    }
    if(len > maxlen){
      maxLeft = left;
      maxRight = right;
      maxlen = len;
    }
    len = 1
  }
  //返回子串,从pos位开始，长度为len
  return s.substr(maxLeft + 1, maxlen);
}

// console.log(longestPalindrome("abcddcba"))

/**
 * N字排序
 */
function nSotr(s = "PAYPALISHIRING", numRows = 3){
                    
}