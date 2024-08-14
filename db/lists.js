const client = require('./client');

const createList = async ({title, ownerID}) => {
  try {
    const {rows: [list]} = await client.query(`
      INSERT INTO lists (title, owner_id)
      VALUES ($1, $2)
      RETURNING *;
    `, [title, ownerID]);
  
    return list;
  
  } catch(ex) {
    console.log('error creating list in the DB adapter');
    console.error(ex);
  }
}

const getListsByUserId = async (userId) => {
  try {
    const { rows: lists } = await client.query(`
      SELECT * FROM lists
      WHERE owner_id = '${userId}';
    `);
    

    return lists;
  } catch(ex) {
    console.log('error getting list by user id in DB adapter.');
    console.error(ex);
  }
}

const deleteList = async ({listId, userId}) => {
  try {
    await client.query(`
      DELETE FROM todos
      WHERE list_id = $1
      AND "creatorId" = $2;
    `, [listId, userId]);
    
    await client.query(`
      DELETE FROM lists
      WHERE list_id = $1
      AND "owner_id" = $2;
    `, [listId, userId])
    
  } catch (ex) {
    console.log("error deleting list in DB adapter.");
    console.error(ex);
  }
}

module.exports = {
  createList,
  getListsByUserId,
  deleteList
}
