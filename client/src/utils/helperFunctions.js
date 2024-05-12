import { propertyContractAddress, propertyContractABI } from './constants'
import { ethers } from 'ethers'
import moment from 'moment'
const { ethereum } = window

export const getEthereumContract = async () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const propertyContract = new ethers.Contract(
    propertyContractAddress,
    propertyContractABI,
    signer
  )
  // const balance = await provider.getBalance("0xbf8e8B1Cd3D34D80A14b4ffB4Ea6d2A2fa61862c");
  // const value = ethers.utils.formatEther( transaction.value )
  return propertyContract
}
export const getNextMonthDate = (timestamp) => {
  var currentDate = moment(timestamp)
  var futureMonth = moment(currentDate).add(1, 'M')
  var futureMonthEnd = moment(futureMonth).endOf('month')
  if (
    currentDate.date() != futureMonth.date() &&
    futureMonth.isSame(futureMonthEnd.format('YYYY-MM-DD'))
  ) {
    futureMonth = futureMonth.add(1, 'd')
  }
  return futureMonth
}
