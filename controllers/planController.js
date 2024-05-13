//createPlanController

import planModel from "../models/planModel.js";
import sellerModel from "../models/sellerModel.js";
import purchasedPlanModel from "../models/purchasedPlan.js";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANTID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
export const createPlanController = async (req, resp) => {
  try {
    const {
      userId,
      planName,
      planGenerationType,
      planType,
      capacity,
      startDate,
      endDate,
      cities,
      price,
    } = req.body;

    if (!planName) {
      return resp.send({
        success: false,
        message: "PlanName is required",
      });
    }

    if (!startDate) {
      return resp.send({
        success: false,
        message: "startDate is required",
      });
    }
    if (!endDate) {
      return resp.send({
        success: false,
        message: "endDate is required",
      });
    }
    if (!cities) {
      return resp.send({
        success: false,
        message: "Please select atleast one city",
      });
    }

    //Create new instance of plan and then save
    const plan = new planModel({
      userId,
      planName,
      planGenerationType,
      planType,
      capacity,
      startDate,
      endDate,
      cities: cities?.map((city) => ({
        cityId: city.cityId,
        cityName: city.cityName,
        date: city.date,
        attractions: city.attractions.map((attraction) => ({
          attraction: attraction.attraction,
        })),
        zones: city.zones.map((zone) => ({
          zone: zone.zone,
        })),
        sellers: city.sellers.map((seller) => ({
          seller: seller.seller, // Assuming seller has the appropriate format
        })),
      })),
      price,
    });

    const storedPlan = await plan.save();
    const planId = storedPlan._id;
    console.warn(planId);
    //Find sellers by their ids and then update planRequest in seller model
    const sellerIds = cities?.flatMap((city) =>
      city?.sellers?.map((seller) => seller.seller)
    );

    await sellerModel.updateMany(
      {
        _id: { $in: sellerIds },
      },
      {
        $push: {
          planRequest: planId,
        },
      }
    );

    resp.status(201).send({
      success: true,
      message: "Plan added successfully",
      plan,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while creating plan",
      error,
    });
  }
};

//getPlanController

export const getPlanController = async (req, resp) => {
  try {
    const { id } = req.params;
    //get plans on base of id

    const plans = await planModel.find({
      userId: id,
    });
    if (!plans) {
      return resp.send({
        success: false,
        message: "Please create your plan ",
      });
    }
    resp.status(200).send({
      success: true,
      message: "Plans get Succesfully",
      plans,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting plan",
      error,
    });
  }
};


export const getAllPlansController = async (req,resp)=>{
  try {
    const user = req.user._id
    const plans = await planModel.find()
    return resp.status(200).send({success:true,message:"plan got succesfully",plans:plans})
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while getting plan",
      error,
    });
  }
}

//getSinglePlanController
export const getSinglePlanController = async (req, resp) => {
  try {
    const { id } = req.params;
    console.warn(id);

    const populateOptions = [
      { path: "cities.attractions.attraction", model: "attraction" },
      { path: "cities.zones.zone", model: "zone" },

      { path: "cities.sellers.seller", model: "seller" },
      { path: "users.userId", model: "users" },
    ];

    //single plan
    const plan = await planModel.findById(id).populate(populateOptions);

    if (!plan) {
      return resp.send({
        success: false,
        message: "Plan not available ",
      });
    } else {
      resp.status(200).send({
        success: true,
        message: "Plan get successfully",
        plan,
      });
    }
    console.warn(plan.cities[0].sellers);
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while getting single plan",
      error,
    });
  }
};

// update plane controller 

export const updatePlanController = async (req,resp)=>{
try {
  const planId = req.params.planId;
  const {
    userId,
    planName,
    planGenerationType,
    planType,
    capacity,
    startDate,
    endDate,
    cities,
    price,
  } = req.body;

  const updatePlan = await planModel.findByIdAndUpdate(planId,{userId,
    planName,
    planGenerationType,
    planType,
    capacity,
    startDate,
    endDate,
    cities,
    price})
    return resp.status(201).send({
      success:true,
      message:"plan updated succesfully",
      plan:updatePlan
    })
} catch (error) {
  console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while updating plan",
      error,
    });
}
}




// delete plan controller 

export const deletePlacController = async (req,resp)=>{
  try {
    const planId = req.params.planId
    const deletePlan = await planModel.findByIdAndDelete(planId)

    return resp.status(201).send({
      success:true,
      message:"plan deleted succesfully",
      deletedPlan:deletePlan
    })
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while deleting plan",
      error,
    });
  }
}



//getTypeBasePlanController
export const getTypeBasePlanController = async (req, resp) => {
  try {
    //getTypeBasePlans
    const plans = await planModel.find({
      planType: {
        $ne: "Private",
      },
    });
    if (!plans) {
      return resp.send({
        success: false,
        message: "No plan found",
      });
    }
    return resp.status(200).send({
      success: true,
      message: "Plans get successfully",
      plans,
      count: plans.length,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting type base plan",
      error,
    });
  }
};

//addUserToPlanController
export const addUserToPlanController = async (req, resp) => {
  const { id } = req.params;
  try {
    //check that plan exist or not
    const plan = await planModel.findById(id);
    if (!plan) {
      return resp.status(404).send({
        success: false,
        message: "Plan not found",
      });
    }

    const updatedPlan = await planModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $push: {
          users: {
            userId: req.user._id,
          },
        },
      },
      {
        new: true,
      }
    );
    return resp.status(201).send({
      success: true,
      message: "User added to plan successfully",
      updatedPlan,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while adding user to plan",
      error,
    });
  }
};

//deleteUserFromPlanController

export const deleteUserFromPlanController = async (req, resp) => {
  const { id } = req.params;
  try {
    //find and update the plan
    const updatedPlan = await planModel.findOneAndUpdate(
      { _id: id },
      {
        $pull: { users: { userId: req.user._id } },
      },
      {
        new: true,
      }
    );
    if (!updatedPlan) {
      return resp.send({
        success: false,
        message: "Plan not found",
      });
    }
    return resp.status(201).json({
      message: "User deleted from plan successfully",
      plan: updatedPlan,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while deleting user from plan",
      error,
    });
  }
};

//payment
export const brainTreePlanPaymentController = async (req, res) => {
  try {
    const { nonce } = req.body;
    const { planId } = req.params;
    console.warn(planId);

    //find plan by id
    const plan = await planModel.findByIdAndUpdate(
      planId,
      {
        purchased: true,
      },
      {
        new: true,
      }
    );
    console.warn(plan);

    let newTransaction = gateway.transaction.sale(
      {
        amount: plan?.price,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const purchasedPlan = new purchasedPlanModel({
            plan: planId,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
