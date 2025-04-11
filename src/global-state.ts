import { Dispatch, SetStateAction } from 'react';

function GLOBAL_STATE_TYPE() {}

const GLOBAL_STATE = new GLOBAL_STATE_TYPE();

export const useGlobalState = function (operation: (state: any) => void) {
  try {
    operation(GLOBAL_STATE);
  } catch (e) {
    console.log('Global state function run failed');
  }
};

export function useGlobalReg<S extends Record<string, Dispatch<SetStateAction<any>>>>(state: S): void {
  console.log(Object.keys(state));
  for (const [key, setStateAction] of Object.entries(state)) {
    GLOBAL_STATE_TYPE.prototype[key] = setStateAction;
  }
}
