import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(
   'pk_test_51RKq7ZBSE3VIBYQB4NvUW6kYmnwx62LVR0i6sg7LfFzjYjI95vfmzQMbK71CIt5VCehMi7qTm01GAI6Qqj8NsZlB00PccbukYg',
);

export default stripePromise;