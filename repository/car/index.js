const crypto = require("crypto");
const path = require("path");
const { cartypes, car } = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");
const { uploader } = require("../../helper/cloudinary");

exports.getCars = async () => {
    const data = await car.findAll({
        include: {
            model: cartypes,
        },
    });
    return data;
};

exports.getCar = async (id) => {
    const key = `cars:${id}`;
    let data = await getData(key);

    if (data) {
        return data;
    }

    data = await car.findAll({
        where: {
            id,
        },
        include: {
            model: cartypes,
        },
    });
    if (data.length > 0) {
        await setData(key, data[0], 300);
        return data[0];
    }

    throw new Error(`Car is not found`);
};

exports.createCar = async (payload) => {
    if (payload.photo) {
        //upload image to cloudinary
        const { photo } = payload;

        //make unique filename -> 1711584658783
        photo.publicId = crypto.randomBytes(16).toString("hex");

        // rename the file -> 1711584658783.jpg / 1711584658783.png
        photo.name = `${photo.publicId}${path.parse(photo.name).ext}`;

        // Process to upload image
        const imageUpload = await uploader(photo);
        payload.photo = imageUpload.secure_url;
    }

    // Create data to postgres
    const data = await car.create(payload);

    // Save to redis (cache)
    const key = `cars:${data.id}`;
    await setData(key, data, 300);

    return data;
};

exports.updateCar = async (id, payload) => {
    if (payload.photo) {
        //upload image to cloudinary
        const { photo } = payload;

        //make unique filename -> 1711584658783
        photo.publicId = crypto.randomBytes(16).toString("hex");

        // rename the file -> 1711584658783.jpg / 1711584658783.png
        photo.name = `${photo.publicId}${path.parse(photo.name).ext}`;

        // Process to upload image
        const imageUpload = await uploader(photo);
        payload.photo = imageUpload.secure_url;
    }

    const key = `cars:${id}`;
    // update data to postgres
    await car.update(payload, {
        where: {
            id,
        },
    });

    // get data from postgres
    const data = await car.findAll({
        where: {
            id,
        },
        include: {
            model: cartypes,
        },
    });
    if (data.length > 0) {
        // save to redis (cache)

        await setData(key, data[0], 300);

        return data[0];
    }

    throw new Error(`Car is not found!`);
};

exports.deleteCar = async (id) => {
    const key = `cars:${id}`;
    // delete from postgres
    const data = await car.destroy({ where: { id } });

    // delete from redis
    await deleteData(key);

    return null;
};