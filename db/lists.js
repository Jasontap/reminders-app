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

const getListByUserId = async (userId) => {
  try {
    const {rows: [list]} = await client.query(`
      SELECT * FROM lists
      WHERE owner_id = $1;
    `, [userId]);
    
    return list;
  } catch(ex) {
    console.log('error getting list by user id in DB adapter.');
    console.error(ex);
  }
}

module.exports = {
  createList,
  getListByUserId
}
