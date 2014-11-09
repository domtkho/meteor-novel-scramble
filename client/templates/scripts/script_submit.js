Template.scriptSubmit.events({
  'submit form': function(event){
    event.preventDefault();

    var script = {
      title:    $(event.target).find('[name=title]').val(),
      genre:    $(event.target).find('[name=genre]').val(),
      content:  $(event.target).find('[name=content]').val()
    };

    Meteor.call('scriptPage', script, function (error, result) {
      if (error){
        return error.message;
      }

      if (result.duplicated) {
        alert("This is a duplicated script!");
      }

      Router.go('scriptPage', {_id: result._id});
    });
  }
});