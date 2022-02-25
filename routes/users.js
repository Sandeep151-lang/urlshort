var express = require('express');
var router = express.Router();
const userSchema = require('../model/userSchema')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const urlshort = require('../model/url');
var hbs = require('nodemailer-express-handlebars');
/* GET users listing. */

require('../dbConfig/conn')
router.post('/register', async (req, res, next) => {
  console.log(req.body)
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json('Please filled the required field')
  } else {
    try {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sandeepnandanwar92@gmail.com',
          pass: 'rfncmwkkovvsbcsv' // naturally, replace both with your real credentials or an application-specific password
        }
      });
      const userExist = await userSchema.findOne({ email: email });
      if (userExist) {
        return res.status(400).json('Email already exist');
      } else {

        const hash = await bcrypt.hash(password, 10)
        var older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');

        var register = await userSchema({ name: name, email: email, password: hash, activetoken: older_token, verify: false });
        register.save();
        transporter.use('compile', hbs({
          viewEngine: 'express-handlebars',
          viewPath: ''
        }));
        const mailOptions = {
          from: 'sandeepnandanwar92@gmail.com',
          to: email,
          subject: 'Please Activate Your Account',
          // template: 'main',
          html: `<div style='width:100%; height:50vh'><center><div style='width:50%; background-color:white; margin-top:100px'><h1 style='text-align:center'>Please Activate</h1><a style='cursor:pointer' href=https://urlshorterning.herokuapp.com/${email}/${older_token}><button style='width:50%; background-color:rgb(124, 124, 184); padding:13px 12px; font-weight:bolder; border-radius:8px'>Activate</button></a></div></center></div>`

        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error)
            return res.status(400).send({ message: 'Invalid Email' })

          } else {
            console.log('Email sent: ' + info.response);
            return res.status(400).send({ message: info.response })

          }
        })

        return res.status(201).json('Registered Successfull &&  Check Your Gmail to Activate Your Account')
      }
    } catch (error) {
      return res.status(400).json('error')
    }
  }
  9535830306
})


router.post('/login', async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return res.status(400).send({ message: 'Please filled the required field' })
    } else {
      const singin = await userSchema.findOne({ email: email });
      if (singin) {
        const isMatch = await bcrypt.compare(password, singin.password);
        const token = await singin.generateAuthtoken();
        // const token = jwt.sign({ _id: singin._id }, "sandeepnandanwarfullstackdeveloper", { expiresIn: '1h' });
        res.cookie("jwt", token, {
          path: "/",
          expires: new Date(Date.now() + 30000000),
          httpOnly: true
        })
        // const { name, email, activetoken } = singin;
        // res.json({ token, name, email, activetoken })
        if (!isMatch) {
          return res.status(401).send({ message: 'Invalid Credentials' })
        } else {
          const Activate = false;
          const active = await userSchema.findOne({ email: email, verify: false })
          if (active) {
            return res.status(400).json({ message: 'Activate Your Account' })
          } else {
            return res.status(200).send({ message: singin })
            next()
          }
        }
      } else {
        res.status(400).send({ message: 'Email is not found Please SignUp Your Account' })
      }
    }
  } catch (error) {
    res.status(400).send({ message: 'error' })
  }
})



router.get('/:email/:token', async (req, res) => {
  const { token, email } = req.params;
  try {
    jwt.verify(token, 'shhhhh', async function (error, decode) {
      if (error) {
        return res.status(400).json(error)
      } else {
        await userSchema.findOneAndUpdate({ email: email }, { $set: { verify: true } });
        return res.status(200).json('Your Account is Activated')
        // return res.status(200).json(decode)
      }
    })
  } catch (error) {
    return res.status(400).json(error)
  }
})



router.get('/user', async function (req, res, next) {
  await userSchema.find().then((doc) => {
    return res.send({ item: doc })
  })
});



router.post('/forget', async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json('Please fill the required field')
    } else {
      await userSchema.findOne({ email: email }).exec((error, execute) => {
        if (error) return res.status(400).json(error);
        if (execute) {
          //  var older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'sandeep',{});
          //  console.log(older_token)
          var older_token = jwt.sign({ foo: 'bar', }, 'sandeep', { expiresIn: 60 * 60 });

          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'sandeepnandanwar92@gmail.com',
              pass: 'rfncmwkkovvsbcsv' // naturally, replace both with your real credentials or an application-specific password
            }
          });
          const mailOptions = {
            from: 'sandeepnandanwar92@gmail.com',
            to: email,
            subject: 'Change Password',
            // template: 'main',
            html: `<div style='width:100%; height:50vh'><center><div style='width:50%; background-color:white; margin-top:100px'><h1 style='text-align:center'>Change Password</h1><a style='cursor:pointer' href=http://localhost:3000/update/${older_token}/${email}><button style='width:50%; background-color:rgb(124, 124, 184); padding:13px 12px; font-weight:bolder; border-radius:8px'>Password</button></a></div></center></div>`
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error)
              return res.status(400).send({ message: 'Invalid Email' })

            } else {
              console.log('Email sent: ' + info.response);
              return res.status(400).send({ message: info.response })
            }
          })
          return res.status(200).json('Check your Gmail Account')
        } else {
          return res.status(400).json('Invalid email')
        }
      })
    }
  } catch (error) {
    return res.status(400).json(error)
  }
})



router.post('/password', async (req, res) => {
  const { password, token, email } = req.body
  if (!password) {
    return res.status(400).json('Please fill the password field')
  }
  try {
    jwt.verify(token, 'sandeep', async function (error, decode) {
      if (error) {
        return res.status(400).json(error);
      } else {
        const hash = await bcrypt.hash(password, 10)
        await userSchema.findOneAndUpdate({ email: email }, { $set: { password: hash } });
        return res.status(200).json('Password Updated')
      }
    })
  } catch (error) {
    return res.status(400).json(error)
  }
})


router.post('/url', async (req, res) => {
  const { value } = req.body
  console.log(value)

  try {
    const use = new urlshort({ value: value })
    await use.save();
    return res.status(200).json(value)
  } catch (error) {
    return res.status(400).json(error)
  }
})




router.get('/geturl', async (req, res) => {
  await urlshort.find().then((doc) => {
    return res.status(200).json(doc)
  })
})


module.exports = router;
