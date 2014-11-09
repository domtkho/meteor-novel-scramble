Template.scriptEdit.events({
  'submit form': function (event) {
    event.preventDefault();

    var currentScriptId = this._id;

    var scriptProperties = {
      title:    $(event.target).find("[name=title]").val(),
      genre:    $(event.target).find("[name=genre]").val(),
      content:  $(event.target).find("[name=content]").val()
    };

    Scripts.update(currentScriptId, { $set: scriptProperties }, function(err, result){
      if (error) {
        alert(error.reason);
      } else {
        Route.go('scriptPage', {_id: currentScriptId});
      }
    });

  },

  'click .delete': function(event){
    event.preventDefault();

    if ( confirm("Delete this script?") ){
      var currentScriptId = this._id;
      Scripts.remove({ _id: currentScriptId });
      Router.go('scriptsList');
    }
  }

});