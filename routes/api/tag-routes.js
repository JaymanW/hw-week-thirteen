const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tags = await Tag.findAll({
    include: [{model: Product, through: ProductTag}]
  });
  res.json(tags);
});

router.get('/:id', async ({ params }, res) => {
  const tag = await Tag.findByPk(params.id, {
    include: [{model: Product, through: ProductTag}]
  });
  if (tag == 'null') {
    res.json('Tag not found');
  } else {
    res.json(tag);
  }
});

router.post('/', async ({ body }, res) => {
  const newTag = await Tag.create(body);
  res.json(newTag);
});

router.put('/:id', async ({ body, params }, res) => {
  const updateTag = await Tag.update(body, {
    where: {
      id: params.id
    }
  });
  if (updateTag == 'null') {
    res.json('Tag not found');
  } else {
    res.json(updateTag);
  }
});

router.delete('/:id', async ({ params }, res) => {
  const deleteTag = await Tag.destroy({
    where: {
      id: params.id
    }
  });
  if (deleteTag == 'null') {
    res.json('Tag not found');
  } else {
    res.json(deleteTag);
  }
});

module.exports = router;
