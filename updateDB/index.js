const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const mongoose = require('mongoose')
const https = require('https');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const artists = require('./models/artistModel')

if (!globalThis.fetch) {
    globalThis.fetch = fetch;
}
const options = {
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(process.env.MONGOURL || 'mongodb://127.0.0.1:27017/artistDB?retryWrites=true&w=majority', options, (err) => {
    if (err) {
        console.log(err)
    } else {
        //run the following code every 30 minutes
        setInterval(() => {
        artists.find({}, function (err, docs) {
            if (err) {
                res.send(err)
            } else {
                //get name key from each artist and request the twitter profile associated with it
                docs.forEach(function (artist) {
                    artistProfile = new URL(artist['social'])

                    https.get(artistProfile, res => {
                        let data = [];
                        const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
                        console.log('Status Code:', res.statusCode);
                        console.log('Date in Response header:', headerDate);

                        res.on('data', chunk => {data.push(chunk);});

                        res.on('end', () => {
                            //update mongodb entry with twitter profile data
                            artists.findOneAndUpdate({_id: artist['_id']}, parseDescription(data.join(""), artist), {upsert: true}, function (err, doc) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log("updated "+artist['name'])
                                }
                                
                            })
                        });

                    }).on('error', err => {
                        console.log('Error: ', err.message);
                    });
                    return true
                })
            }
        })
        }, 30000)

    }
})

function parseDescription(data, artist) {
    let description = data.split('<p class="ProfileHeaderCard-bio u-dir" dir="ltr">')[1].split('</p>')[0]
    //remove all html tags from description
    description = description.replace(/<\/?[^>]+(>|$)/g, "")

    let profileName = data.split('<title>')[1].split('</title>')[0];
    profileName = profileName.split(' | Twitter')[0];

    artist['name'] = profileName
    //make description lowercase
    description = description.toLowerCase()  
      // check if description contains any of the keywords: #ofc, #comissionsopen, #open, #comissions, #alwaysopen, #OC, comissions open, open for comissions, comissions: open, commissions: closed
    if (description.includes('#ofc') || description.includes('#comissionsopen') || description.includes('#open') || description.includes('#comissions') || description.includes('#alwaysopen') || description.includes('#oc') || description.includes('comissions open') || description.includes('open for comissions') || description.includes('comissions: open') || description.includes('comissions: closed')) {
        artist["open"] = "Open"
        console.log(artist['name'] + ' is open for comissions')
    } else {
        artist["open"] = "Closed"
        console.log(artist['name'] + ' is closed for comissions')
    }
    
    return artist
}