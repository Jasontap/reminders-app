const client = require('./client');

const createList = async ({title, ownerId}) => {
  try {
    const {rows: [list]} = await client.query(`
      INSERT INTO lists (title, owner_id)
      VALUES ($1, $2)
      RETURNING *;
    `, [title, ownerId]);
  
  } catch(ex) {
    console.log('error creating list in the DB adapter');
    console.error(ex);
  }
}

const getListsByUserId = async (userId) => {
  try {
    
    console.log('GETTING USER LISTS', userId)
    const {rows: lists} = await client.query(`
      SELECT * FROM lists
      WHERE owner_id = '${userId}';
    `);

    return lists;
  } catch(ex) {
    console.log('error getting list by user id in DB adapter.');
    console.error(ex);
  }
}

module.exports = {
  createList,
  getListsByUserId
}
