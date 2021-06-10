const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const categories = await Category.findAll({
    include: [{model: Product}]
  });
  res.json(categories);
});

router.get('/:id', async ({ params }, res) => {
  const category = await Category.findByPk(params.id, {
    include: [{model: Product}]
  });
  if (category == null) {
    res.json('Category not found')
  } else {
    res.json(category);
  }
});

router.post('/', async ({ body }, res) => {
  const newCategory = await Category.create(body);
  res.json(newCategory);
});

router.put('/:id', async ({ body, params }, res) => {
  const updateCategory = await Category.update(body, {
    where: {
      id: params.id
    }
  });
  if (updateCategory == null) {
    res.json('Category not found')
  } else {
    res.json(updateCategory);
  }
});

router.delete('/:id', async ({ params }, res) => {
  const deleteCategory = await Category.destroy({
    where: {
      id: params.id
    }
  });
  if (deleteCategory == null) {
    res.json('Category not found')
  } else {
    res.json(deleteCategory);
  }
});

module.exports = router;
