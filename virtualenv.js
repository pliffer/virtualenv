let Astr = require('./astr-api');

module.exports = {

    astr: null,

    setJwt(jwt){
        
        module.exports.astr = new Astr(jwt);

    },

    get(key){

        return module.exports.astr.tree().then(envItem => {

            let labels = {};

            envItem.child.forEach(item => {

                labels[item.label] = [];

                item.child.forEach(subItem => {

                    labels[item.label].push(subItem.label);

                });

            });

            return labels;

        }).then(labels => {

            if(!labels) return Promise.reject('No obj found');

            if(typeof labels[key] == 'undefined'){

                return Promise.reject(`Key ${key} not found`);

            }

            return labels[key];

        });

    }

}