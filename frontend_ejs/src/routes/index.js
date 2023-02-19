'use strict';

const express = require('express');
const router = express.Router();

router.get('/map/naver/default', (req, res) => {
  res.render('index', { component: 'map/naver/default' });
});

router.get('/map/naver/current', (req, res) => {
  res.render('index', { component: 'map/naver/current' });
});

router.get('/map/naver/target', (req, res) => {
  res.render('index', { component: 'map/naver/target' });
});

router.get('/map/google/default', (req, res) => {
  res.render('index', { component: 'map/google/default' });
});

router.get('/map/google/current', (req, res) => {
  res.render('index', { component: 'map/google/current' });
});

router.get('/map/google/target', (req, res) => {
  res.render('index', { component: 'map/google/target' });
});

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
