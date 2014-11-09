Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',                // Use the loading template while...
  notFoundTemplate: 'notFound',
  waitOn: function(){
    return [                                // Note: to waitOn multiple subscriptions, use an array
      Meteor.subscribe('userData'),         // We wait on the app to finish loading the 'userData'
      Meteor.subscribe('scripts')           // and 'scripts' subscription
    ]
  }
});

Router.route('/', {name: 'scriptsList'});    // by default, Iron Router will look for the template with the same name as the route name

Router.route('/scripts/:_id', {
  name: 'scriptPage',
  data: function(){ return Scripts.findOne({ _id: this.params._id }); }   // This data function specifies a template's data context
});                              // this.params references the current matched route, and uses the :_id parameter in the url as data

Router.route('/scripts/:_id/edit', {
  name: 'scriptEdit',
  data: function(){ return Scripts.findOne( { _id: this.params._id}); }
});


Router.route('submit', {name: 'scriptSubmit'});

var requireLogin = function(){
  if ( ! Meteor.user() ){                 // If user is not logged in
    if ( Meteor.loggingIn() ){            // if user is loggin in
      this.render(this.loadingTemplate);  // render loading template
    } else {                              // otherwise
      this.render('accessDenied');        // render the accessDenied template
    }
  } else {                                // otherwise
    this.next();                          // proceed to next step
  }
};

// This tells Iron Router to show the not found page not only for invalid routes,
// but also for the 'scriptPage' whenever the data dunction returns a 'falsy'
// note: 'dataNotFound' is a special Iron Router hook, it tells router to show not found template when scriptPage returns falsy
Router.onBeforeAction('dataNotFound', { only: 'scriptPage' });

// This routing hook runs the requireLogin function, only for the scriptSubmit template
Router.onBeforeAction(requireLogin, { only: 'scriptSubmit' });