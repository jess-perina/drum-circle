window.EventEmitter = () => {
  this.subscribers = {};
};

((EE) => {
  EE.prototype.on = (eventName, EventListener) => {
    if (!this.subscribers[eventName]) {
      this.subscribers[eventName] = [];
    }

    this.subscribers[eventName].push(EventListener);
  };

  EE.prototype.emit = (eventName) => {
    if (!this.subscribers[eventName]) {
      return;
    }

    var remainingArgs = [].slice.call(arguments, 1);

    this.subscribers[eventName].forEach((listener) => {
      listener.apply(null, remainingArgs);
    });
  };

})(window.EventEmitter);

