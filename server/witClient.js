'use strict';

const request = require('superagent');

function handleWitResponse(res){
    return res.entities;
}

/*
curl \
 -H 'Authorization: Bearer MSQPOYSRKOCBN745SCWU62MFTPPOTC7M' \
 'https://api.wit.ai/message?v=20171218&q='
*/

module.exports = function witClient(token){
    const ask = function ask(message, cb){
        request.get('https://api.wit.ai/message')
            .set('Authorization', 'Bearer ' + token)
            .query({v: '20171218'})
            .query({q: message})
            .end((err, res) => {
                if(err){ // is there an error?
                    return cb(err);
                }

                if(res.statusCode != 200){ // is there a status other than 200 (NOT OK)
                    return cb('Expected status code 200 bt code ' + res.statusCode);
                }
                // Eveything is good!
                const witResponse = handleWitResponse(res.body);

                return cb(null, witResponse);
            });
    }


    return {
        ask: ask
    }
}