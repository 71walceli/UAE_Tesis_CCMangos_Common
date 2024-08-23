// From https://medium.com/@karenmarkosyan/how-to-manage-promises-into-dynamic-queue-with-vanilla-javascript-9d0d1f8d4df5
export class PromiseQueue {
  queue = [];
  resultCallbacks = []
  pendingResultOrdinal = 0;
  stop = false;
  currentOrdinal = 0;

  enqueue(promise) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        promise,
        resolve,
        reject,
        state: "Pending",
        ordinal: this.currentOrdinal++,
      });
      this.dequeue();
    });
  }

  dequeue(_ordinal) {
    const firstResult = this.resultCallbacks.find(({ordinal}) => ordinal === _ordinal);
    if (firstResult) {
      this.pendingResultOrdinal++;
      firstResult.callback();
      this.resultCallbacks.shift();
    }
    /* if (this.queue.length === 0) {
      this.resultCallbacks
        .sort((item1, item2) => item2.ordinal - item1.ordinal)
        .forEach(({callback, ordinal}) => {
          if (ordinal === this.pendingResultOrdinal) {
            this.pendingResultOrdinal++;
            callback();
            this.resultCallbacks.shift()
          }
        });
      return false;
    } */
    if (this.stop) {
      this.queue = [];
      this.stop = false;
      return;
    }
    const item = this.queue.shift();
    if (!item) {
      return false;
    }
    try {
      item.promise()
        .then((value) => {
          this.resultCallbacks.push({
            callback: () => {
              console.log({ordinal: item.ordinal, value});
              item.resolve(value);
            },
            ordinal: item.ordinal,
          });
          item.state = "Resolved"
          this.dequeue(item.ordinal);
        })
        .catch(err => {
          this.resultCallbacks.push({
            callback: () => {
              item.reject(err);
            },
            ordinal: item.ordinal,
          });
          item.state = "Rejected"
          this.dequeue(item.ordinal);
        })
    } catch (err) {
      this.resultCallbacks.push({
        callback: () => {
          reject(err);
        },
        ordinal: item.ordinal,
      });
      item.state = "Rejected"
      this.dequeue(item.ordinal);
    }
    return true;
  }
}

