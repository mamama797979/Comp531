import Action, {displayErrorMsg} from '../../actions'

export function RegisterAction(){
	return (dispatch) =>{
		dispatch(displayErrorMsg("Register is not required"));
	}
}