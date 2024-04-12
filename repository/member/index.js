const crypto = require("crypto");
const path = require("path");
const bcrypt = require("bcrypt");
const { member } = require("../../models");
const { uploader } = require("../../helper/cloudinary");
const { getData, setData } = require("../../helper/redis");

exports.createMember = async (payload) => {
    // encrypt the password
    payload.password = bcrypt.hashSync(payload.password, 10);

    if (payload.photo) {
        // upload image to cloudinary
        const { photo } = payload;

        // make unique filename -> 213123128uasod9as8djas
        photo.publicId = crypto.randomBytes(16).toString("hex");

        // rename the file -> 213123128uasod9as8djas.jpg / 213123128uasod9as8djas.png
        photo.name = `${photo.publicId}${path.parse(photo.name).ext}`;

        // Process to upload image
        const imageUpload = await uploader(photo);
        payload.photo = imageUpload.secure_url;
    }

    // save to db
    const data = await member.create(payload);

    // save to redis (email and id)
    const keyID = `member:${data.id}`;
    await setData(keyID, data, 300);

    const keyEmail = `member:${data.email}`;
    await setData(keyEmail, data, 300);

    return data;
};

exports.getMemberByID = async (id) => {
    const key = `member:${id}`;

    // get from redis
    let data = await getData(key);
    if (data) {
        return data;
    }

    // get from db
    data = await member.findAll({
        where: {
            id,
        },
    });
    if (data.length > 0) {
        // save to redis
        await setData(key, data[0], 300);

        return data[0];
    }

    throw new Error(`Member is not found!`);
};

exports.getMemberByEmail = async (email) => {
    const key = `member:${email}`;

    // get from redis
    let data = await getData(key);
    if (data) {
        return data;
    }

    // get from db
    data = await member.findAll({
        where: {
            email,
        },
    });
    if (data.length > 0) {
        // save to redis
        await setData(key, data[0], 300);

        return data[0];
    }

    throw new Error(`Member is not found!`);
};