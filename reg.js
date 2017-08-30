module.exports = function(models) {

//check if textbox is not empty |  if (d.regNumber !== undefined)
//find entered Plate in the db
// if plate exist, render to home
//if plate doesnt exit, create a new 1



    const addReg = function(req, res, next) {
        var d = {
            regNumber: req.body.reg
        }

        if (d.regNumber !== undefined) {

          models.reg.findOne({regNumber: req.body.reg}, function(err, foundRegNum) {
            if (err) {
              return done(err)
            }

            if (foundRegNum === null) {

              models.reg.create({
                  regNumber: req.body.reg
              }, function(err, result) {
                  if (err) {
                      return next(err)
                  }

                  models.reg.find({}, function(err, done) {
                      if (err) {
                          return done(err)
                      }

                      var regData = {
                          regNumber: done
                      }
                      console.log(regData);
                      res.render('index', regData)
                  })

              })
            }

            if (foundRegNum !== null) {
              console.log('Plate exist');
              res.render('index')
            }

          })

        }

        else {
            res.render('index')
        }


    }

const searchScreen = function(req,res){
  models.reg.find({}, function(err, done) {
      if (err) {
          return done(err)
      }

      var regData = {
          regNumber: done
      }
      console.log(regData);
      res.render('search', regData)
  })

}
    const filterReg = function(req, res, next) {

        var locationReg = req.body.regOpt;
        console.log(locationReg);
        models.reg.find({
            regNumber: {
                $regex: locationReg,
                $options: 'x'
            }
        }, function(err, regNumber) {
            console.log(regNumber);
            if (err) {
                return next(err)
            } else {
                res.render('search', {
                    myData: regNumber
                })
            }
        })

    }

    const clear = function(req, res) {
    models.reg.remove(function(err) {
        if (err) {

            return done(err);

        }
        res.render('search')
    })
}
    return {

        addReg,
        filterReg,
        clear,
        searchScreen
    }
}
