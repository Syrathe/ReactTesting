import OrderStatusSelector from '../components/OrderStatusSelector'

const PlaygroundPage = () => {
  return <OrderStatusSelector onChange={console.log} /> //this will receive value prop and console.log() the value without explicitly stating it
}

export default PlaygroundPage
