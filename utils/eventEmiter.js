import { findUserByWallet } from '@root/repository/userRepository'

export const CreateNewInstanceEvent = (() => {
  let instance

  const createInstanceEvent = () => new EventEmitter()

  return {
    getInstanceEvent: () => {
      if (!instance) {
        instance = createInstanceEvent()
      }
      return instance
    },
  }
})()

const eventEmitter = CreateNewInstanceEvent.getInstanceEvent()

const test = {
  sender: 'HMU77m6WSL9Xew9YvVCgz1hLuhzamz74eD9avi4XPdr',
  recipient: '4QUZQ4c7bZuJ4o4L8tYAEGnePFV27SUFEVmC7BYfsXRp',
  transactionFee: 5000,
  signature: '3cGyMSVpLDgwWxu32ub7c55WbsjEibjL5MSK5hB9468uW1nhuN8U51WEAq3kVo8rouT9RwWQ3ANM48vcFZpV3Efh',
}
eventEmitter.on('filter-data-transaction', async (data) => {
  const { recipient } = data
  const email = findUserByWallet(recipient)
  if (email) {
  }
})
