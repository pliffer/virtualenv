let Astr = require('astr-api');

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

                if(!item.child) return;

                item.child.forEach(subItem => {

                    // Aqui, se o item estiver marcado, ele não passa
                    if(subItem.checked) return;

                    labels[item.label].push(subItem.label);

                });

            });

            return labels;

        }).then(labels => {

            if(!labels) return Promise.reject('No obj found');

            if(key && typeof labels[key] == 'undefined'){

                return Promise.reject(`Key ${key} not found`);

            }

            if(!key){

                return labels;

            }

            return labels[key];

        });

    }

}