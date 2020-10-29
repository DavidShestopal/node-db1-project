const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
  db.select()
    .from('accounts')
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error', err });
    });
});

router.get('/:id', (req, res) => {
  db.select()
    .from('accounts')
    .where({ id: req.params.id })
    .then((item) => {
      if (item) {
        res.status(200).json({ item });
      } else {
        res.status(400).json({ message: 'item long gone' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error ', err });
    });
});

router.post('/', (req, res) => {
  const accData = req.body;
  db.select()
    .from('accounts')
    .insert(accData)
    .then((item) => {
      res.status(201).json(item);
    })
    .catch((err) => {
      res.status(500).json({ message: 'lol it failed to create a post' });
    });
});

router.put('/:id', (req, res) => {
  const accData = req.body;
  const { id } = req.params;

  db.select()
    .from('accounts')
    .where({ id })
    .update(accData)
    .then((count) => {
      if (count) {
        res.json({ updated: count });
      } else {
        res.status(404).json({ message: 'wrong id buddy' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'failed to update buddy', err });
    });
});

router.delete('/:id', (req, res) => {
  db('accounts')
    .where('id', '=', req.params.id)
    .del()
    .then((count) => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: 'not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'error deleting the account' });
    });
});

module.exports = router;
