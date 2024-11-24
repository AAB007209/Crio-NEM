const usersJson = require("./users.json");
const { userSearchSchema } = require("../validations/userSearchValidation")

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

// - http://localhost:8082/users/search?gender=female
// - http://localhost:8082/users/search?age=50
// - http://localhost:8082/users/search?gender=female&age=30

const searchUsers = (req, res) => {
    const { gender, age } = req.query;
    // const validGenders = ["male", "female"];

    // - http://localhost:8082/users/search?gender=male&age=49
    // - http://localhost:8082/users/search?age=male (Gives "error" key as well in the result object)
    // const result = userSearchSchema.validate({ gender, age }); // This one or below both are same
    // const result = userSearchSchema.validate({ gender: gender, age: age });
    // console.log(result); // { value: { gender: 'male', age: 49 } }

    const { error } = userSearchSchema.validate({ gender, age });
    // if (error) {
    //     return res.status(400).send({ message: "Validation failed", error })
    // }
    // - We can also just send the error message
    if (error) {
        return res.status(400).send({ message: error.details[0].message })
    }

    // - http://localhost:8082/users/search?gender=15
    // if (gender && !validGenders.includes(gender))
    //     return res.status(404).send({ message: "Gender must be either male or female" });

    // - http://localhost:8082/users/search?age=male
    // - http://localhost:8082/users/search?age=-5
    // if ((age && isNaN(age)) || age <= 0 || age > 100)
    //     return res.status(404).send({ message: "Age is not a number or not within 0 - 100 limit" });

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



// - Points to be noted
/*
1. Joi Docs - https://joi.dev/api/?v=17.13.3

2.When we have no error in the validation we have only one key called: "value"
- When we have an error in the validation then we have one more key called: "error"

3. const {error} = useSearchSchema.validate({gender, age});
- If there is an error it will be present in the above error variable else undefined

*/