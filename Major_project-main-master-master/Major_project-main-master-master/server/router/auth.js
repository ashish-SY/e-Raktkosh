
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');
const otpGenerator = require('otp-generator')
const Worker = require("../model/userSchema");
const moment = require('moment');
const nodemailer = require('nodemailer');
const Hospital = require("../model/hospitalSchema");
const Notification = require("../model/notification");

const multer = require('multer');


const imageconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        callback(null, `image=${Date.now()}.${file.originalname}`)
    }
})

// image filter
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true)
    } else {
        callback(new Error("Only image is allowed"))
    }
}

const upload = multer({
    storage: imageconfig,
    fileFilter: isImage
})

router.get('/', (req, res) => {
    res.send(`Hello world from router`);
});
let one_time_password;

// login route generate the token to user login
var some1;
var ex;
var PINCODE;
var _name;
var lat, lng;
var bloodGroup;
var latitude;
var longitude;
router.post('/login', async (req, res) => {
    ex = req.body.email;
    some1 = ex;
    
    try {
        let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please Fill The Details" });
        }

        const userLogin = await User.findOne({ email: email });


        if (userLogin) {

            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 2589000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Crediantials" });
            }
            else {
                const res1 = await User.find({ email: ex });
    // console.log(ex);
    ex = res1[0].pincode;
                PINCODE = ex;
                ex = some1;
                _name = userLogin.name;
                bloodGroup=userLogin.blood_group;
                latitude=userLogin.location.coordinates[1];
                longitude=userLogin.location.coordinates[0];
                res.json({ message: "User Login Successfully" });
                console.log("successfull login");
               
            }
        }
        else {
            res.status(400).json({ error: "Invalid Crediantials" });
        }

    } catch (err) {
        console.log(err);
    }

});
router.post('/hospital_list', async (req, res) => {
    try {
        let findResult = await Hospital.find({
        });
        res.send(findResult);
    }
    catch (err) {
        console.log(err);
    }

});





router.post('/accept_noti',async(req,res)=> {
    // console.log(req.body.e);
    const hello = await User.find({email : ex});
    let mailTranporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: "switch.case7105@gmail.com",
            pass: "pqocmgyrvhculjen"
            
        }
    })
    let details = {
        from:"switch.case7105@gmail.com",
        // to:req.body.e,
        to:[{address: req.body.e },{ address: ex}],
        subject : "Donor confirmation",
        html: "E-Raktkosh is providing a paltform for mutual communication  "+ '<p>Click <a href="http://localhost:3001/">here</a> here to connect</p>',
        // text: hello[0].name + "  Accepted your Request...."+
        //         hello[0].address+
        //         hello[0].phone_number+
        //         hello[0].blood_group+
        //         "For more information, please contact ",
        
    }
    email_validation = () => {
        mailTranporter.sendMail(details,(err)=>{
            if(err){
                console.log("it has an error",err);
            }
            else{
                console.log("email has sent!");
            }
            
        })
    }
            email_validation();
       
            const hello1 = await User.find({email : req.body.e});
        // console.log(hello[0].email);
        // for(var j=0;j<userExist[0].data.length;j++){
            await User.findOneAndUpdate({
                email : ex
            },{
                $pull: {
                  data: {
                   email: hello1[0].email
                  }
                }
              }
            )
        res.send("findResult");    
});

var pass, final_result;
const dynamic = [];
router.get('/show_noti', async (req, res) => {
    const temp = await User.find({ email: ex });
    pass = temp.length;


    const getcall = async () => {
        try{
             final_result = await User.find({}).countDocuments();
        }catch (err) {
            console.log(err);
        }
    }
    getcall();
    dynamic.push(pass);
    dynamic.push(final_result);
    // console.log(dynamic);
    res.send(temp[0]);
    console.log("ye hai");
    // console.log(temp.length);
});


router.post('/xxx', async (req, res) => {
    res.send(dynamic);
    console.log("kkkkk");
    console.log(dynamic);
    console.log("kkkkk");
 });

router.post('/clear_noti', async (req, res) => {
    // 
    // console.log(req.body.e);
    const hello = await User.find({ email: req.body.e });
    // console.log(hello[0].email);
    // for(var j=0;j<userExist[0].data.length;j++){
    await User.findOneAndUpdate({
        email: ex
    }, {
        $pull: {
            data: {
                email: hello[0].email
            }
        }
    }
    )
    res.send("findResult");
});



router.get('/list_show', async (req, res) => {
    const list_show = [];
    for (var j = 0; j < filter_data.length; j++) {
        const temp = await User.find({ email: filter_data[j] });
        list_show.push(temp);
    }
    // console.log(list_show);
    res.send(list_show);
});



