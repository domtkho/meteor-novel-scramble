ownsDocument = function( userId, doc ){
  return doc && doc.userId === userId;      // Checks that the document is owned by the current user
}