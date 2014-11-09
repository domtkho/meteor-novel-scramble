Template.scriptsTable.helpers({   // scriptsList references the name of the template
  scripts: function(){           // scripts references the object being called in the each loop in scripts_list.html
    return Scripts.find()
  }
});