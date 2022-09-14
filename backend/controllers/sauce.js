const Sauce = require('../models/sauce');
const fs = require('fs');


exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
  };


exports.addSauce = (req, res, next) => {
    req.body.sauce = JSON.parse(req.body.sauce);
    const url = req.protocol + '://' + req.get('host');
    const sauce = new Sauce({
        userId: body.userId,
        name: body.name,
        manufacturer: body.manufacturer,
        description: body.description,
        mainPepper: body.mainPepper,
        imageUrl:
          req.protocol +
          '://' +
          req.hostname +
          ':' +
          port +
          '/images/' +
          req.file.filename, 
        heat: body.heat,
      });
    sauce.save().then(
      () => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

exports.getOneSauce = (req, res, next) => {
    sauce.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  }
  exports.modifySauce = (req, res, next) => {
    let sauce = new Sauce ({ _id: req.params._id })
    if (req.file){
        req.body.sauce = JSON.parse(req.body.sauce);
    const url = req.protocol + '://' + req.get('host');
     sauce = {
        _id: req.params.id,
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        mainPepper: req.body.sauce.mainPepper,
        imageUrl:url + '/images/' + req.file.filename, 
        heat: req.body.sauce.heat,
      };
    }else{
         sauce = {
        _id: req.params.id,    
        userId: req.body.userId,
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        mainPepper: req.body.mainPepper,
        imageUrl:req.body.imageUrl,
        heat: body.heat,
      };
    }
    Sauce.updateOne({_id: req.params.id}, sauce).then(
      () => {
        res.status(201).json({
          message: 'Sauce updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  }
  
  exports.deleteThing = (req, res, next) => {
    Thing.findOne({_id: req.params.id}).then(
      (thing) => {
        const filename = thing.imageUrl.split('/images/')[1];
        fs.unlink('images/' + filename, () => {
          Thing.deleteOne({_id: req.params.id}).then(
            () => {
              res.status(200).json({
                message: 'Deleted!'
              });
            }
          ).catch(
            (error) => {
              res.status(400).json({
                error: error
              });
            }
          );
        });
      }
    );
  };

  exports.getAllThings = (req, res, next) => {
    Thing.find().then(
      (things) => {
        res.status(200).json(things);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  }