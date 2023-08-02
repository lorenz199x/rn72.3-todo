import isEmpty from 'lodash/isEmpty'
import Reactotron from 'reactotron-react-native'

export const log = (...args: any[]) => {
  if (!isEmpty(args) && Reactotron.log) {
    Reactotron.log(args)
  }
}