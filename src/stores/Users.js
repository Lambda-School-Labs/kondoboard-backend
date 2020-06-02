const db = require('../database/dbConfig.js');

module.exports = {
  getById,
  getUserByEmail,
  insert,
  update,
  remove,
  getUserJobs,
  // saveJob,
};

// ~~~~~~~~~~ Users ~~~~~~~~~

function getById(id) {
  const user = db('users').where({ id });
  return user;
}

function getUserByEmail(email) {
  return db("users").where({ email });
}

async function insert(user) {
  const [id] = await db('users').insert(user, 'id');
  const newUser = await getById(id);
  return newUser;
}

async function update(id, changes) {
  const updatedUser = await db('users').where({ id }).update(changes);
  return updatedUser;
}

function remove(id) {
  return db('users').where({ id }).del();
}

async function getUserJobs(user_id, type) {
  const userJobs = await db('jobs.*, users_jobs.status')
    .from('users_jobs')
    .join('jobs', 'users_jobs.jobs_id', 'jobs.id')
    .where('users_jobs.user_id', user_id)
    .andWhere('users_jobs.status', type)
  return userJobs;
}

// async function saveJob(data) {
//   const userJob = await db('users_jobs').insert(data);
//   return userJob;
// }
