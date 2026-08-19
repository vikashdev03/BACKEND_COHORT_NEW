const followModel = require("../models/follow.model");
const userModel = require("../models/user.model")

async function followUserController(req, res){

    const followerUsername = req.user.username // ye data kaha se aata haai 
    const followeeUsername = req.params.username

        

        if(followerUsername == followeeUsername){
            return res.status(409).json({
                message: "You Are trying to follow Yourself Not Possible"
            })
        }

        const isfolloweeExist = await userModel.findOne({
            username : followeeUsername
        })

        if(!isfolloweeExist){
            res.status(409).json({
                message : "user does not exist to follow"
            })
        }

        const isAlreadyFollowing = await followModel.findOne({
            follower : followerUsername,
            followee : followeeUsername
        })

        if(isAlreadyFollowing){
            return res.status(409).json({
                message : "you are already following this user"
            })
        }

        const followRecord = await followModel.create({
            follower: followerUsername,
            followee: followeeUsername
        })



        res.status(201).json({
            message : `you  are  now following + ${followeeUsername}`,
            follow : followRecord
        })
    

}

async function UnfollowUserCrontroller(req , res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserfollowing = await userModel.findOne({
        follower : followerUsername,
        followee : followeeUsername

    })   
    if(!isUserfollowing){
        res.status(404).json({
            message: "you are not following "
        })
    }    

    await followModel.findByIdAndDelete(isUserfollowing._id)

    res.status(200).json({
        message: `you have unfollowed ${followeeUsername}`,
        
    })
}


module.exports = {
    followUserController,
   UnfollowUserCrontroller
}