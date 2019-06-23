import Web3 from 'web3'
const web3 = new Web3(Web3.givenProvider)

export default function (context) {
  const { route, redirect, store } = context
  const { path } = route
  try {
    const address = path.split('/')[1]
    if (web3.utils.isAddress(address)) {
      store.commit('setIntroducer', address)
    }
  
  } catch (e) {
    console.error(e)
    console.log('it may be wrong address') // TODO: add message on the browser
  }
  return redirect('/')
}