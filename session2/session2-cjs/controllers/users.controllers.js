const usersJson = require("./users.json");

// - Below is the endpoint to get all users

// http://localhost:8082/users

const getUsers = (req, res) => {
    res.send(usersJson.data);
}

// - Below is the endpoint to test for the getUserById (uuid)

// http://localhost:8082/users/468fa5aa-c00e-4f71-951f-607a79b26299

const getUserById = (req, res) => {
    const { uuid } = req.params;
    const reqUser = usersJson.data.find((user) => user.login.uuid === uuid);
    if (!reqUser) {
        return res
            .status(404)
            .send({ message: `User with uuid: ${uuid} not found` });
    }
    res.send(reqUser);
}

// - Below are the endpoints to test for the SearchUsers

// http://localhost:8082/users/search?gender=female
// http://localhost:8082/users/search?age=50
// http://localhost:8082/users/search?gender=female&age=30

const searchUsers = (req, res) => {
    const { gender, age } = req.query;
    if (gender && age)
        return res.send(
            usersJson.data.filter(
                (user) => user.gender === gender && user.dob.age === Number(age)
            )
        );
    else if (gender) {
        return res.send(usersJson.data.filter((user) => user.gender === gender));
    } else if (age) {
        return res.send(
            usersJson.data.filter((user) => user.dob.age === Number(age))
        );
    } else
        return res
            .status(400)
            .send({ message: "One of `gender` or `age` is required." });
};

module.exports = { getUsers, getUserById, searchUsers };