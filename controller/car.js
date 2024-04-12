const carUsecase = require("../usecase/car");

exports.getCars = async (req, res, next) => {
    try {
        const data = await carUsecase.getCars();

        res.status(200).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getCar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await carUsecase.getCar(id);
        if (!data) {
            return next({
                message: `Car with id ${id} is not found!`,
                statusCode: 404,
            });
        }

        res.status(200).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createCar = async (req, res, next) => {
    try {
        const { name, rentperday, cartype_id } = req.body;
        const { photo } = req.files;
        if (!name || name == "") {
            return next({
                message: "Name must be provided!",
                statusCode: 400,
            });
        }
        if (!rentperday || rentperday == "") {
            return next({
                message: "Rentperday must be filled!",
                statusCode: 400,
            });
        }
        if (!cartype_id || cartype_id == "") {
            return next({
                message: "Cartype_id must be filled!",
                statusCode: 400,
            });
        }

        const data = await carUsecase.createCar({
            name,
            rentperday,
            cartype_id,
            photo,
        });

        res.status(201).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateCar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, rentperday, cartype_id } = req.body;
        const { photo } = req.files;
        if (!name || name == "") {
            return next({
                message: "Name must be provided!",
                statusCode: 400,
            });
        }
        if (!rentperday || rentperday == "") {
            return next({
                message: "Rentperday must be filled!",
                statusCode: 400,
            });
        }
        if (!cartype_id || cartype_id == "") {
            return next({
                message: "Cartype_id must be filled!",
                statusCode: 400,
            });
        }

        const data = await carUsecase.updateCar(id, { name, rentperday, cartype_id, photo });

        res.status(200).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteCar = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await carUsecase.deleteCar(id);

        res.status(200).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};