module.exports = function(models) {



    const addReg = function(req, res, next) {
        var d = {
            regNumber: req.body.reg
        }
        console.log(d);

        if (d.regNumber !== undefined) {

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

        } else {
            res.render('index')
        }


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
                res.render('index', {
                    myData: regNumber
                })
            }
        })

    }
    return {

        addReg,
        filterReg
    }
}
