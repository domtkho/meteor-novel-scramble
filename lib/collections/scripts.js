Scripts = new Mongo.Collection('scripts');    // Sets up a new collection named Scripts

Scripts.allow({                               // Sets up the set of circumstances under which clients are allowed to do things to the Script collection
  insert: function (userId, doc) {            // Here it specifies that clients are allowed to insert scripts as long as they have a userId
    return !! userId;                         // This returns userId as a boolean value, i.e. returns true if userId is truthy, otherwise false
  },
});

Scripts.allow({
  update: function(userId, script){ return ownsDocument(userId, script); },   // allows user to update and remove scripts as long as
  remove: function(userId, script){ return ownsDocument(userId, script); }    // they own the script (see ownsDocument function defined in permissions.js)
});

Scripts.deny({                                                                // Denies user from updating if...
  update: function(userId, script, fieldNames){                               // (fieldNames is an array of fields being modified)
    return ( _.without(fieldNames, 'title', 'genre', 'content').length > 0 ); // ...the sub-array that excludes the allowed fields > 0
  }                                                                           // i.e. only allowed to edit the title/genre/content fields
});

Meteor.methods({                             // Meteor methods - server side methods called from client side
  scriptPage: function(scriptAttributes){    // Sets up method called "scriptPage" that takes a single argument
    check(Meteor.userId(), String);          // First checks that current user is logged in...
    check(scriptAttributes, {                // next checks the argument object has...
      title: String,                         // a title that is a string
      genre: String,                         // a genre that is a string
      content: String                        // a content that is a string
    });

    var user = Meteor.user();                   // assign current user to a 'user' variable
    var script = _.extend(scriptAttributes, {   // assign a new variable called 'script' and extend the argument object using the underscore lib helper...
      userId: user._id,                         // with a user ID,
      author: user.username,                    // an author,
      submitted: new Date()                     // and timestamp it
    });

    var duplicatedScript = Scripts.findOne({title: scriptAttributes.title});   // checks database for duplicated titles
    if (duplicatedScript){                                                     // if there is a duplicate
      return {                                                                 // return an object that
        duplicated: true,                                                      // flags it as duplicated
        _id: duplicatedScript._id                                              // and contains the duplicated item's id
      }
    }

    var scriptID = Scripts.insert(script);        // Insert the script into MongoDB, and assign the returned ID into variable "scriptID"
    return {                                      // The return result of this meteor method is a single object that
      _id: scriptID                               // contains the new scripts id
    };
  }
})