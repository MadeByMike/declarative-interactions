(function (){
  //Micro jQuery replacement for element selection and events based on remy sharp's min.js https://github.com/remy/min.js
  var $ = (function () {
    var node = Node.prototype,
        nodeList = NodeList.prototype,
        each = []['forEach'];

    nodeList['forEach'] = each;

    node['forEach'] = function(fn){
      [this]['forEach'](fn);
    };

    node.on = function (event, fn) {
      this.addEventListener(event, fn, false);
      return this;
    };

    nodeList.on = function (event, fn) {
      this[forEach](function (el) {
        el.on(event, fn);
      });
      return this;
    };

    $ = function (s) {
      var r = document.querySelectorAll(s || '☺');
      return r.length == 1 ? r[0] : r;
    };

    return $;

  })();

  var actions = {
    show: function(target){
      console.log('Invoked show');
      target.style.display = 'block';
    },
    hide: function(target){
      console.log('Invoked hide');
      target.style.display = 'none';
    },
    toggle: function(target){
      return (i % 2 == 0) ? this.hide(target) :  this.show(target);
      i++;
    }
  };
  var methods = {
    hover: function(elm, action){
      
      // There is a problem with the targets changing if you change the action
      // thinking of re-working it so that the target is more 'object oriented'
    
      var targets = $(elm.dataset[action]);
      
      addEvent('mouseover', elm, action, targets);
      // Need a much better method for inverting actions in a more general way eg. if I add slideUp\slideDown how do I invert this 
      action = action === "show" ? "hide": "show";
      addEvent('mouseleave', elm, action, targets);
    }
  };

  var addEvent = function(method, element, action, targets){
    targets = (typeof targets === "undefined") ? $(element.dataset[action]) : targets;
    element.on(method, (function(element, action, targets){
      targets.forEach(function(target){
        actions[action](target);
      });
    }).bind(null, element, action, targets));  
  };

  for (var action in actions) {
    $('[data-'+action+']').forEach(function( elm ){
      if(typeof methods[elm.dataset.method] === "function"){
        methods[elm.dataset.method](elm, action);
      }else{
        addEvent(elm.dataset.method || 'click', elm, action);
      }
    });
  }

})();
