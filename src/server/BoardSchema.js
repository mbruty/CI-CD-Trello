const yup = require('yup');

const schema = yup.object().shape({
    name: yup.string().required(),
    lists: yup.array().of(yup.object().shape({
        id: yup.number().integer().required(),
        name: yup.string().required(),
        listPosition: yup.number().integer().required(),
        items: yup.array().of(yup.object().shape({
                name: yup.string().required(),
                label: yup.string().matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
                due: yup.date(),
                complete: yup.boolean().required(),
                itemPosition: yup.number().integer().required()
            }
        ))
    }))
})

module.exports = schema;