const express = require('express')
const bodyParser = require('body-parser')
const request = require("request")
const https = require('https')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})


app.post('/', (req, res) => {
    var firstName = req.body.fName
    var lastName = req.body.lName
    var yourEmail = req.body.emailU

    const data = {
        members: [
            {
                email_address: yourEmail,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }

            }
        ]
    }

    const jsonData = JSON.stringify(data)

    const url = "https://us9.api.mailchimp.com/3.0/lists/13a0d7026d"

    const options = {
        method: 'POST',
        auth: 'udin:523ae6ebad65ddae11f7f8ca2403a190-us9'
    };

    const request = https.request(url, options, (respon) => {

        if (respon.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }

        console.log('statusCode:', respon.statusCode);
        respon.on('data', (data) => {
            console.log(JSON.parse(data))
        });
    });

    request.write(jsonData)
    request.end()

})

app.post('/failure', (req, res) => {
    res.redirect('/')
})

app.post('/success', (req, res) => {
    res.redirect('/')
})


app.listen(port, () => {
    console.log(`Server on port ${port}`)
})

// API Key
// 523ae6ebad65ddae11f7f8ca2403a190-us9

// My ID
// 13a0d7026d

// My MailCchimp Account
// ximew19745 @nevyxus.com