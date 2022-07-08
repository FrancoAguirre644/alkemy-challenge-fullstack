import { Theme as MuiTheme } from "@mui/material/styles";
import { AsyncThunk, AsyncThunkOptions, AsyncThunkPayloadCreator, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "./redux/store";

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
}

declare module "@reduxjs/toolkit" {
  type AsyncThunkConfig = {
      state?: unknown;
      dispatch?: Dispatch;
      extra?: unknown;
      rejectValue?: unknown;
      serializedErrorType?: unknown;
  };

  function createAsyncThunk<
      Returned,
      ThunkArg = void,
      ThunkApiConfig extends AsyncThunkConfig = { state: RootState } // here is the magic line
  >(
      typePrefix: string,
      payloadCreator: AsyncThunkPayloadCreator<
          Returned,
          ThunkArg,
          ThunkApiConfig
      >,
      options?: AsyncThunkOptions<ThunkArg, ThunkApiConfig>,
  ): AsyncThunk<Returned, ThunkArg, ThunkApiConfig>;
}