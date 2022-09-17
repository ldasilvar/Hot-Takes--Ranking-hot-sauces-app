const Sauce = require('../models/sauce');
const fs = require('fs');

//Post request to add sauces
exports.addSauce = (req, res, next) => {
    req.body.sauce = JSON.parse(req.body.sauce);
    const url = req.protocol + '://' + req.get('host');
    const sauce = new Sauce({
      userId: req.body.sauce.userId,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      mainPepper: req.body.sauce.mainPepper,
      imageUrl:url + '/images/' + req.file.filename, 
      heat: req.body.sauce.heat,
      likes: 0,
      dislikes: 0,
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

//Get request when a user clicks on a single sauce 
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(
      (Sauce) => {
        res.status(200).json(Sauce);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  }

  //Put request for correct user to be able to modify only their owen sauce
  exports.modifySauce = (req, res, next) => {
    let sauce = new Sauce({ _id: req.params.id });
    if (req.file) {
      req.body.sauce = JSON.parse(req.body.sauce);
      const url = req.protocol + '://' + req.get('host');
      sauce = {
        _id: req.params.id,
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        mainPepper: req.body.sauce.mainPepper,
        imageUrl: url + '/images/' + req.file.filename,
        heat: req.body.sauce.heat
      };			
    } else {
          sauce = {
            _id: req.params.id,
            userId: req.body.userId,
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            mainPepper: req.body.mainPepper,
            imageUrl: req.body.imageUrl,
            heat: req.body.heat			
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
    
//Post request for when users like a sauce 
exports.likeSauce = (req, res, next) => {
      const vote = req.body.like;
          switch(vote){
                //If a user clicks like on a sauce, we add the user's id to the table and increment the likes
                case 1 :
                    Sauce.updateOne({_id : req.params.id}, {$inc : {likes : +1 },
                      
                    $push : { usersLiked : req.body.userId}
                  })
                      .then(() => res.status(201).json({message : "I like this sauce vote added"}))
                      .catch(error => res.status(500).json({error}))       
                break;
      
                //If a user clicks on the dislike button on a sauce, we add the user's id to the table and increment the dislikes
                case -1 :
                  Sauce.updateOne({_id : req.params.id}, {
                    $push : { usersDisliked : req.body.userId}, $inc : {dislikes : +1 }
                  })
                      .then(() => res.status(201).json({message : "I don't like this sauce vote added"}))
                      .catch(error => res.status(500).json({ error }))
                break;
      
                // If the user cancels his choice: the user is removed from the table and the likes or dislikes are decremented according to the table in which he was
                case 0 :  
                  Sauce.findOne({_id : req.params.id})
                      .then(sauce => {
                          if (sauce.usersLiked.includes(req.body.userId)){
                            Sauce.updateOne({_id : req.params.id}, {
                              $pull : { usersLiked : req.body.userId}, $inc : {likes : -1 }
                            })
                              .then(() => res.status(201).json({message : "I like this sauce vote removed"}))
                              .catch(error => res.status(500).json({error}))
                          }
                          else{
                            Sauce.updateOne({_id : req.params.id}, {
                              $pull : { usersDisliked : req.body.userId}, $inc : {dislikes : -1 }
                            })
                              .then(() => res.status(201).json({message : "I dislike this sauce vote removed"}))
                              .catch(error => res.status(500).json({ error }))
                          }
      
                      }) 
                      .catch(error => res.status(500).json({ error}))
                break;  
                  
                default : console.log(req.body)
            }
          
      }
  //Delete request for when users click to delete a sauce, it also deletes the sauce image locally
  exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id}).then(
      (sauce) => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink('images/' + filename, () => {
          sauce.deleteOne({_id: req.params.id}).then(
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
  }
  //Get request to display all sauces
  exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(
      (sauces) => {
        res.status(200).json(sauces);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  }
