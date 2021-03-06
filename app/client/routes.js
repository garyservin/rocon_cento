

Router.configure({
  layoutTemplate: 'layout'
});


Router.map(function(){
  this.route('home', {
    path: '/',
    template: 'home'
  });


  this.route('login', {
    path: '/login',
  });

  this.route('users', {
    path: '/users',
  });

  this.route('ideation', {
    path: '/ideation',
    template: 'ideation',
    before: function(){
      var ITEMS_PER_PAGE = 10;
      Session.setDefault('itemsLimit', ITEMS_PER_PAGE);
      Session.set('filesToAttach', []);
    },
    data: function(){
      console.log(this.params);
      var categoryId = this.params.category;
    
      var data = {};
      var query = {};
      if(categoryId && categoryId != "")
        query['category'] = categoryId;

      data['posts'] = Cento.Posts.find(query, {limit: Session.get('itemsLimit'), sort: {'created': -1},
        transform: function(doc){
          doc.user = Meteor.users.findOne(doc.user_id);
          return doc;
        }
       });

      if(categoryId){
        data.currentCategory = Cento.Categories.findOne(categoryId);
        return data;
      }
      return data;
    }
    });

  this.route('modeling', {
    path: '/modeling',
    template: 'modeling'
  });

  this.route('battle_loom', {
    path: '/battle_loom',
    template: 'battle_loom'
  });

  this.route('management', {
    path: '/management',
    template: 'management'
  });

  this.route('solution', {
    path: '/solution',
    template: 'solution'
  });

  this.route('google_drive', {
    path: '/google_drive',
    template: 'google_drive'
  });
  this.route('manage', {
    path: '/manage',
    template: 'manage'
  });

});
