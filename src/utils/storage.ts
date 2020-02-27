/**
 * Retrieves an item from local storage
 * @param {String} key - Key of item to retrieve from local storage
 */
function loadState(key: string): string {
  const stringifiedData = localStorage.getItem(key) as string;
  return JSON.parse(stringifiedData);
}

/**
 * Updates an existing data in local storage with new data
 * @param {String} key - The key of data to update
 * @param {*} data - The new data
 */
function updateState(key: string, data: any): void {
  const stringifiedData = JSON.stringify(data);
  localStorage.setItem(key, stringifiedData);
}

/**
 * Removes an item from local storage
 * @param {String} key - the key of the item
 */
function removeState(key: string): void {
  localStorage.removeItem(key);
}

/**
 * Clears the local storage
 */
function clearStorage(): void {
  localStorage.clear();
}

export default {
  clearStorage,
  updateState,
  loadState,
  removeState,
};
