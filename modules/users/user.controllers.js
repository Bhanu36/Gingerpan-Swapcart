const responseUtils = require('../../utilities/response');
const User = require('../../models/user.model');
const { OrderSchema } = require('../../models/orders.model');

const createUser = async (req, res) => {
  try {
    const data = [{
      userId: 1,
      name: "Rahul"
    }, {
      userId: 2,
      name: "Ramesh"
    }, {
      userId: 3,
      name: "Ankita"
    }];
    const updateRes = await User.insertMany(data);
    return responseUtils.successResponse(res, 'success', updateRes);
  } catch (err) {
    console.log(err);
    return responseUtils.serverErrorResponse(res, err);
  }
};

const createOrder = async (req, res) => {
  try {
    const orders = [
      {
        orderId: 1,
        userId: 1,
        subTotal: 500
      },
      {
        orderId: 2,
        userId: 2,
        subTotal: 400
      },
      {
        orderId: 3,
        userId: 1,
        subTotal: 150
      },
      {
        orderId: 4,
        userId: 1,
        subTotal: 700
      },
      {
        orderId: 5,
        userId: 3,
        subTotal: 200
      },
      {
        orderId: 6,
        userId: 3,
        subTotal: 1500
      },
      {
        orderId: 7,
        userId: 1,
        subTotal: 1200
      },
      {
        orderId: 8,
        userId: 2,
        subTotal: 1600
      },
      {
        orderId: 9,
        userId: 2,
        subTotal: 900
      },
      {
        orderId: 10,
        userId: 1,
        subTotal: 700
      }
    ];
    const updateRes = await OrderSchema.insertMany(orders);
    return responseUtils.successResponse(res, 'success', updateRes);
  } catch (err) {
    console.error(err);
    return responseUtils.serverErrorResponse(res, err);
  }
};

const getUsersOrderInfo = () => User.aggregate([
  {
    $lookup: {
      from: "order_",
      as: "order",
      localField: "userId",
      foreignField: "userId"
    }
  }, {
    $unwind: "$order"
  }, {
    $project: {
      userId: "$userId",
      name: "$name",
      orderId: "$order.orderId",
      subTotal: "$order.subTotal"
    }
  }, {
    $group: {
      _id: "$userId",
      name: { $first: "$name" },
      noOfOrders: { $sum: 1 },
      averageBillValue: { $avg: "$subTotal" }
    }
  }
]);

const getUserOrdersInfo = async (req, res) => {
  try {
    const users = await getUsersOrderInfo();
    return responseUtils.successResponse(res, 'success', users);
  } catch (err) {
    return responseUtils.serverErrorResponse(res, err);
  }
};
const updateUser = ({ userId, updateInfo }) => {
  return User.update({ userId }, { $set: updateInfo });
};

const updateUserTable = async (req, res) => {
  try {
    const userInfo = await getUsersOrderInfo();
    const promises = userInfo.map(user => updateUser({ userId: user._id, updateInfo: { noOfOrders: user.noOfOrders } }));
    const resolvedPromises = await Promise.all(promises);
    return responseUtils.successResponse(res, 'success', resolvedPromises);
  } catch (err) {
    return responseUtils.serverErrorResponse(res, err);
  }
};

const getUserInfo = async (req, res) => {
  try {
    const users = await User.find();
    return responseUtils.successResponse(res, 'success', users);
  } catch (err) {
    return responseUtils.serverErrorResponse(res, err);
  }
};

module.exports = {
  createUser,
  createOrder,
  getUserOrdersInfo,
  updateUserTable,
  getUserInfo
};