const filter_data = [];
router.post('/donor_list', async (req, res) => {
    // console.log("ka ho ka haal ba");
    const donor_detail = await User.find({ email: ex });
    console.log(donor_detail);
    let date1 = donor_detail[0].date.toISOString().substring(0, 10);
    let date2 = new Date();
    let _date2 = date2.toISOString().substring(0, 10);
    console.log(date1);
    console.log(_date2);
    let timeDifference = Math.abs(new Date(_date2).getTime() - new Date(date1).getTime());
    let days_difference = timeDifference / (1000 * 3600 * 24);
    console.log(days_difference);
    // console.log(date.getDay());
    // console.log(date);
    // console.log(req.body._Blood_Group);
    // console.log(req.body._city);
    // console.log(PINCODE);
    var flag = 1;
    let findResult = await User.find({
    });
    filter_data.length = 0;
    for (var j = 0; j < findResult.length; j++) {
    
        if (findResult[j].blood_group === req.body._Blood_Group && findResult[j].district === req.body._city && findResult[j].pincode === PINCODE) {
            if (findResult[j].email != ex) {
                // console.log("hello");
                filter_data.push(findResult[j].email);
                const mm = await User.find({ email: findResult[j].email });

                for (var l = 0; l < mm[0].data.length; l++) {
                    // console.log(mm[0].data[l]);
                    // console.log(mm[0].data[l].email);
                    if (mm[0].data[l].email === ex)
                        flag = 0;
                }
                if (flag) {
                    await User.findOneAndUpdate({
                        email: findResult[j].email
                    }, {
                        $push: {
                            data: {
                                name: donor_detail[0].name,
                                email: donor_detail[0].email,
                                phone_number: donor_detail[0].phone,
                                age: donor_detail[0].age,
                                address: donor_detail[0].address,
                                district: donor_detail[0].district,
                                pincode: donor_detail[0].pincode,
                                state: donor_detail[0].state,
                                gender: donor_detail[0].gender,
                                blood_group: donor_detail[0].blood_group
                            }
                        }
                    }


                    )
                }
                flag = 1;
                // const res1 = await User.find({email : findResult[j].email});
                // console.log(res1[0].data);
            }

        }

    }
    console.log(filter_data);
    for (var j = 0; j < filter_data.length; j++) {
        let mailTranporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "switch.case7105@gmail.com",
                pass: "pqocmgyrvhculjen"

            }
        })
        one_time_password = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        let details = {
            from: "switch.case7105@gmail.com",
            to: "aaaa@gmail.com",
            to: filter_data[j],
            subject: "Receiver Request",
            text: _name + " has sent you a request for Blood Donation"
        }

        //one_time_password = otp;

        email_validation = () => {
            mailTranporter.sendMail(details, (err) => {
                if (err) {
                    console.log("it has an error", err);
                }
                else {
                    console.log("email has sent!");
                }

            })
        }
        email_validation();
    }
    res.send(req.body);


});
router.get('/about', authenticate, (req, res) => {
    res.send(req.rootUser);
});
// edit User Details just like location and other details
router.patch('/edit/:id', (req, res, next) => {
    console.log(req.params.id)
    User.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            name: req.body.name,
            address: req.body.address,


        }
    })
        .then(result => {
            res.status(200).json({
                updatedUser: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})


router.post("/nearbyusers", async (req, res) => {
    const user = await User.find({ email: ex });
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    // Convert latitude and longitude to numbers
    const targetLatitude = parseFloat(latitude);
    const targetLongitude = parseFloat(longitude);


    if (isNaN(targetLatitude) || isNaN(targetLongitude)) {
        return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }

    const old_users = await User.find({
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [targetLongitude, targetLatitude]
                },
                $maxDistance: 500 * 1609.34 // Convert maxDistance to meters
            }
        }
    });
    const users = [];
    for(var j=0;j<old_users.length;j++){
        if(old_users[j].email != ex && old_users[j].blood_group==bloodGroup)
        users.push(old_users[j]);
    }
     const list=[];
     for(var i=0;i<users.length;i++){
          if(users[i].blood_group==bloodGroup && users[i].email!==ex){
              list.push(users[i].email);
          }
     }
//////////////////////////////////////////////////////////////////////////////////////////////
var flag=1;
for(var j=0;j<users.length;j++){
    for(var k =0;k<users[j].data.length;k++){
        if(users[j].data[k].email === ex)
        flag=0;
    }
    if(flag){
        await User.findOneAndUpdate({
            email: users[j].email
        }, {
            $push: {
                data: {
                    name: user[0].name,
                    email: user[0].email,
                    phone_number: user[0].phone,
                    age: user[0].age,
                    address: user[0].address,
                    district: user[0].district,
                    pincode: user[0].pincode,
                    state: user[0].state,
                    gender: user[0].gender,
                    blood_group: user[0].blood_group
                }
            }
        }


        )
    }
    flag = 1;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     

     console.log(list.length);
     for (var j = 0; j < list.length; j++) {
        let mailTranporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "switch.case7105@gmail.com",
                pass: "pqocmgyrvhculjen"

            }
        })
        // one_time_password = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        let details = {
            from: "switch.case7105@gmail.com",
           
            to: list[j],
            subject: "Receiver Request",
            text: _name + " has sent you a request for Blood Donation Please check in your Web App notification"
        }

        //one_time_password = otp;

        email_validation = () => {
            mailTranporter.sendMail(details, (err) => {
                if (err) {
                    console.log("it has an error", err);
                }
                else {
                    console.log("email has sent!");
                }

            })
        }
        email_validation();
    }
     console.log(list);
    res.json(users);

});

