const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createMember, getMemberByEmail, getMemberByID } = require("../../repository/member");

exports.register = async (payload) => {
    let member = await createMember(payload);

    // Delete object password from member
    delete member.dataValues.password;

    // Create token
    const jwtPayload = {
        id: member.id,
    };

    const token = jsonwebtoken.sign(jwtPayload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    // return the member data and the token
    const data = {
        member,
        token,
    };

    return data;
};

exports.login = async (email, password) => {
    // get the member
    let member = await getMemberByEmail(email);
    if (!member) {
        throw new Error(`Member is not found!`);
    }

    // compare the password
    const isValid = await bcrypt.compare(password, member?.password);
    if (!isValid) {
        throw new Error(`Wrong password!`);
    }

    // delete password
    if (member?.dataValues?.password) {
        delete member?.dataValues?.password;
    } else {
        delete member?.password;
    }

    // Create token
    const jwtPayload = {
        id: member.id,
    };

    const token = jsonwebtoken.sign(jwtPayload, process.env.JWT_SECRET, {
        expiresIn: "1h", // expired login token, delete expiresIn if u want there is no expiration date (remember me)
    });

    // return the member data and the token
    const data = {
        member,
        token,
    };

    return data;
};

exports.profile = async (id) => {
    // get the member
    let data = await getMemberByID(id);
    if (!data) {
        throw new Error(`Member is not found!`);
    }

    // delete password
    if (data?.dataValues?.password) {
        delete data?.dataValues?.password;
    } else {
        delete data?.password;
    }

    return data;
};
