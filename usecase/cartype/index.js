const cartypeRepo = require("../../repository/cartype");

exports.getCartypes = async () => {
    const data = await cartypeRepo.getCartypes();
    return data;
};

exports.getCartype = async (id) => {
    const data = await cartypeRepo.getCartype(id);
    return data;
};

exports.createCartype = async (payload) => {
    const data = await cartypeRepo.createCartype(payload);
    return data;
};

exports.updateCartype = async (id, payload) => {
    // update old data
    await cartypeRepo.updateCartype(id, payload);

    // find the new data
    const data = await cartypeRepo.getCartype(id);

    return data;
};

exports.deleteCartype = async (id) => {
    const data = await cartypeRepo.deleteCartype(id);
    return data;
};