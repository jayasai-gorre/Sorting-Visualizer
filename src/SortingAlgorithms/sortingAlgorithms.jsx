export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function mergeSortArray(array) {
  if (array.length <= 1) return array;
  const mid = Math.floor(array.length / 2);
  const left = mergeSortArray(array.slice(0, mid));
  const right = mergeSortArray(array.slice(mid));
  return mergePure(left, right);
}

function mergePure(left, right) {
  let result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

export function getQuickSortAnimations(array) {
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(arr, low, high, animations) {
  if (low < high) {
    const pivotIdx = partition(arr, low, high, animations);
    quickSortHelper(arr, low, pivotIdx - 1, animations);
    quickSortHelper(arr, pivotIdx + 1, high, animations);
  }
}

function partition(arr, low, high, animations) {
  const pivot = arr[high];
  let i = low;
  for (let j = low; j < high; j++) {
    animations.push([j, high]);
    animations.push([j, high]);
    if (arr[j] < pivot) {
      animations.push([i, arr[j]]);
      animations.push([j, arr[i]]);
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  animations.push([i, arr[high]]);
  animations.push([high, arr[i]]);
  [arr[i], arr[high]] = [arr[high], arr[i]];
  return i;
}

export function quickSortArray(array) {
  const arr = [...array];
  quickSortNoAnimations(arr, 0, arr.length - 1);
  return arr;
}

function quickSortNoAnimations(arr, low, high) {
  if (low < high) {
    const pivotIdx = partitionNoAnimations(arr, low, high);
    quickSortNoAnimations(arr, low, pivotIdx - 1);
    quickSortNoAnimations(arr, pivotIdx + 1, high);
  }
}

function partitionNoAnimations(arr, low, high) {
  const pivot = arr[high];
  let i = low;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[high]] = [arr[high], arr[i]];
  return i;
}

export function getHeapSortAnimations(array) {
  const animations = [];
  let n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, animations);
  }

  for (let i = n - 1; i > 0; i--) {
    animations.push([0, i]);
    animations.push([0, i]);
    animations.push([0, array[i]]);
    animations.push([i, array[0]]);
    [array[0], array[i]] = [array[i], array[0]];
    heapify(array, i, 0, animations);
  }

  return animations;
}

function heapify(arr, n, i, animations) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    animations.push([i, largest]);
    animations.push([i, largest]);
    animations.push([i, arr[largest]]);
    animations.push([largest, arr[i]]);
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest, animations);
  }
}

export function heapSortArray(array) {
  const arr = [...array];
  let n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapifyNoAnimations(arr, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapifyNoAnimations(arr, i, 0);
  }

  return arr;
}

function heapifyNoAnimations(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapifyNoAnimations(arr, n, largest);
  }
}

export function getBubbleSortAnimations(array) {
  const animations = [];
  let n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push([j, j + 1]);
      animations.push([j, j + 1]);
      if (array[j] > array[j + 1]) {
        animations.push([j, array[j + 1]]);
        animations.push([j + 1, array[j]]);
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return animations;
}

export function bubbleSortArray(array) {
  const arr = [...array];
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
