const express = require('express');
const app = express();
const treeRoutes = express.Router();

let Tree = require('../model/Tree');

// api to add tree
treeRoutes.route('/add').post(function (req, res) {
  let tree = new Tree(req.body);
  tree.save()
  .then(tree => {
    res.status(200).json({'status': 'success','mssg': 'tree added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get users
treeRoutes.route('/').get(function (req, res) {
  Tree.find(function (err, users){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','users': users});
    }
  });
});

// api to get tree
treeRoutes.route('/tree/:id').get(function (req, res) {
  let id = req.params.id;
  Tree.findById(id, function (err, tree){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','tree': tree});
    }
  });
});

// api to update route
treeRoutes.route('/update/:id').put(function (req, res) {
    Tree.findById(req.params.id, function(err, tree) {
    if (!tree){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        tree.nomePopular = req.body.nomePopular;
        tree.nomeCientifico = req.body.nomeCientifico;
        tree.familia = req.body.familia;
        tree.altura = req.body.altura;
        tree.origem = req.body.origem;

        tree.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
treeRoutes.route('/delete/:id').delete(function (req, res) {
  Tree.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = treeRoutes;