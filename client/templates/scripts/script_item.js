Template.scriptItem.helpers({
  ownPost: function () {
    return this.userId === Meteor.userId();
  }
});