Meteor.publish('userData', function(){
  return Meteor.users.find(this.userId, {fields: {
    'services': 1
  }});
});

Meteor.publish('scripts', function(){    // "scripts" is the name of this particular publication
  return Scripts.find();                 // Here we define what the 'scripts' publication includes
});
