Template.writerPane.helpers({
  writers: function () {
    var all_writers = [];

    for (var i = 0; i < this.writers.length; i++) {
      all_writers.push( Meteor.users.findOne({ _id: this.writers[i] }) );
    }
    return all_writers;
  }
});

Template.writerPane.events({
  'click .join-leave': function (event) {
    event.preventDefault();

    var currentScriptId = this._id;
    var currentScript = Scripts.findOne({_id: currentScriptId});

    var isInGameRoom = function(){
      for (var i = 0; i < currentScript.writers.length; i++){
        if ( currentScript.writers[i] === Meteor.user()._id ){
          return true;
        }
      }
      return false;
    };

    if ( isInGameRoom() ){
      Scripts.update(currentScriptId, { $pull: {writers: Meteor.user()._id} } );
      console.log("User removed");
    } else {
      Scripts.update(currentScriptId, { $push: {writers: Meteor.user()._id} } );
      console.log("User added");
    }

  }
});