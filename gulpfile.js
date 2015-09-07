var gulp = require('gulp')
    , MongoClient = require('mongodb').MongoClient
    , assert = require('assert')
    , dotenv = require('dotenv').load();

var mongoURI = process.env.MONGODB || 'mongodb://localhost:27017/configdb';
var worker = MongoClient.connect(mongoURI, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    }

gulp.task('insertDb', function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insert([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the document collection");
    callback(result);
  });
}


gulp.task('dbConfig', function() {

  insertDocuments(db, function() {
          });

});

gulp.task('getConfigs', ['dbConfig'], function() {
    var stream =
        // do some concatenation, minification, etc.
        .pipe(gulp.dest('output/templates/'));
    return stream; // return the stream as the completion hint

});

gulp.task('styles', ['dbConfig'], function() {
    var stream = gulp.src(['src/styles/app.less'])
        // do some hinting, minification, etc.
        .pipe(gulp.dest('output/css/app.css'));
    return stream;
});

gulp.task('build', ['templates', 'styles']);

// templates and styles will be processed in parallel.
// dbConfig will be guaranteed to complete before either start.
// dbConfig will not be run twice, even though it is called as a dependency twice.

gulp.task('default', ['build']);

db.close();
});
