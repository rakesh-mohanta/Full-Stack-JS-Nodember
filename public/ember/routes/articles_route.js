App.ArticlesIndexRoute = Ember.Route.extend({
    model: function () {
    	return this.store.find('article');
    }
});

App.ArticlesViewRoute = Ember.Route.extend({
    model: function (params) {
      return this.store.find('article', params._id);
    }
});


App.ArticlesCreateRoute = Ember.Route.extend({
 
});


App.ArticlesEditRoute = Ember.Route.extend({
    model: function (params) {
      return this.store.find('article', params._id);
    }
});