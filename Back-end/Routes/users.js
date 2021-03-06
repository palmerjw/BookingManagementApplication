const router = require('express').Router();
let User = require("../Models/user.model");
const mongoose = require('mongoose');

router.route("/all").get((req, res) =>
{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err))
});

router.route("/add").post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const bookings = req.body.bookings;
    const newUser = new User({ _id: new mongoose.Types.ObjectId(), username, password, firstName, lastName, email, bookings});
    console.log(req.body)
    newUser.save()
        .then(() => res.json(newUser))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/addGoogle").post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const bookings = req.body.bookings;
    const _id = req.body._id;
    const newUser = new User({ _id, username, password, firstName, lastName, email, bookings });
    console.log("UserID : " + newUser._id + " givenID : " + req.body._id);
    newUser._id = req.body._id
    console.log("UserID : " + newUser._id + " givenID : " + req.body._id);

    newUser.save()
        .then(() => res.json(newUser))
        .catch(err => res.status(400).json("Error: " + err));
});

//Looks up user by username
router.route("/getByUsername/").get((req, res) => {
    User.findOne({ username: req.query.username })
        .then(user =>
        {
            if (user != null) {
                user.comparePassword(req.query.password)
                    .then((isMatch) => {
                        if (isMatch == true) {
                            res.json(user);

                        }
                        else res.status(400).json("Error: password did not match")
                    })
                    .catch(err => res.status(400).json("Error: " + err));
            }
            else {
                res.status(400).json("Error: password did not match")

            }
        })
        .catch(err => res.status(400).json("Error: " + err));

});

router.route("/getIdByUsername/:username").get((req, res) => {
    User.findOne({ username: req.params.username })
        .then(user => {
            if (user != null) {
                res.json(user._id);
            }
            else {
                res.status(400).json("Error: user did not exist")

            }
        })
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/getAllUsernames").get((req, res) => {
    User.find()
        .then(users => {
            const userNames = [];
            users.forEach(user => {
                userNames.push(user.username)
            })
            res.json(userNames);

        })
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/getByEmail/:email").get((req, res) => {
    console.log(req.params.email)
    User.findOne({ email: req.params.email })
        .then(user => {
            res.json(user);
        })
        .catch(err => res.status(400).json("Error: " + err));

});


router.route("/getById/:id").get((req, res) => {
    try {
        let id = new mongoose.Types.ObjectId(req.params.id);
        User.findOne({ _id: id })
            .then(user => {
                res.json(user);
            })
            .catch(err => res.status(400).json("Error: " + err));
    }
    catch {
        User.findOne({ _id: req.params.id })
            .then(user => {
                res.json(user);
            })
            .catch(err => res.status(400).json("Error: " + err));
    }
    

});

//Deletes user by username
router.route("/deleteByUsername/:username").delete((req, res) => {
    User.findOneAndDelete({ username: req.params.username })
        .then(() => res.json("User deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});

//detele user by ID
router.route("/deleteById/:id").delete((req, res) => {
    try {
        let id = new mongoose.Types.ObjectId(req.params.id);
        User.findOneAndDelete({ _id: id })
            .then(() => res.json("User deleted."))
            .catch(err => res.status(400).json("Error: " + err));

    }
    catch {
        User.findOneAndDelete({ _id: req.params.id })
            .then(() => res.json("User deleted."))
            .catch(err => res.status(400).json("Error: " + err));
    }
    
});

router.route("/updateBookings/").post((req, res) => {
    console.log("UPDATING BOOKINGS")
    console.log(req.body.id)
    try {
        let id = new mongoose.Types.ObjectId(req.body.id);
        console.log(id)
        User.findOne({ _id: id })
            .then((user) => {
                if (user)
                    console.log(user);
                if (user.bookings == null) {
                    console.log("null is you!");
                    const tempArray = [];
                    tempArray.push(req.body.booking)
                    user.bookings = tempArray;
                }
                else {
                    user.bookings.push(req.body.booking);
                }
                user.save()
                    .then((newUser) => { res.json(newUser); console.log(newUser.bookings); console.log(user.bookings) })
                    .catch(err => res.status(400).json("Error: " + err));
            })
            .catch(err => res.status(400).json("Error: " + err));
    }
    catch{
        User.findOne({ _id: req.body.id })
            .then((user) => {
                if (user)
                    console.log(user);
                if (user.bookings == null) {
                    console.log("null is you!");
                    const tempArray = [];
                    tempArray.push(req.body.booking)
                    user.bookings = tempArray;
                }
                else {
                    user.bookings.push(req.body.booking);
                }
                user.save()
                    .then((newUser) => { res.json(newUser); console.log(newUser.bookings); console.log(user.bookings) })
                    .catch(err => res.status(400).json("Error: " + err));
            })
            .catch(err => res.status(400).json("Error: " + err));
    }
    
})

router.route("/updatePassword/").post((req, res) => {
    console.log("updating password")
    console.log(req.body.password)
    try {
        let id = new mongoose.Types.ObjectId(req.body.account_id);
        console.log(id)
        User.findOne({ _id: id })
            .then((user) => {
                user.password = req.body.password;
                user.save()
                    .then(() => res.json("password updated"))
                    .catch(err => res.status(400).json("Error: " + err));
            })
            .catch(err => res.status(400).json("Error: " + err));
    }
    catch {
        User.findOne({ _id: req.params.account_id })
            .then((user) => {
                user.password = req.body.password;
                user.save()
                    .then(() => res.json("password updated"))
                    .catch(err => res.status(400).json("Error: " + err));
            })
            .catch(err => res.status(400).json("Error: " + err));
    }
})


router.route("/checkIfEmailExits/:email").get((req, res) => {
    User.findOne({ email: req.params.email })
        .then((user) => {
            if (user != null) {
                res.json("yes")
            }
            else {
                res.json("no")
            }
        })
        .catch(err => res.status(400).json("Error: " + err))

})

router.route("/checkIfIdExists/:id").get((req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (user != null) {
                res.json("yes")
            }
            else {
                res.json("no")
            }
        })
        .catch(err => res.status(400).json(err))

})
//Updates user by username
router.route("/update/").post((req, res) => {
    console.log(req.body)
    console.log(req.body.password)
    try {
        let id = new mongoose.Types.ObjectId(req.body.account_id);
        User.findOne({ _id: id })
            .then((user) => {
                user.username = req.body.username;
                user.password = req.body.password;
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.email = req.body.email;
                user.save()
                    .then((newUser) => { res.json(newUser); console.log(newUser.bookings); console.log(user.bookings) })
                    .catch(err => res.status(400).json("Error: " + err));
            })
            .catch(err => res.status(400).json("Error: " + err))
    }
    catch{
        User.findOne({ _id: req.body.id })
            .then((user) => {
                user.username = req.body.username;
                user.password = req.body.password;
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.email = req.body.email;
                user.save()
                    .then((newUser) => { res.json(newUser); console.log(newUser.bookings); console.log(user.bookings) })
                    .catch(err => res.status(400).json("Error: " + err));
            })
            .catch(err => res.status(400).json("Error: " + err))
    }
    
})  

router.route("/checkIfUsernameExists/:username").get((req, res) => {
    User.findOne({ username: req.params.username })
        .then((user) => {
            if (user != null) {
                res.json("yes")

            }
            else {
                res.json("no")
            }
        })
        .catch(err => res.status(400).json("Error: " + err))
})  

module.exports = router;
