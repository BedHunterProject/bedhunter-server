const loki = require('lokijs');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const adminHashPwd = bcrypt.hashSync("admin_vagyok");
console.log(adminHashPwd);

const db = new loki('bedhunter');
db.addCollection('users').insert([
    {id : uuid.v4(),
    email : 'admin@admin.hu',
    password : adminHashPwd,
    name: 'ADMIN',
    birthdate : '2022-02-22',
    phone : '-'
}
])