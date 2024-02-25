MyGame.pubsub = (function() {
    let subscribers = {};

    function publish(event, data) {
      if (!subscribers[event]) {
        return;
      }
      subscribers[event].forEach(subscriberCallback => subscriberCallback(data));
    }

    function subscribe(event, callback) {
      if (!subscribers[event]) {
        subscribers[event] = [];
      }
      let index = subscribers[event].push(callback) - 1;
      return {
        unsubscribe() {
          console.log("unsub");
          console.log(index);
          console.log(subscribers[event][index]);
          subscribers[event].splice(index, 1);
        }
      };
    }

    return {
        publish,
        subscribe
    }
}());

// To subscribe:
// MyGame.pubsub.subscribe("eventName", awesome_function);
//
// To publish:
// MyGame.pubsub.publish("eventName", {<data>})