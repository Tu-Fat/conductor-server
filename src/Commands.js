
const listAllUser = (wss) => {

    const users = [];
    wss.clients.forEach((user)=>{
        users.push(user.username);
    });

    return users;
};

module.exports.listAllUser = listAllUser;