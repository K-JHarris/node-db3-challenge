const knex = require ('knex');

const db = knex(require('../knexfile').development);

//find all
const find = () => db('schemes');

const findById = id =>
  db('schemes')
    .where({ id })
    .first(); //first returns the first entry found that matches our search

const findSteps = scheme_id =>
  db('steps')
    .join('schemes', 'schemes.id', 'steps.scheme_id')
    .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
    .where({ scheme_id });

const add = async scheme => {
  try {
    const [newId] = await db("schemes").insert(scheme);
    return await findById(newId);
  } catch (err) {
    throw new Error(err);
  }
};

const update = async (edits, id) => {
  try {
    const updateItem = await db('schemes')
      .update(edits)
      .where({ id });
    return updateItem
  } catch (err) {
    throw new Error(err);
  }
};

const remove = async id => {
  try {
    const deletedPost = await findById(id);
    const getPost = await db('schemes')
      .where({ id })
      .del();
    return getPost ? deletedPost : null;
  } catch (err) {
    throw new Error(err);
  }
};


module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};