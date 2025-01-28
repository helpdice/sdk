import CryptoJS from 'crypto-js';

/**
 * Function to set encryption key
 * @param {string} key - encryption key name
 * @param {string} value string value to be set as encryption key
 */
export function setEncryptionKey(key: any, value: any) {
    if (key && value) {
        const sha256Key = CryptoJS.SHA256(key).toString();
        // console.log('setting key: ', key, value);
        const sha256Data = CryptoJS.SHA256(value).toString();

        localStorage.setItem(sha256Key, JSON.stringify(sha256Data));
    } else {
        console.error('No data provided');
    }
}

/**
 * function to get the encryption key
 * @param {string} - name of the key to get encryption key for
 * @returns {string}
 */
// eslint-disable-next-line consistent-return
export function getEncryptionKey(key: string) {
    try {
        const shaKey = CryptoJS.SHA256(key).toString();
        // console.log('getting key: ', key, localStorage.getItem(shaKey));
        return localStorage.getItem(shaKey);
    } catch (err) {
        console.error('something went wrong man hoho');
    }
}

export function daysCountInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
}

/**
 * Funtion to store data in local storage
 * Pass second argument as true if setting data for employee side
 * @param {string} key key for the value to be stored
 * @param {*} data actual data to be stored with the provided key
 * @param {boolean} [useEmployeeKey] - flag to decide which encyption key to use, (employee's or admin's)
 */
export function setDataInStorage(key: any, data: any) {
    // Encrypt key
    const shaKey = CryptoJS.SHA256(key).toString();

    const encKeyName = 'account_key';

    const encryptionKey = getEncryptionKey(encKeyName);

    // console.log('setting data: ', encryption_key, key, shaKey, data);

    if (encryptionKey) {
        // Encrypt data
        const dataCipher = CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();

        localStorage.setItem(shaKey, JSON.stringify(dataCipher));
    }
}

/**
 * Function to get data from local storage
 * Pass second argument as true if getting data for employee side
 * @param {string} key - key of the item to fetch from local storage
 * @param {boolean} [useEmployeeKey] - flag to decide which encyption key to use, (employee's or admin's)
 * @returns {*} value associated with the key
 */
// eslint-disable-next-line consistent-return
export function getDataFromStorage(key: any) {
    try {
        const shaKey = CryptoJS.SHA256(key).toString();

        const encKeyName = 'account_key';

        const encryptionKey = getEncryptionKey(encKeyName);

        // console.log(
        //   'from getting data: ',
        //   key,
        //   'encryption-key',
        //   typeof encryption_key,
        //   encryption_key
        // );
        if (encryptionKey && shaKey) {
            const ciphertext = JSON.parse(String(localStorage.getItem(shaKey)));
            if (ciphertext) {
                // Decrypt
                const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
                const originalData = bytes.toString(CryptoJS.enc.Utf8);
                // console.log('getting data: ', key, shaKey, originalData);
                return JSON.parse(originalData);
            }
        }
    } catch (err) {
        // console.error('Error getting data from storage boi boi');
    }
}

/**
 * Function to clear items from local storage
 * @param {(string|string[])} keys - key to remove or array of keys
 */
export function clearStorage(keys: any[]) {
    try {
        if (Array.isArray(keys)) {
            keys.forEach((key) => {
                const shaKey = CryptoJS.SHA256(key).toString();
                localStorage.removeItem(shaKey);
            });
        } else if (typeof keys === 'string') {
            const shaKey = CryptoJS.SHA256(keys).toString();
            localStorage.removeItem(shaKey);
        }
    } catch (err) {
        console.error('Error clearing storage', err);
    }
}
