class Ajax {
  /**
   * GET запрос
   * @param {string} url
   * @param {function} callback — (data, status)
   */
  get(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) this._handleResponse(xhr, callback);
    };
  }

  /**
   * POST запрос
   */
  post(url, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) this._handleResponse(xhr, callback);
    };
  }

  /**
   * PATCH запрос
   */
  patch(url, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) this._handleResponse(xhr, callback);
    };
  }

  /**
   * DELETE запрос
   */
  delete(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) this._handleResponse(xhr, callback);
    };
  }

  /**
   * @private
   */
  _handleResponse(xhr, callback) {
    try {
      const data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
      callback(data, xhr.status);
    } catch (e) {
      console.error('Ошибка парсинга JSON:', e);
      callback(null, xhr.status);
    }
  }
}

export const ajax = new Ajax();



// class Ajax {
//     /**
//      * GET запрос
//      * @param {string} url
//      * @param {function} callback (data, status)
//      */
//     get(url, callback) {
//         fetch(url)
//             .then(response => this._handleResponse(response, callback))
//             .catch(error => this._handleError(error, callback));
//     }

//     /**
//      * POST запрос
//      * @param {string} url
//      * @param {object} data
//      * @param {function} callback (data, status)
//      */
//     post(url, data, callback) {
//         fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data)
//         })
//         .then(response => this._handleResponse(response, callback))
//         .catch(error => this._handleError(error, callback));
//     }

//     /**
//      * PATCH запрос
//      * @param {string} url
//      * @param {object} data
//      * @param {function} callback (data, status)
//      */
//     patch(url, data, callback) {
//         fetch(url, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data)
//         })
//         .then(response => this._handleResponse(response, callback))
//         .catch(error => this._handleError(error, callback));
//     }

//     /**
//      * DELETE запрос
//      * @param {string} url
//      * @param {function} callback (data, status)
//      */
//     delete(url, callback) {
//         fetch(url, {
//             method: 'DELETE'
//         })
//         .then(response => this._handleResponse(response, callback))
//         .catch(error => this._handleError(error, callback));
//     }

//     /**
//      * Общий обработчик ответа
//      * @param {Response} response
//      * @param {function} callback
//      * @private
//      */
//     _handleResponse(response, callback) {
//         response.text().then(text => {
//             let data = null;
//             try {
//                 data = text ? JSON.parse(text) : null;
//             } catch (e) {
//                 console.error('Ошибка парсинга JSON:', e);
//             }
//             callback(data, response.status);
//         });
//     }

//     /**
//      * Общий обработчик ошибок
//      * @param {Error} error
//      * @param {function} callback
//      * @private
//      */
//     _handleError(error, callback) {
//         console.error('Ошибка сети или fetch:', error);
//         callback(null, 0);
//     }
// }

// export const ajax = new Ajax();
