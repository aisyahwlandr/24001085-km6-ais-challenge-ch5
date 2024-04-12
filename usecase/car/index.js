const carRepo = require("../../repository/car");

exports.getCars = async () => {
    const data = await carRepo.getCars();
    return data;
};

exports.getCar = async (id) => {
    const data = await carRepo.getCar(id);
    return data;
};

exports.createCar = async (payload) => {
    const data = await carRepo.createCar(payload);
    return data;
};

exports.updateCar = async (id, payload) => {
    // update old data
    await carRepo.updateCar(id, payload);

    // find the new data
    const data = await carRepo.getCar(id);

    return data;
};

exports.deleteCar = async (id) => {
    const data = await carRepo.deleteCar(id);
    return data;
};