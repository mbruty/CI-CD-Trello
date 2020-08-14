const yup = require('yup');

const schema = yup.object().shape({
    lists: yup.array().of(yup.object().shape({
        id: yup.number().required(),
        name: yup.string().required(),
        listPosition: yup.number().required(),
        items: yup.array().of(yup.object().shape({
                name: yup.string().required(),
                label: yup.array().of(yup.number()),
                due: yup.date(),
                complete: yup.boolean().required(),
                itemPosition: yup.number().integer().required()
            }
        ))
    }))
})

module.exports = schema;