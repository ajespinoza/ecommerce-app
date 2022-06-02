import { User } from "./user.models";
import * as fromAction from './user.actions';

export interface UserState {
  entity: User | null;
  uid: string | null;
  loading: boolean | null;
  error: string | null;
}

const initialState: UserState = {
  entity: null,
  uid: null,
  loading: null,
  error: null
}

export function reducer(state = initialState, action: fromAction.All | any): UserState {
  switch( action.type ){
    case fromAction.Types.INIT: {
      return  { ...state, loading: true}
    }
    case fromAction.Types.INIT_AUTHORIZED: {
      return  { ...state, entity: action.user, uid: action.uid, loading: false, error: null}
    }
    case fromAction.Types.INIT_UNAUTHORIZED: {
      return  { ...state, entity: null, loading: false, error: null}
    }
    case fromAction.Types.INIT_ERROR: {
      return  { ...state, loading: false, error: action.error}
    }


    case fromAction.Types.SIGN_IN_EMAIL: {
      return {...state, loading: true}
    }
    case fromAction.Types.SING_IN_EMAIL_SUCCESS: {
      return {...state, entity: action.user, uid: action.uid, loading: false, error: null}
    }
    case fromAction.Types.SING_IN_EMAIL_ERROR: {
      return {...state, loading: false, error: action.error}
    }

    case fromAction.Types.SIGN_UP_EMAIL: {
      return {...state, loading: true}
    }
    case fromAction.Types.SING_UP_EMAIL_SUCCESS: {
      return {...state, uid: action.uid, loading: false, error: null}
    }
    case fromAction.Types.SING_UP_EMAIL_ERROR: {
      return {...state, loading: false, error: action.error}
    }

    case fromAction.Types.SIGN_OUT_EMAIL: {
      return {...state, loading: true}
    }
    case fromAction.Types.SING_OUT_EMAIL_SUCCESS: {
      return {...initialState}
    }
    case fromAction.Types.SING_OUT_EMAIL_ERROR: {
      return {...state, loading: false, error: action.error}
    }
    default: {
      return state;
    }
  }
}
