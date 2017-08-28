const mongoose = require('mongoose');
module.exports = function(mongoUrl){

    mongoose.connect(mongoUrl);

    const reg = mongoose.model('reg', {
        regNumber : String
    });

    return {
        reg
    };

};