router.post('/map',async (req,res)=>{
      
    // const latitude = req.body.latitude;
    // const longitude = req.body.longitude;

    // Convert latitude and longitude to numbers
    const targetLatitude = parseFloat(latitude);
    const targetLongitude = parseFloat(longitude);

    console.log('map Call');


    if (isNaN(targetLatitude) || isNaN(targetLongitude)) {
        return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }

    const mapUsers = await User.find({
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [targetLongitude, targetLatitude]
                },
                $maxDistance: 500 * 1609.34 // Convert maxDistance to meters
            }
        }
    });
    res.send(mapUsers);
});


router.get('/getdata', authenticate, (req, res) => {
    res.send(req.rootUser);
});

router.get('/logout', (req, res) => {
    console.log(`Hello my logout`);
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('user logout');
});
///......dashboard

let s_no;
let id, result;
router.get('/dashboard', authenticate, (req, res) => {
    id = req.rootUser.email;
    const getcall = async () => {
        try {
            result = await Worker.find({ email: id }).countDocuments();


        } catch (err) {
            console.log(err);
        }
    }
    getcall();

    Worker.count(function (err, countData) {
        s_no = countData;
        //you will get the count of number of documents in mongodb collection in the variable 
        console.log(countData);
    });
    const data = {
        result: result,
        a: req.rootUser.email,
        b: req.rootUser.name,
        rootUser: req.rootUser
    };

    res.send(data);
});
// user registration 
router.post('/signup', upload.single("photo"), async (req, res) => {
    const { name, email, password, cpassword, phone_number, age, address, district, pincode, state, gender, blood_group, latitude, longitude } = req.body;

 

    const targetLatitude = parseFloat(latitude);
    const targetLongitude = parseFloat(longitude);

    if (!req.file || !name || !email || !password || !cpassword || !phone_number || !age || !address || !district || !pincode || !state || !gender
        || !blood_group || !latitude || !longitude) {
        return res.status(422).json({ error: "please filled" });
    }

    try {
        const { filename } = req.file;
        const userExist = await Worker.findOne({ email: email })
        //
        if (userExist) {
            return res.status(422).json({ error: "ID exist" });
        }
        else {


            var user = new User({

                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                cpassword: req.body.cpassword,
                phone_number: req.body.phone_number,
                age: req.body.age,
                address: req.body.address,
                district: req.body.district,
                pincode: req.body.pincode,
                state: req.body.state,
                gender: req.body.gender,
                blood_group: req.body.blood_group,
                photo: filename,
                location: {
                    type: 'Point',
                    coordinates: [targetLongitude, targetLatitude],
                }

            })
            let mailTranporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "switch.case7105@gmail.com",
                    pass: "pqocmgyrvhculjen"

                }
            })
            one_time_password = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
            let details = {
                from: "switch.case7105@gmail.com",
                to: email,
                subject: "testing our nodemailer",
                text: "Thank you for joining us , Your one time password for registration in Blood Bank is : " + one_time_password
            }

            //one_time_password = otp;
            console.log(one_time_password);


            email_validation = () => {
                mailTranporter.sendMail(details, (err) => {
                    if (err) {
                        console.log("it has an error", err);
                    }
                    else {
                        console.log("email has sent!");
                    }

                })
            }

            const getcall = async () => {
                // try{
                //      result = await Worker.find({reff_id : id}).countDocuments();
                // }catch (err) {
                //     console.log(err);
                // }
            }
            email_validation();
            getcall();
            const userRegister = await user.save();
            res.json({ message: "user signin success" });

            // otp validation.....................................................

            if (userRegister) {

                res.status(201).json({ message: "User register successfuly" });

            }

        }

    } catch (err) {
        console.log(err);
    }


});
/////.............

/// otp validation..............................................
router.post('/otp_validator', async (req, res) => {
    const { otp } = req.body;
    // console.log(one_time_password);
    console.log(otp);


    if (!otp) {
        return res.status(422).json({ error: "please filled" });
    }

    try {
        //const userExist = await User.findOne({ userid: userid })

        if (otp === one_time_password) {
            res.status(201).json({ message: "user Signin successfuly" });
        }
        else {
            //     const user = new User({ name, userid, password, cpassword });

            res.status(422).json({ message: "email exist" });
            // const userRegister = await user.save();



        }


    } catch (err) {
        console.log(err);
    }

});

/// otp validation...........................................

module.exports = router;
