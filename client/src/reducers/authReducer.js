import { FETCH_USER } from "../actions";

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_USER:
			console.log("REDUCER :\n", action.payload.data);
			return action.payload || false;
		default:
			return state;
	}
}
