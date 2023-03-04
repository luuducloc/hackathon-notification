// export const createNewUser = (data) => User.findOneAndUpdate({wallet: data.wallet}, data, {upsert: true, new: true})
import User from '@root/models/User'

export const createNewUser = (data) => User.create({ wallet: data.wallet, deviceId: data.deviceId })

export const findUserByWallet = (wallet) => User.findOne({ wallet })
