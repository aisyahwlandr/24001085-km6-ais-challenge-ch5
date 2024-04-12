const { cartypes, car } = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getCartypes = async () => {
    const data = await cartypes.findAll({
        include: {
            model: car,
        },
    });
    return data;
};

exports.getCartype = async (id) => {
    const key = `cartypes:${id}`;
        let data = await getData(key);

        if (data) {
            return data;
        }

        data = await cartypes.findAll({
            where: {
                id,
            },
            include: {
                model: car,
            },
        });
        if (data.length > 0) { 
            await setData(key, data[0], 300);
            return data[0];
        }

        throw new Error(`Cartype is not found`);
};

exports.createCartype = async (payload) => {
        // Create data to postgres
        const data = await cartypes.create(payload);

        // Save to redis (cache)
        const key = `cartypes:${data.id}`;
        await setData(key, data, 300);

        return data;
};

exports.updateCartype = async (id, payload) => {
    const key = `cartypes:${id}`;
        // update data to postgres
        await cartypes.update(payload, {
            where: {
                id,
            },
        });

        // get data from postgres
        const data = await cartypes.findAll({
            where: {
                id,
            },
            include: {
                model: car,
            },
        });
        if (data.length > 0) {
            // save to redis (cache)
            await setData(key, data[0], 300);

            return data[0];
        }

        throw new Error(`Cartype is not found!`);
};

exports.deleteCartype = async (id) => {
    const key = `cartypes:${id}`;
        // delete from postgres
        const data = await cartypes.destroy({ where: { id } });

        // delete from redis
        await deleteData(key);

        return null;
};